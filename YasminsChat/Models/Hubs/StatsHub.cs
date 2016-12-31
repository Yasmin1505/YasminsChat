using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace YasminsChat.Models.Hubs
{
    public class StatsHub : Hub
    {

        public void Hello()
        {
            Clients.All.hello();
        }
    }
}