const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createLogUser = async (req, res) => {
  try {
    let userid = req.body.userid;
    let facebokname = req.body.facebookName;
    const result = await prisma.logusers.create({
      data: {
        userid: userid,
        facebook: facebokname,
      },
    });
    res.status(201).json({ message: "Created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
    createLogUser,
}
