/*CMD
  command: acceptRequestAmount
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 💸 Withdraw
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// this command have Wait For Answer flag

// TODO: seems we need something like smartDialog with errors and answer accepting

if(smartBot.isAlias(message)){
  // user can pass "Cancel" or run another command
  return
}

let dialog = new SmartAmountDialog({
  smartBot: smartBot,
  max: 5,
  min: 0.5,
  curValue: getUserBalance(),
  onlyInteger: false,
  skipZero: false,
  // pass errors from current command
  dialogErrors: smartBot.curCommand.dialogErrors
})

const accepted = dialog.accept(message);

if(!accepted){
  // we have validation error
  Bot.sendMessage(dialog.errMsg);

  // run this command again - it have wait for answer flag
  // user can try again
  Bot.run({ command: "acceptRequestAmount" });

  return
}

smartBot.add({ amount: dialog.amount })

// reduce user balance
setUserBalance( smartTasker.balance - dialog.amount );

// post request to channel
smartBot.run({
  command: "channel:postRequest",
  options: {
    amount: dialog.amount,
    tgid: user.telegramid,
    username: user.username || user.first_name || user.last_name
  }
});

// accept request amount
smartBot.run({
  command: "requestJustPosted",
  options: { amount: dialog.amount }
});
