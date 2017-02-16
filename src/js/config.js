'use strict';

require.config({
    shim: {
        'owlcarousel': {
            deps: ['jquery'],
            exports:'owlCarousel'
        },
    },
    paths: {
        'jquery': '../js/vendor/jquery/dist/jquery.min',
        'owl-carousel':'../js/vendor/owl-carousel/owl-carousel/owl.carousel.min'
    }
});