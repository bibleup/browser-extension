class Options {
  static refOptions() {
    return {
      popup: document.getElementById('type'),
      version: document.getElementById('version'),
      darkTheme: document.querySelector('input[name=darkTheme]:checked'),
      primary: document.getElementById('primary'),
      secondary: document.getElementById('secondary'),
      tertiary: document.getElementById('tertiary'),
      headerColor: document.getElementById('headerColor'),
      fontColor: document.getElementById('fontColor'),
      versionColor: document.getElementById('versionColor'),
      closeColor: document.getElementById('closeColor'),
      borderRadius: document.getElementById('borderRadius'),
      boxShadow: document.getElementById('boxShadow'),
      fontSize: document.getElementById('fontSize'),
      ignore: document.getElementById('ignore'),
      allow: document.getElementById('allow'),
      rawOptions: document.getElementById('rawOptions'),
    };
  }

  /**
   * @desc Reurns escaped string that may contain unsafe characers (&,<,>,/)
   * @param {*} value
   * @param {*} d
   * @returns string
   */
  static sanitize(value, d) {
    if (value === 'false' || value == '') {
        return d;
    } else if (value == 'true') {
      return true;
    }

    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '/': '&#x2F;',
    };
    const reg = /[&<>/]/gi;
    return value.replace(reg, (match) => map[match]);
  }

  /**
   * @desc  Get all real options value - sanitized and clean
   * @returns object
   */
  static getOptions() {
    let opt = this.refOptions();

    let sanitized = {
      popup: this.sanitize(opt.popup.value, 'classic'),
      version: this.sanitize(opt.version.value, 'KJV'),
      darkTheme: this.sanitize(opt.darkTheme.value, 'dark'),
      primary: this.sanitize(opt.primary.value, false),
      secondary: this.sanitize(opt.secondary.value, false),
      tertiary: this.sanitize(opt.tertiary.value, false),
      headerColor: this.sanitize(opt.headerColor.value, false),
      fontColor: this.sanitize(opt.fontColor.value, false),
      versionColor: this.sanitize(opt.versionColor.value, false),
      closeColor: this.sanitize(opt.closeColor.value, false),
      borderRadius: this.sanitize(opt.borderRadius.value, false),
      boxShadow: this.sanitize(opt.boxShadow.value, false),
      fontSize: this.sanitize(opt.fontSize.value, false),
      bu_ignore: this.sanitize(opt.ignore.value, ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'IMG', 'A']),
      bu_allow: this.sanitize(opt.allow.value, []),
      rawOptions: this.sanitize(opt.rawOptions.value, false),
    };
    return sanitized;
  }

  /**
   * Get options from 'select options' or 'paste config'
   * Checks to see if 'rawOptions' field is empty, returns its value if false
   * Else it returns the values in 'SelectTab' section
   * @returns string
   */
  static initOptions() {
    let opt = this.getOptions();
    let rawOptions = (this.toJSON(opt.rawOptions))
    console.log(rawOptions)

    if (rawOptions === false) {
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
          fontSize: opt.fontSize,
        },
        bu_allow: opt.bu_allow,
        bu_ignore: opt.bu_ignore,
      };
      return obj;
    } else {
      return rawOptions;
    }
  }

  /**
   * Wrap property keys with double quotes and changes single quotes on values to double quotes
   * @param {string} str - String in JS object format
   */
  static toJSON(str) {
    str = (str === '' || str === false) ? 'null' : str
    let regex1 = /([a-zA-Z]+(?:\s?)):/g // match object keys
    let regex2 = /(?:\'\s?(.*?)\s?\')/g // match object values
    let result = str.replace(regex1, '"$1":').replace(regex2, '"$1"')
    
    try {
      let valid = JSON.parse(result)
      if (valid && typeof valid === "object") {
        return valid;
      }
    } catch (e) {}

    return false;
  }

  static restore() {
    let opt = this.refOptions();
    
    chrome.storage.sync.get('bibleup', function (saved) {
      if (saved.bibleup == undefined) {
        // bible option doesn't exists
        return;
      }

      opt.popup.value = saved.bibleup.popup;
      opt.version.value = saved.bibleup.version;
      // set darkTheme option
      if (saved.bibleup.darkTheme === 'dark') {
        document.getElementById('dark-true').checked = true
      } else {
        document.getElementById('dark-false').checked = true
      }
      opt.primary.value = saved.bibleup.primary;
      opt.secondary.value = saved.bibleup.secondary;
      opt.tertiary.value = saved.bibleup.tertiary;
      opt.headerColor.value = saved.bibleup.headerColor;
      opt.fontColor.value = saved.bibleup.fontColor;
      opt.versionColor.value = saved.bibleup.versionColor;
      opt.closeColor.value = saved.bibleup.closeColor;
      opt.borderRadius.value = saved.bibleup.borderRadius;
      opt.boxShadow.value = saved.bibleup.boxShadow;
      opt.fontSize.value = saved.bibleup.fontSize;
      opt.ignore.value = saved.bibleup.bu_ignore;
      opt.allow.value = saved.bibleup.bu_allow;
      opt.rawOptions.value = saved.bibleup.rawOptions;
    });
  }
}

export default Options;
