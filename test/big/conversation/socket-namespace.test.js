const assert = require('assert');
const faker = require('faker');
const supertest = require('supertest');
const { create: createUser } = require('../../../stores/user');
const { create: createConversation } = require('../../../stores/conversation');
const io = require('socket.io-client');
const ObjectId = require('mongoose').Types.ObjectId;

const agent = supertest("http://localhost:9000");

describe("Socket Handlers", ()=>{

  it("Should create a new socket.io namespace and emit its ID", async ()=>{

    const body = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        profilePic: faker.image.imageUrl(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };
    const user = await createUser(body);
    const data = {
        users: [user._id, String(require('mongoose').Types.ObjectId())]
    };

    const {
        body: { token },
        headers: { 'set-cookie': cookie }
    } = await agent
        .post('/user/login')
        .send(body);
    const authorizationHeader = `Bearer ${token}`;
    const Cookie = cookie

    var options = {
      transports: ['websocket'] //,
      //'force new connection': true
    };
    const client = io.connect(`http://localhost:9000/`,options);

    const timeout = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    client.on('reconnect_error', (ctx)=>{
      console.log('Connection Failed')
      console.log(ctx)
    });

    console.log('client connected ');

    client.on('connect', function(d){
      console.log('client on connect');

      client.emit('start_conversation', data);

      client.on('msg', (m)=>{
        console.log('client on msg');
        assert(ObjectId.isValid(m), m);
        console.log('Received new conversation id: %s', m)
        console.log('Will try connect it...')
        client.emit('room', m);
        client.emit('ping_room', m);
        client.on('message', (msg)=>{
          console.log(msg)
          process.exit(0);
        })

      });

      client.on('error', (m)=>{
        console.log('Error')
        assert(false,m);
      });

    });


  });

})
