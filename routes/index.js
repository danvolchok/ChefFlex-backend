var express = require("express");
var router = express.Router();
const Collection = require("../models/mongo");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
// const viewsPath=path.join(__dirname,"../views")
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

// router.use(express.json())
// router.use(cookieParser())
// router.use(express.urlencoded({extended:false}))
// router.set('view engine','hbs')
// router.set("views",viewsPath)
// router.use(express.static(publicPath))

async function hashPass(password) {
  const res = await bcryptjs.hash(password, 10);
  return res;
}
async function compare(userPass, hashPass) {
  const res = await bcryptjs.compare(userPass, hashPass);
  return res;
}``

router.get("/", (req, res) => {
  if (req.cookies.jwt) {
    const verify = jwt.verify(
      req.cookies.jwt,
      "helloandwelcometothecheflexapplicationforthejobseekersandemplyershelloandwelcometothecheflexapplicationforthejobseekersandemplyers"
    );
    res.render("home", { name: verify.name });
  } else {
    res.render("login");
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const check = await Collection.findOne({ name: req.body.name });

    if (check) {
      res.send("user already exist");
    } else {
      const token = jwt.sign(
        { name: req.body.name },
        "helloandwelcometothecheflexapplicationforthejobseekersandemplyershelloandwelcometothecheflexapplicationforthejobseekersandemplyers"
      );

      res.cookie("jwt", token, {
        maxAge: 600000,
        httpOnly: true,
      });

      const data = {
        name: req.body.name,
        password: await hashPass(req.body.password),
        token: token,
      };

      await Collection.insertMany([data]);

      res.render("home", { name: req.body.name });
    }
  } catch {
    res.send("wrong details");
  }
});

router.post("/login", async (req, res) => {
  try {
    const check = await Collection.findOne({ name: req.body.name });
    const passCheck = await compare(req.body.password, check.password);

    if (check && passCheck) {
      res.cookie("jwt", check.token, {
        maxAge: 600000,
        httpOnly: true,
      });

      res.render("home", { name: req.body.name });
    } else {
      res.send("wrong details");
    }
  } catch {
    res.send("wrong details");
  }
});

module.exports = router;
