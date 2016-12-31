using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using YasminsChat.Models;
using YasminsChat.Models.Hubs;

namespace YasminsChat.Controllers
{
    public class ChatController : Controller
    {
       // private ChatManager _manager;
        private ChatHub _chatHub;

        public ChatController()
        {
            _chatHub = new ChatHub();
        }

        public ViewResult JoinChatRoom(string userNameTxt)
        {
            User user = YasminsChatDataAccess.GetLogedinUser(userNameTxt);
            List<Message> messages = YasminsChatDataAccess.GetAllMessages();
            //_chatHub.SendUsersList(YasminsChatDataAccess.GetAllUsers());//new
            _chatHub.SendAllPreviouseMsgs(messages);
            
            return View("ChatRoom", user.user_Id);
        }

        public JsonResult GetNewUserId(String userName)
        {
            User user = YasminsChatDataAccess.GetLogedinUser(userName);

            //broadcast the user list to all the clients
            _chatHub.SendUsersList(YasminsChatDataAccess.GetAllUsers());
            return Json(user.user_Id);
        }

        public JsonResult GetAllMsgs()
        {
            return Json(YasminsChatDataAccess.GetAllMessages());
        }

        public EmptyResult SaveAndPostChat(string msgJson)
        {
            Message newMsg = JsonConvert.DeserializeObject<Message>(msgJson);
            newMsg.timestamp = DateTime.Now;
            YasminsChatDataAccess.InsertMsg(newMsg);

            //broadcast the chat to all the clients
            _chatHub.SendMsg(newMsg);
            return new EmptyResult();
        }
    }
}

// GET: api/Chat
//public IQueryable<Message> GetMessage()
//{
//    return db.Message;
//}

//// GET: api/Chat/5
//[ResponseType(typeof(Message))]
//public IHttpActionResult GetMessage(int id)
//{
//    Message message = db.Message.Find(id);
//    if (message == null)
//    {
//        return NotFound();
//    }

//    return Ok(message);
//}

//// PUT: api/Chat/5
//[ResponseType(typeof(void))]
//public IHttpActionResult PutMessage(int id, Message message)
//{
//    if (!ModelState.IsValid)
//    {
//        return BadRequest(ModelState);
//    }

//    if (id != message.msg_Id)
//    {
//        return BadRequest();
//    }

//    db.Entry(message).State = EntityState.Modified;

//    try
//    {
//        db.SaveChanges();
//    }
//    catch (DbUpdateConcurrencyException)
//    {
//        if (!MessageExists(id))
//        {
//            return NotFound();
//        }
//        else
//        {
//            throw;
//        }
//    }

//    return StatusCode(HttpStatusCode.NoContent);
//}

//// POST: api/Chat
//[ResponseType(typeof(Message))]
//public IHttpActionResult PostMessage(Message message)
//{
//    if (!ModelState.IsValid)
//    {
//        return BadRequest(ModelState);
//    }

//    db.Message.Add(message);
//    db.SaveChanges();

//    return CreatedAtRoute("DefaultApi", new { id = message.msg_Id }, message);
//}

////// DELETE: api/Chat/5
////[ResponseType(typeof(Message))]
////public IHttpActionResult DeleteMessage(int id)
////{
////    Message message = db.Message.Find(id);
////    if (message == null)
////    {
////        return NotFound();
////    }

////    db.Message.Remove(message);
////    db.SaveChanges();

////    return Ok(message);
////}

//protected override void Dispose(bool disposing)
//{
//    if (disposing)
//    {
//        db.Dispose();
//    }
//    base.Dispose(disposing);
//}

//private bool MessageExists(int id)
//{
//    return db.Message.Count(e => e.msg_Id == id) > 0;
//}