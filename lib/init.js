

let bibleup_init = () => {
  let observer_timeout = false;
  let bibleupChromeExtension;
  
  chrome.storage.sync.get('bibleup_init', function (saved) {
    let initBibleup = () => {
      bibleupChromeExtension = new BibleUp(document.body, saved.bibleup_init);
      bibleupChromeExtension.create();
      DOMObserver();
    };

    let DOMObserver = () => {
      //target
      let body = document.querySelector('body');
      // Options for the observer (which mutations to observe)
      const config = { attributes: false, characterData: false, childList: true, subtree: true };
      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(observeHandler);
      // Start observing the target node for configured mutations
      observer.observe(body, config);
    };

    let observeHandler = (mutations, _observer) => {
      debounce(() => {
        bibleupChromeExtension.refresh();
      }, 2000);
    };

    let debounce = (func, wait) => {
      clearTimeout(observer_timeout);
      observer_timeout = setTimeout(function () {
        func.apply(this, arguments);
      }, wait);
    };

    initBibleup();
  });

  chrome.runtime.onMessage.addListener((req, sender, res) => {
    if (req.action == 'refresh' && bibleupChromeExtension) {
      chrome.storage.sync.get('bibleup_init', function (saved) {
        bibleupChromeExtension.refresh(document.body, saved.bibleup_init)
        res({status: 'success'})
      })
    }
    return true;
  });
};

bibleup_init();
