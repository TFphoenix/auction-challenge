function populateResults(data) {
    // pre-process results
    let results = [];
    let index = 0;
    data.users.forEach(user => {
        let duration = '';
        if (user.end === null) {
            duration = hms(seconds(now()) - seconds(user.start));
        }
        else {
            duration = hms(seconds(user.end) - seconds(user.start));
        }

        results[index++] = `${user.name} | Level: ${user.level} | Duration: ${duration}`;
    });


    // populate results
    let resultsHTML = '';
    results.forEach(result => {
        resultsHTML += `<li class="mdl-list__item">\
            <span class="mdl-list__item-primary-content">\
            <i class="material-icons mdl-list__item-icon">person</i>\
                ${result}\
            </span>\
        </li>`
    });

    document.querySelector('#results-list').innerHTML = resultsHTML;
}

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