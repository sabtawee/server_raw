const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAnnounce = async (req, res) => {
  try {
    const response = await prisma.announce.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getAnnounceById = async (req, res) => {
  try {
    const response = await prisma.announce.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createAnnounce = async (req, res) => {
    const { note } = req.body;
    try {
        const response = await prisma.announce.create({
            data: {
                note: note,
            },
        });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateAnnounce = async (req, res) => {
    const { note } = req.body;
    const { id } = req.params;
    try {
        const response = await prisma.announce.update({
            where: {
                id: Number(id),
            },
            data: {
                note: note,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const deleteAnnounce = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await prisma.announce.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    getAnnounce,
    getAnnounceById,
    createAnnounce,
    updateAnnounce,
    deleteAnnounce,
};
