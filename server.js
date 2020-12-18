const express = require("express");
const path = require("path");
const fs = require("fs");

let apiRoutes = require("./routes/api");
let htmlRoutes = require("./routes/html");

let app = express();
let PORT = 3080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static("public"));
// app.use("/api", apiRoutes);
// app.use("/", htmlRoutes);

app.listen(PORT, () => {
    console.log('App running at localhost:' + PORT);
});

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static("public"));
  
  app.get("/api/config", (req, res) => {
      res.json("Route created");
  });
  
  app.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
  
  app.get("/api/notes", (req, res) => {
      fs.readFile("./db/db.json", (err, data) => {
          if (err) throw err;
          return res.json(JSON.parse(data));
      });
  });
  
  app.post("/api/notes", (req, res) => {
      fs.readFile("./db/db.json", (err, data) => {
              if (err) throw err;
              req.body.id = Date.now();
              const notes = JSON.parse(data);
              notes.push(req.body);
              console.log(notes);
                  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
                      if (err) throw err;
                      console.log("File saved!");
                  });
          res.json(req.body);
      });
  });
  
  
  app.delete("/api/notes/:id", (req, res) => {
      fs.readFile("./db/db.json", (err, data) => {
          if (err) throw err;
          const notes = JSON.parse(data);
          const noteName = req.params.id;
          const newNotes = notes.filter(note => {
              return note.id != noteName;
          });
          console.log(newNotes);
              fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err) => {
              if (err) throw err;
              console.log("The file has been deleted!");
              });
          res.end();
        });
  });
  
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
  