const express = require("express");

const app = express();

app.use(express.json());

function checkUser(req, res, next) {
  // Convert kidneyId to a number
  const kidneyId = Number(req.query.kidneyId);
  const username = req.headers.username;
  const password = req.headers.password;

  // Check username and password credentials // got error because this wasn't on top
  if (username !== "admin" || password !== "password") {
    res.status(401).json({
      // Return 401 Unauthorized for invalid credentials
      message: "Credentials de bkl !!!", // Updated message to be clearer
    });
    return; // Added return to stop execution after sending the response
  }

  // Check kidneyId and send response if it's valid (1 or 2)
  if (kidneyId === 1 || kidneyId === 2) {
    res.status(200).json({
      // Changed status to 200 (OK) for a successful check
      success: true,
      message: "Your kidney is fine",
    });
    return; // Added return to stop execution after sending the response
  } else {
    // If kidneyId is not valid, send error response
    res.status(400).json({
      success: false,
      message: "Erroneous input for KidneyId",
    });
    return; // Added return to stop execution after sending the response
  }

  next(); // Proceed to the next middleware if all checks pass
}

let count = 0;

function ratelimitter(req, res, next) {
  console.log("Count is ", count);
  count = count + 1;
  if (count > 5) {
    res.status(404).json({
      success: false,
      message: "ruk jaa gandu",
    });
  }
  next();
}

let totalRequestTime = 0;
let request = 0;

function averageTimeToHandleRequest(req, res, next) {
  const startTime = Date.now(); // capture the start time

  res.on("finish", () => {
    const endTime = Date.now(); // capture the end time
    const requestTime = endTime - startTime; // calculate the request time
    totalRequestTime = totalRequestTime + requestTime;
    request = request + 1;

    const averageTime = totalRequestTime / request;

    console.log(
      `Request Time: ${requestTime}ms, Average Time: ${averageTime.toFixed(
        2
      )}ms`
    );
    console.log("Request is " + request);
  });
  next();
}

app.get(
  "/health-checkup",
  averageTimeToHandleRequest,
  ratelimitter,
  checkUser,
  (req, res) => {
    res.send("Your kidneys are healthy");
  }
);

app.get("/sach", averageTimeToHandleRequest, checkUser, function (req, res) {
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
