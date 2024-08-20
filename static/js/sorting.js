;
(function($) {
    "use strict";
    /* SORTING */
    jQuery(function () {
        var $container = jQuery('.sorting_block');

        $container.isotope({
            itemSelector: '.element'
        });

        var $optionSets = jQuery('.optionset'),
            $optionLinks = $optionSets.find('a');

        $optionLinks.on("click", function () {
            var $this = jQuery(this);
            // don't proceed if already selected
            if ($this.parent('li').hasClass('selected')) {
                return false;
            }
            var $optionSet = $this.parents('.optionset');
            $optionSet.find('.selected').removeClass('selected');
            $optionSet.find('.fltr_before').removeClass('fltr_before');
            $optionSet.find('.fltr_after').removeClass('fltr_after');
            $this.parent('li').addClass('selected');
            $this.parent('li').next('li').addClass('fltr_after');
            $this.parent('li').prev('li').addClass('fltr_before');

            // make option object dynamically, i.e. { filter: '.my-filter-class' }
            var options = {},
                key = $optionSet.attr('data-option-key'),
                value = $this.attr('data-option-value');
            // parse 'false' as false boolean
            value = value === 'false' ? false : value;
            options[key] = value;
            if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                // changes in layout modes need extra logic
                changeLayoutMode($this, options)
            } else {
                // otherwise, apply new options
                $container.isotope(options);
                var sortingtimer = setTimeout(function () {
                    jQuery('.sorting_block').isotope('reLayout');
                    clearTimeout(sortingtimer);
                }, 500);
            }
            return false;
        });

        $container.find('img').load(function () {
            $container.isotope('reLayout');
        });
    });

    jQuery(window).load(function () {
        jQuery('.sorting_block').isotope('reLayout');
        var sortingtimer = setTimeout(function () {
            jQuery('.sorting_block').isotope('reLayout');
            clearTimeout(sortingtimer);
        }, 500);
    });
    jQuery(window).resize(function () {
        jQuery('.sorting_block').isotope('reLayout');
    });

    jQuery.fn.portfolio_addon = function (addon_options) {
        // Set Variables
        var addon_el = jQuery(this),
            addon_base = this,
            img_count = addon_options.items.length,
            img_per_load = addon_options.load_count,
            $newEls = '',
            loaded_object = '',
            $container = jQuery('.image-grid');

        jQuery('.load_more_works').on('click', function () {
            $newEls = '';
            loaded_object = '';
            var loaded_images = $container.find('.added').size();
            var now_load = '';
            if ((img_count - loaded_images) > img_per_load) {
                now_load = img_per_load;
            } else {
                now_load = img_count - loaded_images;
            }

            if ((loaded_images + now_load) == img_count) {
                jQuery(this).fadeOut();
            }

            var i_start = '';
            if (loaded_images < 1) {
                i_start = 1;
            } else {
                i_start = loaded_images + 1;
            }

            if (now_load > 0) {
                if (addon_options.type == 1) {
                    // Gallery
                    for (var i = i_start-1; i < i_start+now_load-1; i++) {
                        loaded_object = loaded_object + '<div class="gallery_item element added"><div class="item_padding"><div class="img_block"><img src="' + addon_options.items[i].src + '" alt="" /><span class="gallery_overlay"></span><a href="' + addon_options.items[i].url + '" class="view_link ' + addon_options.items[i].linkclass + '"></a></div></div></div>';
                    }

                }
                if (addon_options.type == 2) {
                    // Gallery Albums
                    for (var i = i_start-1; i < i_start+now_load-1; i++) {
                        loaded_object = loaded_object + '<div class="'+ addon_options.items[i].sortcategory +' gallery_item element added"><div class="item_padding"><div class="img_block"><img src="' + addon_options.items[i].src + '" alt="" /><span class="gallery_overlay"></span><a href="' + addon_options.items[i].url + '" class="item_link">View Album</a><div class="gallery_likes"><div class="icon"></div><span>' + addon_options.items[i].likecount + '</span></div></div><div class="item_title_block"><div class="item_title"><a href="' + addon_options.items[i].url + '">' + addon_options.items[i].title + '</a></div>' + addon_options.items[i].category + '</div></div></div>';
                    }
                }
                if (addon_options.type == 3) {
                    // Portfolio 2-4 Columns (with Title Block)
                    for (var i = i_start-1; i < i_start+now_load-1; i++) {
                        loaded_object = loaded_object + '<div class="'+ addon_options.items[i].sortcategory +' portfolio_item element added"><div class="item_padding"><div class="img_block"><img src="' + addon_options.items[i].src + '" alt="" /><span class="gallery_overlay"></span><a href="' + addon_options.items[i].url + '" class="item_link">View Portfolio Post</a><div class="gallery_likes"><div class="icon"></div><span>' + addon_options.items[i].likecount + '</span></div></div><div class="item_title_block"><div class="item_title"><a href="' + addon_options.items[i].url + '">' + addon_options.items[i].title + '</a></div>' + addon_options.items[i].category + '</div></div></div>';
                    }
                }
                if (addon_options.type == 4) {
                    // Portfolio 2-4 Columns
                    for (var i = i_start-1; i < i_start+now_load-1; i++) {
                        loaded_object = loaded_object + '<div class="'+ addon_options.items[i].sortcategory +' portfolio_item element added"><div class="item_padding"><div class="img_block"><img src="' + addon_options.items[i].src + '" alt="" /><span class="gallery_overlay"></span><a href="' + addon_options.items[i].url + '" class="item_link">View Portfolio Post</a><div class="item_title_block"><div class="item_title"><a href="' + addon_options.items[i].url + '">' + addon_options.items[i].title + '</a></div>' + addon_options.items[i].category + '</div></div></div></div>';
                    }
                }
                if (addon_options.type == 5) {
                    // Portfolio 1 Column
                    for (var i = i_start-1; i < i_start+now_load-1; i++) {
                        loaded_object = loaded_object + '<div class="'+ addon_options.items[i].sortcategory +' portfolio_item element added"><div class="row"><div class="col-sm-6"><div class="img_block"><img src="' + addon_options.items[i].src + '" alt="" /><span class="gallery_overlay"></span><a href="' + addon_options.items[i].url + '" class="item_link">View Portfolio Post</a></div></div><div class="col-sm-6"><div class="item_title_block"><div class="item_title"><a href="' + addon_options.items[i].url + '">' + addon_options.items[i].title + '</a></div>' + addon_options.items[i].category + '</div><p>' + addon_options.items[i].description + '</p><a href="' + addon_options.items[i].url + '" class="learn_more">View more</a></div></div></div>';
                    }
                }

                $newEls = jQuery(loaded_object);
                $container.isotope('insert', $newEls, function () {
                    $container.isotope('reLayout');

                    // Item with Title Block Hover
                    jQuery('.item_padding').each(function () {
                        jQuery(this).find(".img_block").mouseenter(function() {
                            jQuery(this).parent().addClass("active_hover");
                        }).mouseleave(function() {
                            jQuery(this).parent().removeClass("active_hover");
                        });
                    });

                });
            }

            return false;
        });
    }
})(jQuery);