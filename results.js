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