function SetTimer({ timer, setTimer }) {
  return (
    <form className="max-w-xs">
      <div className="relative flex items-center max-w-[8rem]">
        <button
          onClick={() => {
            if (timer == 0) {
              return;
            } else {
              setTimer((t) => t - 5);
            }
          }}
          type="button"
          id="decrement-button"
          data-input-counter-decrement="quantity-input"
          className="bg-[#F1F8E8] dark:bg-gray-700 dark:hover:bg-gray-600  hover:bg-[#95D2B3]  rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          disabled
          value={timer}
          onChange={(e) => {
            if (e.target.value * 1 <= 0) {
              return;
            } else {
              setTimer(e.target.value * 1);
            }
          }}
          type="text"
          id="quantity-input"
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="bg-[#F1F8E8]  h-11 text-center text-gray-900 text-xl focus:ring-blue-500 block w-full py-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 "
          placeholder="999"
          required
        />
        <button
          onClick={() => {
            setTimer((t) => t + 5);
          }}
          type="button"
          id="increment-button"
          data-input-counter-increment="quantity-input"
          className=" bg-[#F1F8E8] dark:bg-gray-700 dark:hover:bg-gray-600 transition  hover:bg-[#95D2B3] rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default SetTimer;
