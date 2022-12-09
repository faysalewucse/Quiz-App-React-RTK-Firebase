import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getDatabase, onValue, ref } from "firebase/database";
import Loading from "../utils/Loading";
import Error from "../utils/Error";

export default function Result() {
  //current user UID
  const { uid } = useAuth().currentUser;

  //initiallize variables
  const key = useParams().key;
  const passMarks = 50;
  const [error, setError] = useState("");
  const [mySubmission, setMySubmission] = useState([]);
  let my_marks = 0,
    total_marks = 0;

  useEffect(() => {
    const db = getDatabase();
    const participationsRef = ref(db, `${uid}/participations/${key}`);

    onValue(participationsRef, (snapshot) => {
      if (snapshot) {
        const { submission } = snapshot.val();
        setMySubmission(JSON.parse(submission));
        return;
      }
      return setError("No Data Available");
    });
  }, [key, uid]);

  const getColor = (number) => {
    if (number >= 50) return "green";
    else if (number < 50) return "red";
  };

  if (mySubmission) {
    mySubmission.forEach((question) => {
      total_marks += parseInt(question.mark);
      question.options.forEach((option) => {
        if (
          question.answer.indexOf(option.value) !== -1 &&
          question.correct_answer.indexOf(option.value) === -1
        ) {
          my_marks += parseInt(question.mark);
        }
      });
    });
    console.log(total_marks, my_marks);
  }
  return (
    <div>
      <div className="max-w-7xl mx-auto p-10">
        <h1 className="my-10 text-center">
          {my_marks} / {total_marks}
        </h1>
        <div style={{ width: 200, height: 200, margin: "auto" }}>
          <CircularProgressbar
            value={(my_marks / total_marks) * 100}
            text={`${(my_marks / total_marks) * 100}%`}
            strokeWidth="10"
            styles={{
              path: {
                // Path color
                stroke: `${getColor((my_marks / total_marks) * 100)}`,
              },
              text: {
                fill: "#000000",
              },
            }}
          />
          ;
        </div>
        <h4 className="my-5 text-center">
          {(my_marks / total_marks) * 100 >= passMarks && "Congratulation!"}{" "}
          <br /> You Got {(my_marks / total_marks) * 100}% marks
        </h4>
        <h4 className="font-bold my-5">Solutions:</h4>
        <div>
          {mySubmission ? (
            <div>
              {mySubmission?.map((question) => {
                return (
                  <div key={question.id} className="my-5">
                    <h6 className="font-bold text-2xl">
                      {question.id}. {question.question}{" "}
                    </h6>

                    <div className="ml-5 grid grid-cols-1 md:grid-cols-2">
                      {question.options.map((option, index) => {
                        return (
                          <div
                            key={index}
                            id={`question${question.id}`}
                            className={`flex items-center gap-5 m-2 py-2 px-5 ${
                              question.correct_answer.indexOf(option.value) !==
                              -1
                                ? "bg-green-500 text-white"
                                : "bg-indigo-200"
                            } ${
                              question.answer.indexOf(option.value) !== -1 &&
                              question.correct_answer.indexOf(option.value) ===
                                -1
                                ? "bg-red-500 text-white"
                                : "bg-indigo-200"
                            } shadow-md rounded-3xl`}
                          >
                            {question.correct_answer.indexOf(option.value) !==
                              -1 && (
                              <i className="fa-solid fa-circle-check text-2xl"></i>
                            )}
                            <h6 className="text-2xl">{option.value}</h6>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div>{!error ? <Loading /> : <Error msg={error} />}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
