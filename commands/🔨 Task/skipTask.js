/*CMD
  command: skipTask
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🔨 Task
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let cmdName = "/task editing"

// skip the first task
if(!smartTasker.skipTask()) {
  // task not skipped
  // seems user don't have tasks now
  cmdName = "noTasks editing";
}

smartBot.run({command: cmdName})

