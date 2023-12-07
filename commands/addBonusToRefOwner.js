/*CMD
  command: addBonusToRefOwner
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// exit on manual run
if(!options){ return }
if(!options.attractedUser){ return }

completeCoreTask("onRefJoined");
