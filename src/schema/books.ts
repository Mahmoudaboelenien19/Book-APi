import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 4,
    maxLength: 50,

    required: true,
  },
  author: {
    type: String,
    minLength: 4,
    maxLength: 20,
    required: true,
  },
  price: {
    type: Number,
    min: 5,
    max: 150,
    required: true,
  },
  pages: {
    type: Number,
    min: 400,
    required: true,
    max: 2000,
  },
  stock: {
    type: Number,
    min: 1,
    max: 500,
    required: true,
  },
});

export default mongoose.model("Book", booksSchema);
