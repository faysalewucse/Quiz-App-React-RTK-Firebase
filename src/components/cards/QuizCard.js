import React from "react";
import millisToMinutesAndSeconds from "../../utils/MilliSecondConverter";

export default function QuizCard({ quizName, duration, students, date, type }) {
  var d = new Date(date);

  return (
    <div className="font-bold bg-gradient-to-tr from-indigo-700 to-blue-400 hover:shadow-xl transition-all duration-300 p-5 rounded-md cursor-pointer">
      <h6 className="text-white mb-2">{quizName}</h6>
      <div className="flex items-center bg-white rounded-md px-1">
        <ion-icon name="alarm-outline"></ion-icon>
        <h6 className="ml-1">
          {duration === 0 ? "Unlimited" : millisToMinutesAndSeconds(duration)}
        </h6>
      </div>
      <div className="flex items-center bg-blue-200 rounded-md px-1 mt-1">
        <ion-icon name="people-outline"></ion-icon>
        <h6 className=" rounded-md ml-1">{students} Student</h6>
      </div>
      <div className="flex items-center bg-blue-900 text-white rounded-md px-1 mt-1">
        <ion-icon name="calendar-outline"></ion-icon>
        <span className="rounded-md ml-1 p-1">{d.toLocaleString()}</span>
      </div>
      <h6 className="text-center bg-white rounded-md mt-3 hover:bg-gray-100">
        {}
      </h6>
    </div>
  );
}
