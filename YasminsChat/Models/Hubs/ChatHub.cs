using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace YasminsChat.Models.Hubs
{
    [HubName("YasminsHub")]
    public class ChatHub : Hub
    {
        public void SendMsg(Message msg) 
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext("YasminsHub");
            context.Clients.All.pushNewMessage(msg.User.user_Id ,msg.User.user_name, msg.msg_Id, msg.msg_txt, msg.timestamp);
        }
        public void SendUsersList(List<User> userList)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext("YasminsHub");

            context.Clients.All.pushUserList(userList);
        }

        public void SendAllPreviouseMsgs(List<Message> msgsLst)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext("YasminsHub");
            context.Clients.All.pushPrevMsgsList(msgsLst);
        }
        
    }
}