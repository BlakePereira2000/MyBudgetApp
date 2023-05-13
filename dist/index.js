"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from "dotenv";
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
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
const balance = 2000;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");
// route login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
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
app.post("/getBalance", (req, res) => {
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
app.get("/", (req, res) => {
    res.send("Hello World From the Typescript Server!");
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
