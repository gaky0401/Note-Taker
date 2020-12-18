const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const util = require('util');
const db = require("../db/db.json");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);


router.get("/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), "UTF-8", function(err, dbres) {
        if (err) throw (err);
        return res.json(JSON.parse(dbres));
    });
    //console.log(allNotes);
});
// post, delete .then
// router.post("/notes", function(req, res) {
//     if (tableData.length < 5) {
//         tableData.push(req.body);
//         res.json(true);
//       }
//       else {
//         waitListData.push(req.body);
//         res.json(false);
//       }
//     });
module.exports = router;