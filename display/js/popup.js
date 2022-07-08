import Options from './options.js';

let homePage = document.getElementById('home-page');
let selectOption = document.getElementById('select-option');
let pasteConfig = document.getElementById('paste-config');
let selectOptionBtn = document.getElementById('select-option-btn');
let pasteConfigBtn = document.getElementById('paste-config-btn');
let saveBtnWrapper = document.getElementById('save-btn-wrapper');
let saveBtn = document.getElementById('save-btn');
let backBtn = document.getElementById('back-btn');
let activeBtn = document.getElementById('activate-btn');
let notification = document.getElementById('notification');
let activateStatus = document.getElementById('activate-status');
let refreshBtn = document.getElementById('refresh-btn')

let toggleView = (view, isEditor=false) => {
    homePage.hidden = true;
    selectOption.hidden = true;
    pasteConfig.hidden = true;
    view.hidden = false;
    saveBtnWrapper.hidden = (isEditor) ? false : true;
    backBtn.hidden = (isEditor) ? false : true;
}

let showNotification = (value = true) => {
    value = !value
    notification.hidden = value

    if (value === false) {
        setTimeout(() => {
            notification.hidden = true
        }, 2000)
    }
}

let showStatus = (status) => {
    if (status == true) {
        activateStatus.textContent = 'BibleUp is activated'
        activateStatus.classList.remove('off')
        refreshBtn.hidden = false
        activeBtn.textContent = 'Deactivate BibleUp'
    } else {
        activateStatus.textContent = 'BibleUp is not activated'
        activateStatus.classList.add('off')
        refreshBtn.hidden = true
        activeBtn.textContent = 'Activate BibleUp'
    }
}

selectOptionBtn.onclick = () => {
    toggleView(selectOption, true)
}

pasteConfigBtn.onclick = () => {
    toggleView(pasteConfig, true)
}

backBtn.onclick = () => {
    toggleView(homePage)
}

saveBtn.onclick = () => {
    // Store the user's options
    chrome.storage.sync.set({bibleup: Options.getOptions()}, function() {
        chrome.storage.sync.set({bibleup_init: Options.initOptions()}, function() {
            showNotification();
        });
    });
}

activeBtn.onclick = () => {
    chrome.storage.sync.get('bibleup_activated', function (data) {
        if (data.bibleup_activated) {
            chrome.storage.sync.set({bibleup_activated: false}, showStatus.bind(this, false))
        } else {
            chrome.storage.sync.set({bibleup_activated: true}, showStatus.bind(this, true))
        }
    })
}

let setActivateStatus = () => {
    chrome.storage.sync.get('bibleup_activated', function (data) {
        if (data.bibleup_activated) {
            showStatus(true)
        } else {
            showStatus(false)
        }
    })
}

// restore options
setActivateStatus()
Options.restore()