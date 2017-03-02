define(['jquery'], function($) {

    return $.fn.tabbedWindow = function(options) {
        var $self = $(this),
            $containerHeight,
            $window = $(window),
            $elements = $self.children(),
            noOfElements = $elements.length,
            tabbedMenu, frame, menu, container, url,
            settings = {
                menuElement: 'a',
                frameClass: 'tabbed-frame',
                menuElementClass: 'tabbed-menu',
                lazyLoad: false,
                conserveHistory: false,
                heading: ['first', 'second', 'third', 'fourth', 'five', 'six']
            };
        init();

        function init() {
            $.extend(settings, options);
            render();
            menu = $('.' + settings.menuElementClass, $self);
            frame = $('.' + settings.frameClass, $self);
            container = $('.frame', $self);
            toggleActive(menu.eq(0), menu);
            toggleActive(frame.eq(0), frame);
            lazyImg(menu.eq(0));
            $containerHeight = $self.height();
            frame.css({ 'top': $containerHeight, 'left': 0 });
            matchHeight(menu.eq(0));
            if (settings.conserveHistory) {
                window.onpopstate = popStateController;
            }
            menu.on('click', sectionalNavController);
            $window.on('resize', function() {
                matchHeight($('.tabbed-menu.active'));
                frame.css({ 'top': $containerHeight, 'left': 0 });
            })
        }

        function render() {
            $.each($elements, function(index, ele) {
                ele = $(ele);
                tabbedMenu = $('<' + settings.menuElement + '>').addClass(settings.menuElementClass).text(getDataAttr(ele, 'data-heading'));
                if (settings.menuElement === 'a') {
                    tabbedMenu.attr('href', 'javascript:void(0)');
                }
                $('<div>').addClass('frame').appendTo($self).append(tabbedMenu).append($(ele).addClass(settings.frameClass).detach());
            })
        }

        function getDataAttr(ele, attr) {
            return ele.attr(attr);
        }

        function toggleActive(currentEle, allEle, className) {
            if (!className) {
                var className = 'active'
            }
            allEle.removeClass(className);
            currentEle.addClass(className);
        }

        function sectionalNavController() {
            var self = $(this)
            toggleActive(self, menu);
            toggleActive(self.next(), frame);
            if (settings.lazyLoad) {
                lazyImg(self);
            }
            matchHeight(self);
            if (settings.conserveHistory) {
                historyController(self, container.index(self.closest('.frame')))
            }
        }

        function matchHeight(ele) {
            var sibling = ele.next(),
                parent = menu.closest('.frame'),
                height = sibling.outerHeight(true) + ($containerHeight <= (parent.outerHeight()) * 5 ? $containerHeight : parent.outerHeight());
            $self.css('height', height)
        }

        function historyController(self, data) {
            history.pushState(data, "",self.text().toLowerCase())
        }


        function popStateController(event) {
            console.log('hello');
            toggleActive(container.eq(event.state).find('.' + settings.menuElementClass), menu);
            toggleActive($('.frame').eq(event.state).find('.' + settings.frameClass), frame);
        }

        function lazyImg(ele) {
            var sibling = ele.next(),
                img;
            $.each($('img', sibling), function(index, ele) {
                img = $(ele);
                if (!img.attr('src')) {
                    img.attr('src', img.attr('data-original'));
                }
            });
        }

    }

});
