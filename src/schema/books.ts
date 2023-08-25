import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 4,
    maxLength: 50,
  },
  author: {
    type: String,
    minLength: 4,
    maxLength: 20,
  },
  price: {
    type: Number,
    min: 5,
    max: 150,
  },
  pages: {
    type: Number,
    min: 400,
    max: 2000,
  },
  stock: {
    type: Number,
    min: 1,
    max: 500,
  },
});

export default mongoose.model("Book", booksSchema);
