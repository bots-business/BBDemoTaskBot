/*CMD
  command: /statistics
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🏠 Menu
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// just format duration like:
//  1 day, 10 hours, 15 minutes
function recalceLastRewardAtTime() {
  let timeDiff = Date.now() - tasks.lastRewardAt;

  let seconds = Math.floor(timeDiff / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  hours %= 24;
  minutes %= 60;
  seconds %= 60;

  let parts = [];
  if (days > 0) parts.push(`${days} days`);
  if (hours > 0) parts.push(`${hours} hours`);
  if (minutes > 0) parts.push(`${minutes} minutes`);

  if(parts.length == 0){
    return "just now"
  }

  return parts.join(", ");
}

const tasks = smartTasker.loadUserTasks();

if(!tasks) {
  smartBot.run({command: "noWorkYet" });
  return // don't handle current command
}

if(tasks.lastRewardAt){
  tasks.lastRewardAt = recalceLastRewardAtTime();
}

tasks.lastRewardAt = tasks.lastRewardAt || "never";

smartBot.add(tasks);
