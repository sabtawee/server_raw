const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Buffer = require("buffer").Buffer;
const path = require("path");

const getNews = async (req, res) => {
  try {
    const response = await prisma.news.findMany();
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

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getNewsImage = async (req, res) => {
  try {
    let imageName = req.params.imageName;
    let imagePath = path.join(__dirname, "../uploads/" + imageName);
    res.sendFile(imagePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNewsById = async (req, res) => {
  try {
    const response = await prisma.news.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if(response.length === 0){
      res.status(404).json({ msg: "ไม่พบข้อมูล" });
    }else{
      let decodedContent = Buffer.from(response.content, 'base64').toString('utf-8');
      response.content = decodedContent;
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createNews = async (req, res) => {
  try {
    let image = req.file.filename;
    let title = req.body.title;
    let subtitle = req.body.subtitle;
    let content = req.body.detail;
    // endcode the content
    let encodedContent = Buffer.from(content).toString("base64");
    // decode the content
    // let decodedContent = Buffer.from(encodedContent, 'base64').toString('utf-8');
    // console.log(decodedContent);

    const response = await prisma.news.create({
      data: {
        title: title,
        subtitle: subtitle,
        content: encodedContent,
        image: image,
      },
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateNews = async (req, res) => {
  const { title, content, subtitle } = req.body;
  try {
    const response = await prisma.news.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: title,
        subtitle: subtitle,
        content: content,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    const response = await prisma.news.delete({
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
  getNews,
  getNewsImage,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
