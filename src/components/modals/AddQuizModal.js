import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { controlAddQuizModal } from "../../features/modal/modalSlice";
export default function AddQuizModal() {
  //Dispatcher
  const dispatch = useDispatch();

  //initial Variables
  const { addQuizModal: open } = useSelector((state) => state.modal) || {};

  //Variables
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("radio");

  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (value) => {
    setName(value);
  };

  const handleNameSearch = debounceHandler(doSearch, 500);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //   await addTeam({
    //     data: {
    //       creator: myEmail,
    //       name: name,
    //       title: title,
    //       color: getColor(),
    //       date: new Date().getTime(),
    //       members: myEmail,
    //     },
    //   });
    //   dispatch(controlTeamModal());
  };

  const handleType = (e) => {
    setType(e.target.value);
  };
  return (
    open && (
      <>
        <div
          onClick={() => {
            dispatch(controlAddQuizModal());
            setName("");
            setTitle("");
          }}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-3/4 lg:w-3/5 space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Quiz
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
              <div>
                <input
                  name="title"
                  type="text"
                  required
                  className="appearance-none rounded mb-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="p-2 border border-blue-300 rounded border-l-8">
                <div className="flex gap-4 items-center">
                  <h1>1</h1>
                  <input
                    name="title"
                    type="text"
                    required
                    className="appearance-none rounded relative block w-2/3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Question"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <select
                    name="type"
                    id="question-type"
                    className="border border-gray-300 p-1.5 rounded w-1/3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                    onChange={handleType}
                  >
                    <option value="radio">Radio</option>
                    <option value="checkbox">CheckBox</option>
                    <option value="text">Dropdown</option>
                    <option value="file">File Uplaod</option>
                  </select>
                </div>
                <div className="ml-10 mt-2">
                  {type !== "text" && <input type={type} />}
                  {type !== "file" && (
                    <input
                      type="text"
                      className="border ml-5 px-2"
                      placeholder="Option 1"
                    />
                  )}
                  {type !== "file" && (
                    <h1 className="text-center w-1/4 mt-2 cursor-pointer text-blue-700 font-bold border border-blue-600">
                      Add Option+
                    </h1>
                  )}
                </div>
              </div>
              <div>
                <h1 className="block mx-auto w-1/4 rounded-sm py-1 text-center text-white my-5 bg-green-700 cursor-pointer hover:bg-green-800">
                  Add Question +
                </h1>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Team
              </button>
            </div>
          </form>
        </div>
      </>
    )
  );
}
