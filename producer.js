const { kafka } = require('./client');
const readline = require('readline');

// cli application for asking input from user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,

})

async function init() {
    const producer = kafka.producer();
    console.log(`⏳ Connecting Producer`);
    await producer.connect();
    console.log(`✅ Producer Connected Successfully`);
    
    rl.setPrompt('Enter rider name & location (south/north) >>')
    rl.prompt();


    rl.on('line', async function (line) {
        const [rider_name, loc] = line.split(' '); 

        await producer.send({
            topic: "rider-updates",
            messages: [
                {
                    partition: loc.toLowerCase() === 'south' ? 0 : 1,
                    key: "location-update",
                    value: JSON.stringify({ rider_name, loc }),
                },
            ],
        });
    });

    rl.on('close', async () => {
        await producer.disconnect();
        console.log(`🟠 Producer Disconnected`);
    });
}

init();



// 
