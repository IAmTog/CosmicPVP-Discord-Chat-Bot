const botconfig  = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const express = require("express");
const bot = new Discord.Client({disableEveryone: false});
bot.commands = new Discord.Collection();


bot.on("ready", async() => {
    console.log(`${bot.user.username} is online!`)  
});


bot.login(botconfig.botToken);

var bodyParser = require('body-parser');
const e = require("express");

const app = express()

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());

app.listen(botconfig.port, () => console.log(`Example app listening at http://localhost:${botconfig.port}`))

//TODO 
app.post('/', function (req, res) {

  console.log(req.body);


  let server = botconfig.channels[req.body.server.toLowerCase()];
  let channels;
  let channelImage;

  switch(req.body.postType){
    case "Black Market Auction": 
        channels = server["bah"];
        channelImage = botconfig.images.bah;
        break;
    case "Slot Credit Shop":
        channels = server["slots"];
        channelImage = botconfig.images.slots;

        break;
    case "Interstellar Merchant":
      channels = server["interstellar"];
      channelImage = botconfig.images.interstellar;
      break;
  }

  
  if(req.body.token === botconfig.consoleClientToken){



    for(var key in channels){

      let message = req.body.message;
  
      if(message.length > 0 ){
        let getEmbed = new Discord.RichEmbed()
        .setTitle(`${req.body.postType}`)
        .setColor(`${req.body.color}`)
        .addField("Chat Message", message)
        .setThumbnail(`${server.serverImage}`)
        .setImage(channelImage)
    
        let channel = bot.channels.get(channels[key].channelID)
    
    
        if(channel){
          if(channels[key].mentionOnKeyword === true){
            if(checkAlert(message)){
              channel.send(`<@&${channels[key].roleID}>`, getEmbed)
            }
          }
          else{
            channel.send(getEmbed)
          }
        }
        else{
          console.log("Channel doesn't exist")
        }
      }
    }

    res.status(200).send('POST request to Tog Bot successful');
  }
  else{
    res.status(200).send('Access Denied');;
  }
})

function checkAlert(message){
  var i;
  for(i = 0; i < botconfig.atEveryone.length; i++){
    if(message.includes(botconfig.atEveryone[i])){
      return true;
    }
  }
  return false;

}
/*


Example POST data.

{
  "postType": "Black Market Auction",
  "message": "test message",
  "server": "Spirit",
  "token": "",
  "color": "#00AA00"
}

{
  "postType": "Black Market Auction",
  "message": "* Black Market Auction *\r\nItem: <Interstellar> Rank Orb (Right Click)\r\nTime: 5m\r\nUse /bah to view and place bids.",
  "server": "Spirit",
  "token": "",
  "color": "#00AA00"
}
*/
