/*CMD
  command: onAnswer
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🔨 Task
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

function rejectWrongAnswer(){
  // wrong answer - skip task
  smartTasker.skipTask();

  // show wrong answer message
  smartBot.run({
    command: "wrongAnswer",
    options: { taskID: acceptedAnswer.taskID }
  })
}

function processAnswer(){
  if(acceptedAnswer.isCorrect){
    return completeTask();
  }

  rejectWrongAnswer();
}

const acceptedAnswer = smartTasker.acceptAnswer();

if(acceptedAnswer){
  processAnswer();
}else{
  // task not found
  // seems like user try to answer to old task
  // or this task is removed already
  smartBot.run({ command: "taskNotExist"})
}
