/*CMD
  command: /request
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 💸 Withdraw
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let wallet = getUserWallet();

if(!wallet){
  smartBot.run({ command: "noWallet" })
  return
}

smartBot.run({ command: "acceptRequestAmount" })
