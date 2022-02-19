$(function () {
    $('p.textDrop').css({
        transform: 'scale(20)'
        })
        .css('opacity', .2)
        .animate({
            opacity: .8,
            transform: 'scale(1)'
        },1000, 'easeInQuad', function () {
            //code to run after war animate completes
            $('div#dustPuffs').show().each (function () {
                $(this).animate({
                    opacity: .2,
                    transform: 'scale("horizontal: 300", "vertical: 200")'
                }, 1500, 'easeInQuad')
                    .fadeOut(800)
                    .css({
                        opacity: 1.0,
                        transform: 'scale(1)'
                    }).promise().done(function () {
                    $('p.textDrop').animate({
                        width: 500
                    }, 300, 'easeOutBounce')
                })
            })
        })
});


