using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YasminsChat.Models
{
    public static class YasminsChatDataAccess
    {
        public static List<User> GetAllUsers()
        {
            List<User> users = new List<User>();
            using(YasminsChatDbEntities context = new YasminsChatDbEntities())
            {
                users = context.User.ToList();
            }
            return users;
        }

        public static List<Message> GetAllMessages()
        {
            List<Message> messages = new List<Message>();
          
            using(YasminsChatDbEntities context = new YasminsChatDbEntities())
            {
                messages = context.Message.ToList();
            }
            
            return messages;
        }

        public static void InsertMsg(Message msg)
        {
            if (msg.msg_Id != 0 && msg.msg_txt != "" && msg.sender_Id != 0)
            {
                using (YasminsChatDbEntities context = new YasminsChatDbEntities())
                {
                    context.Message.Add(msg);
                    context.SaveChanges();
                }
            }
        }
        public static User GetLogedinUser(string userName)
        {
            using(YasminsChatDbEntities context = new YasminsChatDbEntities())
            {
                List<User> users = context.User.ToList();
                if (users.Count ==0 || !users.Any(u => u.user_name == userName))
                {
                    context.User.Add(new User() { user_name = userName });
                    context.SaveChanges();
                }
                return context.User.First(u => u.user_name==userName);
            }
        }


    }
}