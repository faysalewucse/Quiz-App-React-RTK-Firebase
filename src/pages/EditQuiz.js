import React from "react";
import { useParams } from "react-router-dom";

export default function EditQuiz() {
  const joinKey = useParams().joinKey;

  return (
    <div className="max-w-7xl mx-auto p-5 md:p-10">
      <h6 className="font-bold">
        <span>Join Link: </span>
        <div className="flex">
          <span className="font-thin text-blue-500 mr-5">
            localhost:3000/participateQuiz/{joinKey}
          </span>
          <span>
            <i className="fa-solid fa-share-nodes cursor-pointer"></i>
          </span>
        </div>
      </h6>
      <span className="bg-black my-2 text-white p-1 rounded text-center">
        Copied To Clipboard
      </span>
    </div>
  );
}
