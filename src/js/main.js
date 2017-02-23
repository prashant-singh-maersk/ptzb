'use strict';

/*define('gmaps',[],function(){
    return window.google.maps;
})*/
define('jquery', [], function() {
    return window.jQuery;
});

require.config({
    shim: {
        'owlcarousel': {
            deps: ['jquery'],
            exports:'$.owlCarousel'
        },
        'lazyLoad':{
            deps:['jquery'],
            export:'$.lazyLoad'
        }/*,
        'placepicker':{
            deps:['jquery','bootstrap','gmaps'],
            export:'$.placepicker'
        }*/
    },
    paths: {
        'owlCarousel':'../js/vendor/owl.carousel/dist/owl.carousel',
        'jquery': 'empty:',
        'lazyLoad':'../js/vendor/jquery_lazyload/jquery.lazyload',
        'pitzop':'../js/modules/pitzop',
        //'placepicker':'http://www.jqueryscript.net/demo/jQuery-Location-Autocomplete-with-Google-Maps-Places-Library-Placepicker/src/js/jquery.placepicker',
        'bootstrap': '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min',
        'tabbedWindow':'../js/modules/tabbedWindow',
    }
});

define(['owlCarousel','pitzop','lazyLoad','bootstrap','tabbedWindow'], function(owlCarousel,pitzop,lazyLoad,bootstrap,tabbedWindow) {
    var in1=new pitzop();
    in1.initialize();
    $('.plug').tabbedWindow({
        menuElement:'a',
        conserveHistory:true
    })
    $('.pitzop-carousel').owlCarousel({
            loop: false,
            nav: true,
            rewind:true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
    $("img.lazy").lazyload({
         effect: "fadeIn",
         skip_invisible:true
        });
});
