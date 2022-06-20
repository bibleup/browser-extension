//@ sourceURL=init.js

let options = () => {
    chrome.storage.sync.get('bibleup_init', function (saved) {
        if (saved.bibleup_init) {
            console.log(saved.bibleup_init)
        }
        let bibleup = new BibleUp(document.body, saved.bibleup_init)
        bibleup.create()
    })
}

options();

