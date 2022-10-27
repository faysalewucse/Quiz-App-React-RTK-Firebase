import React from "react";
import { useDispatch } from "react-redux";
import QuizCard from "../components/cards/QuizCard";
import AddQuizModal from "../components/modals/AddQuizModal";
import { controlAddQuizModal } from "../features/modal/modalSlice";

export default function Home() {
  const dispatch = useDispatch();
  const createQuizHandler = () => {
    dispatch(controlAddQuizModal());
  };

  return (
    <div className="p-10">
      <div className="mb-20">
        <button
          onClick={createQuizHandler}
          className="bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-900 hover:to-blue-600 px-4 py-2 font-semibold text-white rounded float-right"
        >
          Create Quiz +
        </button>
      </div>
      <h1 className="text-3xl font-bold">My Quizes</h1>
      <h1 className="text-xl text-blue-900 mt-2 ">End</h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-5">
        <QuizCard
          quizName={"Exam 1"}
          duration={"50 Minutes"}
          students={"25 Students"}
          date={"25/10/2022"}
          type={"end"}
        />
        <QuizCard
          quizName={"Exam 2"}
          duration={"50 Minutes"}
          students={"25 Students"}
          date={"25/10/2022"}
          type={"end"}
        />
        <QuizCard
          quizName={"Exam 3"}
          duration={"50 Minutes"}
          students={"25 Students"}
          date={"25/10/2022"}
          type={"end"}
        />
        <QuizCard
          quizName={"Exam 4"}
          duration={"50 Minutes"}
          students={"25 Students"}
          date={"25/10/2022"}
          type={"end"}
        />
        <QuizCard
          quizName={"Exam 5"}
          duration={"50 Minutes"}
          students={"25 Students"}
          date={"25/10/2022"}
          type={"end"}
        />
        <QuizCard
          quizName={"Exam 6"}
          duration={"50 Minutes"}
          students={"25 Students"}
          date={"25/10/2022"}
          type={"end"}
        />
      </div>
      <h1 className="text-xl text-green-700 my-2 ">Running</h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-5">
        <QuizCard
          quizName={"Exam 1"}
          duration={"50 Minutes"}
          students={"25 Students"}
          date={"25/10/2022"}
        />
        <QuizCard
          quizName={"Exam 1"}
          duration={"50 Minutes"}
          students={"25 Students"}
          date={"25/10/2022"}
        />
      </div>
      <AddQuizModal />
    </div>
  );
}
