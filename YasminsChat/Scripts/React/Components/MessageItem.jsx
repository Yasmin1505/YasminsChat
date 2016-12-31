var MessageItem = React.createClass({    
    render: function () {
        var itemStyle = 'messageItem';
        var userNameStyle = (this.props.source === 'client') ? 'clientUserName' : 'serverUserName';
        var messageStyle = (this.props.source === 'client') ? 'clientMessage' : 'serverMessage';

        return ( <div>
                    <div className={itemStyle}>
                        <div className={userNameStyle}>{this.props.user_name}</div>
					</div>
				 </div>)
}
})