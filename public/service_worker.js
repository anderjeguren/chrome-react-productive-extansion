/* eslint-disable no-undef */
chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.session.get(["minutes", "seconds"]).then((res) => {
    if (res.minutes === 0 && res.seconds === 0) {
      chrome.alarms.clearAll();
    } else if (res.seconds === 0) {
      chrome.storage.session.set({ minutes: res.minutes - 1, seconds: 59 });
    } else {
      chrome.storage.session.set({ seconds: res.seconds - 1 });
    }
    chrome.action.setBadgeText({
      text: `${res.minutes}:${('00'+res.seconds).slice(-2)}`,
    });
  });
});

chrome.runtime.onMessage.addListener((request, sendResponse) => {
  if (request.type === 'startTimer') {
    // Create an alarm so we have something to look at in the demo
    chrome.storage.session.set({ minutes: request.minutes, seconds: request.seconds });
    chrome.alarms.create({
      periodInMinutes: 1 / 60,
    });
  } else if (request.type === 'goodbye') {
    chrome.runtime.Port.disconnect();
  }
});