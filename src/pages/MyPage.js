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
import png1 from "../assets/png1.png";
import png2 from "../assets/png2.png";

export default function MyPage() {
  //get current user UID
  const { uid } = useAuth().currentUser;

  //style
  const navLinkStyle =
    "border rounded text-white hover:opacity-100 cursor-pointer px-4 py-2 text-sm font-bold";
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
    <div className="bg-gradient-to-b from-indigo-700 to-blue-600 h-screen">
      <div className="max-w-7xl mx-auto p-10">
        <img
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 -z-10"
          src="images/bg.svg"
          alt="background"
        />
        <div className="flex justify-between gap-1 mb-5">
          <div className="flex gap-2">
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
          <button
            onClick={participateHandler}
            className="bg-white hover:from-blue-900 hover:to-blue-600 px-4 font-semibold rounded float-right"
          >
            Participate in Quiz
          </button>
        </div>
        <div className="border-t-2 border-indigo-400 rounded py-10">
          {nav === "myquizes" ? (
            <div>
              {myQuizes?.length !== 0 ? (
                <div>
                  <h3 className="font-bold mb-5 text-white">My Quizes</h3>
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
                            startDate={quiz.startDate}
                            endDate={quiz.endDate}
                            alwaysPublic={quiz.alwaysPublic}
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
                  <h3 className="font-bold mb-5 text-white">
                    My Participation(s)
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-5">
                    {myParticipation?.map((data, index) => {
                      let { quizinfo, key } = data;
                      //submission = JSON.parse(submission);
                      return (
                        <div
                          key={index}
                          onClick={() => navigate(`/result/${key}`)}
                        >
                          <QuizCard
                            quizName={quizinfo.title}
                            duration={quizinfo.duration}
                            startDate={quizinfo.startDate}
                            endDate={quizinfo.endDate}
                            alwaysPublic={quizinfo.alwaysPublic}
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
          className="md:absolute md:my-0 my-5 bottom-10 right-10 bg-white px-4 py-2 font-semibold rounded float-right"
        >
          Create Quiz +
        </button>

        <div className="absolute top-1/2 right-5">
          <img src={png1} alt="png1" />
        </div>
        <div className="absolute bottom-0 left-0">
          <img src={png2} alt="png2" />
        </div>
        <ParticipateQuizModal />
      </div>
    </div>
  );
}
