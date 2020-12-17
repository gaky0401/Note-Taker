const router = require("express").Router();
const fs = require("fs");
const util = require('util');
const db = require("../db/db.json");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);


router.get("/api/notes", function(req, res) {
    let allNotes = readFileAsync(db)
    return res.json(db);
    //console.log(allNotes);
});

//   router.get("*", function(req, res) {
    
//   });
module.exports = router;