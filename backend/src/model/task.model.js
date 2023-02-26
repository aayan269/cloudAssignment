const {model,Schema} = require("mongoose");
const TaskSchema = new Schema(
  {
    task_title: { type: String, required: true },
    task_description: { type: String, required: true },
    status: { type: String, required: true },
    user_id: { type: String},
  },
  {
    timestamps: true,
  }
);

const TaskModel = model("Task", TaskSchema);

module.exports =  TaskModel

