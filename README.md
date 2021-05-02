# Discord-Bot
## Setup

### Bot Setup
1. Install npm onto your system, you may also need to install nodeJS. https://www.npmjs.com
2. Run the command npm install in the console to install the node packages.
3. Open botconfig.json in a text editor.
4. Fill out fields in the configuration file. 
  1. Discord token needs to be the discord bot token setup on: https://discord.com/developers.
  2. Console Client Token is a unique value to validate the requests being sent to the bot have come from your console client. Set this to what ever you want.
  3. Port is the port the discord bot will listen on.
  4. atEveryone is all the chat messages the bot will @ users on.
  5. Leave images unless you want to change it to a new image in your discord.
  6. Channels has all the server channels. If you want to use the same channel for BAH, Slots and Interstellar just copy paste the same channel id and role id. Alternatively if you don't want to use alerts just leave the field blank. Channel ID is the ID of the target channel, roleID is the role that should be mentioned.
5. To run the bot type "node ." in the console.


### Console Client Setup
1. Open MinecraftClient.ini in editor.
2. Fill in the login and password fields.
3. Open the 
4. Run MinecraftClient.exe to run the console client. This needs to be ran for each console client.
5. Finally open the Chat.cs file and change the token value to the ConsoleClientToken provided in botconfig.json

Any issues contact me on discord: Tog#6090