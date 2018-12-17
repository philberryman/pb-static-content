// const app = require("./app");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const handlebars = require("handlebars");
const source = readFile("./template.html");
const template = handlebars.compile(source);

const showdown = require("showdown"),
  converter = new showdown.Converter();

app.use(bodyParser.json());

function readFile(filePath) {
  const options = { encoding: "utf-8", flag: "r" };
  const buffer = fs.readFileSync(filePath, options);
  return buffer;
}

app.get("/:page", function(req, res) {
  const page = req.params.page;
  if (fs.existsSync(`./content/${page}/index.md`)) {
    const body = {
      content: new handlebars.SafeString(
        converter.makeHtml(readFile(`./content/${page}/index.md`))
      )
    };
    const html = template(body);
    res.send(html);
  } else {
    res.status(404).send("Not found");
  }
});

app.listen(8080, function() {
  console.log("Listening on port 8080!");
});

// module.exports = app;
