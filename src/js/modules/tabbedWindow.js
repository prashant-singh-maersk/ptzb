define(['jquery'], function($) {

    return $.fn.tabbedWindow = function(options) {
        var $self = $(this),
            $window = $(window),
            $elements = $self.children(),
            noOfElements = $elements.length,
            tabbedMenu, frame, menu, container,
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
            //history.pushState(0, '', '')
            menu.on('click', sectionalNavController);
        }


        function render() {
            $.each($elements, function(index, ele) {
                tabbedMenu = $('<' + settings.menuElement + '>').addClass(settings.menuElementClass).text(settings.heading[index]);
                if (settings.menuElement === 'a') {
                    tabbedMenu.attr('href', 'javascript:void(0)');
                }
                $('<div>').addClass('frame').appendTo($self).append(tabbedMenu).append($(ele).addClass(settings.frameClass).detach());
            })
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
            if (settings.conserveHistory) {
                historyController(self, container.index(self.closest('.frame')))
            }
        }

        function historyController(self, data) {
            history.pushState(data, "", self.text())
            window.onpopstate = popStateController;

            function popStateController(event) {
                toggleActive(container.eq(event.state).find('.' + settings.menuElementClass), menu);
                toggleActive($('.frame').eq(event.state).find('.' + settings.frameClass), frame);
            }
        }


    }

});
/*function sectionNavContoller(event) {
        event.preventDefault();
        var $self = $(this),
            num = navs.index($self.closest('li'));
        $('a', navs).removeClass('active')
        $self.addClass('active');
        sections.removeClass('active');
        sections.eq(num).addClass('active')
        matchHeight();
    }
*/
/*function matchHeight() {
    var height = $('.midWrpper.active').height();
    $wrapper.css('height', height)
}

$(window).on('resize', function() {
    window.setTimeout(matchHeight, 400);
});

$('#diagnostic-link').on('click', function() {
    window.location = diagnosticUrl;
});
$('.searchIcon').click(function() {
    toggleSearchForm();
});

$('.sectional-navigation li a').on('click', sectionNavContoller);*/
