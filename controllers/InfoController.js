const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getInfo = async (req, res) => {
  try {
    const response = await prisma.infos.findMany();
    if (response.length === 0) {
      res.status(404).json({ msg: "ไม่พบข้อมูล" });
    } else {
      for (let i = 0; i < response.length; i++) {
        let decodedContent = Buffer.from(
          response[i].content,
          "base64"
        ).toString("utf-8");
        response[i].content = decodedContent;
      }
      res.status(200).json(response);
    }
  } catch (error) {}
};

const createInfo = async (req, res) => {
  try {
    let title = req.body.title;
    let content = req.body.content;
    let encodedContent = Buffer.from(content).toString("base64");
    const response = await prisma.infos.create({
        data: {
            title: title,
            content: encodedContent,
        },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateInfo = async (req, res) => {
  try {
  } catch (error) {}
};

const deleteInfo = async (req, res) => {
  try {
    const response = await prisma.infos.delete({
        where: {
            id: Number(req.params.id),
        },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getInfo,
  createInfo,
  updateInfo,
  deleteInfo,
};
