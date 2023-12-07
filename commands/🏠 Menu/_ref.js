/*CMD
  command: /ref
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🏠 Menu
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const referralLink = RefLib.getLink(bot.name, REF_LINK_PREFIX);

smartBot.add({
  referralLink: referralLink,
})

smartCoreTasker.defineTask("onRefJoined");
