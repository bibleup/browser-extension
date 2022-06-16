import options from './options.js';

let homePage = document.getElementById('home-page');
let selectOption = document.getElementById('select-option');
let pasteConfig = document.getElementById('paste-config');
let selectOptionBtn = document.getElementById('select-option-btn');
let pasteConfigBtn = document.getElementById('paste-config-btn');
let saveBtnWrapper = document.getElementById('save-btn-wrapper');
let saveBtn = document.getElementById('save-btn');
let backBtn = document.getElementById('back-btn');

let toggleView = (view, isEditor=false) => {
    homePage.hidden = true;
    selectOption.hidden = true;
    pasteConfig.hidden = true;
    view.hidden = false;
    saveBtnWrapper.hidden = (isEditor) ? false : true;
    backBtn.hidden = (isEditor) ? false : true;
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
    let savedOpt = realOptions()
    chrome.storage.sync.set({opt: savedOpt});
    // console.log(savedOpt)
    // console.log(typeof savedOpt)
}

/**
 * Get options from 'select options' or 'paste config'
 * Returns structured option object
 */
let realOptions = () => {
    let opt = options();

    if (opt.rawOptions === 'false' || opt.rawOptions == '') {
        let obj = {
            popup: opt.popup,
            version: opt.version,
            darkTheme: opt.darkTheme,
            styles: {
                primary: opt.primary,
                secondary: opt.secondary,
                tertiary: opt.tertiary,
                headerColor: opt.headerColor,
                color: [opt.fontColor, opt.versionColor, opt.closeColor],
                borderRadius: opt.borderRadius,
                boxShadow: opt.boxShadow,
                fontSize: opt.fontSize
            },
            bu_allow: opt.bu_allow,
            bu_ignore: opt.bu_ignore
        }
        return JSON.stringify(obj);
    } else {
        return opt.rawOptions;
    }
}






restoreOptions()