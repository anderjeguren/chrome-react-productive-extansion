/* eslint-disable no-undef */
// Alarms launches every second
chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.local.get(["seconds"]).then((res) => {
    const seconds = res.seconds ?? 0;
    const now = new Date();

    chrome.storage.local.set({ seconds: seconds - 1 });

    chrome.action.setBadgeText({
      text: `${now.getHours() + ":" + now.getMinutes()}`,
    });
  });
});

chrome.runtime.onMessage.addListener((message, request, sendResponse) => {
  if (message === 'startTimer') {
    // Create an alarm so we have something to look at in the demo
    chrome.storage.local.set({ seconds: request.timeLeft });
  } else if (message === 'getTime') {
    chrome.storage.local.get(["seconds"]).then((res) => {
      sendResponse(res.seconds);
    });
  } else if (message === 'goodbye') {
    chrome.runtime.Port.disconnect();
  }
});