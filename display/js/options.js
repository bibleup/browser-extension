

let options = () => {
    let type = document.getElementById('type').value
    let version = document.getElementById('version').value
    let darkTheme = document.querySelector('input[name=darkTheme]:checked').value
    let primary = document.getElementById('primary').value
    let secondary = document.getElementById('secondary').value
    let tertiary = document.getElementById('tertiary').value
    let headerColor = document.getElementById('headerColor').value
    let fontColor = document.getElementById('fontColor').value
    let versionColor = document.getElementById('versionColor').value
    let closeColor = document.getElementById('closeColor').value
    let borderRadius = document.getElementById('borderRadius').value
    let boxShadow = document.getElementById('boxShadow').value
    let fontSize = document.getElementById('fontSize').value
    let ignore = document.getElementById('ignore').value
    let allow = document.getElementById('allow').value
    let rawOptions = document.getElementById('rawOptions').value
    
    let opt = {
        popup: sanitize(type, 'classic'),
        version: sanitize(version, 'KJV'),
        darkTheme: sanitize(darkTheme, true),
        primary: sanitize(primary, false),
        secondary: sanitize(secondary, false),
        tertiary: sanitize(tertiary, false),
        headerColor: sanitize(headerColor, false),
        fontColor: sanitize(fontColor, false),
        versionColor: sanitize(versionColor, false),
        closeColor: sanitize(closeColor, false),
        borderRadius: sanitize(borderRadius, false),
        boxShadow: sanitize(boxShadow, false),
        fontSize: sanitize(fontSize, false),
        bu_ignore: sanitize(ignore, ["H1", "H2", "H3", "H4", "H5", "H6", "IMG", "A"]),
        bu_allow: sanitize(allow, []),
        rawOptions: sanitize(rawOptions, false),
    }
    return opt;
}

let sanitize = (value, d) => {
    if (value === 'false' || value == '') {
        if (d === false) {
            return false;
        } else {
            return d;
        }
    } else if (value == 'true') {
        return true;
    }

    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "/": '&#x2F;',
    };
    const reg = /[&<>/]/ig;
    return value.replace(reg, (match)=>(map[match]));
}

export default options