

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
        console.log('Reload BibleUp');
        bibleupChromeExtension.refresh();
      }, 2000);

      /* var e_1, _a;
      try {
        for (
          var mutations_1 = __values(mutations), mutations_1_1 = mutations_1.next();
          !mutations_1_1.done;
          mutations_1_1 = mutations_1.next()
        ) {
          var mutation = mutations_1_1.value;
          mutation.addedNodes.forEach(function (addedNode) {
            //content.processNode(addedNode);
            console.log(addedNode)
            bibleupChromeExtension.refresh(addedNode)
          });
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (mutations_1_1 && !mutations_1_1.done && (_a = mutations_1.return)) _a.call(mutations_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      } */

      /* mutations.forEach((mutation) => {
        console.log(mutation.type);
        bibleupChromeExtension.refresh(mutation.target);
      }) */
    };

    let debounce = (func, wait) => {
      clearTimeout(observer_timeout);
      observer_timeout = setTimeout(function () {
        func.apply(this, arguments);
      }, wait);
    };

    var __values = (this && this.__values) || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
          next: function () {
              if (o && i >= o.length) o = void 0;
              return { value: o && o[i++], done: !o };
          }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };

    initBibleup();
  });
};

bibleup_init();
