const superagent = require("superagent");
const fs = require("fs");
const { resolve } = require("superagent/lib/request-base");

//================= in this we are handling both error and response in one
// fs.readFile(`${__dirname}/dog.txt`, (err, res) => {
//   if (err) {
//     return console.log(err.message);
//   }
//   console.log(`${res}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${res}/images/random`)
//     .end((err, res) => {
//       if (err) {
//         return console.log(err.message);
//       }
//       console.log(res.body.message);

//       fs.writeFile(`${__dirname}/dog.txt`, res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log("Random image saved in file!");
//       });
//     });
// });

//================ in this we are using then and catch
//fs.readFile(`${__dirname}/dog.txt`, "utf8", (err, breed) => {
//   if (err) return console.log(err.message);

//   breed = breed.trim().toLowerCase();

//   superagent
//     .get(`https://dog.ceo/api/breed/${breed}/images/random`)
//     .then((response) => {
//       console.log(response.body.message);

//       fs.writeFile(`${__dirname}/dog-img.txt`, response.body.message, (err) => {
//         if (err) return console.log(err.message);

//         console.log("Image URL saved!");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// Building Promises

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) reject("I could not read that file");
      else resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file");
      else resolve("success");
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    data = data.trim().toLowerCase();
    console.log("Breed:", data);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);

    return writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved!");
  })
  .catch((err) => {
    console.log(err.message || err);
  });
