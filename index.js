const express = require("express");
const { spawn } = require("child_process");
const { count } = require("console");

const app = express();
const PORT = process.env.PORT || 4545;

app.use(express.static("public"));

app.get("/params", (req, res) => {
  const params = [];

  // spawn new child process to call the python script
  const python = spawn("python", ["script1.py", "PARAM_1", "PARAM_2"]);

  // collect data from the script
  python.stdout.on("data", (data) => {
    console.log("pipe data from python script...");
    // params = data.toString();
    params.push(data);
  });

  // in close event we are sure that stream from
  // child process is closed.
  python.on("close", (code) => {
    console.log(`child process close all stdio with code: ${code}`);
    // res.send(params);
    res.json(params.join(""));
  });
});
app.get("/countries", (req, res) => {
  const countries = [];
  // spawn new child process to call the python script
  const python = spawn("python", ["script2.py"]);

  // collect data from the script
  python.stdout.on("data", (data) => {
    console.log("pipe data from python script...");
    // params = data.toString();
    // console.log(data);
    countries.push(data);
  });

  // in close event we are sure that stream from
  // child process is closed.
  python.on("close", (code) => {
    console.log(`child process close all stdio with code: ${code}`);
    // res.send(params);
    res.json(countries.join(""));
  });
});

app.get("/picture_array", (req, res) => {
  let picture_array = [];

  // spawn new child process to call the python script
  const python = spawn("python", ["script3.py"]);

  // collect data from the script
  python.stdout.on("data", (data) => {
    console.log("pipe data from python script...");
    // params = data.toString();
    // console.log(data);
    picture_array = [...picture_array, data];
  });

  // in close event we are sure that stream from
  // child process is closed.
  python.on("close", (code) => {
    console.log(`child process close all stdio with code: ${code}`);
    // res.send(params);
    res.json(picture_array.join(""));
  });
});
app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
