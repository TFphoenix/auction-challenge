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
    console.log(dataString);

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(req.responseText);
        }
    };

    req.open('PUT', dataBin, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", apiKey);
    req.send(dataString);
}

function setUser(nickname) {
    window.localStorage.setItem('user', nickname);
}

function getUser() {
    return window.localStorage.getItem('user');
}

function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get(param);
}