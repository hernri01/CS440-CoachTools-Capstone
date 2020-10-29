/**
 * Ricardo Hernandez 
 * October 20, 2020
 * This file will create a template so that the coaches know what fields are necessary to upload data.
 * It creates a downloadable template when it is clicked
 */
var json2csv = require('json2csv').parse;
 
exports.get = function(req, res) {
 
    var fields = [
        'FirstName',
        'LastName',
        'Pos',
        'Grad Year'
    ];
 
    // var csv = json2csv({ data: '', fields: fields });

    var csv = json2csv( {
        "GradYear": 2021,
        "FirstName": "John",
        "LastName": "Volker",
        "Pos": "QB"
      });
 
    res.set("Content-Disposition", "attachment;filename=roster.csv");
    res.set("Content-Type", "application/octet-stream");
 
    res.send(csv);
 
};