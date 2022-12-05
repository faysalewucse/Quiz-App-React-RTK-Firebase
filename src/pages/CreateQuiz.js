import { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";
import Alert from "../utils/Alert";
import Button from "../components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function CreateQuiz() {
  //page navigator
  const navigate = useNavigate();
  //get current user
  const { uid, displayName } = useAuth().currentUser;

  //Variables
  const [title, setTitle] = useState(""); //question title
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [alwaysPublic, setAlwaysPublic] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  // const [emails, setEmails] = useState([]);
  // const [email, setEmail] = useState("");

  const [alertVisibility, setalertVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      options: [{ id: 1, value: "" }],
      type: "radio",
      required: false,
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!alwaysPublic) {
      if (Date.now() > startDate || startDate > endDate) {
        return toast.error(
          "Start Time should greater then present Time and End Time should greater then start Time"
        );
      }
    }

    try {
      setLoading(true);
      const db = getDatabase();
      const quizRef = ref(
        db,
        `${uid}/myquizes/${Date.now().toString(36).toUpperCase()}`
      );
      await set(quizRef, {
        title: title,
        joinKey: quizRef.key,
        creator_uid: uid,
        creator_name: displayName,
        created_time: Date.now(),
        duration: alwaysPublic ? "0" : endDate - startDate,
        startDate: alwaysPublic ? "null" : startDate.toString(),
        endDate: alwaysPublic ? "null" : endDate.toString(),
        alwaysPublic: alwaysPublic,
        questions: JSON.stringify(questions),
      });
      toast.success("Assesment added successfully!");
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error(error.message);
    }

    //dispatch(controlAddQuizModal());
  };

  //Add Question Function
  const addQuestionHandler = () => {
    setQuestions((prevQuestions) => {
      return [
        ...prevQuestions,
        {
          id: prevQuestions.length + 1,
          question: "",
          options: [{}],
          type: "radio",
        },
      ];
    });
  };

  //Type Change Function
  const handleQuestion = (e, question) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((q) => {
        if (q.id === question.id) {
          return {
            ...q,
            question: e.target.value,
          };
        } else return q;
      });
    });
  };

  //Required Handler Function
  const setRequiredHandler = (question, required) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((q) => {
        if (q.id === question.id) {
          return {
            ...q,
            required: !required,
          };
        } else return q;
      });
    });
  };
  console.log(questions);
  //Type Change Function
  const handleType = (e, question) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((q) => {
        if (q.id === question.id) {
          return {
            ...q,
            type: e.target.value,
          };
        } else return q;
      });
    });
  };

  //Add Option Function
  const handleOption = (question) => {
    if (question.options.length < 4) {
      setQuestions((prevQuestions) => {
        return prevQuestions.map((q) => {
          if (q.id === question.id) {
            return {
              ...q,
              options: [...q.options, { id: q.options.length + 1, value: "" }],
            };
          } else return q;
        });
      });
    } else {
      setalertVisibility(true);
      setTimeout(() => {
        setalertVisibility(false);
      }, 1500);
    }
  };

  //Option Onchange Function
  const setOptionValue = (e, question, id) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((q) => {
        if (q.id === question.id) {
          return {
            ...q,
            options: q.options.map((option) => {
              if (id === option.id) {
                return {
                  id: id,
                  value: e.target.value,
                };
              } else return option;
            }),
          };
        } else return q;
      });
    });
  };

  //Remove Question Function
  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions((prevQuestions) => {
        return prevQuestions.filter((question) => question.id !== id);
      });
    } else {
    }
  };

  //Option Deletion Function
  const deleteOptionHandler = (question, index) => {
    if (question?.options.length > 1) {
      setQuestions((prevQuestions) => {
        return prevQuestions.filter((ques) => {
          if (ques.id === question.id) {
            return (question.options = ques.options.filter(
              (option) => option.id !== index
            ));
          }
          return ques;
        });
      });
    } else {
    }
  };
  return (
    <div className="bg-indigo-100 min-h-screen p-10">
      <div className="max-w-7xl mx-auto md:px-24 px-2">
        <h3 className="text-center font-extrabold text-gray-900">Questions</h3>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="mt-5">
            <input
              name="title"
              type="text"
              required
              className="md:text-lg rounded w-full p-3 focus:z-10 focus:outline-none focus:shadow-md sm:text-sm shadow-sm font-bold"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-between my-5">
            <label className="flex items-center gap-5">
              <span className="font-bold">Always On for Exam</span>
              <Switch
                onChange={() => setAlwaysPublic(!alwaysPublic)}
                checked={alwaysPublic}
              />
            </label>
            <label className="flex items-center gap-5">
              <span className="font-bold">Set Target Emails</span>
              <Switch
                className="inline"
                onChange={() => setPrivacy(!privacy)}
                checked={privacy}
              />
            </label>
          </div>

          {privacy && (
            <div className="flex items-center">
              {/* {emails.length > 0 && (
                <div className="bg-white p-2">
                  {emails.map((email) => {
                    return <span>{email}</span>;
                  })}
                </div>
              )} */}
              <input
                type="text"
                placeholder="Features is Not Available. Just Keep The Join Key Secret"
                className="w-full p-2"
                // onChange={(e) => setEmail(e.target.value)}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     emails.push(email);
                //     setEmail("");
                //     console.log(emails);
                //   }
                // }}
              />
            </div>
          )}
          {!alwaysPublic ? (
            <div className="field md:flex justify-between my-5">
              <div className="md:flex gap-5 items-center">
                <h6 className="font-bold w-full">When exam Start?</h6>
                <DatePicker
                  selected={startDate}
                  className="p-2 rounded-md focus:outline-none shadow-sm hover:shadow-md"
                  showTimeSelect
                  dateFormat="Pp"
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <div className="md:flex gap-5 items-center">
                <h6 className="font-bold w-full">When exam End?</h6>
                <DatePicker
                  selected={endDate}
                  className="p-2 rounded-md focus:outline-none shadow-sm hover:shadow-md"
                  showTimeSelect
                  dateFormat="Pp"
                  minDate={new Date()}
                  onChange={(date) => setEndDate(date)}
                />
              </div>
            </div>
          ) : null}
          {questions?.map((question, index) => {
            return (
              <div
                key={index}
                className={`relative flex justify-between my-3 bg-white rounded-lg text-xl shadow-sm ${
                  question.type === "simple" ? "p-5" : "p-2"
                }`}
              >
                <div className="w-full p-2 rounded-lg">
                  <div>
                    <div className="flex flex-col md:flex-row gap-4 md:items-center">
                      <h6>{index + 1}.</h6>
                      <input
                        name="question"
                        type="text"
                        required
                        className="font-bold rounded relative block md:w-2/3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                        placeholder="Question"
                        value={question[index]}
                        onChange={(e) => handleQuestion(e, question)}
                      />
                      <select
                        name="type"
                        id="question-type"
                        className="border border-gray-300 p-1.5 rounded w-1/3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                        onChange={(e) => handleType(e, question)}
                      >
                        <option value="radio">Radio</option>
                        <option value="checkbox">CheckBox</option>
                        <option value="simple">Simple Text</option>
                        <option value="text">Dropdown</option>
                        <option value="file">File Uplaod</option>
                      </select>
                      <label className="flex items-center gap-5">
                        <span className="font-bold">Required</span>
                        <Switch
                          className="inline"
                          onChange={() =>
                            setRequiredHandler(question, question.required)
                          }
                          checked={question.required}
                        />
                      </label>
                    </div>
                    <div className="md:ml-10 mt-2">
                      {question.type !== "simple" ? (
                        <div>
                          {question.type !== "file" ? (
                            question?.options.map((option, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex gap-2 items-center my-1"
                                >
                                  {question.type === "radio" && (
                                    <ion-icon name="radio-button-off-outline"></ion-icon>
                                  )}
                                  {question.type === "checkbox" && (
                                    <ion-icon name="square-outline"></ion-icon>
                                  )}

                                  <input
                                    type="text"
                                    className="border rounded px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    onChange={(e) =>
                                      setOptionValue(e, question, option.id)
                                    }
                                    defaultValue={option.value}
                                    placeholder={`Option ${index + 1}`}
                                  />

                                  <i
                                    onClick={() =>
                                      deleteOptionHandler(question, index + 1)
                                    }
                                    className="fa-solid fa-circle-xmark opacity-70 hover:opacity-100"
                                  ></i>
                                </div>
                              );
                            })
                          ) : (
                            <input type="file" />
                          )}
                          {question.type !== "file" && (
                            <h1
                              onClick={() => handleOption(question)}
                              className="text-center md:w-1/4 w-2/5 mt-2 cursor-pointer bg-blue-700 text-white text-sm md:font-bold rounded hover:bg-blue-800 p-1"
                            >
                              Add Option+
                            </h1>
                          )}
                          {alertVisibility && (
                            <Alert
                              msg={"More then 4 option is not allow!"}
                              color={"bg-red-500"}
                            />
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <i
                  onClick={() => removeQuestion(question.id)}
                  className="fa-solid fa-trash absolute right-3 bottom-3 cursor-pointer opacity-80 hover:opacity-100"
                ></i>
              </div>
            );
          })}
          <div>
            <h6
              onClick={addQuestionHandler}
              className="rounded-sm py-1 text-center text-white my-5 bg-blue-800 cursor-pointer hover:bg-blue-900"
            >
              + Add Question
            </h6>
          </div>
          <Button loading={loading} text="Create" />
        </form>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}
