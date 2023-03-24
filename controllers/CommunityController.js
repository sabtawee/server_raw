const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCommunity = async (req, res) => {
    try {
        const community = await prisma.community.findMany();
        res.status(200).json(community);        
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
};

const getCommunityById = async (req, res) => {
    try {
        const { id } = req.params;
        const community = await prisma.community.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(community);        
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
};

const createCommunity = async (req, res) => {
    try {
        let link = req.body.link;
        const community = await prisma.community.create({
            data: {
                Link: link,
            },
        });
        res.status(201).json(community);        
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
};

const updateCommunity = async (req, res) => {
    try {
        const { id } = req.params;
        let link = req.body.link;
        const community = await prisma.community.update({
            where: { id: Number(id) },
            data: {
                Link: link,
            },
        });
        res.status(200).json(community);        
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
};

const deleteCommunity = async (req, res) => {
    try {
        const { id } = req.params;
        const community = await prisma.community.delete({
            where: { id: Number(id) },
        });
        res.status(200).json(community);        
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
};

module.exports = {
    getCommunity,
    getCommunityById,
    createCommunity,
    updateCommunity,
    deleteCommunity,
};