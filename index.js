var nicknames = []

function main(data) {
    populateNicknames(data);
    loadUserSession(data);
}

function populateNicknames(data) {
    data.users.forEach(user => {
        nicknames.push(user.name);
    });
}

function loadUserSession(data) {
    userNickname = getUser();

    // new user
    if (userNickname === null) return;

    // existing user
    const user = data.users.filter(user => {
        return user.name === userNickname;
    })[0];

    // new user
    if (user === undefined) return;

    if (user.end !== null) {
        window.location.href = "./results.html";
        return;
    }

    switch (user.level) {
        case 1:
            window.location.href = "./level1.html";
            break;
        case 2:
            window.location.href = "./level2.html";
            break;
        case 3:
            window.location.href = "./level3.html";
            break;
        case 4:
            window.location.href = "./level4.html";
            break;
        default:
            return;
    }
}

function enableStartButton() {
    document.querySelector('#start-button').disabled = false;
}

function disableStartButton() {
    document.querySelector('#start-button').disabled = true;
}

document.querySelector('#nickname').addEventListener('input', (event) => {
    const nickname = event.target.value;
    if (nickname === '' || nicknames.includes(nickname)) disableStartButton();
    else enableStartButton();
});