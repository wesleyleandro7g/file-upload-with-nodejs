const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

app.post("/upload", (req, res) => {
  if (req.files === null)
    return res.status(400).send({ msg: "No file uploaded" });

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(3333);
