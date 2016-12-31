var ChatWindow = React.createClass({ 
   
    sendMsg: function () {
        var $messageInput = $(ReactDOM.findDOMNode(this)).find('input[data-messages]');
        var message = $messageInput.val();                
        this.props.sendmsg(message);
        $messageInput.val('');
    },            

    componentDidUpdate: function () {
        var $messageInput = $(ReactDOM.findDOMNode(this)).find('div[data-messages]');
        if($messageInput.length) {            
            $messageInput[0].scrollTop = $messageInput[0].scrollHeight;
        }        
    },

    render: function () {
        var items = [];
        var i=0;
        var userId;
                
        if(this.props.messages.length) {
            for(i; i<this.props.messages.length; i++) {
                userId = this.props.messages[i].sender_Id;
                items.push(<MessageItem 
                                username={this.props.messages[i].User.user_name}
                                datetime={this.props.messages[i].timestamp} 
                                source={(userId === this.props.sender_Id) ? 'client' : 'server'} 
                                text={this.props.messages[i].msg_txt} key={this.props.messages[i].msg_Id}
                            />);
            }
        }           
        return ( <div>
                    <div style='overflow:scroll;'> 
                        <div className='messagesDiv'>{items}</div>
					</div>
				</div>)
	}
})