const { Client , Intents, IntegrationApplication } = require('discord.js');
const { waitForDebugger } = require('inspector');
require('dotenv').config()
var token =process.env.token

const wait = require('util').promisify(setTimeout);

const client = new Client({ intents: [Intents.FLAGS.GUILDS]});
client.on('ready', ()=>{
    console.log('Bot is ready!')
})


/* 
    TO DO LIST
    *Figure out how collect the last generated poll and gather results, to find the winner 


*/
let message;



client.on('interactionCreate', async interaction=> {
    if(!interaction.isCommand()) return;
    const { commandName } = interaction;

        /* 
            */
    
    if(commandName === 'yon'){ 
        //GENERATE YES OR NO
        let time = interaction.options.getInteger('time');
        let title = interaction.options.getString('question');
        message = await interaction.reply({content: '**Question: **' + title, fetchReply: true})
        message.react('✅')
        message.react('⛔')
        await wait(time * 1000)
        await interaction.fetchReply();
        let count = [message.reactions.cache.get('✅'), message.reactions.cache.get('⛔')]
        console.log(count)
        
    }
    else if (commandName === 'vote'){ 
        //GENERATION VOTE
        let numbers = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
        let time = interaction.options.getInteger('time');
        let title = interaction.options.getString('title')
        let options = interaction.options.getString('options');
        let vote_list = options.split(',');
        if(vote_list.length > 9) { interaction.reply('There are more than 9 options! Try Again'); return;}
        //CREATE LIST OF OPTIONS INTO A PROPER STRING;
        let display = '**'+ title + '**\n';
        for(var i = 0; i < vote_list.length; i++) {
            display += '**' + ( i + 1) +'**:' + ' ' + vote_list[i] + '\n'; 
        }
        //Basically Pretty Print the options.
        message = await interaction.reply({content: display, fetchReply: true})
        reactToList(message,vote_list,numbers)
        await wait(time * 1000);
        message = await interaction.fetchReply();
        let reactions= []
        vote_list.forEach( (element, index) => reactions.push(message.reactions.cache.get(numbers[index]).count) )
        console.log(reactions)

    }
})

client.login(token);

function reactToList(message , list, numbers) { 
    for(var i = 0 ; i < list.length; i++) { 
        message.react(numbers[i])
    }
}

