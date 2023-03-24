const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JWT = require("jsonwebtoken");
const secret = process.env.SECRET;

const Login = async (req, res) => {
  try {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    const user = await prisma.user.findMany({
      where: {
        name: username,
        password: password,
      },
    });
    console.log(user);
    if (user.length === 1) {
      console.log("Login Success");
      const token = JWT.sign(
        {
          id: user[0].id,
          username: user[0].username,
          email: user[0].email,
        },
        secret,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        status: true,
        message: "Login Success",
        token: token,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Login Failed",
      });
    }
    // if (user) {
    // } else {
    //   res.status(200).json({
    //     status: false,
    //     message: "Login Failed",
    //   });
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Login Failed",
    });
  }
};

const Authen = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = JWT.verify(token, secret);
    
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,

      },
    });
    if (user) {
      res.status(200).json({
        status: true,
        message: "Authen Success",
        user: user,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Authen Failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Authen Failed",
    });
  }
};

module.exports = {
    Login,
    Authen
};
