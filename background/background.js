export const getTasks = (callback) => {
  //   console.log(chrome.storage);
  chrome.storage?.sync.get(["tasks"], (result) => {
    callback(result.tasks || []);
  });
};

export const saveTasks = (tasks, callback) => {
  chrome.storage?.sync.set({ tasks }, callback);
};
//links
export const getBlockedLinks = (callback) => {
  //   console.log(chrome.storage);
  chrome.storage?.sync.get(["links"], (result) => {
    callback(result.links || []);
  });
};

export const setBlockedLinks = (links, callback) => {
  chrome.storage?.sync.set({ links }, callback);
};
//POINTS
let points;
export const getPoints = (callback) => {
  //   console.log(chrome.storage);
  chrome.storage?.sync.get(["points"], (result) => {
    callback(result.points || 0);
  });
};

export const setPointsC = (points, callback) => {
  chrome.storage?.sync.set({ points }, callback);
};
async function updatePoints() {
  chrome.runtime.sendMessage({ type: "pointsUpdate", points });
  const res = await chrome.storage?.sync.get(["points"]);
  console.log(res);
  setPointsC(res.points * 1 + Math.floor(points));
}

chrome.tabs?.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    checkTabAgainstAllowlist(tab);
  }
});

chrome.tabs?.onCreated.addListener((tab) => {
  if (tab.url) {
    checkTabAgainstAllowlist(tab);
  }
});

async function checkTabAgainstAllowlist(tab) {
  chrome.storage?.sync.get("links", (data) => {
    const allowlist = data.links || [];
    const arr = allowlist.map((obj) => {
      return obj.link;
    });
    const urlWithoutQueryParams = new URL(tab.url).origin;

    console.log(!arr.includes(urlWithoutQueryParams));
    if (seconds == 0) return;
    if (!arr.includes(urlWithoutQueryParams)) {
      console.log("Blocking");
      chrome.scripting?.executeScript(
        {
          target: { tabId: tab.id },
          files: ["assets/content.js"],
        },
        () => {
          chrome.scripting?.insertCSS({
            target: { tabId: tab.id },
            files: ["assets/content-css-D2Na2GGo.css"],
          });
        }
      );
    }
  });
}

//timer
let timer;
let seconds = 0;

function startTimer(duration) {
  seconds = duration;
  points = (duration / 60) * 5;
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(() => {
    if (seconds == 0) {
      updatePoints();
      // console.log("updapp");
    }
    if (seconds > 0) {
      seconds--;
      updatePopup();
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

function updatePopup() {
  chrome.runtime.sendMessage({ type: "update-timer", seconds });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "start-timer") {
    startTimer(message.duration);
  } else if (message.type === "get-timer") {
    sendResponse({ seconds });
  } else if (message.type === "clear-timer") {
    clearInterval(timer);
    seconds = 0;
  }
});
