import mongoose, { Schema } from 'mongoose';

const TodoSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model('todo', TodoSchema);
export default Todo;
