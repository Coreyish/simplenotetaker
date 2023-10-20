//Global var needed to run the server
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const db = require('./db/db.json')

//Method to allows all notes to have a unique ID for the db
const { v4: uuidv4 } = require('uuid');

//Allows public folder to be unblocked
app.use(express.static('public'))
app.use(express.json())

//API Routes
//Method to  GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (_req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        ///error logging
        if (err) throw err;
        let dbData = JSON.parse(data);
        //Returns new database
        res.json(dbData)
    });   
})

//Todo Post

//Todo Delete

//To do HTML routes 

//Home
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Notes
app.get('/notes', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public','assets', 'notes.html'))
})

//Wildcard Route
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//App listens with front end on this port
app.listen(PORT, () =>
    console.log(`App listening on ${PORT}`))