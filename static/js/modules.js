/* Waypoints */
/*jQuery Waypoints - v2.0.2
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);

/*! Magnific Popup - v1.0.0 - 2015-01-03
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2015 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isIE7=-1!==c.indexOf("MSIE 7."),b.isIE8=-1!==c.indexOf("MSIE 8."),b.isLowIE=b.isIE7||b.isIE8,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",b.ev=c.mainEl&&c.mainEl.length?c.mainEl.eq(0):d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.wrap.css(b.fixedContentPos?{overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}:{top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),b.currTemplate[d]=f?a(f):!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||2!==c.which&&!c.ctrlKey&&!c.metaKey){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(a,c){if(void 0===c||c===!1)return!0;if(e=a.split("_"),e.length>1){var d=b.find(p+"-"+e[0]);if(d.length>0){var f=e[1];"replaceWith"===f?d[0]!==c[0]&&d.replaceWith(c):"img"===f?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(p+"-"+a).html(c)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous",tNext:"Next",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery",g=Boolean(a.fn.mfpFastClick);return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s),h=g?"mfpFastClick":"click";e[h](function(){b.prev()}),f[h](function(){b.next()}),b.isIE7&&(x("b",e[0],!1,!0),x("a",e[0],!1,!0),x("b",f[0],!1,!0),x("a",f[0],!1,!0)),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowLeft&&g&&b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),function(){var b=1e3,c="ontouchstart"in window,d=function(){v.off("touchmove"+f+" touchend"+f)},e="mfpFastClick",f="."+e;a.fn.mfpFastClick=function(e){return a(this).each(function(){var g,h=a(this);if(c){var i,j,k,l,m,n;h.on("touchstart"+f,function(a){l=!1,n=1,m=a.originalEvent?a.originalEvent.touches[0]:a.touches[0],j=m.clientX,k=m.clientY,v.on("touchmove"+f,function(a){m=a.originalEvent?a.originalEvent.touches:a.touches,n=m.length,m=m[0],(Math.abs(m.clientX-j)>10||Math.abs(m.clientY-k)>10)&&(l=!0,d())}).on("touchend"+f,function(a){d(),l||n>1||(g=!0,a.preventDefault(),clearTimeout(i),i=setTimeout(function(){g=!1},b),e())})})}h.on("click"+f,function(){g||e()})})},a.fn.destroyMfpFastClick=function(){a(this).off("touchstart"+f+" click"+f),c&&v.off("touchmove"+f+" touchend"+f)}}(),A()});

// Generated by CoffeeScript 1.3.3
(function(){var e,t;e=function(){function e(e,t){var n,r;this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1};if(typeof e=="object")for(n in e)r=e[n],this.options[n]=r;this.context=t!=null?t:this,this.unique=this._genKey()}return e.prototype.hasNext=function(){return typeof this.context.nextUrl=="string"&&this.context.nextUrl.length>0},e.prototype.next=function(){return this.hasNext()?this.run(this.context.nextUrl):!1},e.prototype.run=function(t){var n,r,i;if(typeof this.options.clientId!="string"&&typeof this.options.accessToken!="string")throw new Error("Missing clientId or accessToken.");if(typeof this.options.accessToken!="string"&&typeof this.options.clientId!="string")throw new Error("Missing clientId or accessToken.");return this.options.before!=null&&typeof this.options.before=="function"&&this.options.before.call(this),typeof document!="undefined"&&document!==null&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=t||this._buildUrl(),n=document.getElementsByTagName("head"),n[0].appendChild(i),r="instafeedCache"+this.unique,window[r]=new e(this.options,this),window[r].unique=this.unique),!0},e.prototype.parse=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S;if(typeof e!="object"){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(e.meta.code!==200){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,e.meta.error_message),!1;throw new Error("Error from Instagram: "+e.meta.error_message)}if(e.data.length===0){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}this.options.success!=null&&typeof this.options.success=="function"&&this.options.success.call(this,e),this.context.nextUrl="",e.pagination!=null&&(this.context.nextUrl=e.pagination.next_url);if(this.options.sortBy!=="none"){this.options.sortBy==="random"?d=["","random"]:d=this.options.sortBy.split("-"),p=d[0]==="least"?!0:!1;switch(d[1]){case"random":e.data.sort(function(){return.5-Math.random()});break;case"recent":e.data=this._sortBy(e.data,"created_time",p);break;case"liked":e.data=this._sortBy(e.data,"likes.count",p);break;case"commented":e.data=this._sortBy(e.data,"comments.count",p);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}}if(typeof document!="undefined"&&document!==null&&this.options.mock===!1){a=e.data,this.options.limit!=null&&a.length>this.options.limit&&(a=a.slice(0,this.options.limit+1||9e9)),n=document.createDocumentFragment(),this.options.filter!=null&&typeof this.options.filter=="function"&&(a=this._filter(a,this.options.filter));if(this.options.template!=null&&typeof this.options.template=="string"){i="",o="",l="",v=document.createElement("div");for(m=0,b=a.length;m<b;m++)s=a[m],u=s.images[this.options.resolution].url,this.options.useHttp||(u=u.replace("http://","//")),o=this._makeTemplate(this.options.template,{model:s,id:s.id,link:s.link,image:u,caption:this._getObjectProperty(s,"caption.text"),likes:s.likes.count,comments:s.comments.count,location:this._getObjectProperty(s,"location.name")}),i+=o;v.innerHTML=i,S=[].slice.call(v.childNodes);for(g=0,w=S.length;g<w;g++)h=S[g],n.appendChild(h)}else for(y=0,E=a.length;y<E;y++)s=a[y],f=document.createElement("img"),u=s.images[this.options.resolution].url,this.options.useHttp||(u=u.replace("http://","//")),f.src=u,this.options.links===!0?(t=document.createElement("a"),t.href=s.link,t.appendChild(f),n.appendChild(t)):n.appendChild(f);document.getElementById(this.options.target).appendChild(n),r=document.getElementsByTagName("head")[0],r.removeChild(document.getElementById("instafeed-fetcher")),c="instafeedCache"+this.unique,window[c]=void 0;try{delete window[c]}catch(x){}}return this.options.after!=null&&typeof this.options.after=="function"&&this.options.after.call(this),!0},e.prototype._buildUrl=function(){var e,t,n;e="https://api.instagram.com/v1";switch(this.options.get){case"popular":t="media/popular";break;case"tagged":if(typeof this.options.tagName!="string")throw new Error("No tag name specified. Use the 'tagName' option.");t="tags/"+this.options.tagName+"/media/recent";break;case"location":if(typeof this.options.locationId!="number")throw new Error("No location specified. Use the 'locationId' option.");t="locations/"+this.options.locationId+"/media/recent";break;case"user":if(typeof this.options.userId!="number")throw new Error("No user specified. Use the 'userId' option.");if(typeof this.options.accessToken!="string")throw new Error("No access token. Use the 'accessToken' option.");t="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return n=""+e+"/"+t,this.options.accessToken!=null?n+="?access_token="+this.options.accessToken:n+="?client_id="+this.options.clientId,this.options.limit!=null&&(n+="&count="+this.options.limit),n+="&callback=instafeedCache"+this.unique+".parse",n},e.prototype._genKey=function(){var e;return e=function(){return((1+Math.random())*65536|0).toString(16).substring(1)},""+e()+e()+e()+e()},e.prototype._makeTemplate=function(e,t){var n,r,i,s,o;r=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,n=e;while(r.test(n))i=n.match(r)[1],s=(o=this._getObjectProperty(t,i))!=null?o:"",n=n.replace(r,""+s);return n},e.prototype._getObjectProperty=function(e,t){var n,r;t=t.replace(/\[(\w+)\]/g,".$1"),r=t.split(".");while(r.length){n=r.shift();if(!(e!=null&&n in e))return null;e=e[n]}return e},e.prototype._sortBy=function(e,t,n){var r;return r=function(e,r){var i,s;return i=this._getObjectProperty(e,t),s=this._getObjectProperty(r,t),n?i>s?1:-1:i<s?1:-1},e.sort(r.bind(this)),e},e.prototype._filter=function(e,t){var n,r,i,s,o;n=[],i=function(e){if(t(e))return n.push(e)};for(s=0,o=e.length;s<o;s++)r=e[s],i(r);return n},e}(),t=typeof exports!="undefined"&&exports!==null?exports:window,t.Instafeed=e}).call(this);

/*!
 * jQuery Mousewheel 3.1.12
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
            ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));

/*!
 * jScrollPane - v2.0.23 - 2016-01-28
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2014 Kelvin Luck
 * Dual licensed under the MIT or GPL licenses.
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.fn.jScrollPane=function(b){function c(b,c){function d(c){var f,h,j,k,l,o,p=!1,q=!1;if(N=c,void 0===O)l=b.scrollTop(),o=b.scrollLeft(),b.css({overflow:"hidden",padding:0}),P=b.innerWidth()+rb,Q=b.innerHeight(),b.width(P),O=a('<div class="jspPane" />').css("padding",qb).append(b.children()),R=a('<div class="jspContainer" />').css({width:P+"px",height:Q+"px"}).append(O).appendTo(b);else{if(b.css("width",""),p=N.stickToBottom&&A(),q=N.stickToRight&&B(),k=b.innerWidth()+rb!=P||b.outerHeight()!=Q,k&&(P=b.innerWidth()+rb,Q=b.innerHeight(),R.css({width:P+"px",height:Q+"px"})),!k&&sb==S&&O.outerHeight()==T)return void b.width(P);sb=S,O.css("width",""),b.width(P),R.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}O.css("overflow","auto"),S=c.contentWidth?c.contentWidth:O[0].scrollWidth,T=O[0].scrollHeight,O.css("overflow",""),U=S/P,V=T/Q,W=V>1,X=U>1,X||W?(b.addClass("jspScrollable"),f=N.maintainPosition&&($||bb),f&&(h=y(),j=z()),e(),g(),i(),f&&(w(q?S-P:h,!1),v(p?T-Q:j,!1)),F(),C(),L(),N.enableKeyboardNavigation&&H(),N.clickOnTrack&&m(),J(),N.hijackInternalLinks&&K()):(b.removeClass("jspScrollable"),O.css({top:0,left:0,width:R.width()-rb}),D(),G(),I(),n()),N.autoReinitialise&&!pb?pb=setInterval(function(){d(N)},N.autoReinitialiseDelay):!N.autoReinitialise&&pb&&clearInterval(pb),l&&b.scrollTop(0)&&v(l,!1),o&&b.scrollLeft(0)&&w(o,!1),b.trigger("jsp-initialised",[X||W])}function e(){W&&(R.append(a('<div class="jspVerticalBar" />').append(a('<div class="jspCap jspCapTop" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'),a('<div class="jspDragBottom" />'))),a('<div class="jspCap jspCapBottom" />'))),cb=R.find(">.jspVerticalBar"),db=cb.find(">.jspTrack"),Y=db.find(">.jspDrag"),N.showArrows&&(hb=a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",k(0,-1)).bind("click.jsp",E),ib=a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",k(0,1)).bind("click.jsp",E),N.arrowScrollOnHover&&(hb.bind("mouseover.jsp",k(0,-1,hb)),ib.bind("mouseover.jsp",k(0,1,ib))),j(db,N.verticalArrowPositions,hb,ib)),fb=Q,R.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){fb-=a(this).outerHeight()}),Y.hover(function(){Y.addClass("jspHover")},function(){Y.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",E),Y.addClass("jspActive");var c=b.pageY-Y.position().top;return a("html").bind("mousemove.jsp",function(a){p(a.pageY-c,!1)}).bind("mouseup.jsp mouseleave.jsp",o),!1}),f())}function f(){db.height(fb+"px"),$=0,eb=N.verticalGutter+db.outerWidth(),O.width(P-eb-rb);try{0===cb.position().left&&O.css("margin-left",eb+"px")}catch(a){}}function g(){X&&(R.append(a('<div class="jspHorizontalBar" />').append(a('<div class="jspCap jspCapLeft" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'),a('<div class="jspDragRight" />'))),a('<div class="jspCap jspCapRight" />'))),jb=R.find(">.jspHorizontalBar"),kb=jb.find(">.jspTrack"),_=kb.find(">.jspDrag"),N.showArrows&&(nb=a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",k(-1,0)).bind("click.jsp",E),ob=a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",k(1,0)).bind("click.jsp",E),N.arrowScrollOnHover&&(nb.bind("mouseover.jsp",k(-1,0,nb)),ob.bind("mouseover.jsp",k(1,0,ob))),j(kb,N.horizontalArrowPositions,nb,ob)),_.hover(function(){_.addClass("jspHover")},function(){_.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",E),_.addClass("jspActive");var c=b.pageX-_.position().left;return a("html").bind("mousemove.jsp",function(a){r(a.pageX-c,!1)}).bind("mouseup.jsp mouseleave.jsp",o),!1}),lb=R.innerWidth(),h())}function h(){R.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){lb-=a(this).outerWidth()}),kb.width(lb+"px"),bb=0}function i(){if(X&&W){var b=kb.outerHeight(),c=db.outerWidth();fb-=b,a(jb).find(">.jspCap:visible,>.jspArrow").each(function(){lb+=a(this).outerWidth()}),lb-=c,Q-=c,P-=b,kb.parent().append(a('<div class="jspCorner" />').css("width",b+"px")),f(),h()}X&&O.width(R.outerWidth()-rb+"px"),T=O.outerHeight(),V=T/Q,X&&(mb=Math.ceil(1/U*lb),mb>N.horizontalDragMaxWidth?mb=N.horizontalDragMaxWidth:mb<N.horizontalDragMinWidth&&(mb=N.horizontalDragMinWidth),_.width(mb+"px"),ab=lb-mb,s(bb)),W&&(gb=Math.ceil(1/V*fb),gb>N.verticalDragMaxHeight?gb=N.verticalDragMaxHeight:gb<N.verticalDragMinHeight&&(gb=N.verticalDragMinHeight),Y.height(gb+"px"),Z=fb-gb,q($))}function j(a,b,c,d){var e,f="before",g="after";"os"==b&&(b=/Mac/.test(navigator.platform)?"after":"split"),b==f?g=b:b==g&&(f=b,e=c,c=d,d=e),a[f](c)[g](d)}function k(a,b,c){return function(){return l(a,b,this,c),this.blur(),!1}}function l(b,c,d,e){d=a(d).addClass("jspActive");var f,g,h=!0,i=function(){0!==b&&tb.scrollByX(b*N.arrowButtonSpeed),0!==c&&tb.scrollByY(c*N.arrowButtonSpeed),g=setTimeout(i,h?N.initialDelay:N.arrowRepeatFreq),h=!1};i(),f=e?"mouseout.jsp":"mouseup.jsp",e=e||a("html"),e.bind(f,function(){d.removeClass("jspActive"),g&&clearTimeout(g),g=null,e.unbind(f)})}function m(){n(),W&&db.bind("mousedown.jsp",function(b){if(void 0===b.originalTarget||b.originalTarget==b.currentTarget){var c,d=a(this),e=d.offset(),f=b.pageY-e.top-$,g=!0,h=function(){var a=d.offset(),e=b.pageY-a.top-gb/2,j=Q*N.scrollPagePercent,k=Z*j/(T-Q);if(0>f)$-k>e?tb.scrollByY(-j):p(e);else{if(!(f>0))return void i();e>$+k?tb.scrollByY(j):p(e)}c=setTimeout(h,g?N.initialDelay:N.trackClickRepeatFreq),g=!1},i=function(){c&&clearTimeout(c),c=null,a(document).unbind("mouseup.jsp",i)};return h(),a(document).bind("mouseup.jsp",i),!1}}),X&&kb.bind("mousedown.jsp",function(b){if(void 0===b.originalTarget||b.originalTarget==b.currentTarget){var c,d=a(this),e=d.offset(),f=b.pageX-e.left-bb,g=!0,h=function(){var a=d.offset(),e=b.pageX-a.left-mb/2,j=P*N.scrollPagePercent,k=ab*j/(S-P);if(0>f)bb-k>e?tb.scrollByX(-j):r(e);else{if(!(f>0))return void i();e>bb+k?tb.scrollByX(j):r(e)}c=setTimeout(h,g?N.initialDelay:N.trackClickRepeatFreq),g=!1},i=function(){c&&clearTimeout(c),c=null,a(document).unbind("mouseup.jsp",i)};return h(),a(document).bind("mouseup.jsp",i),!1}})}function n(){kb&&kb.unbind("mousedown.jsp"),db&&db.unbind("mousedown.jsp")}function o(){a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"),Y&&Y.removeClass("jspActive"),_&&_.removeClass("jspActive")}function p(c,d){if(W){0>c?c=0:c>Z&&(c=Z);var e=new a.Event("jsp-will-scroll-y");if(b.trigger(e,[c]),!e.isDefaultPrevented()){var f=c||0,g=0===f,h=f==Z,i=c/Z,j=-i*(T-Q);void 0===d&&(d=N.animateScroll),d?tb.animate(Y,"top",c,q,function(){b.trigger("jsp-user-scroll-y",[-j,g,h])}):(Y.css("top",c),q(c),b.trigger("jsp-user-scroll-y",[-j,g,h]))}}}function q(a){void 0===a&&(a=Y.position().top),R.scrollTop(0),$=a||0;var c=0===$,d=$==Z,e=a/Z,f=-e*(T-Q);(ub!=c||wb!=d)&&(ub=c,wb=d,b.trigger("jsp-arrow-change",[ub,wb,vb,xb])),t(c,d),O.css("top",f),b.trigger("jsp-scroll-y",[-f,c,d]).trigger("scroll")}function r(c,d){if(X){0>c?c=0:c>ab&&(c=ab);var e=new a.Event("jsp-will-scroll-x");if(b.trigger(e,[c]),!e.isDefaultPrevented()){var f=c||0,g=0===f,h=f==ab,i=c/ab,j=-i*(S-P);void 0===d&&(d=N.animateScroll),d?tb.animate(_,"left",c,s,function(){b.trigger("jsp-user-scroll-x",[-j,g,h])}):(_.css("left",c),s(c),b.trigger("jsp-user-scroll-x",[-j,g,h]))}}}function s(a){void 0===a&&(a=_.position().left),R.scrollTop(0),bb=a||0;var c=0===bb,d=bb==ab,e=a/ab,f=-e*(S-P);(vb!=c||xb!=d)&&(vb=c,xb=d,b.trigger("jsp-arrow-change",[ub,wb,vb,xb])),u(c,d),O.css("left",f),b.trigger("jsp-scroll-x",[-f,c,d]).trigger("scroll")}function t(a,b){N.showArrows&&(hb[a?"addClass":"removeClass"]("jspDisabled"),ib[b?"addClass":"removeClass"]("jspDisabled"))}function u(a,b){N.showArrows&&(nb[a?"addClass":"removeClass"]("jspDisabled"),ob[b?"addClass":"removeClass"]("jspDisabled"))}function v(a,b){var c=a/(T-Q);p(c*Z,b)}function w(a,b){var c=a/(S-P);r(c*ab,b)}function x(b,c,d){var e,f,g,h,i,j,k,l,m,n=0,o=0;try{e=a(b)}catch(p){return}for(f=e.outerHeight(),g=e.outerWidth(),R.scrollTop(0),R.scrollLeft(0);!e.is(".jspPane");)if(n+=e.position().top,o+=e.position().left,e=e.offsetParent(),/^body|html$/i.test(e[0].nodeName))return;h=z(),j=h+Q,h>n||c?l=n-N.horizontalGutter:n+f>j&&(l=n-Q+f+N.horizontalGutter),isNaN(l)||v(l,d),i=y(),k=i+P,i>o||c?m=o-N.horizontalGutter:o+g>k&&(m=o-P+g+N.horizontalGutter),isNaN(m)||w(m,d)}function y(){return-O.position().left}function z(){return-O.position().top}function A(){var a=T-Q;return a>20&&a-z()<10}function B(){var a=S-P;return a>20&&a-y()<10}function C(){R.unbind(zb).bind(zb,function(a,b,c,d){bb||(bb=0),$||($=0);var e=bb,f=$,g=a.deltaFactor||N.mouseWheelSpeed;return tb.scrollBy(c*g,-d*g,!1),e==bb&&f==$})}function D(){R.unbind(zb)}function E(){return!1}function F(){O.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(a){x(a.target,!1)})}function G(){O.find(":input,a").unbind("focus.jsp")}function H(){function c(){var a=bb,b=$;switch(d){case 40:tb.scrollByY(N.keyboardSpeed,!1);break;case 38:tb.scrollByY(-N.keyboardSpeed,!1);break;case 34:case 32:tb.scrollByY(Q*N.scrollPagePercent,!1);break;case 33:tb.scrollByY(-Q*N.scrollPagePercent,!1);break;case 39:tb.scrollByX(N.keyboardSpeed,!1);break;case 37:tb.scrollByX(-N.keyboardSpeed,!1)}return e=a!=bb||b!=$}var d,e,f=[];X&&f.push(jb[0]),W&&f.push(cb[0]),O.bind("focus.jsp",function(){b.focus()}),b.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(b){if(b.target===this||f.length&&a(b.target).closest(f).length){var g=bb,h=$;switch(b.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:d=b.keyCode,c();break;case 35:v(T-Q),d=null;break;case 36:v(0),d=null}return e=b.keyCode==d&&g!=bb||h!=$,!e}}).bind("keypress.jsp",function(b){return b.keyCode==d&&c(),b.target===this||f.length&&a(b.target).closest(f).length?!e:void 0}),N.hideFocus?(b.css("outline","none"),"hideFocus"in R[0]&&b.attr("hideFocus",!0)):(b.css("outline",""),"hideFocus"in R[0]&&b.attr("hideFocus",!1))}function I(){b.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp"),O.unbind(".jsp")}function J(){if(location.hash&&location.hash.length>1){var b,c,d=escape(location.hash.substr(1));try{b=a("#"+d+', a[name="'+d+'"]')}catch(e){return}b.length&&O.find(d)&&(0===R.scrollTop()?c=setInterval(function(){R.scrollTop()>0&&(x(b,!0),a(document).scrollTop(R.position().top),clearInterval(c))},50):(x(b,!0),a(document).scrollTop(R.position().top)))}}function K(){a(document.body).data("jspHijack")||(a(document.body).data("jspHijack",!0),a(document.body).delegate('a[href*="#"]',"click",function(b){var c,d,e,f,g,h,i=this.href.substr(0,this.href.indexOf("#")),j=location.href;if(-1!==location.href.indexOf("#")&&(j=location.href.substr(0,location.href.indexOf("#"))),i===j){c=escape(this.href.substr(this.href.indexOf("#")+1));try{d=a("#"+c+', a[name="'+c+'"]')}catch(k){return}d.length&&(e=d.closest(".jspScrollable"),f=e.data("jsp"),f.scrollToElement(d,!0),e[0].scrollIntoView&&(g=a(window).scrollTop(),h=d.offset().top,(g>h||h>g+a(window).height())&&e[0].scrollIntoView()),b.preventDefault())}}))}function L(){var a,b,c,d,e,f=!1;R.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(g){var h=g.originalEvent.touches[0];a=y(),b=z(),c=h.pageX,d=h.pageY,e=!1,f=!0}).bind("touchmove.jsp",function(g){if(f){var h=g.originalEvent.touches[0],i=bb,j=$;return tb.scrollTo(a+c-h.pageX,b+d-h.pageY),e=e||Math.abs(c-h.pageX)>5||Math.abs(d-h.pageY)>5,i==bb&&j==$}}).bind("touchend.jsp",function(){f=!1}).bind("click.jsp-touchclick",function(){return e?(e=!1,!1):void 0})}function M(){var a=z(),c=y();b.removeClass("jspScrollable").unbind(".jsp"),O.unbind(".jsp"),b.replaceWith(yb.append(O.children())),yb.scrollTop(a),yb.scrollLeft(c),pb&&clearInterval(pb)}var N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb,qb,rb,sb,tb=this,ub=!0,vb=!0,wb=!1,xb=!1,yb=b.clone(!1,!1).empty(),zb=a.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";"border-box"===b.css("box-sizing")?(qb=0,rb=0):(qb=b.css("paddingTop")+" "+b.css("paddingRight")+" "+b.css("paddingBottom")+" "+b.css("paddingLeft"),rb=(parseInt(b.css("paddingLeft"),10)||0)+(parseInt(b.css("paddingRight"),10)||0)),a.extend(tb,{reinitialise:function(b){b=a.extend({},N,b),d(b)},scrollToElement:function(a,b,c){x(a,b,c)},scrollTo:function(a,b,c){w(a,c),v(b,c)},scrollToX:function(a,b){w(a,b)},scrollToY:function(a,b){v(a,b)},scrollToPercentX:function(a,b){w(a*(S-P),b)},scrollToPercentY:function(a,b){v(a*(T-Q),b)},scrollBy:function(a,b,c){tb.scrollByX(a,c),tb.scrollByY(b,c)},scrollByX:function(a,b){var c=y()+Math[0>a?"floor":"ceil"](a),d=c/(S-P);r(d*ab,b)},scrollByY:function(a,b){var c=z()+Math[0>a?"floor":"ceil"](a),d=c/(T-Q);p(d*Z,b)},positionDragX:function(a,b){r(a,b)},positionDragY:function(a,b){p(a,b)},animate:function(a,b,c,d,e){var f={};f[b]=c,a.animate(f,{duration:N.animateDuration,easing:N.animateEase,queue:!1,step:d,complete:e})},getContentPositionX:function(){return y()},getContentPositionY:function(){return z()},getContentWidth:function(){return S},getContentHeight:function(){return T},getPercentScrolledX:function(){return y()/(S-P)},getPercentScrolledY:function(){return z()/(T-Q)},getIsScrollableH:function(){return X},getIsScrollableV:function(){return W},getContentPane:function(){return O},scrollToBottom:function(a){p(Z,a)},hijackInternalLinks:a.noop,destroy:function(){M()}}),d(c)}return b=a.extend({},a.fn.jScrollPane.defaults,b),a.each(["arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){b[this]=b[this]||b.speed}),this.each(function(){var d=a(this),e=d.data("jsp");e?e.reinitialise(b):(a("script",d).filter('[type="text/javascript"],:not([type])').remove(),e=new c(d,b),d.data("jsp",e))})},a.fn.jScrollPane.defaults={showArrows:!1,maintainPosition:!0,stickToBottom:!1,stickToRight:!1,clickOnTrack:!0,autoReinitialise:!1,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:void 0,animateScroll:!1,animateDuration:300,animateEase:"linear",hijackInternalLinks:!1,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:3,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:!1,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:!0,hideFocus:!1,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:.8}});

/* Easy Pie Chart */
/*
 Easy pie chart is a jquery plugin to display simple animated pie charts for only one value

 Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.

 Built on top of the jQuery library (http://jquery.com)

 @source: http://github.com/rendro/easy-pie-chart/
 @autor: Robert Fleischmann
 @version: 1.2.3

 Inspired by: http://dribbble.com/shots/631074-Simple-Pie-Charts-II?list=popular&offset=210
 Thanks to Philip Thrasher for the jquery plugin boilerplate for coffee script
 */
(function($){jQuery.easyPieChart=function(el,options){var addScaleLine,animateLine,drawLine,easeInOutQuad,rAF,renderBackground,renderScale,renderTrack,_this=this;this.el=el;this.$el=jQuery(el);this.$el.data("easyPieChart",this);this.init=function(){var percent,scaleBy;_this.options=jQuery.extend({},jQuery.easyPieChart.defaultOptions,options);percent=parseInt(_this.$el.data('percent'),10);_this.percentage=0;_this.canvas=jQuery("<canvas width='"+_this.options.size+"' height='"+_this.options.size+"'></canvas>").get(0);_this.$el.append(_this.canvas);if(typeof G_vmlCanvasManager!=="undefined"&&G_vmlCanvasManager!==null){G_vmlCanvasManager.initElement(_this.canvas);}_this.ctx=_this.canvas.getContext('2d');if(window.devicePixelRatio>1){scaleBy=window.devicePixelRatio;jQuery(_this.canvas).css({width:_this.options.size,height:_this.options.size});_this.canvas.width*=scaleBy;_this.canvas.height*=scaleBy;_this.ctx.scale(scaleBy,scaleBy);}_this.ctx.translate(_this.options.size/2,_this.options.size/2);_this.ctx.rotate(_this.options.rotate*Math.PI/180);_this.$el.addClass('easyPieChart');_this.$el.css({width:_this.options.size,height:_this.options.size,lineHeight:""+_this.options.size+"px"});_this.update(percent);return _this;};this.update=function(percent){percent=parseFloat(percent)||0;if(_this.options.animate===false){drawLine(percent);}else{animateLine(_this.percentage,percent);}return _this;};renderScale=function(){var i,_i,_results;_this.ctx.fillStyle=_this.options.scaleColor;_this.ctx.lineWidth=1;_results=[];for(i=_i=0;_i<=24;i=++_i){_results.push(addScaleLine(i));}return _results;};addScaleLine=function(i){var offset;offset=i%6===0?0:_this.options.size*0.017;_this.ctx.save();_this.ctx.rotate(i*Math.PI/12);_this.ctx.fillRect(_this.options.size/2-offset,0,-_this.options.size*0.05+offset,1);_this.ctx.restore();};renderTrack=function(){var offset;offset=_this.options.size/2-_this.options.lineWidth/2;if(_this.options.scaleColor!==false){offset-=_this.options.size*0.08;}_this.ctx.beginPath();_this.ctx.arc(0,0,offset,0,Math.PI*2,true);_this.ctx.closePath();_this.ctx.strokeStyle=_this.options.trackColor;_this.ctx.lineWidth=_this.options.lineWidth;_this.ctx.stroke();};renderBackground=function(){if(_this.options.scaleColor!==false){renderScale();}if(_this.options.trackColor!==false){renderTrack();}};drawLine=function(percent){var offset;renderBackground();_this.ctx.strokeStyle=jQuery.isFunction(_this.options.barColor)?_this.options.barColor(percent):_this.options.barColor;_this.ctx.lineCap=_this.options.lineCap;_this.ctx.lineWidth=_this.options.lineWidth;offset=_this.options.size/2-_this.options.lineWidth/2;if(_this.options.scaleColor!==false){offset-=_this.options.size*0.08;}_this.ctx.save();_this.ctx.rotate(-Math.PI/2);_this.ctx.beginPath();_this.ctx.arc(0,0,offset,0,Math.PI*2*percent/100,false);_this.ctx.stroke();_this.ctx.restore();};rAF=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){return window.setTimeout(callback,1000/60);};})();animateLine=function(from,to){var anim,startTime;_this.options.onStart.call(_this);_this.percentage=to;Date.now||(Date.now=function(){return+(new Date);});startTime=Date.now();anim=function(){var currentValue,process;process=Date.now()-startTime;if(process<_this.options.animate){rAF(anim);}_this.ctx.clearRect(-_this.options.size/2,-_this.options.size/2,_this.options.size,_this.options.size);renderBackground.call(_this);currentValue=[easeInOutQuad(process,from,to-from,_this.options.animate)];_this.options.onStep.call(_this,currentValue);drawLine.call(_this,currentValue);if(process>=_this.options.animate){return _this.options.onStop.call(_this,currentValue,to);}};rAF(anim);};easeInOutQuad=function(t,b,c,d){var easeIn,easing;easeIn=function(t){return Math.pow(t,2);};easing=function(t){if(t<1){return easeIn(t);}else{return 2-easeIn((t/2)*-2+2);}};t/=d/2;return c/2*easing(t)+b;};return this.init();};jQuery.easyPieChart.defaultOptions={barColor:'#ef1e25',trackColor:'#f2f2f2',scaleColor:'#dfe0e0',lineCap:'round',rotate:0,size:110,lineWidth:3,animate:false,onStart:jQuery.noop,onStop:jQuery.noop,onStep:jQuery.noop};jQuery.fn.easyPieChart=function(options){return jQuery.each(this,function(i,el){var $el,instanceOptions;$el=jQuery(el);if(!$el.data('easyPieChart')){instanceOptions=jQuery.extend({},options,$el.data());return $el.data('easyPieChart',new jQuery.easyPieChart(el,instanceOptions));}});};return void 0;})(jQuery);

/*
 * jQuery FlexSlider v2.6.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */!function($){var e=!0;$.flexslider=function(t,a){var n=$(t);n.vars=$.extend({},$.flexslider.defaults,a);var i=n.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,r=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&n.vars.touch,o="click touchend MSPointerUp keyup",l="",c,d="vertical"===n.vars.direction,u=n.vars.reverse,v=n.vars.itemWidth>0,p="fade"===n.vars.animation,m=""!==n.vars.asNavFor,f={};$.data(t,"flexslider",n),f={init:function(){n.animating=!1,n.currentSlide=parseInt(n.vars.startAt?n.vars.startAt:0,10),isNaN(n.currentSlide)&&(n.currentSlide=0),n.animatingTo=n.currentSlide,n.atEnd=0===n.currentSlide||n.currentSlide===n.last,n.containerSelector=n.vars.selector.substr(0,n.vars.selector.search(" ")),n.slides=$(n.vars.selector,n),n.container=$(n.containerSelector,n),n.count=n.slides.length,n.syncExists=$(n.vars.sync).length>0,"slide"===n.vars.animation&&(n.vars.animation="swing"),n.prop=d?"top":"marginLeft",n.args={},n.manualPause=!1,n.stopped=!1,n.started=!1,n.startTimeout=null,n.transitions=!n.vars.video&&!p&&n.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var a in t)if(void 0!==e.style[t[a]])return n.pfx=t[a].replace("Perspective","").toLowerCase(),n.prop="-"+n.pfx+"-transform",!0;return!1}(),n.ensureAnimationEnd="",""!==n.vars.controlsContainer&&(n.controlsContainer=$(n.vars.controlsContainer).length>0&&$(n.vars.controlsContainer)),""!==n.vars.manualControls&&(n.manualControls=$(n.vars.manualControls).length>0&&$(n.vars.manualControls)),""!==n.vars.customDirectionNav&&(n.customDirectionNav=2===$(n.vars.customDirectionNav).length&&$(n.vars.customDirectionNav)),n.vars.randomize&&(n.slides.sort(function(){return Math.round(Math.random())-.5}),n.container.empty().append(n.slides)),n.doMath(),n.setup("init"),n.vars.controlNav&&f.controlNav.setup(),n.vars.directionNav&&f.directionNav.setup(),n.vars.keyboard&&(1===$(n.containerSelector).length||n.vars.multipleKeyboard)&&$(document).bind("keyup",function(e){var t=e.keyCode;if(!n.animating&&(39===t||37===t)){var a=39===t?n.getTarget("next"):37===t?n.getTarget("prev"):!1;n.flexAnimate(a,n.vars.pauseOnAction)}}),n.vars.mousewheel&&n.bind("mousewheel",function(e,t,a,i){e.preventDefault();var s=0>t?n.getTarget("next"):n.getTarget("prev");n.flexAnimate(s,n.vars.pauseOnAction)}),n.vars.pausePlay&&f.pausePlay.setup(),n.vars.slideshow&&n.vars.pauseInvisible&&f.pauseInvisible.init(),n.vars.slideshow&&(n.vars.pauseOnHover&&n.hover(function(){n.manualPlay||n.manualPause||n.pause()},function(){n.manualPause||n.manualPlay||n.stopped||n.play()}),n.vars.pauseInvisible&&f.pauseInvisible.isHidden()||(n.vars.initDelay>0?n.startTimeout=setTimeout(n.play,n.vars.initDelay):n.play())),m&&f.asNav.setup(),r&&n.vars.touch&&f.touch(),(!p||p&&n.vars.smoothHeight)&&$(window).bind("resize orientationchange focus",f.resize),n.find("img").attr("draggable","false"),setTimeout(function(){n.vars.start(n)},200)},asNav:{setup:function(){n.asNav=!0,n.animatingTo=Math.floor(n.currentSlide/n.move),n.currentItem=n.currentSlide,n.slides.removeClass(i+"active-slide").eq(n.currentItem).addClass(i+"active-slide"),s?(t._slider=n,n.slides.each(function(){var e=this;e._gesture=new MSGesture,e._gesture.target=e,e.addEventListener("MSPointerDown",function(e){e.preventDefault(),e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1),e.addEventListener("MSGestureTap",function(e){e.preventDefault();var t=$(this),a=t.index();$(n.vars.asNavFor).data("flexslider").animating||t.hasClass("active")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})})):n.slides.on(o,function(e){e.preventDefault();var t=$(this),a=t.index(),s=t.offset().left-$(n).scrollLeft();0>=s&&t.hasClass(i+"active-slide")?n.flexAnimate(n.getTarget("prev"),!0):$(n.vars.asNavFor).data("flexslider").animating||t.hasClass(i+"active-slide")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){n.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var e="thumbnails"===n.vars.controlNav?"control-thumbs":"control-paging",t=1,a,s;if(n.controlNavScaffold=$('<ol class="'+i+"control-nav "+i+e+'"></ol>'),n.pagingCount>1)for(var r=0;r<n.pagingCount;r++){if(s=n.slides.eq(r),void 0===s.attr("data-thumb-alt")&&s.attr("data-thumb-alt",""),altText=""!==s.attr("data-thumb-alt")?altText=' alt="'+s.attr("data-thumb-alt")+'"':"",a="thumbnails"===n.vars.controlNav?'<img src="'+s.attr("data-thumb")+'"'+altText+"/>":'<a href="#">'+t+"</a>","thumbnails"===n.vars.controlNav&&!0===n.vars.thumbCaptions){var c=s.attr("data-thumbcaption");""!==c&&void 0!==c&&(a+='<span class="'+i+'caption">'+c+"</span>")}n.controlNavScaffold.append("<li>"+a+"</li>"),t++}n.controlsContainer?$(n.controlsContainer).append(n.controlNavScaffold):n.append(n.controlNavScaffold),f.controlNav.set(),f.controlNav.active(),n.controlNavScaffold.delegate("a, img",o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(n.direction=a>n.currentSlide?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},setupManual:function(){n.controlNav=n.manualControls,f.controlNav.active(),n.controlNav.bind(o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(a>n.currentSlide?n.direction="next":n.direction="prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},set:function(){var e="thumbnails"===n.vars.controlNav?"img":"a";n.controlNav=$("."+i+"control-nav li "+e,n.controlsContainer?n.controlsContainer:n)},active:function(){n.controlNav.removeClass(i+"active").eq(n.animatingTo).addClass(i+"active")},update:function(e,t){n.pagingCount>1&&"add"===e?n.controlNavScaffold.append($('<li><a href="#">'+n.count+"</a></li>")):1===n.pagingCount?n.controlNavScaffold.find("li").remove():n.controlNav.eq(t).closest("li").remove(),f.controlNav.set(),n.pagingCount>1&&n.pagingCount!==n.controlNav.length?n.update(t,e):f.controlNav.active()}},directionNav:{setup:function(){var e=$('<ul class="'+i+'direction-nav"><li class="'+i+'nav-prev"><a class="'+i+'prev" href="#">'+n.vars.prevText+'</a></li><li class="'+i+'nav-next"><a class="'+i+'next" href="#">'+n.vars.nextText+"</a></li></ul>");n.customDirectionNav?n.directionNav=n.customDirectionNav:n.controlsContainer?($(n.controlsContainer).append(e),n.directionNav=$("."+i+"direction-nav li a",n.controlsContainer)):(n.append(e),n.directionNav=$("."+i+"direction-nav li a",n)),f.directionNav.update(),n.directionNav.bind(o,function(e){e.preventDefault();var t;(""===l||l===e.type)&&(t=$(this).hasClass(i+"next")?n.getTarget("next"):n.getTarget("prev"),n.flexAnimate(t,n.vars.pauseOnAction)),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(){var e=i+"disabled";1===n.pagingCount?n.directionNav.addClass(e).attr("tabindex","-1"):n.vars.animationLoop?n.directionNav.removeClass(e).removeAttr("tabindex"):0===n.animatingTo?n.directionNav.removeClass(e).filter("."+i+"prev").addClass(e).attr("tabindex","-1"):n.animatingTo===n.last?n.directionNav.removeClass(e).filter("."+i+"next").addClass(e).attr("tabindex","-1"):n.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var e=$('<div class="'+i+'pauseplay"><a href="#"></a></div>');n.controlsContainer?(n.controlsContainer.append(e),n.pausePlay=$("."+i+"pauseplay a",n.controlsContainer)):(n.append(e),n.pausePlay=$("."+i+"pauseplay a",n)),f.pausePlay.update(n.vars.slideshow?i+"pause":i+"play"),n.pausePlay.bind(o,function(e){e.preventDefault(),(""===l||l===e.type)&&($(this).hasClass(i+"pause")?(n.manualPause=!0,n.manualPlay=!1,n.pause()):(n.manualPause=!1,n.manualPlay=!0,n.play())),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(e){"play"===e?n.pausePlay.removeClass(i+"pause").addClass(i+"play").html(n.vars.playText):n.pausePlay.removeClass(i+"play").addClass(i+"pause").html(n.vars.pauseText)}},touch:function(){function e(e){e.stopPropagation(),n.animating?e.preventDefault():(n.pause(),t._gesture.addPointer(e.pointerId),T=0,c=d?n.h:n.w,f=Number(new Date),l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c)}function a(e){e.stopPropagation();var a=e.target._slider;if(a){var n=-e.translationX,i=-e.translationY;return T+=d?i:n,m=T,x=d?Math.abs(T)<Math.abs(-n):Math.abs(T)<Math.abs(-i),e.detail===e.MSGESTURE_FLAG_INERTIA?void setImmediate(function(){t._gesture.stop()}):void((!x||Number(new Date)-f>500)&&(e.preventDefault(),!p&&a.transitions&&(a.vars.animationLoop||(m=T/(0===a.currentSlide&&0>T||a.currentSlide===a.last&&T>0?Math.abs(T)/c+2:1)),a.setProps(l+m,"setTouch"))))}}function i(e){e.stopPropagation();var t=e.target._slider;if(t){if(t.animatingTo===t.currentSlide&&!x&&null!==m){var a=u?-m:m,n=a>0?t.getTarget("next"):t.getTarget("prev");t.canAdvance(n)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?t.flexAnimate(n,t.vars.pauseOnAction):p||t.flexAnimate(t.currentSlide,t.vars.pauseOnAction,!0)}r=null,o=null,m=null,l=null,T=0}}var r,o,l,c,m,f,g,h,S,x=!1,y=0,b=0,T=0;s?(t.style.msTouchAction="none",t._gesture=new MSGesture,t._gesture.target=t,t.addEventListener("MSPointerDown",e,!1),t._slider=n,t.addEventListener("MSGestureChange",a,!1),t.addEventListener("MSGestureEnd",i,!1)):(g=function(e){n.animating?e.preventDefault():(window.navigator.msPointerEnabled||1===e.touches.length)&&(n.pause(),c=d?n.h:n.w,f=Number(new Date),y=e.touches[0].pageX,b=e.touches[0].pageY,l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c,r=d?b:y,o=d?y:b,t.addEventListener("touchmove",h,!1),t.addEventListener("touchend",S,!1))},h=function(e){y=e.touches[0].pageX,b=e.touches[0].pageY,m=d?r-b:r-y,x=d?Math.abs(m)<Math.abs(y-o):Math.abs(m)<Math.abs(b-o);var t=500;(!x||Number(new Date)-f>t)&&(e.preventDefault(),!p&&n.transitions&&(n.vars.animationLoop||(m/=0===n.currentSlide&&0>m||n.currentSlide===n.last&&m>0?Math.abs(m)/c+2:1),n.setProps(l+m,"setTouch")))},S=function(e){if(t.removeEventListener("touchmove",h,!1),n.animatingTo===n.currentSlide&&!x&&null!==m){var a=u?-m:m,i=a>0?n.getTarget("next"):n.getTarget("prev");n.canAdvance(i)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?n.flexAnimate(i,n.vars.pauseOnAction):p||n.flexAnimate(n.currentSlide,n.vars.pauseOnAction,!0)}t.removeEventListener("touchend",S,!1),r=null,o=null,m=null,l=null},t.addEventListener("touchstart",g,!1))},resize:function(){!n.animating&&n.is(":visible")&&(v||n.doMath(),p?f.smoothHeight():v?(n.slides.width(n.computedW),n.update(n.pagingCount),n.setProps()):d?(n.viewport.height(n.h),n.setProps(n.h,"setTotal")):(n.vars.smoothHeight&&f.smoothHeight(),n.newSlides.width(n.computedW),n.setProps(n.computedW,"setTotal")))},smoothHeight:function(e){if(!d||p){var t=p?n:n.viewport;e?t.animate({height:n.slides.eq(n.animatingTo).height()},e):t.height(n.slides.eq(n.animatingTo).height())}},sync:function(e){var t=$(n.vars.sync).data("flexslider"),a=n.animatingTo;switch(e){case"animate":t.flexAnimate(a,n.vars.pauseOnAction,!1,!0);break;case"play":t.playing||t.asNav||t.play();break;case"pause":t.pause()}},uniqueID:function(e){return e.filter("[id]").add(e.find("[id]")).each(function(){var e=$(this);e.attr("id",e.attr("id")+"_clone")}),e},pauseInvisible:{visProp:null,init:function(){var e=f.pauseInvisible.getHiddenProp();if(e){var t=e.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(t,function(){f.pauseInvisible.isHidden()?n.startTimeout?clearTimeout(n.startTimeout):n.pause():n.started?n.play():n.vars.initDelay>0?setTimeout(n.play,n.vars.initDelay):n.play()})}},isHidden:function(){var e=f.pauseInvisible.getHiddenProp();return e?document[e]:!1},getHiddenProp:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}},setToClearWatchedEvent:function(){clearTimeout(c),c=setTimeout(function(){l=""},3e3)}},n.flexAnimate=function(e,t,a,s,o){if(n.vars.animationLoop||e===n.currentSlide||(n.direction=e>n.currentSlide?"next":"prev"),m&&1===n.pagingCount&&(n.direction=n.currentItem<e?"next":"prev"),!n.animating&&(n.canAdvance(e,o)||a)&&n.is(":visible")){if(m&&s){var l=$(n.vars.asNavFor).data("flexslider");if(n.atEnd=0===e||e===n.count-1,l.flexAnimate(e,!0,!1,!0,o),n.direction=n.currentItem<e?"next":"prev",l.direction=n.direction,Math.ceil((e+1)/n.visible)-1===n.currentSlide||0===e)return n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),!1;n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),e=Math.floor(e/n.visible)}if(n.animating=!0,n.animatingTo=e,t&&n.pause(),n.vars.before(n),n.syncExists&&!o&&f.sync("animate"),n.vars.controlNav&&f.controlNav.active(),v||n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),n.atEnd=0===e||e===n.last,n.vars.directionNav&&f.directionNav.update(),e===n.last&&(n.vars.end(n),n.vars.animationLoop||n.pause()),p)r?(n.slides.eq(n.currentSlide).css({opacity:0,zIndex:1}),n.slides.eq(e).css({opacity:1,zIndex:2}),n.wrapup(c)):(n.slides.eq(n.currentSlide).css({zIndex:1}).animate({opacity:0},n.vars.animationSpeed,n.vars.easing),n.slides.eq(e).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing,n.wrapup));else{var c=d?n.slides.filter(":first").height():n.computedW,g,h,S;v?(g=n.vars.itemMargin,S=(n.itemW+g)*n.move*n.animatingTo,h=S>n.limit&&1!==n.visible?n.limit:S):h=0===n.currentSlide&&e===n.count-1&&n.vars.animationLoop&&"next"!==n.direction?u?(n.count+n.cloneOffset)*c:0:n.currentSlide===n.last&&0===e&&n.vars.animationLoop&&"prev"!==n.direction?u?0:(n.count+1)*c:u?(n.count-1-e+n.cloneOffset)*c:(e+n.cloneOffset)*c,n.setProps(h,"",n.vars.animationSpeed),n.transitions?(n.vars.animationLoop&&n.atEnd||(n.animating=!1,n.currentSlide=n.animatingTo),n.container.unbind("webkitTransitionEnd transitionend"),n.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(n.ensureAnimationEnd),n.wrapup(c)}),clearTimeout(n.ensureAnimationEnd),n.ensureAnimationEnd=setTimeout(function(){n.wrapup(c)},n.vars.animationSpeed+100)):n.container.animate(n.args,n.vars.animationSpeed,n.vars.easing,function(){n.wrapup(c)})}n.vars.smoothHeight&&f.smoothHeight(n.vars.animationSpeed)}},n.wrapup=function(e){p||v||(0===n.currentSlide&&n.animatingTo===n.last&&n.vars.animationLoop?n.setProps(e,"jumpEnd"):n.currentSlide===n.last&&0===n.animatingTo&&n.vars.animationLoop&&n.setProps(e,"jumpStart")),n.animating=!1,n.currentSlide=n.animatingTo,n.vars.after(n)},n.animateSlides=function(){!n.animating&&e&&n.flexAnimate(n.getTarget("next"))},n.pause=function(){clearInterval(n.animatedSlides),n.animatedSlides=null,n.playing=!1,n.vars.pausePlay&&f.pausePlay.update("play"),n.syncExists&&f.sync("pause")},n.play=function(){n.playing&&clearInterval(n.animatedSlides),n.animatedSlides=n.animatedSlides||setInterval(n.animateSlides,n.vars.slideshowSpeed),n.started=n.playing=!0,n.vars.pausePlay&&f.pausePlay.update("pause"),n.syncExists&&f.sync("play")},n.stop=function(){n.pause(),n.stopped=!0},n.canAdvance=function(e,t){var a=m?n.pagingCount-1:n.last;return t?!0:m&&n.currentItem===n.count-1&&0===e&&"prev"===n.direction?!0:m&&0===n.currentItem&&e===n.pagingCount-1&&"next"!==n.direction?!1:e!==n.currentSlide||m?n.vars.animationLoop?!0:n.atEnd&&0===n.currentSlide&&e===a&&"next"!==n.direction?!1:n.atEnd&&n.currentSlide===a&&0===e&&"next"===n.direction?!1:!0:!1},n.getTarget=function(e){return n.direction=e,"next"===e?n.currentSlide===n.last?0:n.currentSlide+1:0===n.currentSlide?n.last:n.currentSlide-1},n.setProps=function(e,t,a){var i=function(){var a=e?e:(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo,i=function(){if(v)return"setTouch"===t?e:u&&n.animatingTo===n.last?0:u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:n.animatingTo===n.last?n.limit:a;switch(t){case"setTotal":return u?(n.count-1-n.currentSlide+n.cloneOffset)*e:(n.currentSlide+n.cloneOffset)*e;case"setTouch":return u?e:e;case"jumpEnd":return u?e:n.count*e;case"jumpStart":return u?n.count*e:e;default:return e}}();return-1*i+"px"}();n.transitions&&(i=d?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)",a=void 0!==a?a/1e3+"s":"0s",n.container.css("-"+n.pfx+"-transition-duration",a),n.container.css("transition-duration",a)),n.args[n.prop]=i,(n.transitions||void 0===a)&&n.container.css(n.args),n.container.css("transform",i)},n.setup=function(e){if(p)n.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===e&&(r?n.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+n.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(n.currentSlide).css({opacity:1,zIndex:2}):0==n.vars.fadeFirstSlide?n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).css({opacity:1}):n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing)),n.vars.smoothHeight&&f.smoothHeight();else{var t,a;"init"===e&&(n.viewport=$('<div class="'+i+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(n).append(n.container),n.cloneCount=0,n.cloneOffset=0,u&&(a=$.makeArray(n.slides).reverse(),n.slides=$(a),n.container.empty().append(n.slides))),n.vars.animationLoop&&!v&&(n.cloneCount=2,n.cloneOffset=1,"init"!==e&&n.container.find(".clone").remove(),n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))),n.newSlides=$(n.vars.selector,n),t=u?n.count-1-n.currentSlide+n.cloneOffset:n.currentSlide+n.cloneOffset,d&&!v?(n.container.height(200*(n.count+n.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){n.newSlides.css({display:"block"}),n.doMath(),n.viewport.height(n.h),n.setProps(t*n.h,"init")},"init"===e?100:0)):(n.container.width(200*(n.count+n.cloneCount)+"%"),n.setProps(t*n.computedW,"init"),setTimeout(function(){n.doMath(),n.newSlides.css({width:n.computedW,marginRight:n.computedM,"float":"left",display:"block"}),n.vars.smoothHeight&&f.smoothHeight()},"init"===e?100:0))}v||n.slides.removeClass(i+"active-slide").eq(n.currentSlide).addClass(i+"active-slide"),n.vars.init(n)},n.doMath=function(){var e=n.slides.first(),t=n.vars.itemMargin,a=n.vars.minItems,i=n.vars.maxItems;n.w=void 0===n.viewport?n.width():n.viewport.width(),n.h=e.height(),n.boxPadding=e.outerWidth()-e.width(),v?(n.itemT=n.vars.itemWidth+t,n.itemM=t,n.minW=a?a*n.itemT:n.w,n.maxW=i?i*n.itemT-t:n.w,n.itemW=n.minW>n.w?(n.w-t*(a-1))/a:n.maxW<n.w?(n.w-t*(i-1))/i:n.vars.itemWidth>n.w?n.w:n.vars.itemWidth,n.visible=Math.floor(n.w/n.itemW),n.move=n.vars.move>0&&n.vars.move<n.visible?n.vars.move:n.visible,n.pagingCount=Math.ceil((n.count-n.visible)/n.move+1),n.last=n.pagingCount-1,n.limit=1===n.pagingCount?0:n.vars.itemWidth>n.w?n.itemW*(n.count-1)+t*(n.count-1):(n.itemW+t)*n.count-n.w-t):(n.itemW=n.w,n.itemM=t,n.pagingCount=n.count,n.last=n.count-1),n.computedW=n.itemW-n.boxPadding,n.computedM=n.itemM},n.update=function(e,t){n.doMath(),v||(e<n.currentSlide?n.currentSlide+=1:e<=n.currentSlide&&0!==e&&(n.currentSlide-=1),n.animatingTo=n.currentSlide),n.vars.controlNav&&!n.manualControls&&("add"===t&&!v||n.pagingCount>n.controlNav.length?f.controlNav.update("add"):("remove"===t&&!v||n.pagingCount<n.controlNav.length)&&(v&&n.currentSlide>n.last&&(n.currentSlide-=1,n.animatingTo-=1),f.controlNav.update("remove",n.last))),n.vars.directionNav&&f.directionNav.update()},n.addSlide=function(e,t){var a=$(e);n.count+=1,n.last=n.count-1,d&&u?void 0!==t?n.slides.eq(n.count-t).after(a):n.container.prepend(a):void 0!==t?n.slides.eq(t).before(a):n.container.append(a),n.update(t,"add"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.added(n)},n.removeSlide=function(e){var t=isNaN(e)?n.slides.index($(e)):e;n.count-=1,n.last=n.count-1,isNaN(e)?$(e,n.slides).remove():d&&u?n.slides.eq(n.last).remove():n.slides.eq(e).remove(),n.doMath(),n.update(t,"remove"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.removed(n)},f.init()},$(window).blur(function(t){e=!1}).focus(function(t){e=!0}),$.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,fadeFirstSlide:!0,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",customDirectionNav:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}},$.fn.flexslider=function(e){if(void 0===e&&(e={}),"object"==typeof e)return this.each(function(){var t=$(this),a=e.selector?e.selector:".slides > li",n=t.find(a);1===n.length&&e.allowOneSlide===!0||0===n.length?(n.fadeIn(400),e.start&&e.start(t)):void 0===t.data("flexslider")&&new $.flexslider(this,e)});var t=$(this).data("flexslider");switch(e){case"play":t.play();break;case"pause":t.pause();break;case"stop":t.stop();break;case"next":t.flexAnimate(t.getTarget("next"),!0);break;case"prev":case"previous":t.flexAnimate(t.getTarget("prev"),!0);break;default:"number"==typeof e&&t.flexAnimate(e,!0)}}}(jQuery);

/* Event Swipe */
// jquery.event.move
//
// 1.3.1
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:   Page coordinates of pointer.
// startX:
// startY:  Page coordinates of pointer at movestart.
// distX:
// distY:  Distance the pointer has moved since movestart.
// deltaX:
// deltaY:  Distance the finger has moved since last event.
// velocityX:
// velocityY:  Average velocity over last few events.


(function (module) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], module);
    } else {
        // Browser globals
        module(jQuery);
    }
})(function(jQuery, undefined){

    var // Number of pixels a pressed pointer travels before movestart
    // event is fired.
        threshold = 6,

        add = jQuery.event.add,

        remove = jQuery.event.remove,

    // Just sugar, so we can have arguments in the same order as
    // add and remove.
        trigger = function(node, type, data) {
            jQuery.event.trigger(type, data, node);
        },

    // Shim for requestAnimationFrame, falling back to timer. See:
    // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        requestFrame = (function(){
            return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(fn, element){
                return window.setTimeout(function(){
                    fn();
                }, 25);
            }
            );
        })(),

        ignoreTags = {
            textarea: true,
            input: true,
            select: true,
            button: true
        },

        mouseevents = {
            move: 'mousemove',
            cancel: 'mouseup dragstart',
            end: 'mouseup'
        },

        touchevents = {
            move: 'touchmove',
            cancel: 'touchend',
            end: 'touchend'
        };


    // Constructors

    function Timer(fn){
        var callback = fn,
            active = false,
            running = false;

        function trigger(time) {
            if (active){
                callback();
                requestFrame(trigger);
                running = true;
                active = false;
            }
            else {
                running = false;
            }
        }

        this.kick = function(fn) {
            active = true;
            if (!running) { trigger(); }
        };

        this.end = function(fn) {
            var cb = callback;

            if (!fn) { return; }

            // If the timer is not running, simply call the end callback.
            if (!running) {
                fn();
            }
            // If the timer is running, and has been kicked lately, then
            // queue up the current callback and the end callback, otherwise
            // just the end callback.
            else {
                callback = active ?
                    function(){ cb(); fn(); } :
                    fn ;

                active = true;
            }
        };
    }


    // Functions

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

    function preventDefault(e) {
        e.preventDefault();
    }

    function preventIgnoreTags(e) {
        // Don't prevent interaction with form elements.
        if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

        e.preventDefault();
    }

    function isLeftButton(e) {
        // Ignore mousedowns on any button other than the left (or primary)
        // mouse button, or when a modifier key is pressed.
        return (e.which === 1 && !e.ctrlKey && !e.altKey);
    }

    function identifiedTouch(touchList, id) {
        var i, l;

        if (touchList.identifiedTouch) {
            return touchList.identifiedTouch(id);
        }

        // touchList.identifiedTouch() does not exist in
        // webkit yet… we must do the search ourselves...

        i = -1;
        l = touchList.length;

        while (++i < l) {
            if (touchList[i].identifier === id) {
                return touchList[i];
            }
        }
    }

    function changedTouch(e, event) {
        var touch = identifiedTouch(e.changedTouches, event.identifier);

        // This isn't the touch you're looking for.
        if (!touch) { return; }

        // Chrome Android (at least) includes touches that have not
        // changed in e.changedTouches. That's a bit annoying. Check
        // that this touch has changed.
        if (touch.pageX === event.pageX && touch.pageY === event.pageY) { return; }

        return touch;
    }


    // Handlers that decide when the first movestart is triggered

    function mousedown(e){
        var data;

        if (!isLeftButton(e)) { return; }

        data = {
            target: e.target,
            startX: e.pageX,
            startY: e.pageY,
            timeStamp: e.timeStamp
        };

        add(document, mouseevents.move, mousemove, data);
        add(document, mouseevents.cancel, mouseend, data);
    }

    function mousemove(e){
        var data = e.data;

        checkThreshold(e, data, e, removeMouse);
    }

    function mouseend(e) {
        removeMouse();
    }

    function removeMouse() {
        remove(document, mouseevents.move, mousemove);
        remove(document, mouseevents.cancel, mouseend);
    }

    function touchstart(e) {
        var touch, template;

        // Don't get in the way of interaction with form elements.
        if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

        touch = e.changedTouches[0];

        // iOS live updates the touch objects whereas Android gives us copies.
        // That means we can't trust the touchstart object to stay the same,
        // so we must copy the data. This object acts as a template for
        // movestart, move and moveend event objects.
        template = {
            target: touch.target,
            startX: touch.pageX,
            startY: touch.pageY,
            timeStamp: e.timeStamp,
            identifier: touch.identifier
        };

        // Use the touch identifier as a namespace, so that we can later
        // remove handlers pertaining only to this touch.
        add(document, touchevents.move + '.' + touch.identifier, touchmove, template);
        add(document, touchevents.cancel + '.' + touch.identifier, touchend, template);
    }

    function touchmove(e){
        var data = e.data,
            touch = changedTouch(e, data);

        if (!touch) { return; }

        checkThreshold(e, data, touch, removeTouch);
    }

    function touchend(e) {
        var template = e.data,
            touch = identifiedTouch(e.changedTouches, template.identifier);

        if (!touch) { return; }

        removeTouch(template.identifier);
    }

    function removeTouch(identifier) {
        remove(document, '.' + identifier, touchmove);
        remove(document, '.' + identifier, touchend);
    }


    // Logic for deciding when to trigger a movestart.

    function checkThreshold(e, template, touch, fn) {
        var distX = touch.pageX - template.startX,
            distY = touch.pageY - template.startY;

        // Do nothing if the threshold has not been crossed.
        if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

        triggerStart(e, template, touch, distX, distY, fn);
    }

    function handled() {
        // this._handled should return false once, and after return true.
        this._handled = returnTrue;
        return false;
    }

    function flagAsHandled(e) {
        e._handled();
    }

    function triggerStart(e, template, touch, distX, distY, fn) {
        var node = template.target,
            touches, time;

        touches = e.targetTouches;
        time = e.timeStamp - template.timeStamp;

        // Create a movestart object with some special properties that
        // are passed only to the movestart handlers.
        template.type = 'movestart';
        template.distX = distX;
        template.distY = distY;
        template.deltaX = distX;
        template.deltaY = distY;
        template.pageX = touch.pageX;
        template.pageY = touch.pageY;
        template.velocityX = distX / time;
        template.velocityY = distY / time;
        template.targetTouches = touches;
        template.finger = touches ?
            touches.length :
            1 ;

        // The _handled method is fired to tell the default movestart
        // handler that one of the move events is bound.
        template._handled = handled;

        // Pass the touchmove event so it can be prevented if or when
        // movestart is handled.
        template._preventTouchmoveDefault = function() {
            e.preventDefault();
        };

        // Trigger the movestart event.
        trigger(template.target, template);

        // Unbind handlers that tracked the touch or mouse up till now.
        fn(template.identifier);
    }


    // Handlers that control what happens following a movestart

    function activeMousemove(e) {
        var event = e.data.event,
            timer = e.data.timer;

        updateEvent(event, e, e.timeStamp, timer);
    }

    function activeMouseend(e) {
        var event = e.data.event,
            timer = e.data.timer;

        removeActiveMouse();

        endEvent(event, timer, function() {
            // Unbind the click suppressor, waiting until after mouseup
            // has been handled.
            setTimeout(function(){
                remove(event.target, 'click', returnFalse);
            }, 0);
        });
    }

    function removeActiveMouse(event) {
        remove(document, mouseevents.move, activeMousemove);
        remove(document, mouseevents.end, activeMouseend);
    }

    function activeTouchmove(e) {
        var event = e.data.event,
            timer = e.data.timer,
            touch = changedTouch(e, event);

        if (!touch) { return; }

        // Stop the interface from gesturing
        e.preventDefault();

        event.targetTouches = e.targetTouches;
        updateEvent(event, touch, e.timeStamp, timer);
    }

    function activeTouchend(e) {
        var event = e.data.event,
            timer = e.data.timer,
            touch = identifiedTouch(e.changedTouches, event.identifier);

        // This isn't the touch you're looking for.
        if (!touch) { return; }

        removeActiveTouch(event);
        endEvent(event, timer);
    }

    function removeActiveTouch(event) {
        remove(document, '.' + event.identifier, activeTouchmove);
        remove(document, '.' + event.identifier, activeTouchend);
    }


    // Logic for triggering move and moveend events

    function updateEvent(event, touch, timeStamp, timer) {
        var time = timeStamp - event.timeStamp;

        event.type = 'move';
        event.distX =  touch.pageX - event.startX;
        event.distY =  touch.pageY - event.startY;
        event.deltaX = touch.pageX - event.pageX;
        event.deltaY = touch.pageY - event.pageY;

        // Average the velocity of the last few events using a decay
        // curve to even out spurious jumps in values.
        event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
        event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
        event.pageX =  touch.pageX;
        event.pageY =  touch.pageY;

        timer.kick();
    }

    function endEvent(event, timer, fn) {
        timer.end(function(){
            event.type = 'moveend';

            trigger(event.target, event);

            return fn && fn();
        });
    }


    // jQuery special event definition

    function setup(data, namespaces, eventHandle) {
        // Stop the node from being dragged
        //add(this, 'dragstart.move drag.move', preventDefault);

        // Prevent text selection and touch interface scrolling
        //add(this, 'mousedown.move', preventIgnoreTags);

        // Tell movestart default handler that we've handled this
        add(this, 'movestart.move', flagAsHandled);

        // Don't bind to the DOM. For speed.
        return true;
    }

    function teardown(namespaces) {
        remove(this, 'dragstart drag', preventDefault);
        remove(this, 'mousedown touchstart', preventIgnoreTags);
        remove(this, 'movestart', flagAsHandled);

        // Don't bind to the DOM. For speed.
        return true;
    }

    function addMethod(handleObj) {
        // We're not interested in preventing defaults for handlers that
        // come from internal move or moveend bindings
        if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
            return;
        }

        // Stop the node from being dragged
        add(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid, preventDefault, undefined, handleObj.selector);

        // Prevent text selection and touch interface scrolling
        add(this, 'mousedown.' + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector);
    }

    function removeMethod(handleObj) {
        if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
            return;
        }

        remove(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid);
        remove(this, 'mousedown.' + handleObj.guid);
    }

    jQuery.event.special.movestart = {
        setup: setup,
        teardown: teardown,
        add: addMethod,
        remove: removeMethod,

        _default: function(e) {
            var template, data;

            // If no move events were bound to any ancestors of this
            // target, high tail it out of here.
            if (!e._handled()) { return; }

            template = {
                target: e.target,
                startX: e.startX,
                startY: e.startY,
                pageX: e.pageX,
                pageY: e.pageY,
                distX: e.distX,
                distY: e.distY,
                deltaX: e.deltaX,
                deltaY: e.deltaY,
                velocityX: e.velocityX,
                velocityY: e.velocityY,
                timeStamp: e.timeStamp,
                identifier: e.identifier,
                targetTouches: e.targetTouches,
                finger: e.finger
            };

            data = {
                event: template,
                timer: new Timer(function(time){
                    trigger(e.target, template);
                })
            };

            if (e.identifier === undefined) {
                // We're dealing with a mouse
                // Stop clicks from propagating during a move
                add(e.target, 'click', returnFalse);
                add(document, mouseevents.move, activeMousemove, data);
                add(document, mouseevents.end, activeMouseend, data);
            }
            else {
                // We're dealing with a touch. Stop touchmove doing
                // anything defaulty.
                e._preventTouchmoveDefault();
                add(document, touchevents.move + '.' + e.identifier, activeTouchmove, data);
                add(document, touchevents.end + '.' + e.identifier, activeTouchend, data);
            }
        }
    };

    jQuery.event.special.move = {
        setup: function() {
            // Bind a noop to movestart. Why? It's the movestart
            // setup that decides whether other move events are fired.
            add(this, 'movestart.move', jQuery.noop);
        },

        teardown: function() {
            remove(this, 'movestart.move', jQuery.noop);
        }
    };

    jQuery.event.special.moveend = {
        setup: function() {
            // Bind a noop to movestart. Why? It's the movestart
            // setup that decides whether other move events are fired.
            add(this, 'movestart.moveend', jQuery.noop);
        },

        teardown: function() {
            remove(this, 'movestart.moveend', jQuery.noop);
        }
    };

    add(document, 'mousedown.move', mousedown);
    add(document, 'touchstart.move', touchstart);

    // Make jQuery copy touch event properties over to the jQuery event
    // object, if they are not already listed. But only do the ones we
    // really need. IE7/8 do not have Array#indexOf(), but nor do they
    // have touch events, so let's assume we can ignore them.
    if (typeof Array.prototype.indexOf === 'function') {
        (function(jQuery, undefined){
            var props = ["changedTouches", "targetTouches"],
                l = props.length;

            while (l--) {
                if (jQuery.event.props.indexOf(props[l]) === -1) {
                    jQuery.event.props.push(props[l]);
                }
            }
        })(jQuery);
    };
});

// jQuery.event.swipe
// 0.5
// Stephen Band

// Dependencies
// jQuery.event.move 1.2

// One of swipeleft, swiperight, swipeup or swipedown is triggered on
// moveend, when the move has covered a threshold ratio of the dimension
// of the target node, or has gone really fast. Threshold and velocity
// sensitivity changed with:
//
// jQuery.event.special.swipe.settings.threshold
// jQuery.event.special.swipe.settings.sensitivity

(function (module) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], module);
    } else {
        // Browser globals
        module(jQuery);
    }
})(function(jQuery, undefined){
    var add = jQuery.event.add,

        remove = jQuery.event.remove,

    // Just sugar, so we can have arguments in the same order as
    // add and remove.
        trigger = function(node, type, data) {
            jQuery.event.trigger(type, data, node);
        },

        settings = {
            // Ratio of distance over target finger must travel to be
            // considered a swipe.
            threshold: 0.4,
            // Faster fingers can travel shorter distances to be considered
            // swipes. 'sensitivity' controls how much. Bigger is shorter.
            sensitivity: 6
        };

    function moveend(e) {
        var w, h, event;

        w = e.currentTarget.offsetWidth;
        h = e.currentTarget.offsetHeight;

        // Copy over some useful properties from the move event
        event = {
            distX: e.distX,
            distY: e.distY,
            velocityX: e.velocityX,
            velocityY: e.velocityY,
            finger: e.finger
        };

        // Find out which of the four directions was swiped
        if (e.distX > e.distY) {
            if (e.distX > -e.distY) {
                if (e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
                    event.type = 'swiperight';
                    trigger(e.currentTarget, event);
                }
            }
            else {
                if (-e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
                    event.type = 'swipeup';
                    trigger(e.currentTarget, event);
                }
            }
        }
        else {
            if (e.distX > -e.distY) {
                if (e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
                    event.type = 'swipedown';
                    trigger(e.currentTarget, event);
                }
            }
            else {
                if (-e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
                    event.type = 'swipeleft';
                    trigger(e.currentTarget, event);
                }
            }
        }
    }

    function getData(node) {
        var data = jQuery.data(node, 'event_swipe');

        if (!data) {
            data = { count: 0 };
            jQuery.data(node, 'event_swipe', data);
        }

        return data;
    }

    jQuery.event.special.swipe =
        jQuery.event.special.swipeleft =
            jQuery.event.special.swiperight =
                jQuery.event.special.swipeup =
                    jQuery.event.special.swipedown = {
                        setup: function( data, namespaces, eventHandle ) {
                            var data = getData(this);

                            // If another swipe event is already setup, don't setup again.
                            if (data.count++ > 0) { return; }

                            add(this, 'moveend', moveend);

                            return true;
                        },

                        teardown: function() {
                            var data = getData(this);

                            // If another swipe event is still setup, don't teardown.
                            if (--data.count > 0) { return; }

                            remove(this, 'moveend', moveend);

                            return true;
                        },

                        settings: settings
                    };
});

/* Waterwheel Carousel */
/*!
 * Waterwheel Carousel
 * Version 2.3.0
 * http://www.bkosborne.com
 *
 * Copyright 2011-2013 Brian Osborne
 * Dual licensed under GPLv3 or MIT
 * Copies of the licenses have been distributed
 * with this plugin.
 *
 * Plugin written by Brian Osborne
 * for use with the jQuery JavaScript Framework
 * http://www.jquery.com
 */
;(function ($) {
    'use strict';

    $.fn.waterwheelCarousel = function (startingOptions) {

        // Adds support for intializing multiple carousels from the same selector group
        if (this.length > 1) {
            this.each(function() {
                $(this).waterwheelCarousel(startingOptions);
            });
            return this; // allow chaining
        }

        var carousel = this;
        var options = {};
        var data = {};

        function initializeCarouselData() {
            data = {
                itemsContainer:         $(carousel),
                totalItems:             $(carousel).find('.mg_block').length,
                containerWidth:         $(carousel).width(),
                containerHeight:        $(carousel).height(),
                currentCenterItem:      null,
                previousCenterItem:     null,
                items:                  [],
                calculations:           [],
                carouselRotationsLeft:  0,
                currentlyMoving:        false,
                itemsAnimating:         0,
                currentSpeed:           options.speed,
                intervalTimer:          null,
                currentDirection:       'forward',
                leftItemsCount:         0,
                rightItemsCount:        0,
                performingSetup:        true
            };
            data.itemsContainer.find('.mg_block').removeClass(options.activeClassName);
        }

        /**
         * This function will set the autoplay for the carousel to
         * automatically rotate it given the time in the options
         * Can clear the autoplay by passing in true
         */
        function autoPlay(stop) {
            // clear timer
            clearTimeout(data.autoPlayTimer);
            // as long as no stop command, and autoplay isn't zeroed...
            if (!stop && options.autoPlay !== 0) {
                // set timer...
                data.autoPlayTimer = setTimeout(function () {
                    // to move the carousl in either direction...
                    if (options.autoPlay > 0) {
                        moveOnce('forward');
                    } else {
                        moveOnce('backward');
                    }
                }, Math.abs(options.autoPlay));
            }
        }

        /**
         * This function will preload all the images in the carousel before
         * calling the passed in callback function. This is only used so we can
         * properly determine the width and height of the items. This is not needed
         * if a user instead manually specifies that information.
         */
        function preload(callback) {
            if (options.preloadImages === false) {
                callback();
                return;
            }

            var $imageElements = data.itemsContainer.find('img'), loadedImages = 0, totalImages = $imageElements.length;

            $imageElements.each(function () {
                $(this).bind('load', function () {
                    // Add to number of images loaded and see if they are all done yet
                    loadedImages += 1;
                    if (loadedImages === totalImages) {
                        // All done, perform callback
                        callback();
                        return;
                    }
                });
                // May need to manually reset the src to get the load event to fire
                // http://stackoverflow.com/questions/7137737/ie9-problems-with-jquery-load-event-not-firing
                $(this).attr('src', $(this).attr('src'));

                // If browser has cached the images, it may not call trigger a load. Detect this and do it ourselves
                if (this.complete) {
                    $(this).trigger('load');
                }
            });
        }

        /**
         * Makes a record of the original width and height of all the items in the carousel.
         * If we re-intialize the carousel, these values can be used to re-establish their
         * original dimensions.
         */
        function setOriginalItemDimensions() {
            data.itemsContainer.find('.mg_block').each(function () {
                if ($(this).find('img').data('original_width') == undefined || options.forcedImageWidth > 0) {
                    $(this).find('img').data('original_width', $(this).width());
                }
                if ($(this).find('img').data('original_height') == undefined || options.forcedImageHeight > 0) {
                    $(this).find('img').data('original_height', $(this).height());
                }
            });
        }

        /**
         * Users can pass in a specific width and height that should be applied to every image.
         * While this option can be used in conjunction with the image preloader, the intended
         * use case is for when the preloader is turned off and the images don't have defined
         * dimensions in CSS. The carousel needs dimensions one way or another to work properly.
         */
        function forceImageDimensionsIfEnabled() {
            if (options.forcedImageWidth && options.forcedImageHeight) {
                data.itemsContainer.find('.mg_block').each(function () {
                    $(this).find('img').width(options.forcedImageWidth);
                    $(this).find('img').height(options.forcedImageHeight);
                });
            }
        }

        /**
         * For each "visible" item slot (# of flanking items plus the middle),
         * we pre-calculate all of the properties that the item should possess while
         * occupying that slot. This saves us some time during the actual animation.
         */
        function preCalculatePositionProperties() {
            // The 0 index is the center item in the carousel
            var $firstItem = data.itemsContainer.find('img:first');

            data.calculations[0] = {
                distance: 0,
                offset:   0,
                opacity:  1
            }

            // Then, for each number of flanking items (plus one more, see below), we
            // perform the calcations based on our user options
            var horizonOffset = options.horizonOffset;
            var separation = options.separation;
            for (var i = 1; i <= options.flankingItems + 2; i++) {
                if (i > 1) {
                    horizonOffset *= options.horizonOffsetMultiplier;
                    separation *= options.separationMultiplier;
                }
                data.calculations[i] = {
                    distance: data.calculations[i-1].distance + separation,
                    offset:   data.calculations[i-1].offset + horizonOffset,
                    opacity:  1
                }
            }
            // We performed 1 extra set of calculations above so that the items that
            // are moving out of sight (based on # of flanking items) gracefully animate there
            // However, we need them to animate to hidden, so we set the opacity to 0 for
            // that last item
            if (options.edgeFadeEnabled) {
                data.calculations[options.flankingItems+1].opacity = 0;
            } else {
                data.calculations[options.flankingItems+1] = {
                    distance: 0,
                    offset: 0,
                    opacity: 1
                }
            }
        }

        /**
         * Here we prep the carousel and its items, like setting default CSS
         * attributes. All items start in the middle position by default
         * and will "fan out" from there during the first animation
         */
        function setupCarousel() {
            // Fill in a data array with jQuery objects of all the images
            data.items = data.itemsContainer.find('.mg_block');
            for (var i = 0; i < data.totalItems; i++) {
                data.items[i] = $(data.items[i]);
            }

            // May need to set the horizon if it was set to auto
            if (options.horizon === 0) {
                if (options.orientation === 'horizontal') {
                    options.horizon = data.containerHeight / 2;
                } else {
                    options.horizon = data.containerWidth / 2;
                }
            }

            // Default all the items to the center position
            data.itemsContainer
                .css('position','relative')
                .find('.mg_block')
                .each(function () {
                    // Figure out where the top and left positions for center should be
                    var centerPosLeft, centerPosTop;
                    if (options.orientation === 'horizontal') {
                        centerPosLeft = (data.containerWidth / 2) - ($(this).find('img').data('original_width') / 2);
                        centerPosTop = options.horizon - ($(this).find('img').data('original_height') / 2);
                    } else {
                        centerPosLeft = options.horizon - ($(this).find('img').data('original_width') / 2);
                        centerPosTop = (data.containerHeight / 2) - ($(this).find('img').data('original_height') / 2);
                    }
                    $(this)
                        // Apply positioning and layering to the images
                        .css({
                            'left': centerPosLeft,
                            'top': centerPosTop,
                            'visibility': 'visible',
                            'position': 'absolute',
                            'z-index': 0,
                            'opacity': 1
                        })
                        // Give each image a data object so it remembers specific data about
                        // it's original form
                        .data({
                            top:             centerPosTop,
                            left:            centerPosLeft,
                            oldPosition:     0,
                            currentPosition: 0,
                            depth:           0,
                            opacity:         1
                        })
                        .data({
                            top:             centerPosTop,
                            left:            centerPosLeft,
                            oldPosition:     0,
                            currentPosition: 0,
                            depth:           0,
                            opacity:         1
                        }).show();
                    // The image has been setup... Now we can show it

                    $(this).parents('.mg_block')
                        // Apply positioning and layering to the images
                        .css({
                            'left': centerPosLeft,
                            'top': centerPosTop,
                            'visibility': 'visible',
                            'position': 'absolute',
                            'z-index': 0,
                            'opacity': 1
                        }).show();
                });
        }

        /**
         * All the items to the left and right of the center item need to be
         * animated to their starting positions. This function will
         * figure out what items go where and will animate them there
         */
        function setupStarterRotation() {
            options.startingItem = (options.startingItem === 0) ? Math.round(data.totalItems / 2) : options.startingItem;

            data.rightItemsCount = Math.ceil((data.totalItems-1) / 2);
            data.leftItemsCount = Math.floor((data.totalItems-1) / 2);

            // We are in effect rotating the carousel, so we need to set that
            data.carouselRotationsLeft = 1;

            // Center item
            moveItem(data.items[options.startingItem-1], 0);
            data.items[options.startingItem-1].css('opacity', 1);

            // All the items to the right of center
            var itemIndex = options.startingItem - 1;
            for (var pos = 1; pos <= data.rightItemsCount; pos++) {
                (itemIndex < data.totalItems - 1) ? itemIndex += 1 : itemIndex = 0;

                data.items[itemIndex].css('opacity', 1);
                moveItem(data.items[itemIndex], pos);
            }

            // All items to left of center
            var itemIndex = options.startingItem - 1;
            for (var pos = -1; pos >= data.leftItemsCount*-1; pos--) {
                (itemIndex > 0) ? itemIndex -= 1 : itemIndex = data.totalItems - 1;

                data.items[itemIndex].css('opacity', 1);
                moveItem(data.items[itemIndex], pos);
            }
        }

        /**
         * Given the item and position, this function will calculate the new data
         * for the item. One the calculations are done, it will store that data in
         * the items data object
         */
        function performCalculations($item, newPosition) {
            var newDistanceFromCenter = Math.abs(newPosition);

            // Distance to the center
            if (newDistanceFromCenter < options.flankingItems + 1) {
                var calculations = data.calculations[newDistanceFromCenter];
            } else {
                var calculations = data.calculations[options.flankingItems + 1];
            }

            var distanceFactor = Math.pow(options.sizeMultiplier, newDistanceFromCenter)
            var newWidth = distanceFactor * $item.find('img').data('original_width');
            var newHeight = distanceFactor * $item.find('img').data('original_height');
            var widthDifference = Math.abs($item.find('img').width() - newWidth);
            var heightDifference = Math.abs($item.find('img').height() - newHeight);

            var newOffset = calculations.offset
            var newDistance = calculations.distance;
            if (newPosition < 0) {
                newDistance *= -1;
            }

            if (options.orientation == 'horizontal') {
                var center = data.containerWidth / 2;
                var newLeft = center + newDistance - (newWidth / 2);
                var newTop = options.horizon - newOffset - (newHeight / 2);
            } else {
                var center = data.containerHeight / 2;
                var newLeft = options.horizon - newOffset - (newWidth / 2);
                var newTop = center + newDistance - (newHeight / 2);
            }

            var newOpacity;
            if (newPosition === 0) {
                newOpacity = 1;
            } else {
                newOpacity = 1;
            }

            // Depth will be reverse distance from center
            var newDepth = options.flankingItems + 2 - newDistanceFromCenter;

            $item.data('width',newWidth);
            $item.data('height',newHeight);
            $item.data('top',newTop);
            $item.data('left',newLeft);
            $item.data('oldPosition',$item.data('currentPosition'));
            $item.data('depth',newDepth);
            $item.data('opacity',1);
        }

        function moveItem($item, newPosition) {
            // Only want to physically move the item if it is within the boundaries
            // or in the first position just outside either boundary
            if (Math.abs(newPosition) <= options.flankingItems + 1) {
                performCalculations($item, newPosition);

                data.itemsAnimating++;

                $item
                    .css('z-index',$item.data().depth)
                    // Animate the items to their new position values
                    .animate({
                        left:    $item.data().left,
                        width:   $item.data().width,
                        height:  $item.data().height,
                        top:     $item.data().top,
                        opacity: 1
                    }, data.currentSpeed, options.animationEasing, function () {
                        // Animation for the item has completed, call method
                        itemAnimationComplete($item, newPosition);
                    });

            } else {
                $item.data('currentPosition', newPosition)
                // Move the item to the 'hidden' position if hasn't been moved yet
                // This is for the intitial setup
                if ($item.data('oldPosition') === 0) {
                    $item.css({
                        'left':    $item.data().left,
                        'width':   $item.data().width,
                        'height':  $item.data().height,
                        'top':     $item.data().top,
                        'opacity': 1,
                        'z-index': $item.data().depth
                    });
                }
            }

        }

        /**
         * This function is called once an item has finished animating to its
         * given position. Several different statements are executed here, such as
         * dealing with the animation queue
         */
        function itemAnimationComplete($item, newPosition) {
            data.itemsAnimating--;

            $item.data('currentPosition', newPosition);

            // Keep track of what items came and left the center position,
            // so we can fire callbacks when all the rotations are completed
            if (newPosition === 0) {
                data.currentCenterItem = $item;
            }

            // all items have finished their rotation, lets clean up
            if (data.itemsAnimating === 0) {
                data.carouselRotationsLeft -= 1;
                data.currentlyMoving = false;

                // If there are still rotations left in the queue, rotate the carousel again
                // we pass in zero because we don't want to add any additional rotations
                if (data.carouselRotationsLeft > 0) {
                    rotateCarousel(0);
                    // Otherwise there are no more rotations and...
                } else {
                    // Reset the speed of the carousel to original
                    data.currentSpeed = options.speed;

                    data.currentCenterItem.addClass(options.activeClassName);

                    if (data.performingSetup === false) {
                        options.movedToCenter(data.currentCenterItem);
                        options.movedFromCenter(data.previousCenterItem);
                    }

                    data.performingSetup = false;
                    // reset & initate the autoPlay
                    autoPlay();
                }
            }
        }

        /**
         * Function called to rotate the carousel the given number of rotations
         * in the given direciton. Will check to make sure the carousel should
         * be able to move, and then adjust speed and move items
         */
        function rotateCarousel(rotations) {
            // Check to see that a rotation is allowed
            if (data.currentlyMoving === false) {

                // Remove active class from the center item while we rotate
                data.currentCenterItem.removeClass(options.activeClassName);

                data.currentlyMoving = true;
                data.itemsAnimating = 0;
                data.carouselRotationsLeft += rotations;

                if (options.quickerForFurther === true) {
                    // Figure out how fast the carousel should rotate
                    if (rotations > 1) {
                        data.currentSpeed = options.speed / rotations;
                    }
                    // Assure the speed is above the minimum to avoid weird results
                    data.currentSpeed = (data.currentSpeed < 100) ? 100 : data.currentSpeed;
                }

                // Iterate thru each item and move it
                for (var i = 0; i < data.totalItems; i++) {
                    var $item = $(data.items[i]);
                    var currentPosition = $item.data('currentPosition');

                    var newPosition;
                    if (data.currentDirection == 'forward') {
                        newPosition = currentPosition - 1;
                    } else {
                        newPosition = currentPosition + 1;
                    }
                    // We keep both sides as even as possible to allow circular rotation to work.
                    // We will "wrap" the item arround to the other side by negating its current position
                    var flankingAllowance = (newPosition > 0) ? data.rightItemsCount : data.leftItemsCount;
                    if (Math.abs(newPosition) > flankingAllowance) {
                        newPosition = currentPosition * -1;
                        // If there's an uneven number of "flanking" items, we need to compenstate for that
                        // when we have an item switch sides. The right side will always have 1 more in that case
                        if (data.totalItems % 2 == 0) {
                            newPosition += 1;
                        }
                    }

                    moveItem($item, newPosition);
                }
            }
        }

        /**
         * The event handler when an image within the carousel is clicked
         * This function will rotate the carousel the correct number of rotations
         * to get the clicked item to the center, or will fire the custom event
         * the user passed in if the center item is clicked
         */
        $(this).find('.mg_block').bind("click", function () {
            var itemPosition = $(this).data().currentPosition;

            if (options.imageNav == false) {
                return;
            }
            // Don't allow hidden items to be clicked
            if (Math.abs(itemPosition) >= options.flankingItems + 1) {
                return;
            }
            // Do nothing if the carousel is already moving
            if (data.currentlyMoving) {
                return;
            }

            data.previousCenterItem = data.currentCenterItem;

            // Remove autoplay
            autoPlay(true);
            options.autoPlay = 0;

            var rotations = Math.abs(itemPosition);
            if (itemPosition == 0) {
                options.clickedCenter($(this));
            } else {
                // Fire the 'moving' callbacks
                options.movingFromCenter(data.currentCenterItem);
                options.movingToCenter($(this));
                if (itemPosition < 0) {
                    data.currentDirection = 'backward';
                    rotateCarousel(rotations);
                } else if (itemPosition > 0) {
                    data.currentDirection = 'forward';
                    rotateCarousel(rotations);
                }
            }
        });


        /**
         * The user may choose to wrap the images is link tags. If they do this, we need to
         * make sure that they aren't active for certain situations
         */
        $(this).find('.mg_block').bind("click", function (event) {
            var isCenter = $(this).find('.mg_block').data('currentPosition') == 0;
            // should we disable the links?
            if (options.linkHandling === 1 || // turn off all links
                (options.linkHandling === 2 && !isCenter)) // turn off all links except center
            {
                event.preventDefault();
                return false;
            }
        });

        function nextItemFromCenter() {
            var $next = data.currentCenterItem.next();
            if ($next.length <= 0) {
                $next = data.currentCenterItem.parent().children().first();
            }
            return $next;
        }

        function prevItemFromCenter() {
            var $prev = data.currentCenterItem.prev();
            if ($prev.length <= 0) {
                $prev = data.currentCenterItem.parent().children().last();
            }
            return $prev;
        }

        /**
         * Intiate a move of the carousel in either direction. Takes care of firing
         * the 'moving' callbacks
         */
        function moveOnce(direction) {
            if (data.currentlyMoving === false) {
                data.previousCenterItem = data.currentCenterItem;

                options.movingFromCenter(data.currentCenterItem);
                if (direction == 'backward') {
                    options.movingToCenter(prevItemFromCenter());
                    data.currentDirection = 'backward';
                } else if (direction == 'forward') {
                    options.movingToCenter(nextItemFromCenter());
                    data.currentDirection = 'forward';
                }
            }

            rotateCarousel(1);
        }

        /**
         * Navigation with arrow keys
         */
        $(document).keydown(function(e) {
            if (options.keyboardNav) {
                // arrow left or up
                if ((e.which === 37 && options.orientation == 'horizontal') || (e.which === 38 && options.orientation == 'vertical')) {
                    autoPlay(true);
                    options.autoPlay = 0;
                    moveOnce('backward');
                    // arrow right or down
                } else if ((e.which === 39 && options.orientation == 'horizontal') || (e.which === 40 && options.orientation == 'vertical')) {
                    autoPlay(true);
                    options.autoPlay = 0;
                    moveOnce('forward');
                }
                // should we override the normal functionality for the arrow keys?
                if (options.keyboardNavOverride && (
                    (options.orientation == 'horizontal' && (e.which === 37 || e.which === 39)) ||
                    (options.orientation == 'vertical' && (e.which === 38 || e.which === 40))
                    )) {
                    e.preventDefault();
                    return false;
                }
            }
        });

        /**
         * Public API methods
         */
        this.reload = function (newOptions) {
            if (typeof newOptions === "object") {
                var combineDefaultWith = newOptions;
            } else {
                var combineDefaultWith = {};
            }
            options = $.extend({}, $.fn.waterwheelCarousel.defaults, newOptions);

            initializeCarouselData();
            data.itemsContainer.find('.mg_block').hide();
            forceImageDimensionsIfEnabled();

            preload(function () {
                setOriginalItemDimensions();
                preCalculatePositionProperties();
                setupCarousel();
                setupStarterRotation();
            });
        }

        this.next = function() {
            autoPlay(true);
            options.autoPlay = 0;

            moveOnce('forward');
        }
        this.prev = function () {
            autoPlay(true);
            options.autoPlay = 0;

            moveOnce('backward');
        }

        this.reload(startingOptions);

        return this;
    };

    $.fn.waterwheelCarousel.defaults = {
        // number tweeks to change apperance
        startingItem:               1,   // item to place in the center of the carousel. Set to 0 for auto
        separation:                 175, // distance between items in carousel
        separationMultiplier:       0.6, // multipled by separation distance to increase/decrease distance for each additional item
        horizonOffset:              0,   // offset each item from the "horizon" by this amount (causes arching)
        horizonOffsetMultiplier:    1,   // multipled by horizon offset to increase/decrease offset for each additional item
        sizeMultiplier:             0.7, // determines how drastically the size of each item changes
        opacityMultiplier:          0.8, // determines how drastically the opacity of each item changes
        horizon:                    0,   // how "far in" the horizontal/vertical horizon should be set from the container wall. 0 for auto
        flankingItems:              3,   // the number of items visible on either side of the center

        // animation
        speed:                      300,      // speed in milliseconds it will take to rotate from one to the next
        animationEasing:            'linear', // the easing effect to use when animating
        quickerForFurther:          true,     // set to true to make animations faster when clicking an item that is far away from the center
        edgeFadeEnabled:            false,    // when true, items fade off into nothingness when reaching the edge. false to have them move behind the center image

        // misc
        linkHandling:               2,                 // 1 to disable all (used for facebox), 2 to disable all but center (to link images out)
        autoPlay:                   0,                 // indicate the speed in milliseconds to wait before autorotating. 0 to turn off. Can be negative
        orientation:                'horizontal',      // indicate if the carousel should be 'horizontal' or 'vertical'
        activeClassName:            'carousel-center', // the name of the class given to the current item in the center
        keyboardNav:                false,             // set to true to move the carousel with the arrow keys
        keyboardNavOverride:        true,              // set to true to override the normal functionality of the arrow keys (prevents scrolling)
        imageNav:                   true,              // clicking a non-center image will rotate that image to the center

        // preloader
        preloadImages:              true,  // disable/enable the image preloader.
        forcedImageWidth:           0,     // specify width of all images; otherwise the carousel tries to calculate it
        forcedImageHeight:          0,     // specify height of all images; otherwise the carousel tries to calculate it

        // callback functions
        movingToCenter:             $.noop, // fired when an item is about to move to the center position
        movedToCenter:              $.noop, // fired when an item has finished moving to the center
        clickedCenter:              $.noop, // fired when the center item has been clicked
        movingFromCenter:           $.noop, // fired when an item is about to leave the center position
        movedFromCenter:            $.noop  // fired when an item has finished moving from the center
    };

})(jQuery);