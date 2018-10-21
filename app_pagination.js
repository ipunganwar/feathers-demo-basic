
const feathers = require('@feathersjs/feathers');
const memory = require('feathers-memory');

class Messages {
  constructor() {
    this.messages = [];
    this.currentId = 0;
  }

  async find(params) {
    // Return the list of all messages
    return this.messages;
  }

  async get(id, params) {
    // Find the message by id
    const message = this.messages.find(message => message.id === parseInt(id, 10));

    // Throw an error if it wasn't found
    if(!message) {
      throw new Error(`Message with id ${id} not found`);
    }

    // Otherwise return the message
    return message;
  }

  async create(data, params) {
    // Create a new object with the original data and an id
    // taken from the incrementing `currentId` counter
    const message = Object.assign({
      id: ++this.currentId
    }, data);

    this.messages.push(message);

    return message;
  }

  async patch(id, data, params) {
    // Get the existing message. Will throw an error if not found
    const message = await this.get(id);

    // Merge the existing message with the new data
    // and return the result
    return Object.assign(message, data);
  }

  async remove(id, params) {
    // Get the message by id (will throw an error if not found)
    const message = await this.get(id);
    // Find the index of the message in our message array
    const index = this.messages.indexOf(message);

    // Remove the found message from our array
    this.messages.splice(index, 1);

    // Return the removed message
    return message;
  }
}

const app = feathers();

// Initialize the messages service by creating
// a new instance of our class
app.use('messages', new Messages());
app.use('messages', memory({
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
  
  createAndFind();