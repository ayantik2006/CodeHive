import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    languages: [
      {
        type: String,
        enum: ["cpp", "java", "node", "python"],
        required: true,
      }
    ],

    visibility: {
      type: String,
      enum: ["public", "collaborators", "private"],
      default: "private",
    },

    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],

    files: [
      {
        name: String,
        path: String,
        language: String,
        content: {
          type: String,
          default: "",
        },
      }
    ],
  },

);

export default mongoose.model("Project", projectSchema);
