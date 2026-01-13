import mongoose from "mongoose";

const ResumeResultSchema = new mongoose.Schema(
  {
    result: {
      type: Object, // store full AI JSON safely
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ResumeResult ||
  mongoose.model("ResumeResult", ResumeResultSchema);
