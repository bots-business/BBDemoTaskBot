/*CMD
  command: @
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🔩 Core
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

 // put your admin telegram id here
 // use /id command in bot to get your id
const ADMIN_TG_ID = 519829299;

// you can change Core rewards here
const REWARD_FOR_START = 1;
const REWARD_FOR_STARTING_BY_REF = 2;
const REWARD_FOR_JOINING = 3;
const REWARD_FOR_REFFERAL = 4;

// prefix in refLink: https://t.me/BBTaskBot?start=[PREFIX]123456
const REF_LINK_PREFIX = "r"; // used in /start command


// define folders for skip
// Because we need to install SmartBot first
const SETUP_FOLDERS = [ "🛠️ Setup", "🔩 Core" ]

// allow without joining
const ALWAYS_AVAIBLE_FOLDERS = [ "🛠️ Setup", "🔩 Core", "💬 Joining" ]

// define options for smartBot
let smartBotOpts = {
  // global params for all commands
  // this params will be used for all commands and Lang files
  params: {
    // we use BB Point as reward
    currency: "💎 BB Point",
    // balance for user - important for all commands
    balance: getUserBalance(),
  },

  // default markdown for answers. By default: "MarkdownV2"
  // defaultMarkdown: "HTML",

  // you can pass strict_params. Error will be thrown if param not found.
  // it can help for debug
  // strict_params: true,

  // you can get extra debug info
  // also you can turn on debug in any commands like: smartBot.debug = true;
  // it can be more easy for debug
  // debug: true,

  // don't process commands in this folders
  skip_cmd_folders: SETUP_FOLDERS
};

// smartBot customized PARAMS for current command's folder
// for all commands in "💬 Joining" folder
if(command?.folder=="💬 Joining"){
  const allChannels = Libs.MembershipChecker.getChats();
  const allCount = allChannels.split(",").length;

  const notJoinedChannels = Libs.MembershipChecker.getNotJoinedChats();

  let notJoinedCount = notJoinedChannels.split(",").length;
  if(notJoinedChannels==""){ notJoinedCount = 0 }

  const newParams = {
    // MCL / Joining params
    // we use "Joining:" prefix because it is good naming
    // all channels for joining
    "Joining:allChannels": allChannels,
    // just count of channels
    "Joining:channelsCount": allCount,
    // not joined channels
    "Joining:notJoinedChannels": notJoinedChannels,
    // count of not joined channels
    "Joining:notJoinedCount": notJoinedCount,
    // MCL can have error here
    "Joining:error": options?.error
  }

  // add newParams to smartBot
  smartBotOpts.params = { ...smartBotOpts.params, ...newParams };
}

// init smartBot
let smartBot = new SmartBot(smartBotOpts);

function isPrivateChat(){
  return chat?.chat_type == "private"  // we have "?" because chat can be undefined
}

// for automatic MCL checking
// with checking delay from admin panel
if(isPrivateChat()){
  // we need to check joining only for private chats
  Libs.MembershipChecker.handle();
}

function checkAccess(){
  const curCmdFolder = command?.folder;
  const alwaysAvaibleForUser = ALWAYS_AVAIBLE_FOLDERS.includes(curCmdFolder);
  if(alwaysAvaibleForUser){ return true }

  if(!isPrivateChat()){
    // group, supergroup or channel - don't check access
    return true;
  }

  if(Libs.MembershipChecker.isMember()){
    // use already joined
    return true;
  }

  Bot.runCommand("onNeedAllJoining");
  return false;
}

if(user&&!checkAccess()){
  // stop bot execution
  return
}

// BOT CORE TASKS
//    core bot task as /start and main channel joining
// you can setup core tasks here

let CORE_TASKS = [];

if(!SETUP_FOLDERS.includes(command?.folder)){
  // don't define tasks in setup folder

  CORE_TASKS = [
    // on bot start
    {
      id: "onBotStart",
      // Task Title - see Lang file > titles > coreTasks
      title: smartBot.langData.titles.coreTasks.onBotStart,
      // reward amount
      amount: REWARD_FOR_START,
    },
    {
      id: "onBotStartingByRef",
      title: smartBot.langData.titles.coreTasks.onBotStartingByRef,
      amount: REWARD_FOR_STARTING_BY_REF
    },
    // on joining to all channels
    {
      id: "onJoining",
      title: smartBot.langData.titles.coreTasks.onAllJoining,
      amount: REWARD_FOR_JOINING
    },
    // reward for Ref Link owner
    {
      id: "onRefJoined",
      title: smartBot.langData.titles.coreTasks.onRefJoined,
      amount: REWARD_FOR_REFFERAL,
      // can be rewarded several times
      // because user can invite several friends
      manyTimes: true
    }
  ]
}

// paid tasks
// please remove not actual tasks
// you can add your own tasks here
const TASKS = [
  {
    id: "MCL",
    title: "MCL (MembershipChecker) Learning",
    url: "https://help.bots.business/libs/mcl",
    amount: 1,
    question: 'What Lib is used for "Joining systems" - joining checking to channels?',
    answers: ["MCL (MembershipChecker)", "JoinLib", "GuardLib", "getChatMember", "I don't know" ],
    correctAnswer: "MCL (MembershipChecker)",
  },
  {
    id: "RefLib",
    title: "RefLib Learning",
    url: "https://help.bots.business/libs/refferallib",
    amount: 2,
    question: "What callback will be called when new user join to bot via Ref Link?",
    answers: ["onAttracted(byUser)", "onJoin(byUser)", "onRefLink(byUser)", "onRefLinkJoined(byUser)", "I don't know" ],
    correctAnswer: "onAttracted(byUser)",
  },
  {
    id: "ResLib",
    title: "ResLib Learning",
    url: "https://help.bots.business/libs/resourceslib",
    amount: 3,
    question: "How to remove 5 from user balance? Current user balance is 4",
    answers: ["ResLib.removeAnyway(5)", "ResLib.remove(5)", "ResLib.removeFromUserBalance(4)", "ResLib.removeFromUserBalance(-5)", "ResLib.removeFromUserBalance(-4)", "I don't know" ],
    correctAnswer: "ResLib.removeAnyway(5)",
  }
]

// this object is used for Core Tasks like /start and etc
const smartCoreTasker = new SmartTasker({
  // Tasker Name - it is needs for save tasks in User props
  name: "Core",
  // define tasks here
  tasks: CORE_TASKS,
  // current user balance
  balance: getUserBalance(),
  // set smartBot for using in SmartTasker
  smartBot: smartBot
});

// this object is used for paid tasks
const smartTasker = new SmartTasker({
  name: "Tasks",
  tasks: TASKS,
  balance: getUserBalance(),
  smartBot: smartBot
});

function getUserBalance(){
  if(!user){ return }  // background task possible
  let balance = User.getProperty("balance") || 0;
  // only 4 digits after dot
  return parseFloat(balance.toFixed(4));
}

function setUserBalance(amount){
  User.setProperty("balance", amount, "float");
}

function rewardUser(opts){
  // task successfully completed
  // set new balance
  const tasker = opts.tasker;
  const taskDef = tasker.curTask;
  setUserBalance(tasker.balance)

  smartBot.run({
    command: opts.justRewardedCmd,
    options: {
      amount: taskDef.amount,
      title: taskDef.title
    }
  })
}

function completeTaskerTask(opts){
  const completedExecution = opts.tasker.completeExecution(opts.taskID);
  const taskDef = opts.tasker.curTask;

  if(completedExecution){
    rewardUser(opts)
    return true;
  }

  // we don't show already rewarded message if it is not needed
  if(!opts.showAlreadyRewarded){ return }

  // already rewarded
  smartBot.run({
    command: opts.alreadyRewardedCmd,
    options: { title: taskDef.title }
  });
}

// complete Core Tasks like /start, joining and etc
function completeCoreTask(taskID){
  completeTaskerTask({
    tasker: smartCoreTasker,
    taskID: taskID,
    justRewardedCmd: "justRewardedForCoreTask",
    showAlreadyRewarded: false,
    alreadyRewardedCmd: "alreadyRewardedForCoreTask",
  });
}

// complete paid tasks
function completeTask(taskID){
  completeTaskerTask({
    tasker: smartTasker,
    taskID: taskID,
    justRewardedCmd: "justRewardedForTask",
    showAlreadyRewarded: true,
    alreadyRewardedCmd: "alreadyRewarded"
  });
}

const userWalletPropName = "wallet"

function getUserWallet(){
  return User.getProperty(userWalletPropName);
}

function setUserWallet(wallet){
  // TODO: need to check wallet address
  return User.setProperty(userWalletPropName, wallet);
}

function isAdmin(){
  // set your ADMIN ID here
  // you can know your ID via /id
  const admin_id = ADMIN_TG_ID;
  if(!user){ return }  // background task possible

  if(user.telegramid==ADMIN_TG_ID){ return true }
}

// for get user telegram id via /id command
if(message=="/id"){ Bot.sendMessage(user.telegramid) }

