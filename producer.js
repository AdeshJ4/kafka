const { kafka } = require('./client');

async function init() {
    const producer = kafka.producer();
    console.log(`⏳ Connecting Producer`);
    await producer.connect();
    console.log(`✅ Producer Connected Successfully`);
    

    await producer.send({
      topic: "rider-updates",
      messages: [
        {
            partition: 0,
            key: "location-update",
            value: JSON.stringify({ rider_name: "Master Chief", loc: "SOUTH" }),
        },
      ],
    });

    await producer.disconnect();
    console.log(`🟠 Producer Disconnected`);
    
}

init();


