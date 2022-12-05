import React from "react";
import { useParams } from "react-router-dom";

export default function EditQuiz() {
  const joinKey = useParams().joinKey;

  return (
    <div className="max-w-7xl mx-auto p-10">
      <h6 className="font-bold">Join Key: {joinKey}</h6>
    </div>
  );
}
