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
    res.json(books.find(book => book.id === req.params.id))
  })

app.post('/books', (req, res) => {
    books.push(req.body)
    res.status(201).json(req.body)
  })

app.put('/books/:id', (req, res) => {
    const updateIndex = books.findIndex(book => book.id === req.params.id)
    res.json(Object.assign(books[updateIndex], req.body))
  })

app.delete('/books/:id', (req, res) => {
    const deletedIndex = books.findIndex(book => book.id === req.params.id)
    books.splice(deletedIndex, 1)
    res.status(204).send()
 })

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})