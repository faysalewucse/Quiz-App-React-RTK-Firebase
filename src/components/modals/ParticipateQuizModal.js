import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { controlParticipateModal } from "../../features/modal/modalSlice";
export default function ParticipateQuizModal() {
  //Dispatcher
  const dispatch = useDispatch();

  //page navigator
  const navigate = useNavigate();
  //initial Variables
  const { participateModal: open } = useSelector((state) => state.modal) || {};

  //Variables
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(controlParticipateModal());
    navigate(`/participateQuiz/${code.trim()}`);
  };

  return (
    open && (
      <>
        <div
          onClick={() => {
            dispatch(controlParticipateModal());
            setCode("");
          }}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-3/4 overflow-auto lg:w-2/5 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h3 className="mt-6 text-center font-extrabold text-gray-900">
            Participate in an Exam
          </h3>
          <form className="mt-8" onSubmit={handleSubmit}>
            <input
              name="code"
              type="text"
              required
              className="appearance-none rounded relative block w-full px-3 py-2 border border-blue-500 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mb-5"
              placeholder="Enter Quiz Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Enter
            </button>
          </form>
        </div>
      </>
    )
  );
}
