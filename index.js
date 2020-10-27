var app = require('express')();
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hernri01:Capstone2020@cluster0.3ln2m.mongodb.net/test?authSource=admin&replicaSet=atlas-9q0n4l-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true&useUnifiedTopology=true&useNewUrlParser=true');


 
var server = require('http').Server(app);
 
app.use(fileUpload());
 
app.listen(3000, function() {
  console.log('listening on 3000')
})
 


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

 
var template = require('./template.js');
app.get('/template', template.get);
 
var upload = require('./upload.js');
app.post('/', upload.post);
