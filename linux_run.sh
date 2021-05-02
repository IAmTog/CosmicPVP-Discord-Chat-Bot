#lava
##Runs all console clients, requires mono and screen to be installed on the linux machine.
screen -S "bot_lava" -d -m
sleep 1
screen -r "bot_lava" -X stuff $"cd bot_lava\n"
screen -r "bot_lava" -X stuff $"sudo mono MinecraftClient.exe\n"

#jungle
screen -S "bot_jungle" -d -m
sleep 1
screen -r "bot_jungle" -X stuff $"cd bot_jungle\n"
screen -r "bot_jungle" -X stuff $"sudo mono MinecraftClient.exe\n"

#dungeon
screen -S "bot_dungeon" -d -m
sleep 1
screen -r "bot_dungeon" -X stuff $"cd bot_dungeon\n"
screen -r "bot_dungeon" -X stuff $"sudo mono MinecraftClient.exe\n"
