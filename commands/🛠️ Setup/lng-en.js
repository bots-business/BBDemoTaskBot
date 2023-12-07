/*CMD
  command: lng-en
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🛠️ Setup
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// IMPORTANT !!!
// need to run /setuo on this file modification!

// It is language setup command for English only
// use it as template for another languages


// Smart Arhitecture principles:
//
// 1. Logic isolated from Content
//
// 2. MultiLang supporting. English - first
//
// 3. One command - many translations.
// We don't use comnmands like "/start_en", "/start_fr" and etc
// We use only /start command and many lang files like "lng_en", "lng_fr" and etc
//
// 4. We don't save any text (especially the text that can be translated) in command code.
//  This text go to lang file
//  we can use variables in text like: "Hello, {username}!" and pass it via
//  smartBot.add({ username: user.username })
//
// 5. We don't use answer, aliases, keyboard in command:
//   because we need to translate it!
//   All answers, aliases, keyboards and etc - in lang file only!
//
// 6. Keep It Simple Stupid (KISS) principles:
//  - One command - one message (You can use smartBot.run for run another command for another message)
//  - All exist commands must have BJS code
//   otherwise it is just Smart Commands with Template only (Don't create blank commands!)
//
// 7. Command naming rules:
//  - pretty names for commands (Don't use bad naming! It is very important!)
//      Bad names: "me", "MU", "bal", "he", "joinABfA"
//      Good names: "/me", "/menu", "/balance", "/help",  "onJoinAfterBonusFromAdmin"
//


// TRANSLATION RULES:
// structure:
//      {
//        key: "value",
//        key2: {
//          anotherKey: "value3"
//        },
//        "key4:" [
//          "value4",
//          "value5"
//        ]
//        // comments possible
//        key5: "Hello, {NAME}",
//        "key5": "#/type/possible"
//      }
//
// 1. Do NOT translate any keys like:
//    key, key2 ... keyN, anotherKey, "key5" - it is in "quotes"
// 2. Do NOT translate masks in {curly braces}:
//    {NAME} ... {anyVariable}
//    but in "Hello, {NAME}" you need translate "Hello, " - it is outside of {curly braces}
// 3. Do NOT translate "#/type/possible" - and etc - after "#/" - it is type reference
// 4. Do NOT translate comments (yes you reading comments now)
//    it is after "//" or between "/*" and "*/" like: // comment
// 5. You can translate ONLY text in values:
//    "value", "value3" and etc - all values after keys - key: value
//
// Aliase translation rules:
//   please be careful with aliases!
//   Here alias "❌ Cancel" defined in withdraw command:
//  "/withdraw": {
//     aliases: "💸 Withdraw, ❌ Cancel",
//     ...
//   },
//
//  and here alias "❌ Cancel" defined in noWallet keyboard already:
//  "noWallet": {
//     keyboard: "💰 My wallet,\n❌ Cancel"
//     ...
//   },
//
//  it is must be same for both commands!


const LANG_CODE = "en";

const LANG = {
  // general types - can be used for "commands" section
  types: {
    langVer: "*Lang file version:* 1.0.0",

    // you can structure blocks as you wish - it is just a JS object
    // for example "keyboards", "buttons", "alerts", "screens", "groups" and etc
    keyboards: {
      // we can use it as "#/keyboards/joinInlineKeyboard"
      // "#/" - it is key for types
      // only one button here:
      joinInlineKeyboard: [[
        { text: "Check join to {Joining:notJoinedCount} from {Joining:channelsCount} channel(s)",
          command: "checkJoin"  // it is link for command
      }]]
    }
  },

  // just a text general translations - used in commands
  titles: {
    coreTasks: {
      onBotStart: "Welcome Bonus",
      onBotStartingByRef: "Welcome Bonus from friend",
      onAllJoining: "Joining Bonus",
      onRefJoined: "Referral Bonus"
    }
  },

  // COMMANDS section
  commands: {
    // template:
    // "commandName": {
    //   use {variable} for insert variables on execution in any vallue
    //   for example: "text: "Hello, {username}!"
    //                "photo: "https://link.to/image.png?text.text={username}"
    //                "keyboard: "button 1, button 2, {username}"
    //
    //   text: "text",                           // answer from bot
    //   parse_mode: "HTML",                     // parse mode for answer. Default: "Markdown"
    //   chat_id: "@channel",                    // chat id for answer, by default - default chat
    //
    //   ALIASING:
    //     alias can have " " (space) in name - it is not allowed for command name
    //     so alias can't have params
    //   alias: "Back",                          // alias for command
    //   aliases: "Back, ❎ Cancel",                // aliases for command. Can be separated by comma
    //
    //   KEYBOARD:
    //   inline_buttons: [
    //     // you can use key "command" instead "callback_data"
    //     // Note: "command" can have no more than 64 bytes
    //     { title: "button text", command: "/command" },
    //     // url and etc - also possible
    //     { title: "button text", url: "https://link.to" },
    //   ],
    //   keyboard: "button 1, button 2",
    //
    //   ALERT (only for inline buttons):
    //   alert: "chat alert text",               // alert message on inline button click
    //   alert_top: "alert text on top",         // alert message on inline button click on top of chat
    //
    //   FILES:
    //   photo: "https://link.to/image.png",     // photo url
    //
    //   EDITING on inline callback:
    //   this editing will be happens on inline button click
    //   edit: true,                             // edit message instead send new
    //   1. you can run any command in edit mode: by
    //       smartBot.run({ command: "/command editing" })
    //   2. you can pass message_id for edit message also. But it is handled by smartBot automatically
    //
    //   You can use types. See "types" section above
    // },
    //
    // you can access to current command feild via: smartBot.curCommand.FIELD_NAME

    // very simple test command
    "/test": {
      // just simnple text with type reference:
      // we used general type "langVer" from "types" section
      text: "#/langVer"
    },

    "/start": {
      text: "Hello.\nIt is BB Demo Task Bot.\n\nYou can earn {currency} for completing tasks.\n\n " +
        "*You need to join:* \n {Joining:allChannels} \n\n",

      // we used general type "joinInlineKeyboard" from "types" section
      inline_buttons: "#/keyboards/joinInlineKeyboard"
    },

    // error command
    "!": {
      text: "😭 Sorry, we have error. \n\n Please try again later."
    },

    // JOINING section
    "checkJoin": {
      // alert: "Screen alert...",
      alert_top: "Checking join to channels: {Joining:notJoinedChannels}..."
    },
    "onNeedAllJoining": {
      text: "You need to join all channels before using bot:\n{Joining:allChannels}\n\n" +
        "Please join to all channels and press button again:\n\n{Joining:notJoinedChannels}",
      inline_buttons: "#/keyboards/joinInlineKeyboard"
    },
    "onAllJoining": {
      text: "You joined to all channels! Now you can use bot!",
      run: { command: "/menu" }
    },
    "onStillJoined": {
      text: "You are still joined to all channels! Thank you!",
      run: { command: "/menu" }
    },
    "onMCLError": {
      text: "MCL Error occured! Maybe bot don't have access for checking?\n\nError: {Joining:error}",
    },

    // END JOINING section
    // this command will be after joining
    "/menu": {
      text: "Menu",
      alias: "🔙 Back",
      keyboard: "🔨 Tasks,\n📊 Statistics, 🔗 Referrals,\n💎 Balance, 💸 Withdraw\n/clear all data for testing 🐛"
    },

    "/balance": {
      alias: "💎 Balance",
      // we just use sirv.com for image generation
      //    see customized balance for text.text={balance}
      // you can sign up and use it for free on sirv.com!
      // just upload your image and use it with text.text={balance} and etc
      // see sirv.com docs for more info
      photo: "https://ngoldiou.sirv.com/BBDemoTaskBot/gem.png?text.text={balance}&text.size=25&text.color=white&text.position=center",
      text: "*Your balance is*:\n\n   `{balance}` {currency}"
    },

    "/ref": {
      alias: "🔗 Referrals",
      text: "Your referral link:\n\n{referralLink}\n\n" +
        "You will receive: `{amount} {currency}` for each user who joined to *all channels* using your link!",
    },

    // Withdraw & Wallet section
    "/withdraw": {
      aliases: "💸 Withdraw, ❌ Cancel",
      text: "💸 Withdraw\n\n💰 Your wallet: `{wallet}` \n\nBalance: {balance} {currency}",
      noWalletText: "n/a",
      keyboard: "💸 Withdraw Request,💰 Set my wallet,\n🔙 Back"
    },

    // === Withdraw Request

    "/request": {
      alias: "💸 Withdraw Request",
      text: "💰 Your balance: {balance} {currency}. \n\nPlease enter amount for withdraw request (max: {balance}):",
      keyboard: "❌ Cancel"
    },

    "requestJustPosted": {
      text: "✅ *Withdraw request accepted and posted to @BBTaskLog!* \n\nYour request: {amount} {currency} \n\n" +
        "Please wait. Your request will be processed soon.",
      // return to menu
      run: { command: "/menu" }
    },

    "channel:postRequest":{
      chat_id: "@BBTaskLog",  // we send it to BBTaskLog channel
      text: "💸 <b>Withdraw request</b> \n\n" +
        "<a href='tg://user?id={tgid}'>User: {username}</a> \n" +
        "<b>Amount:</b> {amount} {currency}",
      parse_mode: "HTML",  // user can use "_" and etc in username
      inline_buttons: [
        [
          // command can have not more than 64 bytes
          { text: "✅ Approve", command: "setReqStatus DONE {tgid} {amount}" },
          { text: "❌ Cancel", command: "setReqStatus NO {tgid} {amount}" }
        ]
      ]
    },

    "allowedForAdminOnly": {
      alert: "❌ You are not allowed to do this! \n\nOnly admins can do this.",
    },

    "channel:approveRequest": {
      // we don't need chat_id here - because we edit message in channel
      // and it is current chat_id
      edit: true,
      text: "✅ *Withdraw request approved!* \n\n" +
        "[User: {tgid}](tg://user?id={tgid}) \n" +
        "*Amount:* {amount} {currency}",
      inline_buttons: []
    },

    // edit message in channel
    "channel:cancelRequest": {
      edit: true,
      text: "❌ *Withdraw request rejected!* \n\n" +
        "[User: {tgid}](tg://user?id={tgid}) \n" +
        "*Amount:* {amount} {currency}",
      inline_buttons: []
    },

    // notify user about his request status
    "user:approveRequest": {
      // we pass telegram id of the user here
      chat_id: "{tgid}",
      text: "✅ *Your Withdraw request approved!* \n\n" +
        "*Amount:* {amount} {currency}",
    },

    "user:cancelRequest": {
      chat_id: "{tgid}",
      text: "❌ *Your Withdraw request rejected and returned to your balance!* \n\n" +
        "*Amount:* {amount} {currency}",
    },

    "sendRequestInfoToUser": {
      chat_id: "{tgid}",
      text: "{text}"
    },

    // this is errror messages for Withdraw Amount Dialog
    acceptRequestAmount:{
      // we use "dialogErrors" section for error messages
      dialogErrors: {
        // if user enter not a number
        invalid: "❌ *Invalid amount.*\n \"{_amount}\" - not valid." +
          "\n\nPlease enter valid amount for withdraw request (max: {_curValue}).",

        // if user have zero balance
        zero: "Your balance is zero. \n\nPlease complete any task before.",

        // if user enter amount more than balance
        notEnough: "❌ *Invalid amount.*\n \"{_amount}\" - not enough balance." +
          "\n\nPlease enter valid amount for withdraw request (max: {_curValue}).",

        // if user enter less then min amount
        small: "❌ *Invalid amount.*\n \"{_amount}\" - too small." +
          "\n\nPlease enter valid amount for withdraw request (min: {_min}, max: {_curValue}).",

        // if user enter too big then max amount
        big: "❌ *Invalid amount.*\n \"{_amount}\" - too big." +
          "\n\nPlease enter valid amount for withdraw request (max: {_max}).",

        // if user enter not integer amount
        notInteger: "❌ *Invalid amount.*\n \"{_amount}\" - not integer."
      }
    },


    // === Withdraw Request end

    "noWallet": {
      text: "❌ You don't have 💰 wallet yet. \n\n *Please setup it first.*",
      // not "🔙 Back" - it is used for "/menu"
      keyboard: "💰 Set my wallet,\n❌ Cancel"
    },

    // this command have "Wait for Answer" mode
    "walletRequest": {
      alias: "💰 Set my wallet",
      text: "Please enter your wallet address:",
      run: { command: "acceptWallet" },
      keyboard: "❌ Cancel"
    },

    "walletAccepted":{
      text: "✅ *Wallet accepted!* \n\nYour wallet: `{wallet}`",
      run: { command: "/withdraw" }
    },



    "WaitWithdraw": {
      text: "⏳ *Please wait*. Your withdraw request will be processed soon.",
    },

    "WithdrawedMsg": {
      text: "💰 *Your withdraw request was processed.* Please check your wallet."
    },

    "/task": {
      alias: "🔨 Tasks",
      text: "*🔨 NEW Task:*\n{title} \n\n *Award:* {amount} {currency} \n\n *Description:* you need to visit url" +
        "\n\nTotal tasks avaible: {tasksAvaibleCount}",
      inline_buttons: [
         [ { text: "🔗 Open", url: "{url}" } ],
         [ { text: "❌ Skip", command: "skipTask" } ]
      ]
    },

    "skipTask": {
      alert_top: "Task skipped!"
    },

    "noTasks": {
      text: "❎ *No tasks avaible now.* \n\n⏳ Please try again later.",
      inline_buttons: []
    },

    "taskNotExist": {
      edit: true,
      text: "❎ *Task not found.* \n\n⏳ Please try another task."
    },

    // show question for task
    "showTaskQuestion": {
      text: "Please answer the question for reward:\n\n❓ *{question}*",
      inline_buttons: [
        // show answers buttons for answers with texts only
        [ { text: "{answer1}", command: "{onAnswer1}" } ],
        [ { text: "{answer2}", command: "{onAnswer2}" } ],
        [ { text: "{answer3}", command: "{onAnswer3}" } ],
        [ { text: "{answer4}", command: "{onAnswer4}" } ],
        [ { text: "{answer5}", command: "{onAnswer5}" } ],
        [ { text: "{answer6}", command: "{onAnswer6}" } ],
        [ { text: "❌ Skip", command: "skipTask" } ],
      ]
    },

    "correctAnswer": {
      edit: true,
      text: "✅ Thank you! You are right! \n\n*Reward:* {amount} {currency}",
      inline_buttons: [
        // we pass "editing" param for edit this message
        [ { text: "✅ Next task", command: "/task editing" } ]
      ]
    },

    "wrongAnswer": {
      edit: true,
      text: "❌ Wrong answer! \n\nPlease try another task.",
      inline_buttons: [
        [ { text: "❌ Next task", command: "/task editing" } ]
      ]
    },

    // justRewarded Message for Core tasks
    "justRewardedForCoreTask": {
      text: "*Reward!* \n\nYou received {amount} {currency}! \n\n Task: \"{title}\"",
    },

    // justRewarded Message for Paid tasks
    "justRewardedForTask": {
      edit: true,
      text: "*Reward!* \n\nYou received {amount} {currency}! \n\n Task: \"{title}\"",
      inline_buttons: [
        // we pass "editing" param for edit this message
        [ { text: "✅ Next task", command: "/task editing" } ]
      ]
    },

    // start, join tasks
    "alreadyRewardedForCoreTask":{
      text: "*✅  Already rewarded!* \n\nTask: {title}"
    },

    // paid tasks
    "alreadyRewarded":{
      edit: true,
      text: "*✅  Already rewarded!* \n\nTask: {title}"
    },

    "/statistics": {
      alias: "📊 Statistics",
      text: "📊 *Statistics:* \n\n" +
        "🔨 *Tasks*\n" +
        "    *completed:* `{completedCount}` \n" +
        "    *skipped:* `{skippedCount}` \n\n" +
        "💎 *Reward*\n" +
        "    * Total reward:* `{totalReward} {currency}` \n" +
        "    * Last reward:* ⏰ {lastRewardAt}",
        // time emodzi:
    },

    "noWorkYet": {
      text: "⏳ *No work yet.* \n\nPlease make any task before.",
    },

  }
  // COMMANDS section end
}

smartBot.setupLng(LANG_CODE, LANG);
