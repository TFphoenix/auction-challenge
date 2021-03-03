function loadData(callbackFunction) {
    const file = "./data.json";
    let request = new XMLHttpRequest();
    request.open("GET", file, true);

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

function setUser(nickname) {
    window.localStorage.setItem('user', nickname);
}

function getUser() {
    return window.localStorage.getItem('user');
}