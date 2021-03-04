// Data (JSON)
const dataFile = './data.json';
const dataBin = 'https://api.jsonbin.io/v3/b/60403e1f9342196a6a6d103a'
const apiKey = '$2b$10$jZ2Uezy4S.bwoP8hGpGdkOVhQRqwBL/mYGKXxNEyU6ERu.3jNw5fC'

function loadData(callbackFunction) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            const data = JSON.parse(req.responseText);
            callbackFunction(data.record);
        }
    };

    req.open("GET", `${dataBin}/latest`, true);
    req.setRequestHeader("X-Master-Key", apiKey);
    req.send();
}

function writeData(data) {
    dataString = JSON.stringify(data);
    // console.log(dataString);

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            // console.log(req.responseText);//TODO: Remove
        }
    };

    req.open('PUT', dataBin, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", apiKey);
    req.send(dataString);
}

// Local Storage
function setUser(nickname) {
    window.localStorage.setItem('user', nickname);
}

function getUser() {
    return window.localStorage.getItem('user');
}

// Requests
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


// Time
function seconds(hms) {
    const a = hms.split(':'); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    const seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    return seconds;
}

function hms(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
}

function now() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    return `${h}:${m}:${s}`;
}