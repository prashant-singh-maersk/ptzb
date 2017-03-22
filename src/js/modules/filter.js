define(['jquery', 'owlCarousel'], function($, owlCarousel) {

    var filter = (function() {
        // $(this) is window here
        var initialize = function() {
                filterSlide();
                carouselInit();
                filterSearch();
                $('.see-mores').on('click', seeMoreHandle);
                $('.see-less').on('click', seeLessHandle);
                $('.filter-close').on('click', function() {
                    $('.filters a').trigger('click');
                })
                getMoreTuples();
            },
            filterSlide = function() {
                var slider = $('.custom-slider input'),
                    valueHolder = $('.distance-value'),
                    min = parseInt(slider.attr('min')),
                    max = parseInt(slider.attr('max')),
                    val = slider.attr('value'),
                    percent = (val / (max - min)) * 100;
                valueHolder.html(val + ' km').css({
                    'left': percent + '%',
                    'transform': 'translateX(-' + percent + '%)'
                })
                $('.custom-slider input').on('load input change', function() {
                    var self = $(this);
                    val = self.val();
                    max = parseInt(self.attr('max'));
                    min = parseInt(self.attr('min'));
                    percent = (val / (max - min)) * 100;
                    valueHolder.html(val + ' km').css({
                        'left': percent + '%',
                        'transform': 'translateX(-' + percent + '%)'
                    })

                })
            },
            filterSearch = function() {
                var parent, checkbox, value, self, label, count,
                    toShow, noOfResults, seeMore, seeLess, patt,
                    filter = $('.filter-search input');
                filter.on('input change', function() {
                    self = $(this);
                    count = 0;
                    value = self.val().toLowerCase();
                    parent = self.closest('.accordion-section-content');
                    toShow = +parent.attr('data-show');
                    checkbox = $('.custom-checkbox', parent);
                    checkbox.removeClass('less');
                    checkbox.removeClass('pshow');
                    patt = new RegExp('\\b' + value, 'g');
                    $.each(checkbox, function(index, ele) {
                        ele = $(ele);
                        label = $.trim(ele.text().toLowerCase());
                        if (patt.test(label)) {
                            count++
                            //ele.addClass('pshow');
                            ele.removeClass('phide');
                            if (count > toShow) {
                                ele.addClass('less');
                            }
                        } else {
                            ele.addClass('phide');
                            //ele.removeClass('pshow');
                        }
                    })

                    noOfResults = count;
                    hiddenResults(noOfResults - toShow, parent);
                    seeMore = $('.see-mores', parent);
                    seeLess = $('.see-less', parent);
                    if (noOfResults <= toShow) {
                        if (parent.attr('data-status') === 'less') {
                            seeMore.hide();
                        } else {
                            seeLess.hide();
                        }
                    } else {
                        if (parent.attr('data-status') === 'less') {
                            seeMore.show();
                        } else {
                            seeLess.show();
                        }
                    }
                })
            },
            seeMoreHandle = function() {
                var self = $(this);
                self.closest('.accordion-section-content').attr('data-status', 'more').addClass('more');
                self.hide();
                $('.see-less').show();
            },
            seeLessHandle = function() {
                var self = $(this);
                self.closest('.accordion-section-content').attr('data-status', 'less').removeClass('more');
                self.hide();
                $('.see-mores').show();
            },
            hiddenResults = function(no, parent) {
                $('.see-mores', parent).text('see more(' + no + ')');
            },
            removeAppliedFilter = function() {
                var self = $(this),
                    targetElement = self.attr('data-id');
                $('#' + targetElement).trigger('click');
            },
            sortByFilter = function() {
                var value = $(this).val()
                $('#sort-handle').attr('value', value).trigger('change');
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
            },
            getMoreTuples = function() {
                var url = 'http://labs.infoedge.com:9315/deals/getTuples',
                    filterData = $('#filterSearchForm').serialize();
                $('.more-tuples').on('click', function() {

                    $.post(url, filterData, appendTupples);
                })
            },
            appendTupples = function(data) {
                $('.left-box').append(data);
            }
        return { initialize: initialize };
    })();
    return filter;
});
