const path = require('path');
const fs = require('fs');

const publicStylesPath = path.resolve(__dirname + '/../../build/static/css/');

module.exports = () => {
    const filesList = fs.readdirSync(publicStylesPath);
    const cssFilesList = filesList.filter(file => file.endsWith('.css'));

    let cssString = '';
    for(let cssFileName of cssFilesList) {
        const cssFilePath = path.resolve(publicStylesPath, cssFileName);
        cssString += fs.readFileSync(cssFilePath) + "\n";
    }
    return cssString;
}