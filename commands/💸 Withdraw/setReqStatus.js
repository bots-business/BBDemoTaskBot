/*CMD
  command: setReqStatus
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 💸 Withdraw
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// it is allowed only for admin

if(!isAdmin()){
  // only admin can run this command
  smartBot.run({ command: 'allowedForAdminOnly'})
  return
}

// admin here
const prms = params.split(' ');

const toStatus = prms[0]  // toApprove, toReject
const tgid = prms[1]  // telegram id of the user
const amount = parseFloat(prms[2])  // amount of the withdraw request

// admin can approve or reject the request

let cmdName = "cancelRequest";

if(toStatus == 'DONE'){
  // approve
  cmdName = "approveRequest";
}

let runPrms = {
  command: "channel:" + cmdName,
  options: { tgid: tgid, amount: amount }
}

// edit the request message in channel
smartBot.run(runPrms);

// notify the user
runPrms.command = "user:" + cmdName;
runPrms.user_telegramid = tgid;
smartBot.run(runPrms);



