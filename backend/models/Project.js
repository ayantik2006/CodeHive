import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },

  owner: {
    type: String,
    default: "",
  },

  language: {
    type: String,
    default: "",
  },

  visibility: {
    type: String,
    default: "public",
  },

  collaborators: {
    type: Array,
    default: [],
  },

  files: {
    type: Array,
    default: [],
  },

  creationTime: { type: Number, default: 0 },

  editedTime: { type: Number, default: 0 },
});

export default mongoose.model("Project", schema);
