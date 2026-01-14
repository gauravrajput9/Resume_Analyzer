import mongoose from "mongoose";

const ResumeResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    result: {
      type: Object, 
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 5, 
    },
  },
  {
    timestamps: false, 
  }
);

export default mongoose.models.Resume ||
  mongoose.model("Resume", ResumeResultSchema);
