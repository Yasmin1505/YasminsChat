var YasminsChatRoom = React.createClass({
            
    getInitialState : function () {
        return {
            ChatHub: $.connection.YasminsHub,
            Messages: [], 
            UserInitialized: false, 
            UserName:'', 
            UserId: 1,
            Users: []
        };
    },

	pushPrevMsgsList: function(msgsLst){
		var msgs = this.state.Messages;
		for(var i = 0; i < msgsLst.length; i++)
		{
		  msgs.push({
            Id: msgsLst[i].msg_Id,
            UserId: msgsLst[i].sender_Id,
            UserName: msgLst[i].User.user_name,
            Message: msgsLst[i].msg_txt,
            DateTime: msgsLst[i].timestamp
        })
		}
		this.setState({
            Messages: msgs
        });
	},

    pushNewMessage: function (msgId, userId, userName, messageTxt, timestamp) {
        var msg = this.state.Messages;
        msg.push({
            Id: msgId,
            UserId: userId,
            UserName: userName,
            Message: messageTxt,
            DateTime: timestamp
        })
        this.setState({
            Messages: msg
        });                
    },

    pushUserList: function(userList) {
        this.setState({
            Users: userList
        }); 
    },

    componentWillMount: function () {
		this.state.ChatHub.client.pushPrevMsgsList = this.pushPrevMsgsList;
        this.state.ChatHub.client.pushNewMessage = this.pushNewMessage;
        this.state.ChatHub.client.pushUserList = this.pushUserList;
        $.connection.hub.start().done(function () { 
            console.log('SignalR Hub Started!');
        });
    },

    sendMsg: function (message) {
        var messageObj = {
            Id: message.msg_Id,
            UserId:message.sender_Id,
            UserName: message.User.user_name, 
            Message: message.msg_txt, 
            DateTime: new Date()
        };
        $.ajax({
            method:'post',
            url: './Chat/SaveAndPostChat/',
            data: JSON.stringify(messageObj),
            dataType: "json",
            contentType: "application/json; charset=utf-8"
        });
    },

    render: function () {
		var component = this;
        $.getJSON('./Chat/GetNewUserId').then(function (user) {
            component.setState({
                UserInitialized: true, 
                UserName: {user_name}, 
                UserId: {user_Id}
            });
        });

        if (this.state.UserInitialized) {
            return ( <ChatWindow 
                        messages={this.state.Messages}
                        username={this.state.UserName}
                        userid={this.state.UserId} 
                        sendmessage={this.sendMsg} 
                        users = {this.state.Users} /> 
                    );
        }
        else {
            return ( <div><h4>something is wrong- go back to Submit </h4> </div> );
        }
    }    
});