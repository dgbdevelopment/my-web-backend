const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    languages: {
      type: String,
      required: true,
    },
    links: {
      type: Array,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    priority: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("Project", ProjectSchema);
