var UserList = React.createClass({

    render : function () {
        var users = [];

        for(var i=0;i<this.props.users.length;i++) {
            users.push(<div key={i} className='userItem'>{this.props.users[i]}</div>);
        }

        return ( <div style='overflow:scroll; display:block; float:left; padding:2px;'>
                    <h4>Participants</h4>
                    {users}
                 </div> );
    }
});