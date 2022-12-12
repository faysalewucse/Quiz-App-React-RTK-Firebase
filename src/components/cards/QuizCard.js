import React from "react";
import millisToMinutesAndSeconds from "../../utils/MilliSecondConverter";

export default function QuizCard({ quizName, duration, startDate, endDate }) {
  return (
    <div className="font-bold bg-gradient-to-tr from-indigo-700 to-blue-400 hover:shadow-xl transition-all duration-300 p-5 rounded-md cursor-pointer">
      <h6 className="text-white mb-2">{quizName}</h6>
      <div className="flex items-center bg-white rounded-md px-1">
        <ion-icon name="alarm-outline"></ion-icon>
        <h6 className="ml-1">
          {duration === 0 ? "Unlimited" : millisToMinutesAndSeconds(duration)}
        </h6>
      </div>
      <h6 className="bg-green-200 text-sm rounded my-2 text-center">
        Start: {new Date(startDate).toLocaleString()}
      </h6>
      <h6 className="bg-red-200 text-sm rounded text-center">
        End: {new Date(endDate).toLocaleString()}
      </h6>
    </div>
  );
}
