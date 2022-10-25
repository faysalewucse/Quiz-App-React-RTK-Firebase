import React from "react";
import QuizCard from "../components/cards/QuizCard";

export default function Home() {
  return (
    <div className="p-10">
      <div className="mb-20">
        <button className="bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-900 hover:to-blue-600 px-4 py-2 font-semibold text-white rounded float-right">
          Create Quiz +
        </button>
        <h1 className="text-3xl font-bold">My Quizes</h1>
      </div>
      <div className="grid md:grid-cols-4 gap-5">
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
        <QuizCard
          quizName={"Exam 1"}
          duration={"50 Minutes"}
          students={"25 Students"}
          date={"25/10/2022"}
        />
      </div>
    </div>
  );
}
