// same index code with zod validation

const express = require("express");
const { z } = require("zod");

const app = express();

const mySchema = z.array(z.number());

app.use(express.json());

app.get("/health-checkup", (req, res) => {
  const kidney = req.body.kidney;
  const response = mySchema.safeParse(kidney);
  if (!response.success) {
    res.status(400).json({
      success: false,
      message: "Input is invalid",
    });
  }
  res.send(response);
});

app.get("/sach", function (req, res) {
  res.send("Lakshay bhosdiwala hai");
});

// global catches -->

app.use(function (err, req, res, next) {
  res.json({
    success: false,
    message: " Something is up with our server !!!",
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
