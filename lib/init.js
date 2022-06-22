//@ sourceURL=init.js

let count = 0;
let timeout = false;

let options = () => {
  chrome.storage.sync.get('bibleup_init', function (saved) {
    let initBibleup = () => {
      let bibleupChromeExtension = new BibleUp(document.body, saved.bibleup_init);
      bibleupChromeExtension.create();
      DOMObserver();
    };

    let DOMObserver = () => {
      // Options for the observer (which mutations to observe)
      const config = { attributes: false, childList: true, subtree: true };
      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(observeHandler);
      // Start observing the target node for configured mutations
      observer.observe(document.body, config);
    };

    let observeHandler = () => {
      debounce(() => {
        console.log('Reload BibleUp');
      }, 500);
    };

    let debounce = (func, wait) => {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(this, arguments);
        count = 0;
      }, wait);
    };

    initBibleup();
  });
};

options();
