function main(data) {
    checkIfFinalized(data);
    populateResults(data);
}

function checkIfFinalized(data) {
    let end = getUrlParam('end');

    if (end !== null) {
        const nickname = getUser();

        for (let i = 0; i < data.users.length; i++) {
            if (data.users[i].name === nickname) {
                data.users[i].end = end;
            }
        }

        writeData(data);
    }
}

function populateResults(data) {
    // pre-process results
    let results = [];
    let index = 0;

    // sort results by level and duration
    data.users.sort((u1, u2) => {
        // bigger level
        if (u1.level > u2.level) {
            return 1;
        }
        // smaller level
        else if (u1.level < u2.level) {
            return -1;
        }
        // equal level
        else {
            return getUserDuration(u1) < getUserDuration(u2);
        }
    });
    data.users.reverse();

    // process results
    data.users.forEach(user => {
        let duration = hms(getUserDuration(user));

        results[index++] = `<pre>${user.name}   🎯Level: ${user.level}   ⏳Duration: ${duration}   🏁Finished: ${user.end !== null ? 'yes' : 'no'}</pre>`;
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

function getUserDuration(user) {
    if (user.end === null) {
        return seconds(now()) - seconds(user.start);
    }

    return seconds(user.end) - seconds(user.start);
}