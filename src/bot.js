require('dotenv').config();

const { Client, GatewayIntentBits }=require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });

const PREFIX='$';




client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate',(message)=>{
  if(message.author.bot){
    return;
  }
  if(message.content.startsWith(PREFIX)){
    const[CMD_NAME,...args]=message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);

    // console.log(CMD_NAME);
    // console.log(args[0]);
     if(CMD_NAME==='kick'){
      if(!message.member.hasPermission('KICK_MEMBERS'))
      return message.reply('You do not havepermission to use that command');
      if(args.length===0) return message.reply('Please Provide an ID');
      const member=message.guild.members.cache.get(args[0])
      //console.log(member);
      if(member){
        member
        .kick()
        .then((member)=>{
          message.channel.send(`${member} was kicked.`)
          .catch((err)=>message.channel.send('I cannot kick that user :('))
        })
      }else{
        message.channel.send('That member was not found');
      }
     }
     else if(CMD_NAME==='ban'){
      if(!message.member.hasPermission('BAN_MEMBERS'))
      return message.reply('You do not havepermission to use that command');
      if(args.length===0) return message.reply('Please Provide an ID');
      message.guild.members.ban(args[0])
      .catch((err)=>console.log(err));
     }
  }
})



client.login(process.env.DISCORDJS_BOT_TOKEN);












// client.on('interactionCreate', async interaction => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === 'ping') {
//     await interaction.reply('Pong!');
//   }
// });