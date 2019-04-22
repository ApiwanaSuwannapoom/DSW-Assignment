const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const firebase = require('firebase')

const config = {
    apiKey: "AIzaSyCQsPDJpLyJ46_yoRptWci14q04623khwQ",
    authDomain: "assignmentdsw.firebaseapp.com",
    databaseURL: "https://assignmentdsw.firebaseio.com",
    projectId: "assignmentdsw",
    storageBucket: "assignmentdsw.appspot.com",
    messagingSenderId: "629199098727"
  };
  firebase.initializeApp(config);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/books', (req, res) => {
    var bookRef = firebase.database().ref('books');
    bookRef.on('value', function(snapshot) {
      res.send(snapshot.val());
    });
})

app.get('/books/:id', (req, res) => {
    var id =  req.params.id
    firebase.database().ref('/books/' + id).once('value').then(function(snapshot) {
        res.send(snapshot.val());
    });
  })

app.post('/books', (req, res) => {
    var id =  req.body.id
     var name =  req.body.name
     var type =  req.body.type
    
    firebase.database().ref('/books/' + id ).set({
          name: name,
          id: id,
          type: type
          
        });
    res.send("success");
  })

app.put('/books/:id', (req, res) => {
    var id =  req.body.id
    var name =  req.body.name
    var type =  req.body.type
    var postData = {
        name: name,
        id: id,
        type: type
      };
    
    firebase.database().ref('/books/' + id ).update(postData);
    res.send("success");
  })

app.delete('/books/:id', (req, res) => {
    const deletedIndex = books.findIndex(book => book.id === req.params.id)
    books.splice(deletedIndex, 1)
    res.status(204).send()
 })

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})