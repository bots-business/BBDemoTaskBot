/*CMD
  command: showTaskQuestion
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🔨 Task
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if(!options) { return }  // ignore direct call

// TODO: need to check - task can be completed already
// so question is not needed

const taskID = options.params.task_id;

// you can uncomment this for testing purposes
// let taskID = "RefLib"

smartTasker.prepareTaskQuestion({
  taskID: taskID,
  onAnswer: "onAnswer"
});
