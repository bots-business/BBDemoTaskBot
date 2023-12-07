/*CMD
  command: /task
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🔨 Task
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const tasks = smartTasker.getTasksForWork();
const task = tasks[0];

function getWebhookUrlForQuestion(){
  // pass task_id for tracking and message_id for editing
  const taskIdParams = "&task_id=" + encodeURIComponent(task.id);

  // generate webhook url for tracking link open
  return Libs.Webhooks.getUrlFor({
    command: "showTaskQuestion",
    user_id: user.id,
    redirect_to: task.url
    // and add task_id for tracking
  }) + taskIdParams;
}

if(task) {
  smartTasker.defineTask(task);
  smartTasker.add({
    url: getWebhookUrlForQuestion(),
    tasksAvaibleCount: tasks.length
  })
}else{
  // user don't have tasks now
  smartBot.run({ command: "noTasks " + params })  // params is "editing" or ""
}
