import mongoose from "mongoose";

interface ITask extends mongoose.Document {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  assignedTo: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

const TaskSchema = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
  }
);

// Índice para mejorar las consultas por usuario
TaskSchema.index({ assignedTo: 1 });

export default mongoose.model<ITask>("Task", TaskSchema);
