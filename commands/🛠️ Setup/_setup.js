/*CMD
  command: /setup
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🛠️ Setup
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if(!isAdmin()){ return }  // allowe only for admin

const languages = [
  // the first language item is default!
  //   it is used if user language is not found
  //   and it is English by default!
  {
    // English
    "name": "English",
    "code": "en",
    "flag": "🇺🇸"
  },
  // add anoter languages here
  // you need also add command lng-CODE e.g. lng-fr
  // use command "lng-en" as template
  // {
  //   // French
  //   "name": "Français",
  //   "code": "fr",
  //   "flag": "🇫🇷"
  // },
  // and etc
];

let cmdName;
for(let i in languages){
  cmdName = "lng-" + languages[i].code;
  Bot.run({ command: cmdName })
}

let allLanguages = languages.map(l => l.name).join(", ");
Bot.sendMessage(`Multi Languages installed: ${allLanguages}`);


// install MCL
Libs.MembershipChecker.setup()

Bot.sendMessage("Bot setup done!\n\n*Please go to /setup command > BJS and on the first line add:*\n\n`return`");
