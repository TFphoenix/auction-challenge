function loadData(callbackFunction) {
    const file = "./data.json";
    let request = new XMLHttpRequest();
    request.open("GET", file, true);

    request.onload = function (e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                callbackFunction(request.responseText);
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