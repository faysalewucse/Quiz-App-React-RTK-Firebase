import React from "react";
import millisToMinutesAndSeconds from "../../utils/MilliSecondConverter";

export default function QuizCard({
  quizName,
  duration,
  startDate,
  endDate,
  alwaysPublic,
}) {
  return (
    <div className="font-bold bg-white hover:shadow-xl transition-all duration-300 p-5 rounded-md cursor-pointer">
      <h6 className="text-indigo-500 mb-2">{quizName}</h6>
      <div className="flex items-center bg-white rounded-md px-1">
        <ion-icon name="alarm-outline"></ion-icon>
        <h6 className="ml-1">
          {alwaysPublic ? "Unlimited" : millisToMinutesAndSeconds(duration)}
        </h6>
      </div>
      {alwaysPublic ? (
        <h6 className="bg-green-200 text-sm rounded my-2 text-center">
          Always Open
        </h6>
      ) : (
        <div>
          <h6 className="bg-indigo-500 text-white text-sm rounded my-2 py-1 px-2">
            Start: {new Date(startDate).toLocaleString()}
          </h6>
          <h6 className="bg-indigo-500 text-white text-sm rounded py-1 px-2">
            End: {new Date(endDate).toLocaleString()}
          </h6>
        </div>
      )}
    </div>
  );
}
