/*CMD
  command: acceptWallet
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 💸 Withdraw

  <<ANSWER

  ANSWER
  keyboard: 
  aliases: 
  group: 
CMD*/

// this command have Wait For Answer flag

if(smartBot.isAlias(message)){
  // user can pass "Cancel" or run another command
  return
}

// TODO: need to add a check for the wallet address
setUserWallet(message);

smartBot.run({
  command: "walletAccepted",
  options: { wallet: message }
});

