import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuizCard from "../components/cards/QuizCard";
import ParticipateQuizModal from "../components/modals/ParticipateQuizModal";
import NoDataYet from "../components/NoDataYet";
import { useAuth } from "../contexts/AuthContext";
import { controlParticipateModal } from "../features/modal/modalSlice";

export default function MyPage() {
  //get current user UID
  const { uid } = useAuth().currentUser;

  //style
  const navLinkStyle =
    "bg-black text-white py-1 rounded hover:opacity-100 cursor-pointer px-3";
  //all data
  const [myQuizes, setMyQuizes] = useState([]);
  const [myParticipation, setMyParticipation] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nav, setNav] = useState("myquizes");

  useEffect(() => {
    const db = getDatabase();
    const myQuizesRef = ref(db, `${uid}/myquizes`);
    const myParticipationRef = ref(db, `${uid}/participations`);

    onValue(myQuizesRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        const quizesData = childSnapshot.val();
        data.push(quizesData);
      });
      setMyQuizes(data);
    });

    onValue(myParticipationRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        const participationData = childSnapshot.val();
        data.push(participationData);
      });
      setMyParticipation(data);
    });
  }, [uid]);

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
      <div className="flex gap-1 mb-5">
        <h6
          onClick={() => setNav("myquizes")}
          className={`${navLinkStyle} ${
            nav === "myquizes" ? "opacity-100" : "opacity-50"
          }`}
        >
          My Quizes
        </h6>
        <h6
          onClick={() => setNav("participation")}
          className={`${navLinkStyle} ${
            nav === "participation" ? "opacity-100" : "opacity-50"
          }`}
        >
          Participation
        </h6>
      </div>
      <div className="border border-indigo-400 rounded p-10">
        {nav === "myquizes" ? (
          <div>
            {myQuizes?.length !== 0 ? (
              <div>
                <h3 className="font-bold mb-5">My Quizes</h3>
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-5">
                  {myQuizes?.map((quiz, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => navigate(`/editQuiz/${quiz.joinKey}`)}
                      >
                        <QuizCard
                          quizName={quiz.title}
                          date={quiz.created_time}
                          duration={quiz.duration}
                          students={25}
                          type={quiz.type}
                          key={quiz.joinKey}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <NoDataYet text={"You didn't created any quiz yet!"} />
            )}
          </div>
        ) : (
          <div>
            {myParticipation?.length !== 0 ? (
              <div>
                <h3 className="font-bold mb-5">My Participation(s)</h3>
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-5">
                  {myParticipation?.map((data, index) => {
                    let { quizinfo, submission, key } = data;
                    console.log(myParticipation);
                    submission = JSON.parse(submission);
                    return (
                      <div
                        key={index}
                        onClick={() => navigate(`/result/${key}`)}
                      >
                        <QuizCard
                          quizName={quizinfo.title}
                          duration={quizinfo.duration}
                          students={25}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <NoDataYet text={"You didn't participate any quiz yet!"} />
            )}
          </div>
        )}
      </div>
      <button
        onClick={() => navigate("/createQuiz")}
        className="md:absolute md:my-0 my-5 bottom-10 right-10 bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-900 hover:to-blue-600 px-4 py-2 font-semibold text-white rounded float-right"
      >
        Create Quiz +
      </button>
      <ParticipateQuizModal />
    </div>
  );
}
