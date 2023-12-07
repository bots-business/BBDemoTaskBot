/*CMD
  command: /menu
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🏠 Menu
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const justCompleted = completeCoreTask("onJoining")
const attractedBy = RefLib.getAttractedBy();

// user just joined to all channels
// complete task for Ref Link owner
function addBonusToRefOwner(){
  smartBot.run({
    command: "addBonusToRefOwner",
    // run for another user
    user_id: attractedBy.id,
    options: {
      attractedUser: user,
      userLink: CommonLib.getLinkFor(options.attractedUser)
    }
  })
}

if (justCompleted) {
  addBonusToRefOwner();
}

