Class(Chato.UI, 'Widget').includes(CustomEventSupport, NodeSupport)({
    elementClass: 'chato-widget',
    html: '<div></div>',

    prerenderUrl: function (url, cssClass) {
        if (url) {
            var tag = $('<link rel="prerender">');
            if (cssClass && $('.' + cssClass).length) {
                tag = $('.' + cssClass);
                tag.remove();
            }
            tag.attr('href', url);
            if (cssClass) {
                tag.addClass(cssClass);
            }
            $('head').append(tag);
        }
    },

    prototype: {
        elementId: null,
        cssClass: null,

        init: function (attributes) {
            $.extend(this, attributes);
            if (!this.element) {
                this.element = $(this.constructor.html);
                this.element.addClass(this.constructor.elementClass);
                if (this.elementId) {
                    this.element.attr('id', this.elementId);
                }
                if (this.cssClass) {
                    this.element.addClass(this.cssClass);
                }
            }
        },

        hide: function (args) {
            this.element.stop(false, true).hide(args);

            return this;
        },

        show: function (args) {
            this.element.stop(false, true).show(args);

            return this;
        },

        isVisible: function () {
            return this.element.is(':visible');
        },

        render: function (container) {
            container.append(this.element);

            return this;
        },

        destroy: function() {
            var _this = this;

            if (this.children) {
                var i, childrenLength = this.children.length, child;

                for (i = 0; i < childrenLength; i++) {
                    child = this.children[i];
                    child.setParent(null);
                    if (child.name) {
                        delete this[child.name];
                    }
                    child.destroy();
                }
            }
            this.children = [];

            if (this.parent) this.parent.removeChild(this);
            this.element.remove();
            this.element = null;
        }
    }
});
