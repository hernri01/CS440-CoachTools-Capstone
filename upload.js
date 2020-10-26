const csv = require('fast-csv');
var mongoose = require('mongoose');
var Roster = require('./Roster');
 
exports.post = function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
     
    var rosterFile = req.files.file;

    var players = [];
         
    csv.parseString(rosterFile.data.toString(), {
         headers: true,
         ignoreEmpty: true
     })
     .on("data", function(data){
         data['_id'] = new mongoose.Types.ObjectId();
          
         players.push(data);
     })
     .on("end", function(){
         Roster.create(players, function(err, documents) {
            if (err) throw err;
         });

     });
     res.redirect('http://google.com');
};