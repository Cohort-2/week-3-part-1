// suppose we need to create a function validate input
// it need to validate that it the arr of strings
// if its the array of strings return true or else return false

const { z } = require("zod");

// if(typeof arr == "object" && arr.length >= 1){
//   return true ;
// }

// so hard without zod but zod makes is easier

function validateInput(arr) {
  const schema = z.array(z.number());

  const response = schema.safeParse(arr);
  console.log(response);
}

validateInput(["1", 2, 3]);

// {
//   email : string ==> email @ gmail.com,
//   password : atleast 8 characters ,
// }
// How to write a schema for this

function emailValidate(obj) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const response = schema.safeParse(obj);
  console.log(response);
}

// let obj = {
//   email: "abc@gmail.com",
//   password: "12345678",
// };

// emailValidate(obj);

app.post("/login", function (req, res) {
  const response = emailValidate(req.body);
  if (!response.success) {
    res.status(411).json({
      msg: "Your inputs are invalid",
    });
    return;
  }
});
