/*CMD
  command: /start
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 💬 Joining
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// you can turn on debug in one command only
// smartBot.debug = true;

completeCoreTask("onBotStart");

// it is new user. He start bot via ref link
function onAttracted(byUser){
  // complete task for starting by Ref Link
  completeCoreTask("onBotStartingByRef");
}

RefLib.track({
  onAttracted: onAttracted,
  linkPrefix: REF_LINK_PREFIX,
  // you can pass debug for external debug info
  // debug: true
});

// see /test command - you can clear ref for testing purposes

