Class(Chato.UI, 'Chat').inherits(Chato.UI.Widget)({
    prototype: {

        init: function (attributes) {
            Chato.UI.Widget.prototype.init.apply(this, [attributes]);

            this.conversation = [];

            this.conversationContainer = this.element.find('.conversation');
            this.inputMessageContainer = this.element.find('.user-input-message');
            this.sendMessageButton = this.element.find('.send-button');
            this.cancelMessageButton = this.element.find('.cancel-button');

            socket.emit('join', {
                userId: this.userId,
                channel: this.channel,
                name: this.name
            });

            this.bindEvents();
        },

        bindEvents: function () {
            var _this = this;
            this.sendMessageButton.on('click', function (ev) {
                ev.preventDefault();
                _this._sendUserMessage(ev);
            });

            this.cancelMessageButton.on('click', function (ev) {
                ev.preventDefault();
                _this.inputMessageContainer.get(0).value = "";
            });

            /* server events */
            this.socket.on('message', function (data) {
                console.log(data);
                console.log('socket listening to MESSAGE');
                _this._appendUserMessage(data);
            });

            this.socket.on('join', function (data) {
                console.log('socket listening to JOIN');
                _this._appendSystemMessage(data);
            });

            this.socket.on('leave', function (data) {
                console.log('socket listening to LEAVE');
                _this._appendSystemMessage(data);
            });

        },

        _sendUserMessage: function (ev) {
            var _this = this,
                messageToSend = this.inputMessageContainer.val();
            this.socket.emit('send', {
                type: null,
                userId: this.userId,
                channel: this.channel,
                message: messageToSend,
                targetUserId: null,
                isMaster: this.isMaster
            });
            this.inputMessageContainer.val('');
        },

        /* TODO: refactor */
        _appendUserMessage: function (data) {
            var _this = this;
            var userMessage = new Chato.UI.UserMessage({
                id: 'userMessage' + Date.now().toString().replace('.',''),
                userId: data.userId || 'server',
                content: data.message
            });
            this.conversation.push(userMessage);
            this.appendChild(userMessage);
            userMessage.render(this.conversationContainer).bindElements();
        },

        _appendSystemMessage: function (message) {
            var _this = this,
                systemMessage = new Chato.UI.ChatMessage({
                    content: message
                });
            systemMessage.render(this.conversationContainer);
        }
    }

});