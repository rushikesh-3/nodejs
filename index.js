const superagent = require("superagent");
const fs = require("fs");

fs.readFile(`${__dirname}/dog.txt`, (err, res) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(`${res}`);
  superagent
    .get(`https://dog.ceo/api/breed/${res}/images/random`)
    .end((err, res) => {
      if (err) {
        return console.log(err.message);
      }
      console.log(res.body.message);

      fs.writeFile(`${__dirname}/dog.txt`, res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log("Random image saved in file!");
      });
    });
});
