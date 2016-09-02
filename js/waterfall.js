$( window ).on( "load", function(){
    waterfall();
    dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    init();
   $(window).scroll(function(){
        if(checkscrollside()){
            $.each( dataInt.data, function( index, value ){
                var $oPin = $('<div>').addClass('pin').appendTo( $( "#main" ) );
                var $oBox = $('<div>').addClass('box').appendTo( $oPin );
                $('<img>').attr('src','./images/' + $( value).attr( 'src') ).appendTo($oBox);
            });
            waterfall();
        }
    });
   $(window).resize(function(){
        waterfall();
   });
});

/*
    parend 父级id
    pin 元素id
*/
function waterfall(){
    var $aPin = $( "#main>div" );
    var iPinW = $aPin.eq(0).outerWidth();// 一个块框pin的宽
    var num = Math.floor($(window).width() / iPinW );//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
    //oParent.style.cssText='width:'+iPinW*num+'px;ma rgin:0 auto;';//设置父级居中样式：定宽+自动水平外边距
    $( "#main" ).css({
        'width:' : iPinW * num,
        'margin': '0 auto'
    });

    var pinHArr=[];//用于存储 每列中的所有块框相加的高度。

    $aPin.each( function( index, value ){
        var pinH = $(this).outerHeight();
        if( index < num ){
            pinHArr[index] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
            $(this).css('position','static');
        }else{
            var minH = Math.min.apply( null, pinHArr );//数组pinHArr中的最小值minH
            var minHIndex = $.inArray( minH, pinHArr );
            $( value ).css({
                'position': 'absolute',
                'top': minH,
                'left': $aPin.eq( minHIndex ).offset().left
            });
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[ minHIndex ] += $(this).outerHeight();//更新添加了块框后的列高
        }
    });
}

function checkscrollside(){
    var $aPin = $( "#main>div" );
    var lastPinH = $aPin.last().offset().top + $aPin.last().outerHeight()/2;//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = $( window ).scrollTop()//注意解决兼容性
    var documentH = $( document ).height();//页面高度
    return (lastPinH < documentH + scrollTop) ? true : false;//到达指定高度后 返回true，触发waterfall()函数   
}

function init(){
    if( $("#main>div").last().offset().top < $(window).height() ){
        $.each( dataInt.data, function( index, value ){
                var $oPin = $('<div>').addClass('pin').appendTo( $( "#main" ) );
                var $oBox = $('<div>').addClass('box').appendTo( $oPin );
                $('<img>').attr('src','./images/' + $( value).attr( 'src') ).appendTo($oBox);
        });
        waterfall();
        init();
    }else{
        return;
    }
}