const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const taskSchema = new mongoose.Schema(
  {
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sections',
      required: true,
    },

    title: {
      type: String,
      default: ``,
    },
    content: {
      type: String,
      default: ``,
    },
    position: {
      type: Number,
    },
  },
  schemaOptions,
);

module.exports = mongoose.model('tasks', taskSchema);
