// import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import fetch, { Response as FetchResponse } from "node-fetch";
import path from "path";
import cors from "cors";

// dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

interface FormInputs {
  email: string;
  password: string;
}

// Array of example users for testing purposes
const users = [
  {
    id: 1,
    name: "Maria Doe",
    email: "maria@example.com",
    password: "maria123",
  },
  {
    id: 2,
    name: "Juan Doe",
    email: "juan@example.com",
    password: "juan123",
  },
];

const balance: number = 2000;

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");

// route login
app.post("/login", (req: Request, res: Response) => {
  const { email, password }: FormInputs = req.body;
  const user = users.find((user) => {
    return user.email === email && user.password === password;
  });

  if (!user) {
    return res.status(404).send("User Not Found!");
  }

  // Generate a JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
    expiresIn: "1h", // Set an appropriate expiration time
  });

  return res.status(200).json({ user, token });
});

app.post("/getBalance", (req: Request, res: Response) => {
  res.json({ balance });
});

// app.get("/api-endpoint", async (req: Request, res: Response) => {
//   const accessToken =
//     "5GL2OgQFOX3q0u10BOgwNhjB01wnxt5iSxlzypIhivgBNZl8eJVdagTyjOFD..0Vu0ONZ1oyA1tRN03N5Z.ehuqqbOzlAHaDtLeqwhwQ0NE90tXXtprD4Mx9YHek5x8Av8Ktjxl9joLlmypaK0uZlHaTYg7uXZJWGCDcUbScwzTUesaYxYCDgycKDQt3LBTL1W17ZPAFmHB";

//   try {
//     const response: FetchResponse = await fetch(
//       "https://api-sandbox.capitalone.com/api-endpoint",
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const data: any = await response.json();

//     // Handle the response data
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World From the Typescript Server!");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
