import { join } from "node:path";
import { db } from "./db/pools.js";
import express, { urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import messageRouter from "./routes/messageRoutes.js";
const dir = import.meta.dirname;
const assetsPath = join(dir, "public");

const app = express();
app.set("views", join(dir, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false, cookie: { maxAge: 7 * 24 * 60 * 60 * 1000, secure: false, httpOnly: true, sameSite: "lax" } }));
// app.use(passport.initialize());
app.use(passport.session());
app.use(urlencoded({ extended: false }));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" })
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log("seriaolize", user)
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deseriaolize", id)

  try {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use((req, res, next) => {
  try {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url || req.originalUrl || 'unknown';
    console.log(`📝 ${timestamp} - ${method} ${url}`);
    console.log("   └req.body ->", req.body)
    //console.log(req.headers.cookie)
    next();
  } catch (error) {
    console.error("❌ Erro no middleware de log:", error);
    next(); // Continue mesmo com erro no log
  }
});

app.use((req, res, next) => {
  res.locals.user = req.user;
  console.log("user", req.user)
  next();
});

app.use("/messages", messageRouter)

app.get("/", (req, res) => {
  res.redirect("/messages")
});
app.get("/log-in", (req, res) => res.render("log-in-form"));
app.get("/sign-up", (req, res) => res.render("sign-up-form"));
app.post("/sign-up", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, hashedPassword]);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,

  })
);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});


app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
  console.log("http://localhost:3000");
});
