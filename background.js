chrome.runtime.onInstalled.addListener(() => {
  // Use this event to set a state or for one-time initialization
  // store default config
  chrome.storage.sync.set({
    bibleup_activated: false,
    bibleup_init: {
      popup: 'classic',
      version: 'KJV',
      darkTheme: false,
    },
  });
});

/* async function run() {
    chrome.webNavigation.onCompleted.addListener(function() {
        console.log('YESSS')
        let [tab] = await chrome.tabs.query({active: true, currentWindow:true}) // Find current tab
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['lib/bibleup.min.js']
        }, call);
    })
} */

chrome.webNavigation.onCompleted.addListener(function (tab) {
  if (tab.frameId == 0) {
    // run in main frame only
    chrome.storage.sync.get('bibleup_activated', function (data) {
      if (data.bibleup_activated) {
        injectBibleup();
      }
    });
  }
});


let injectBibleup = () => {
  console.log('YESSS');
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    if (tab.length) {
      chrome.scripting.executeScript({
          target: { tabId: tab[0].id },
          files: ['lib/bibleup.min.js'],
        }, call.bind(this, tab[0].id));
    }
  });
};


let call = (tabId) => {
  if (chrome.runtime.lastError) {
  } // catch error log
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['lib/init.js'],
  });
};
