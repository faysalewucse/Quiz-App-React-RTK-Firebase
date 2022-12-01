import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ParticipateQuizModal from "../components/modals/ParticipateQuizModal";
import { controlParticipateModal } from "../features/modal/modalSlice";

export default function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const participateHandler = () => {
    dispatch(controlParticipateModal());
  };

  return (
    <div className="max-w-7xl mx-auto p-10">
      <button
        onClick={participateHandler}
        className="bg-blue-600 text-white p-2 rounded w-full mb-3 hover:bg-blue-700 text-xl"
      >
        Participate in Quiz
      </button>
      <button
        onClick={() => navigate("/createQuiz")}
        className="absolute bottom-10 right-10 bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-900 hover:to-blue-600 px-4 py-2 font-semibold text-white rounded float-right"
      >
        Create Quiz +
      </button>
      <div className="border border-indigo-400 rounded p-10">
        {/* <div>
          <h3 className="font-bold">My Quizes</h3>
          <h1 className="text-xl text-green-600 font-bold my-2 ">Running</h1>
          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-5"></div>
          <h6 className="text-red-500 font-bold mt-2 ">End</h6>
          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-5">
            <QuizCard
              key={1}
              quizName={"Exam 1"}
              duration={"50 Minutes"}
              students={"25 Students"}
              date={"25/10/2022"}
              type={"end"}
            />
          </div>
        </div> */}
        <div className="text-center">
          <i className="fa-solid fa-ban text-9xl opacity-80 mb-5"></i>
          <h3>You Didn't completed any Quiz Yet.</h3>
        </div>
      </div>
      <ParticipateQuizModal />
    </div>
  );
}
