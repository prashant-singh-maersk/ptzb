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
            exports: '$.owlCarousel'
        },
        'lazyLoad': {
            deps: ['jquery'],
            export: '$.lazyLoad'
        }
        /*,
                'placepicker':{
                    deps:['jquery','bootstrap','gmaps'],
                    export:'$.placepicker'
                }*/
    },
    paths: {
        'owlCarousel': '../js/vendor/owl.carousel/dist/owl.carousel',
        'jquery': 'empty:',
        'lazyLoad': '../js/vendor/jquery_lazyload/jquery.lazyload',
        'pitzop': '../js/modules/pitzop',
        //'placepicker':'http://www.jqueryscript.net/demo/jQuery-Location-Autocomplete-with-Google-Maps-Places-Library-Placepicker/src/js/jquery.placepicker',
        'bootstrap': '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min',
        'tabbedWindow': '../js/modules/tabbedWindow',
    }
});

define(['pitzop', 'lazyLoad', 'bootstrap', 'tabbedWindow'], function(pitzop, lazyLoad, bootstrap, tabbedWindow) {
    console.log(pitzop.initialize());
    $('.category-section').tabbedWindow({
        menuElement: 'a',
        conserveHistory: true,
        lazyLoad: true,
        frameClass: 'midWrpper'
    })
    
    
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: true
    });
});
