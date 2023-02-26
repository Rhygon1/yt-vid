const express = require("express");
const app = express()
const http = require('http');
const server = http.createServer(app)
require('dotenv').config()
const port = process.env.PORT || 3000
const fs = require('fs');
const ytdl = require('ytdl-core');
let body = require('body-parser')

app.use(express.static('public'))
app.use(body.urlencoded({ extended: false }))
app.use(body.json())
server.listen(port)

app.post('/download', async (req, res) => {
    let ID = req.body.url.split('?v=')[1]
    if(ytdl.validateID(ID)){
        ytdl(ID, {quality: '18'}).pipe(fs.createWriteStream('./public/'+ID+'.mp4'))
        res.send('/'+ID+'.mp4')
    } else {
        res.send('error')
    }
})


app.delete('/:url', (req, res) => {
    fs.unlink('./public/'+req.params.url, () => {})
})