const Section = require('../models/sectionModel');
const Task = require('../models/taskModel');

const sectionController = {
  create: async (req, res) => {
    const { boardId } = req.params;
    try {
      const section = await Section.create({ board: boardId });
      section._doc.tasks = [];
      res.status(201).json({ section });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    const { sectionId } = req.params;
    try {
      const section = await Section.findByIdAndUpdate(sectionId, {
        $set: req.body,
      });
      section._doc.tasks = [];
      res.status(201).json({ section });
    } catch (error) {
      res.status(500).josn(error);
    }
  },

  delete: async (req, res) => {
    const { sectionId } = req.params;

    try {
      await Task.deleteMany({ section: sectionId });
      await Section.findByIdAndDelete(sectionId);
      res.status(200).json('Deleted');
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = sectionController;
