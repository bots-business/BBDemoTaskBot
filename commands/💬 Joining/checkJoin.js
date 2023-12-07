/*CMD
  command: checkJoin
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 💬 Joining
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if(!isPrivateChat()){
  // bo any check in group chats or channels
  return
}

// for all chats and channels:
// this method perform checking without delay
// but not more often than once every 2 seconds
Libs.MembershipChecker.check()

// also you can pass any data for callbacks:
// Libs.MembershipChecker.check({ any: "data", here: "for callbacks"  })
