/*CMD
  command: user:cancelRequest
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 💸 Withdraw
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// we return withdraw amount if admin reject the request
setUserBalance( smartTasker.balance + options.amount );
