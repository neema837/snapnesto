;
(function($) {
    "use strict";
    var fixed_menu = true;

    function gt3_fw_block() {
        var div_tag = jQuery('div');
        if (div_tag.hasClass('right-sidebar') || div_tag.hasClass('left-sidebar')) {
        } else {
            var fw_block = jQuery('.fw_block');
            var fw_block_parent = fw_block.parent().width();
            var fw_site_width = fw_block.parents('.wrapper').width();
            var fw_contentarea_site_width_diff = fw_site_width - fw_block_parent;

            fw_block.css('margin-left', '-' + fw_contentarea_site_width_diff / 2 + 'px').css('width', fw_site_width + 'px').children('.fw_wrapinner').css('padding-left', fw_contentarea_site_width_diff / 2 + 'px').css('padding-right', fw_contentarea_site_width_diff / 2 + 'px');
            jQuery('.wall_wrap .fw_wrapinner').css('padding-left', '0px').css('padding-right', '0px');
        }
    }

    //	Video iframe height
    function gt3_video_size() {
        jQuery('.blog_post_video, .video_module').each(function () {
            jQuery(this).find('iframe').css({'height': jQuery(this).width() * 9 / 16 + 'px'});
        });
    }

    //	Video background
    function gt3_video_background() {
        jQuery('.video_bg').each(function () {
            jQuery(this).find('iframe').css({'height': jQuery(this).height() + 'px'});
        });
    }

    // Colored Section
    function gt3_colored_section() {
        var maxHeight = 0;
        var colored_class = jQuery(".colored_section");
        colored_class.css({'height': 'auto'});
        colored_class.each(function () {
            if (jQuery(this).height() > maxHeight) {
                maxHeight = jQuery(this).height();
            }
        });
        colored_class.height(maxHeight);
    }

    // Height 100 percent
    function gt3_height100_perc() {
        if (jQuery(window).width() < 900) {
            jQuery('.height_100percent').height(jQuery(window).height() - jQuery('.main_header').height());
        } else {
            jQuery('.height_100percent').height(jQuery(window).height());
        }
    }

    // Info Section
    function gt3_info_section() {
        var gt3_info_sect = jQuery('.gt3_info_section');
        if (jQuery(window).width() > 767) {
            gt3_info_sect.each(function() {
                jQuery(this).find('.module_cont').css({
                    'height': 'auto'
                });
                jQuery(this).find('.module_cont').height(jQuery(this).height());
            });
        } else {
            gt3_info_sect.find('.module_cont').css({
                'height': 'auto'
            });
        }
    }

    // Grid Icon Boxes
    function gt3_grid_iconboxes() {
        var maxHeight = 0;
        var all_iconboxes = jQuery(".module_iconboxes_grid .shortcode_iconbox");
        all_iconboxes.css({'height': 'auto'});
        all_iconboxes.each(function () {
            if (jQuery(this).height() > maxHeight) {
                maxHeight = jQuery(this).height();
            }
        });
        all_iconboxes.height(maxHeight);
    }

    // Flex Slider
    function gt3_slider() {
        jQuery('.flexslider').each(function () {
            var flex_slider_w = jQuery(this).width();

            if (jQuery(this).parent().hasClass('pf_output_container')) {
                jQuery(this).height(flex_slider_w/1.5);
            }

            if (jQuery(this).parent().hasClass('flex_masonry')) {
                jQuery(this).height(flex_slider_w/1.35);
            }

            if (jQuery(this).parent().hasClass('flex_singlepost')) {
                jQuery(this).height(flex_slider_w/1.4);
            }

            if (jQuery(this).parent().hasClass('flex_fullscreen')) {
                if (jQuery(window).width() < 900) {
                    jQuery(this).height(jQuery(window).height() - jQuery('.main_header').height());
                } else {
                    jQuery(this).height(jQuery(window).height());
                }
            }

            if (jQuery(this).parent().hasClass('flex_fullwidth_content')) {
                jQuery(this).height(flex_slider_w/2.021);
            }

            if (jQuery(this).parent().hasClass('flex_fullwidth') || jQuery(this).parent().hasClass('flex_singlepost_fullwidth')) {
                jQuery(this).height(750);
            }

            var flex_slider_h = jQuery(this).height();

            jQuery(this).css({'width': flex_slider_w, 'height': flex_slider_h});
            jQuery(this).find('.slides > li').css({'width': flex_slider_w, 'height': flex_slider_h});
        });
    }

    jQuery('body').prepend('<div class="site_preloader"><div class="dot"><div class="first"></div></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div><div class="preloader_block" />');

    jQuery('body').css({'opacity': 1});

    // Header
    var logo_h = jQuery('.logo_sect').height();
    var header_holder = jQuery('.header_holder');
    var lang_selector = jQuery('.lang_selector');

    jQuery('header nav ul.menu > li > a').css({
        'line-height': logo_h + 'px'
    });
    header_holder.height(jQuery('.main_header').height());

    if (lang_selector.size() > 0) {
        jQuery('.lang_selector a, .language_list li').css({
            'line-height': logo_h + 'px'
        });
        lang_selector.css({
            'height': logo_h + 'px'
        });
    }

    if (jQuery('.open_sidebar_area').size() > 0) {
        jQuery('.open_sidebar_area').css({
            'height': logo_h + 'px'
        });
    }

    // Side Area
    jQuery('.open_sidebar_area, .close_sidebar_area').on("click", function () {
        jQuery('body').toggleClass("visible_sidebar_area");
    });

    // Scroll Wrap
    var scroll_pane_wrap = jQuery('.scroll_pane_wrap');
    if (scroll_pane_wrap.size() > 0) {
        scroll_pane_wrap.jScrollPane({
            autoReinitialise: true
        });
    }

    // Fixed & Transparent
    var body = jQuery('body');
    if (fixed_menu == true && jQuery(window).width() > 900) {
        if (jQuery('.strip_template').size() > 0) {
            var scrollset = jQuery(window).height() - jQuery('.main_header').height();
        } else {
            header_holder.show();
            body.addClass('fixed_show');
            scrollset = 0;
        }
        jQuery(window).on('scroll', function () {
            if (jQuery(window).scrollTop() > scrollset) {
                body.addClass('small_sticky');
                if (jQuery('.strip_template').size() > 0) {
                    header_holder.show();
                    body.addClass('fixed_show');
                }
            } else {
                body.removeClass('small_sticky');
                if (jQuery('.strip_template').size() > 0) {
                    header_holder.hide();
                    body.removeClass('fixed_show');
                }
            }
        });
    }

    // Flex Slider
    var flex_slider = jQuery('.flexslider');
    if (flex_slider.size() > 0) {
        gt3_slider();

        jQuery('.flexslider li img.slide_bg').each(function(){
            jQuery(this).parent().attr('style', 'background-image:url('+jQuery(this).attr('src')+');');
        });

        flex_slider.flexslider({
            animation: 'fade',
            slideshowSpeed: 7000,
            animationSpeed: 1000,
            controlNav: true,
            directionNav: true
        });
    }

    if (jQuery('.flex_singlepost_fullwidth').size() > 0) {
        jQuery('body').addClass('page_with_abs_header');
    }

    // Mobile Menu
    jQuery('.header_parent_wrap').append('<div class="mobile-navigation-toggle"><div class="toggle-box"><div class="toggle-inner"></div></div></div>');
    jQuery('.mobile_menu_wrapper').html(jQuery('.main_header nav').html());

    jQuery('.mobile-navigation-toggle').on("click", function() {
        jQuery('.mobile_menu_wrapper').slideToggle(300);
        jQuery(this).toggleClass("is-active");
    });

    jQuery('.mobile_menu_wrapper li').find('a').on("click", function() {
        jQuery(this).parent().toggleClass("showsub");
    });

    // Top Search focus
    var top_search = jQuery('.top_search');

    if (top_search.size() > 0) {

        top_search.css({
            'height': logo_h + 'px'
        });

        jQuery('.ct-search-input').css({
            'height': logo_h + 'px',
            'line-height': logo_h + 'px'
        });

        top_search.each(function () {
            var $ctsearch = jQuery(this),
                $ctsearchinput = $ctsearch.find('input.ct-search-input'),
                $menu_nav = jQuery(this).parents('header').find('nav'),
                $lang_selector_btn = jQuery(this).parents('header').find('.lang_selector'),
                $open_sidebar_area_btn = jQuery(this).parents('header').find('.open_sidebar_area'),
                $body = jQuery('html, body'),
                openSearch = function () {
                    $ctsearch.data('open', true).addClass('ct-search-open');
                    $menu_nav.hide();
                    $lang_selector_btn.hide();
                    $open_sidebar_area_btn.hide();
                    $ctsearchinput.focus();
                    return false;
                },
                closeSearch = function () {
                    $ctsearch.data('open', false).removeClass('ct-search-open');
                    $menu_nav.fadeIn();
                    $lang_selector_btn.fadeIn();
                    $open_sidebar_area_btn.fadeIn();
                };
            $ctsearchinput.on('click', function (e) {
                e.stopPropagation();
                $ctsearch.data('open', true);
            });
            $ctsearch.on('click', function (e) {
                e.stopPropagation();
                if (!$ctsearch.data('open')) {
                    openSearch();
                    $body.on('click', function (e) {
                        closeSearch();
                    });
                }
                else {
                    if ($ctsearchinput.val() === '') {
                        closeSearch();
                        return false;
                    }
                }
            });
        });
    }

    // Language Selector
    jQuery('.lang_btn').on('click', function() {
        lang_selector.toggleClass('open');
        jQuery('.main_header header nav').toggleClass('hide_nav');
    });
    jQuery('.language_list li').on('click', function() {
        lang_selector.removeClass('open');
        jQuery('.main_header header nav').removeClass('hide_nav');
        jQuery('.current_language').text(jQuery(this).text());
    });
    jQuery("html, body").on('click', function(e) {
        if (jQuery(e.target).hasClass('lang_btn') || jQuery(e.target).hasClass('current_language') || jQuery(e.target).hasClass('language_list')) {
            return false;
        }
        lang_selector.removeClass("open");
        jQuery('.main_header header nav').removeClass('hide_nav');
    });

    // Back to Top
    jQuery(window).on('scroll', function () {
        if (jQuery(window).scrollTop() > 0) {
            jQuery('.back2top').fadeIn();
        } else {
            jQuery('.back2top').fadeOut();
        }
    });
    jQuery('.back2top').on("click", function () {
        jQuery('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

    // Counter
    var counter_module = jQuery('.shortcode_counter');
    if (counter_module.size() > 0) {
        if (jQuery(window).width() > 760) {
            counter_module.each(function () {
                if (jQuery(this).offset().top < jQuery(window).height()) {
                    if (!jQuery(this).hasClass('done')) {
                        var set_count = jQuery(this).find('.stat_count').attr('data-count');
                        jQuery(this).find('.stat_temp').stop().animate({width: set_count}, {
                            duration: 3000, step: function (now) {
                                var data = Math.floor(now);
                                jQuery(this).parents('.counter_wrapper').find('.stat_count').html(data);
                            }
                        });
                        jQuery(this).addClass('done');
                        jQuery(this).find('.stat_count');
                    }
                } else {
                    jQuery(this).waypoint(function () {
                        if (!jQuery(this).hasClass('done')) {
                            var set_count = jQuery(this).find('.stat_count').attr('data-count');
                            jQuery(this).find('.stat_temp').stop().animate({width: set_count}, {
                                duration: 3000, step: function (now) {
                                    var data = Math.floor(now);
                                    jQuery(this).parents('.counter_wrapper').find('.stat_count').html(data);
                                }
                            });
                            jQuery(this).addClass('done');
                            jQuery(this).find('.stat_count');
                        }
                    }, {offset: 'bottom-in-view'});
                }
            });
        } else {
            counter_module.each(function () {
                var set_count = jQuery(this).find('.stat_count').attr('data-count');
                jQuery(this).find('.stat_temp').animate({width: set_count}, {
                    duration: 3000, step: function (now) {
                        var data = Math.floor(now);
                        jQuery(this).parents('.counter_wrapper').find('.stat_count').html(data);
                    }
                });
                jQuery(this).find('.stat_count');
            }, {offset: 'bottom-in-view'});
        }
    }

    // Skills
    if (jQuery('.shortcode_skills').size() > 0) {
        if (jQuery(window).width() > 760) {
            jQuery('.module_skills').waypoint(function () {
                jQuery('.skill_div').each(function () {
                    var set_width = jQuery(this).attr('data-percent');
                    var set_bg = jQuery(this).attr('data-background');
                    jQuery(this).css('background', set_bg);
                    jQuery(this).stop().animate({'width': set_width}, 1500);
                });
            }, {offset: 'bottom-in-view'});
        } else {
            jQuery('.skill_div').each(function () {
                jQuery('.skill_div').each(function () {
                    var set_width = jQuery(this).attr('data-percent');
                    var set_bg = jQuery(this).attr('data-background');
                    jQuery(this).css('background', set_bg);
                    jQuery(this).stop().animate({'width': set_width}, 1000);
                });
            });
        }
    }

    // Accordion & Toggle
    if (jQuery('.module_accordion').size() > 0 || jQuery('.module_toggle').size() > 0) {
        jQuery('.shortcode_accordion_item_title').on("click", function () {
            if (!jQuery(this).hasClass('state-active')) {
                jQuery(this).parents('.shortcode_accordion_shortcode').find('.shortcode_accordion_item_body').slideUp(100);
                jQuery(this).next().slideToggle(100);
                jQuery(this).parents('.shortcode_accordion_shortcode').find('.state-active').removeClass('state-active');
                jQuery(this).addClass('state-active');
            }
        });
        jQuery('.shortcode_toggles_item_title').on("click", function () {
            jQuery(this).next().slideToggle(100);
            jQuery(this).toggleClass('state-active');
        });

        jQuery('.shortcode_accordion_item_title.expanded_yes, .shortcode_toggles_item_title.expanded_yes').each(function (index) {
            jQuery(this).next().slideDown(100);
            jQuery(this).addClass('state-active');
        });
    }

    // Diagram
    if (jQuery('.shortcode_diagram').size() > 0) {
        jQuery('.chart').each(function(){
            jQuery(this).css({'font-size' : jQuery(this).parents('.diagram_list').attr('data-fontsize'), 'line-height' : jQuery(this).parents('.diagram_list').attr('data-size')});
            jQuery(this).find('span').css('font-size' , jQuery(this).parents('.diagram_list').attr('data-fontsize'));
        });

        if (jQuery(window).width() > 760) {
            jQuery('.diagram_li').waypoint(function(){
                jQuery('.chart').each(function(){
                    jQuery(this).easyPieChart({
                        barColor: jQuery(this).parents('ul.diagram_list').attr('data-color'),
                        trackColor: jQuery(this).parents('ul.diagram_list').attr('data-bg'),
                        scaleColor: false,
                        lineCap: 'square',
                        lineWidth: parseInt(jQuery(this).parents('ul.diagram_list').attr('data-width'), 10),
                        size: parseInt(jQuery(this).parents('ul.diagram_list').attr('data-size'), 10),
                        animate: 1500
                    });
                });
            },{offset: 'bottom-in-view'});
        } else {
            jQuery('.chart').each(function(){
                jQuery(this).easyPieChart({
                    barColor: jQuery(this).parents('ul.diagram_list').attr('data-color'),
                    trackColor: jQuery(this).parents('ul.diagram_list').attr('data-bg'),
                    scaleColor: false,
                    lineCap: 'square',
                    lineWidth: parseInt(jQuery(this).parents('ul.diagram_list').attr('data-width'), 10),
                    size: parseInt(jQuery(this).parents('ul.diagram_list').attr('data-size'), 10),
                    animate: 1500
                });
            });
        }
    }

    // Tabs
    var tabs_module = jQuery('.shortcode_tabs');
    if (tabs_module.size() > 0) {
        tabs_module.each(function (index) {
            var i = '';
            // GET ALL HEADERS
            i = 1;
            jQuery(this).find('.shortcode_tab_item_title').each(function (index) {
                jQuery(this).addClass('it' + i);
                jQuery(this).attr('whatopen', 'body' + i);
                jQuery(this).addClass('head' + i);
                jQuery(this).parents('.shortcode_tabs').find('.all_heads_cont').append(this);
                i++;
            });

            // GET ALL BODY
            i = 1;
            jQuery(this).find('.shortcode_tab_item_body').each(function (index) {
                jQuery(this).addClass('body' + i);
                jQuery(this).addClass('it' + i);
                jQuery(this).parents('.shortcode_tabs').find('.all_body_cont').append(this);
                i++;
            });

            // OPEN ON START
            jQuery(this).find('.expand_yes').addClass('active');
            var whatopenOnStart = jQuery(this).find('.expand_yes').attr('whatopen');
            jQuery(this).find('.' + whatopenOnStart).show();
            jQuery(this).find('.' + whatopenOnStart).addClass('active');
        });

        jQuery(document).on('click', '.shortcode_tab_item_title', function () {
            jQuery(this).parents('.shortcode_tabs').find('.shortcode_tab_item_body').removeClass('active');
            jQuery(this).parents('.shortcode_tabs').find('.shortcode_tab_item_title').removeClass('active');
            var whatopen = jQuery(this).attr('whatopen');
            jQuery(this).parents('div.shortcode_tabs').find('.shortcode_tab_item_body').hide();
            jQuery(this).parents('.shortcode_tabs').find('.' + whatopen).show();
            jQuery(this).parents('.shortcode_tabs').find('.' + whatopen).addClass('active');
            jQuery(this).addClass('active');
        });
    }

    // Contact form
    if (jQuery('.contact_form').size() > 0) {
        jQuery("#ajax-contact-form").on("submit", function () {
            var str = $(this).serialize();
            var result = '';
            $.ajax({
                type: "POST",
                url: "contact_form/contact_process.php",
                data: str,
                success: function (msg) {
                    // Message Sent - Show the 'Thank You' message and hide the form
                    if (msg == 'OK') {
                        result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
                        jQuery("#fields").hide();
                    } else {
                        result = msg;
                    }
                    jQuery('#note').html(result);
                }
            });
            return false;
        });
    }

    jQuery('.fw_block').not(".wall_wrap").wrapInner('<div class="fw_wrapinner"></div>');

    gt3_fw_block();

    // Magnific Popup
    var photozoom_class = jQuery('.photozoom');
    if (photozoom_class.size() > 0) {
        if (photozoom_class.parents('.photo_gallery').hasClass('photo_gallery')) {
            jQuery('.photo_gallery').each(function () {
                jQuery(this).magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    gallery: {
                        enabled: true
                    },
                    iframe: {
                        markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '<div class="mfp-counter"></div>' + '</div>'
                    }
                });
            });
        } else {
            photozoom_class.magnificPopup({type: 'image'});
        }
        jQuery('.mfp-iframe').on("click", function () {
            jQuery('body').toggleClass("mfp-zoom-out-cur");
        });
    }

    // Colored_sections
    if (jQuery('.colored_sections').size() > 0) {
        gt3_colored_section();
    }

    // Grid Icon Boxes
    if (jQuery('.module_iconboxes_grid').size() > 0) {
        gt3_grid_iconboxes();
    }

    //	Video iframe height
    gt3_video_size();

    // Instagram
    if (jQuery('#instagram_module').size() > 0) {
        if (jQuery('.instagram_module_title').size() > 0) {
            var item_count = 6;
            jQuery('#instagram_module').addClass('with_margin');
        } else {
            var item_count = 8;
        }
        var feed = new Instafeed({
            get: 'user',
            userId: 2272331954, //  Unique id of a user
            accessToken: '2272331954.3a81a9f.c5dfe123bbdc4f469edfd95f975dde90', // A valid oAuth token
            target: 'instagram_module',
            resolution: 'low_resolution',
            limit: item_count,
            template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>'
        });
        feed.run();
    }

    // Height 100 percent
    if (jQuery('.height_100percent').size() > 0) {
        gt3_height100_perc();
    }

    // Video background
    if (jQuery('.video_bg').size() > 0) {
        jQuery('.play-video').on('click', function(ev) {

            jQuery('.video_bg').each(function() {
                jQuery(this).find('.video_frame').attr('src', jQuery(this).find('.play-video').attr('data-video-url'));
            });

            jQuery('.video_bg img, .video_bg .play-video').show();
            jQuery('.video_bg iframe').hide();

            jQuery(this).parent().find(".video_frame")[0].src += "&autoplay=1";
            ev.preventDefault();

            gt3_video_background();
            jQuery(this).parent().find('img').hide();
            jQuery(this).parent().find('iframe').show();
            jQuery(this).parent().find('.play-video').fadeOut();

        });
    }

    // Info Section
    if (jQuery('.gt3_info_section').size() > 0) {
        var info_section_image = jQuery('.gt3_info_section .single_image');
        if (info_section_image.size() > 0) {
            info_section_image.each(function() {
                jQuery(this).parents('.module_cont').attr('style', 'background-image:url(' + jQuery(this).find('img').attr('src') + ');');
            });
        }
    }

    // Item with Title Block Hover
    if (jQuery('.with_title_block').size() > 0) {
        jQuery('.item_padding').each(function () {
            jQuery(this).find(".img_block").mouseenter(function() {
                jQuery(this).parent().addClass("active_hover");
            }).mouseleave(function() {
                jQuery(this).parent().removeClass("active_hover");
            });
        });
        jQuery('.load_more_works').css({'margin-top': 54 + 'px', 'margin-bottom': 5 + 'px'});
    }

    if (jQuery('.blog_post_preview').size() > 0) {
        jQuery('.blog_post_image').each(function () {
            jQuery(this).mouseenter(function() {
                jQuery(this).parent().addClass("active_hover");
            }).mouseleave(function() {
                jQuery(this).parent().removeClass("active_hover");
            });
        });
        jQuery('.load_more_works').css({'margin-top': 54 + 'px', 'margin-bottom': 5 + 'px'});
    }

    // Scroll Icon
    if (jQuery('.flex_fullscreen').size() > 0) {
        jQuery('.flex_fullscreen .flexslider').append('<div class="scroll_icon" />');
    }

    jQuery('.scroll_icon').on('click', function() {
        jQuery('html, body').stop().animate({
            scrollTop: jQuery(window).height() + 'px'
        }, 600);
    });

    jQuery(window).resize(function () {
        gt3_fw_block();

        // Colored_sections
        if (jQuery('.colored_sections').size() > 0) {
            gt3_colored_section();
        }

        // Grid Icon Boxes
        if (jQuery('.module_iconboxes_grid').size() > 0) {
            gt3_grid_iconboxes();
        }

        //	Video iframe height
        gt3_video_size();

        // Video background
        gt3_video_background();

        // Height 100 percent
        if (jQuery('.height_100percent').size() > 0) {
            gt3_height100_perc();
        }

        // Info Section
        if (jQuery('.gt3_info_section').size() > 0) {
            gt3_info_section();
        }

        // Flex_Slider
        if (jQuery('.flexslider').size() > 0) {
            gt3_slider();
        }

        if (jQuery(window).width() < 901) {
            jQuery('body').removeClass("visible_sidebar_area").removeClass("fixed_show");
        }

    });

    jQuery(window).load(function () {

        jQuery('.site_preloader, .preloader_block').fadeOut();

        gt3_fw_block();

        // Height 100 percent
        if (jQuery('.height_100percent').size() > 0) {
            gt3_height100_perc();
        }

        // Info Section
        if (jQuery('.gt3_info_section').size() > 0) {
            gt3_info_section();
        }

        // Flex Slider
        if (jQuery('.flexslider').size() > 0) {
            gt3_slider();
        }

    });
})(jQuery);