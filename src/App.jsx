import { useEffect, useState } from "react";

import {
  getTasks,
  saveTasks,
  getBlockedLinks,
  setBlockedLinks,
  getPoints,
  setPointsC,
} from "../background/background";
import Countdown from "react-countdown";
import Settings from "./Settings";
import ToDo from "./ToDo";
import Header from "./Header";
import SetTimer from "./SetTimer";
function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [points, setPoints] = useState(0);
  const [settings, setSettings] = useState({ page: "score" });
  const [links, setLinks] = useState([]);
  const [link, setLink] = useState();
  const [timer, setTimer] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    getTasks((loadedTasks) => {
      setTasks(loadedTasks);
    });
    getBlockedLinks((loadedLinks) => {
      setLinks(loadedLinks);
    });
    getPoints((ls) => {
      setPoints(ls);
    });
  }, []);
  // timer
  useEffect(() => {
    chrome.runtime.sendMessage({ type: "get-timer" }, (response) => {
      setTimer(response.seconds);
      if (response.seconds) {
        setIsStarted(true);
      }
    });

    const listener = (message) => {
      if (message.type === "update-timer") {
        setTimer(message.seconds);
      }
      if (message.type == "pointsUpdate") {
        getPoints((ls) => {
          setPoints(ls * 1 + Math.floor(message.points));
          // setPointsC(ls * 1 + Math.floor(message.points));
        });
      }
    };
    chrome.runtime.onMessage.addListener(listener);
    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, []);

  const startTimer = () => {
    chrome.runtime.sendMessage({ type: "start-timer", duration: timer * 60 });
    setTimer(timer * 60);
    setIsStarted((v) => !v);
  };
  const endTimer = () => {
    chrome.runtime.sendMessage({ type: "clear-timer" });
  };

  function handleAddTask(e) {
    e.preventDefault();
    const length = tasks.length;
    const newTask = {
      task,
      id: length + 1,
      isCompleted: false,
      isStarted: false,
    };
    const t = [...tasks, newTask];
    setTask("");
    saveTasks(t, () => {
      console.log("Task saved");
    });
    setTasks(t);
  }

  function handleLink(e) {
    e.preventDefault();
    const length = links.length;
    const newLink = {
      link,
      id: length + 1,
    };
    const t = [...links, newLink];
    setLink("");
    setBlockedLinks(t, () => {
      console.log("Task saved");
    });
    setLinks(t);
  }

  function handleCompTask(task) {
    const id = task.id;
    const updatedTasks = tasks.map((task) => {
      if (task.id == id) {
        const isOver = task.isCompleted;
        const uptask = { ...task, isCompleted: !isOver };
        return uptask;
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
    saveTasks(updatedTasks, () => {
      console.log("Task saved");
    });
  }

  function handleDelete(task) {
    const id = task.id;
    const updatedTasks = tasks.filter((t) => {
      return t.id != id;
    });
    saveTasks(updatedTasks, () => {
      console.log("Task saved");
    });
    setTasks(updatedTasks);
  }
  function handleDeleteLink(link) {
    const id = link.id;
    const updatedLinks = links.filter((t) => {
      return t.id != id;
    });
    setBlockedLinks(updatedLinks, () => {
      console.log("Task saved");
    });
    setLinks(updatedLinks);
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <p className="text-xl font-semibold text-white">Good Job !!</p>;
    } else {
      // Render a countdown
      return (
        <div className="text-3xl font-semibold text-white w-fulls  p-2 px-4 bg-[#55AD9B]  rounded-xl ">
          {hours > 9 ? hours : "0" + hours}:
          {minutes > 9 ? minutes : "0" + minutes}:
          {seconds > 9 ? seconds : "0" + seconds}
        </div>
      );
    }
  };
  return (
    <div className="w-[30rem] p-3 m-2  border-zinc-950 h-[32rem] bg-[#55AD9B]">
      <Header setSettings={setSettings} />
      <div>
        {settings.page == "BlockURL" ? (
          <Settings
            handleLink={handleLink}
            setLink={setLink}
            link={link}
            links={links}
            handleDeleteLink={handleDeleteLink}
          />
        ) : settings.page == "todo" ? (
          <ToDo
            handleAddTask={handleAddTask}
            setTask={setTask}
            setTasks={setTasks}
            handleCompTask={handleCompTask}
            handleDelete={handleDelete}
            tasks={tasks}
            task={task}
          />
        ) : (
          <>
            <div className=" h-full my-5">
              {/* <h2 className="text-3xl text-center w-full font-bold mt-2 ">
                Score
              </h2> */}
              <div className=" h-full bg-[#F1F8E8] rounded w-[90%] py-10 m-auto flex items-center justify-center my-4">
                <svg
                  fill="#55AD9B"
                  viewBox="0 0 16 16"
                  height="5rem"
                  width="5rem"
                  // {...props}
                  // className="animate-bounce"
                >
                  <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15z" />
                </svg>
                <span className="font-bold text-4xl mx-2">{points}</span>
              </div>
            </div>
            <div className="border text-center p-2 mx-5 rounded bg-[#F1F8E8] mt-5">
              <span className="text-sm">
                <b>Note:</b> Points will be rewarded as multiples of your focus
                time
              </span>
            </div>
            <div className="flex justify-between">
              <h2 className="text-2xl text-center w-full font-bold my-3 ">
                Focus-Mode
              </h2>
            </div>
            <div className="  flex justify-center items-center ">
              {isStarted ? (
                <div>
                  <Countdown
                    renderer={renderer}
                    date={Date.now() + timer * 1000}
                  ></Countdown>
                </div>
              ) : (
                <SetTimer setTimer={setTimer} timer={timer} />
              )}
            </div>
            <div className="flex justify-center ml-2 items-center mt-3">
              <button
                onClick={() => {
                  if (!isStarted && timer == 0) return;
                  startTimer();
                  if (isStarted) {
                    endTimer();
                    setTimer(0);
                  }
                }}
                className={`  ${
                  isStarted
                    ? " bg-red-600 hover:bg-red-500 "
                    : "bg-[#55AD9B] hover:bg-[#95D2B3] "
                }  text-white transition-colors focus:outline-none focus:ring-[#a3b18a] font-medium rounded-lg text-sm p-2 px-3 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                {isStarted ? "END" : "START"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
