'use strict'

function readFromLS(key) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
}

function writeToLS(key, data) {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem(key, dataJSON);
    return 1;
}

export {
    readFromLS,
    writeToLS
}