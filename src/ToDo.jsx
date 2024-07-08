import { Reorder } from "framer-motion";
function ToDo({
  handleAddTask,
  setTask,
  setTasks,
  tasks,
  task,
  handleCompTask,
  handleDelete,
}) {
  return (
    <>
      <form onSubmit={(e) => handleAddTask(e)}>
        <div className=" my-3 flex items-center justify-evenly">
          <input
            onChange={(e) => setTask(e.target.value)}
            value={task}
            type="text"
            className="bg-[#F1F8E8]  border border-gray-300 text-gray-900 text-sm rounded-lg block w-[70%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Task.."
            required
          />
          <button
            type="submit"
            className="text-white bg-[#95D2B3] transition-colors hover:bg-[#55AD9B] focus:outline-none focus:ring-[#95D2B3] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              viewBox="0 0 512 512"
              fill="currentColor"
              height="1rem"
              width="1rem"
              className="mr-1"
            >
              <path d="M477.64 38.26a4.75 4.75 0 00-3.55-3.66c-58.57-14.32-193.9 36.71-267.22 110a317 317 0 00-35.63 42.1c-22.61-2-45.22-.33-64.49 8.07C52.38 218.7 36.55 281.14 32.14 308a9.64 9.64 0 0010.55 11.2l87.31-9.63a194.1 194.1 0 001.19 19.7 19.53 19.53 0 005.7 12L170.7 375a19.59 19.59 0 0012 5.7 193.53 193.53 0 0019.59 1.19l-9.58 87.2a9.65 9.65 0 0011.2 10.55c26.81-4.3 89.36-20.13 113.15-74.5 8.4-19.27 10.12-41.77 8.18-64.27a317.66 317.66 0 0042.21-35.64C441 232.05 491.74 99.74 477.64 38.26zM294.07 217.93a48 48 0 1167.86 0 47.95 47.95 0 01-67.86 0z" />
              <path d="M168.4 399.43c-5.48 5.49-14.27 7.63-24.85 9.46-23.77 4.05-44.76-16.49-40.49-40.52 1.63-9.11 6.45-21.88 9.45-24.88a4.37 4.37 0 00-3.65-7.45 60 60 0 00-35.13 17.12C50.22 376.69 48 464 48 464s87.36-2.22 110.87-25.75A59.69 59.69 0 00176 403.09c.37-4.18-4.72-6.67-7.6-3.66z" />
            </svg>
            ADD
          </button>
        </div>
      </form>
      <h2 className="text-xl font-bold ">Tasks :</h2>
      <Reorder.Group
        axis="y"
        values={tasks}
        onReorder={setTasks}
        className=" h-[17rem] overflow-y-scroll overflow-x-hidden"
      >
        {tasks.map((task) => (
          <Reorder.Item key={task.id} value={task}>
            <div className="flex items-start justify-evenly  ">
              <div className="  flex items-center rounded-lg w-max my-2 bg-[#D8EFD3]  p-2">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  // value={true}
                  checked={task.isCompleted}
                  onChange={() => {
                    handleCompTask(task);
                  }}
                  // className="w-4 h-4 text-[#588157]-600 bg-gray-100 border-gray-300 rounded focus:ring-[#588157]-500 dark:focus:ring-[#588157]-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <li
                  className={`mx-2 text-lg w-[10rem] truncate ${
                    task.isCompleted ? "line-through" : ""
                  }`}
                >
                  {task.task}
                </li>
                <button onClick={() => handleDelete(task)}>
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    height="1.2rem"
                    width="1.2rem"
                    color="#344e41"
                  >
                    <path
                      fill="currentColor"
                      d="M2 5v10c0 .55.45 1 1 1h9c.55 0 1-.45 1-1V5H2zm3 9H4V7h1v7zm2 0H6V7h1v7zm2 0H8V7h1v7zm2 0h-1V7h1v7zM13.25 2H10V.75A.753.753 0 009.25 0h-3.5A.753.753 0 005 .75V2H1.75a.752.752 0 00-.75.75V4h13V2.75a.752.752 0 00-.75-.75zM9 2H6v-.987h3V2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  );
}

export default ToDo;
