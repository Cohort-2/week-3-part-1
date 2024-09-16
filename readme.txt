// middlewares

1 .users need to send a kidney id as a query params which should be a number from 1-2 
2. User should send a username and password in headers

// errors i faced --> 
// no req.status 2 times 
// any thing which uses req.headers should be at top of the function
// do return to stop further execution

// zod validation steps 

step1 : import zod 
step2 : create a schema 
step3 : parse 
step4 : safeParse does not throw error if validation fails

// writing zod schema is tough

{
  email : string  ==> email  @  gmail.com
  password : atleast 8 characters
  country : "IN" or "US"
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  country: z.enum(["IN", "US"]), //.literal or .number or .string
});