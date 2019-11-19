 const express = require("express");
 const router = express.Router();
 const youtubedl = require('youtube-dl');
 const { exec } = require('child_process');
var ytdl = require('ytdl-core');

 const fs = require('fs');
 

 router.get('/api/index',(req,res)=>{
   const url = 'https://www.youtube.com/watch?v=rYMupc564zE';
   let filename;
   const options = ['--format', 'bestaudio', '--extract-audio', '--audio-format', 'opus', '--audio-quality', '0'];
   const video = youtubedl(url,options)
   
   video.on('info',(info)=>{
      console.log('Download started');
      filename = info._filename
      console.log('filename: ' + info._filename);
      console.log('size: ' + info.size);

        youtubedl.exec(url, ['-x', '--audio-format', 'mp3'], {}, function exec(err, output) {
           'use strict'
           if (err) {
              throw err
           }
           console.log("=====put", output.filename)
        })
        console.log("=============" + info._filename)
        fs.rename(info._filename.replace(), `./src/mp3/${info._filename}`, (err) => {
           if (err) console.log(err)
        });
   })

   return res.send("alo");
   
})   

 module.exports = router;