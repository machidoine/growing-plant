//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);


var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/growing-plant';

var insertDataMessages = function(messages, callback) {
  // Get the documents collection
  // Use connect method to connect to the server
  
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected succesfully to server");
    var collection = db.collection('messages');
    // Insert some documents
    collection.insertMany([messages], function(err, result) {
      assert.equal(err, null);
      console.log("Inserted " + result.result.n + " documents into the collection");
      callback(result);
      db.close();
    });
  });

}

var findDocuments = function(callback) {
    MongoClient.connect(url, function(err, db) {
     assert.equal(null, err);
      // Get the documents collection
      var collection = db.collection('messages');
      // Find some documents
      collection.find({}).toArray(function(err, messages) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(messages)
        callback(messages);
         db.close();
      });
    });
  
}





router.use(express.static(path.resolve(__dirname, 'client')));

var messages = [];
var sockets = [];

io.on('connection', function(socket) {
  findDocuments(function(messagesRetrived){
    messagesRetrived.forEach(function(data) {
    socket.emit('message', data);
   });  
  });


  sockets.push(socket);

  socket.on('disconnect', function() {
    sockets.splice(sockets.indexOf(socket), 1);
    updateRoster();
  });

  socket.on('message', function(msg) {
    var text = String(msg || '');

    if (!text)
      return;

    socket.get('name', function(err, name) {
      var data = {
        name: name,
        text: text
      };
      insertDataMessages(data, function() {});
      broadcast('message', data);
      messages.push(data);
    });
  });

  socket.on('identify', function(name) {
    socket.set('name', String(name || 'Anonymous'), function(err) {
      updateRoster();
    });
  });
});

function updateRoster() {
  async.map(
    sockets,
    function(socket, callback) {
      socket.get('name', callback);
    },
    function(err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function(socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
