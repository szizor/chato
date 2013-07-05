Class(Chato.UI, 'ChatMessage').inherits(Chato.UI.Widget)({
    html: '\
        <div class="chat-message">\
            <span class="chat-message-content muted"></span>\
        </div>\
    ',


    protoype: {
        init: function (attributes) {
            Chato.UI.Widget.prototype.init.apply(this, [attributes]);

            this.messageContent = this.element.find('.chat-message-content');

            /* chat mesages are chat notifications for users,
            ** no user owns this messages, they are just owned by the
            ** conversation object
            */
            this.messageContent.html(this.content);
        }

    }
});