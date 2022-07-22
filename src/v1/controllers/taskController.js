const Task = require('../models/taskModel');
const Section = require('../models/sectionModel');

const taskController = {
  create: async (req, res) => {
    const { sectionId } = req.body;
    try {
      const section = await Section.findById(sectionId);
      const tasksCount = await Task.find({ section: sectionId }).count();
      const newTask = await Task.create({
        section: sectionId,
        position: tasksCount > 0 ? tasksCount : 0,
      });
      newTask._doc.section = section;
      res.status(200).json({ task: newTask });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updatePosition: async (req, res) => {
    const { sourceList, desList, sourceSectionId, desSectionId } = req.body;
    const sourceListReverse = sourceList.reverse();
    const desListReverse = desList.reverse();

    try {
      if (sourceSectionId !== desSectionId) {
        for (const key in sourceListReverse) {
          const task = sourceListReverse[key];
          await Task.findByIdAndUpdate(task._id, {
            $set: { position: key, section: sourceSectionId },
          });
        }
      }
      for (const key in desListReverse) {
        const task = desListReverse[key];
        await Task.findByIdAndUpdate(task._id, {
          $set: { position: key, section: desSectionId },
        });
      }

      res.status(200).json('Updated');
    } catch (error) {
      res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    const { taskId } = req.params;
    try {
      const task = await Task.findByIdAndUpdate(taskId, {
        $set: req.body,
      });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  delete: async (req, res) => {
    const { taskId } = req.params;

    try {
      const currentTask = await Task.findById(taskId);
      await Task.findByIdAndDelete(taskId);
      const tasks = await Task.find({ section: currentTask.section }).sort(
        'position',
      );
      for (const key in tasks) {
        const item = tasks[key];
        await Task.findByIdAndUpdate(item._id, {
          $set: { position: key },
        });
      }
      res.status(200).json('deleted');
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = taskController;
