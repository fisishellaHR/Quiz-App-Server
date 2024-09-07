import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  passGrade: Number,
});

const QuizCSS = mongoose.model("QuizCSS", quizSchema);

export default QuizCSS;
