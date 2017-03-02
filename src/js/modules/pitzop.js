define(['jquery', 'owlCarousel'], function($, owlCarousel) {

    var pitzop = (function() {
        // $(this) is window here 
        var initialize = function() {
                filterSlide();
                carouselInit();
                filterSearch();
            },
            filterSlide = function() {
                var slider = $('.custom-slider input'),
                    valueHolder = $('.distance-value'),
                    min = parseInt(slider.attr('min')),
                    max = parseInt(slider.attr('max')),
                    val = slider.attr('value'),
                    percent = (val / (max - min)) * 100;
                valueHolder.html(val + ' km').css('left', percent + '%');
                $('.custom-slider input').on('input change', function() {
                    var self = $(this);
                    val = self.val();
                    max = parseInt(self.attr('max'));
                    min = parseInt(self.attr('min'));
                    percent = (val / (max - min)) * 100;
                    valueHolder.html(val + ' km').css('left', percent + '%');
                })
            },
            filterSearch = function() {
                var parent, checkbox,
                    filter = $('.filter-search input');
                filter.on('input change', function() {
                    var self = $(this);
                    parent = self.closest('.accordion-section-container');
                    checkbox=$('.custom-checkbox',parent);
                    console.log(checkbox);
                })
            },
            carouselInit = function() {
                $('.pitzop-carousel').owlCarousel({
                    loop: false,
                    nav: true,
                    rewind: true,
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
            }
        return { initialize: initialize };
    })();
    return pitzop;
});
