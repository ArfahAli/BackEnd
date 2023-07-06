
import express from "express";
import { connection } from "./db/connection.js";
import cors from "cors";
import bodyParser from "body-parser";
import productRouter from "./routes/products.js";
import router from "./routes/Registration.js";
import paymentRoute from "./routes/paymentRoute.js";
// import session from "express-session";
import passport from "passport";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./models/user.js";

import "./auth.js";
const app = express();
import dotenv from "dotenv";
app.use(cors());
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use("/upload", express.static("upload"));
connection
  .then(() => {
    console.log("DB Connected.");
  })
  .catch((e) => {
    console.log(e);
  });
  // app.get('/', (req, res) => {
  //   res.send('<a href="/auth/google">Authenticate with Google</a>');
  // });
  
  // app.get('/auth/google',
  //   passport.authenticate('google', { scope: [ 'email', 'profile' ] }
  // ));
  // app.get("/", (req, res) => {
  //   res.send("<h1>Welcome to E-commerce Application - MERN STACK by Arfah Ali</h1>");
  // });

app.use('/',paymentRoute);
app.use("/CheckUsers", router);
app.use("/", productRouter);
app.use("/AddProduct", productRouter);
app.use("/LoginSignupContainer", router);
app.post('/api/register', async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: 'ok' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000 && err.keyPattern && err.keyPattern.username === 1) {
      const errorMessage = 'User already exists,Try Again with different username';
      res.status(400).json({ error: errorMessage }); // Send the error message
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});


app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = Jwt.sign(
			{
				username: user.username,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.get('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = Jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', quote: user.quote })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = Jwt.verify(token, 'secret123')
		const email = decoded.email
		await User.updateOne(
			{ email: email },
			{ $set: { quote: req.body.quote } }
		)

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

// function isLoggedIn(req, res, next) {
//   req.user ? next() : res.sendStatus(401);
// }

// app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());



// app.get( '/auth/google/callback',
//   passport.authenticate( 'google', {
//     successRedirect: '/protected',
//     failureRedirect: '/auth/google/failure'
//   })
// );

// app.get('/protected', isLoggedIn, (req, res) => {
//   res.send(`Hello ${req.user.displayusername}`);
// });

// app.get('/logout', (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.send('Goodbye!');
// });

// app.get('/auth/google/failure', (req, res) => {
//   res.send('Failed to authenticate..');
// });


app.listen(process.env.PORT || 8000, () => {
  console.log("Server started");
});
