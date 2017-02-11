'use strict';

require.config({
    shim: {
        'owl-carousel': {
            deps: ['jquery'],
            exports:'owl-carousel'
        },
    },
    paths: {
        'jquery': '../js/vendor/jquery/dist/jquery.min',
        'owl-carousel':'../js/vendor/owl-carousel/owl-carousel/owl.carousel.min'
    }
});

define(['jquery','owl-carousel'], function($, owlCarousel) {

    console.log('hello require js');
});
