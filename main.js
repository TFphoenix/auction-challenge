const dataFile = "./data.json";

function loadData(callbackFunction) {
    let request = new XMLHttpRequest();
    request.open("GET", dataFile, true);

    request.onload = function (e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                // load JSON
                const data = JSON.parse(request.responseText);
                callbackFunction(data);
            } else {
                console.error(request.statusText);
            }
        }
    };

    request.onerror = function (e) {
        console.error(request.statusText);
    };

    request.send(null);
}

function writeData(data) {
    dataString = JSON.stringify(data);

    let request = new XMLHttpRequest();

    request.open("POST", dataFile, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(data);
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