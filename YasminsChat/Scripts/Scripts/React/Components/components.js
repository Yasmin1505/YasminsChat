'use strict';

var MessageItem = React.createClass({
    displayName: 'MessageItem',

    render: function render() {
        var itemStyle = 'messageItem';
        var userNameStyle = this.props.source === 'client' ? 'clientUserName' : 'serverUserName';
        var messageStyle = this.props.source === 'client' ? 'clientMessage' : 'serverMessage';

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: itemStyle },
                React.createElement(
                    'div',
                    { className: userNameStyle },
                    this.props.user_name
                )
            )
        );
    }
});
'use strict';

var UserList = React.createClass({
    displayName: 'UserList',


    render: function render() {
        var users = [];
        var i = 0;

        for (; i < this.props.users.length; i++) {
            users.push(React.createElement(
                'div',
                { key: i, className: 'userItem' },
                this.props.users[i]
            ));
        }

        return React.createElement(
            'div',
            { style: { overflow: 'scroll', display: 'block', float: 'left', padding: '2px' } },
            React.createElement(
                'h4',
                null,
                'Participants'
            ),
            users
        );
    }
});
'use strict';

var ChatWindow = React.createClass({
    displayName: 'ChatWindow',


    sendMsg: function sendMsg() {
        var $messageInput = $(ReactDOM.findDOMNode(this)).find('input[data-messages]');
        var message = $messageInput.val();
        this.props.sendmsg(message);
        $messageInput.val('');
    },

    componentDidUpdate: function componentDidUpdate() {
        var $messageInput = $(ReactDOM.findDOMNode(this)).find('div[data-messages]');
        if ($messageInput.length) {
            $messageInput[0].scrollTop = $messageInput[0].scrollHeight;
        }
    },

    render: function render() {
        var items = [];
        var i = 0;
        var userId;

        if (this.props.messages.length) {
            for (i; i < this.props.messages.length; i++) {
                userId = this.props.messages[i].sender_Id;
                items.push(React.createElement(MessageItem, {
                    username: this.props.messages[i].User.user_name,
                    datetime: this.props.messages[i].timestamp,
                    source: userId === this.props.sender_Id ? 'client' : 'server',
                    text: this.props.messages[i].msg_txt, key: this.props.messages[i].msg_Id
                }));
            }
        }
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { style: 'overflow:scroll;' },
                React.createElement(
                    'div',
                    { className: 'messagesDiv' },
                    items
                )
            )
        );
    }
});
'use strict';

var YasminsChatRoom = React.createClass({
    displayName: 'YasminsChatRoom',


    getInitialState: function getInitialState() {
        return {
            ChatHub: $.connection.YasminsHub,
            Messages: [],
            UserInitialized: false,
            UserName: '',
            UserId: 1,
            Users: []
        };
    },

    pushPrevMsgsList: function pushPrevMsgsList(msgsLst) {
        var msgs = this.state.Messages;;
        for (var i = 0; i < msgsLst.length; i++) {
            msgs.push({
                Id: msgsLst[i].msg_Id,
                UserId: msgsLst[i].sender_Id,
                UserName: msgLst[i].User.user_name,
                Message: msgsLst[i].msg_txt,
                DateTime: msgsLst[i].timestamp
            });
        }
        this.setState({
            Messages: msgs
        });
    },

    pushNewMessage: function pushNewMessage(msgId, userId, userName, messageTxt, timestamp) {
        var msg = this.state.Messages;
        msg.push({
            Id: msgId,
            UserId: userId,
            UserName: userName,
            Message: messageTxt,
            DateTime: timestamp
        });
        this.setState({
            Messages: msg
        });
    },

    pushUserList: function pushUserList(userList) {
        this.setState({
            Users: userList
        });
    },

    componentWillMount: function componentWillMount() {
        this.state.ChatHub.client.pushPrevMsgsList = this.pushPrevMsgsList;
        this.state.ChatHub.client.pushNewMessage = this.pushNewMessage;
        this.state.ChatHub.client.pushUserList = this.pushUserList;
        $.connection.hub.start().done(function () {
            console.log('SignalR Hub Started!');
        });
    },

    sendMsg: function sendMsg(message) {
        var messageObj = {
            Id: message.msg_Id,
            UserId: message.sender_Id,
            UserName: message.User.user_name,
            Message: message.msg_txt,
            DateTime: new Date()
        };
        $.ajax({
            method: 'post',
            url: './Chat/SaveAndPostChat/',
            data: JSON.stringify(messageObj),
            dataType: "json",
            contentType: "application/json; charset=utf-8"
        });
    },

    render: function render() {
        var component = this;
        $.getJSON('./Chat/GetNewUserId/?userName=' + userName).then(function (userId) {
            component.setState({
                UserInitialized: true,
                UserName: userName,
                UserId: userId
            });
        });

        if (this.state.UserInitialized) {
            return React.createElement(ChatWindow, {
                messages: this.state.Messages,
                username: this.state.UserName,
                userid: this.state.UserId,
                sendmessage: this.sendMsg,
                users: this.state.Users });
        } else {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h4',
                    null,
                    'something is wrong- go back to Submit '
                ),
                ' '
            );
        }
    }
});
'use strict';

ReactDOM.render(React.createElement(YasminsChatRoom, null), document.getElementById('container'));