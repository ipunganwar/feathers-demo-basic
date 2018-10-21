// Create a websocket connecting to our Feathers server
const socket = io('http://localhost:3030');
// Create a Feathers application
const app = feathers();


// FOR PAGINATION PURPOSE
/* app.use('messages', feathers.memory({
  paginate: {
    default: 10,
    max: 25
  }
}));

async function createAndFind() {
  // Stores a reference to the messages service so we don't have to call it all the time
  const messages = app.service('messages');

  for(let counter = 0; counter < 100; counter++) {
    await messages.create({
      counter,
      message: `Message number ${counter}`
    });
  }

  // We show 10 entries by default. By skipping 10 we go to page 2
  const page2 = await messages.find({
    query: { $skip: 10 }
  });

  console.log('Page number 2', page2);

  // Show 20 items per page
  const largePage = await messages.find({
    query: { $limit: 20 }
  });

  console.log('20 items', largePage);

  // Find the first 10 items with counter greater 50 and less than 70
  const counterList = await messages.find({
    query: {
      counter: { $gt: 50, $lt: 70 }
    }
  });

  console.log('Counter greater 50 and less than 70', counterList);

  // Find all entries with text "Message number 20"
  const message20 = await messages.find({
    query: {
      message: 'Message number 20'
    }
  });

  console.log('Entries with text "Message number 20"', message20);
}

createAndFind(); */

// FOR REALTIME PURPOSE
/* global io */


// Configure Socket.io client services to use that socket
app.configure(feathers.socketio(socket));

app.service('messages').on('created', message => {
  console.log('Someone created a message', message);
});

async function createAndList() {
  await app.service('messages').create({
    text: 'Hello from Feathers browser client'
  });

  const messages = await app.service('messages').find();

  console.log('Messages', messages);
}

createAndList();