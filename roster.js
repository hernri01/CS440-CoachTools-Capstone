var mongoose = require('mongoose');

const rosterSchema = mongoose.Schema({
    FirstName:  String, // String is shorthand for {type: String}
    LastName: String,
    Pos:   String,
    GradYear: Number
  },{ collection: 'Roster' });

var Roster = mongoose.model('Roster', rosterSchema);
 
module.exports = Roster;