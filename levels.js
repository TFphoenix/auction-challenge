var nickname;
var level;

function main(data) {
    loadLevel();
    loadNickname(data);
    updateLevel(data);
}

function loadLevel() {
    level = parseInt(document.getElementById('level').innerText);
}

function loadNickname(data) {
    nickname = getUser();

    if (nickname === null) {
        nickname = getUrlParam('nickname');

        if (nickname === null) {
            alert('ERROR: Can\'t get your nickname');
            window.location.href = "./index.html";
        }

        const user = {
            name: nickname,
            level: 1,
            start: now(),
            end: null
        }
        data.users.push(user);
        writeData(data);
        setUser(nickname);
    }
}

function updateLevel(data) {
    if (level === 1) return;

    for (let i = 0; i < data.users.length; i++) {
        if (data.users[i].name === nickname) {
            data.users[i].level = level;
        }
    }

    writeData(data);
}

function submitLevel() {
    results = [];

    // check level
    switch (level) {
        case 1:
            results = checkLevel(['A,17', 'Q,104', 'A,26', 'Y,27', 'T,71', 'U,15']);
            break;
        case 2:
            results = checkLevel(['A,17', 'Q,104', 'T,71', 'A,100', 'C,159']);
            break;
        case 3:
            results = checkLevel([]);
            break;
        case 4:
            results = checkLevel([]);
            break;
        default:
            console.error('BAD LEVEL CHECK');
            return;
    }

    // display checks
    let allCorrect = true;
    let correctChecks = document.querySelectorAll('.lvl-correct');
    let wrongChecks = document.querySelectorAll('.lvl-wrong');
    for (let i = 0; i < results.length; i++) {
        if (results[i]) {
            // correct
            correctChecks[i].classList.remove('check-off');
            wrongChecks[i].classList.add('check-off');
        }
        else {
            // wrong
            correctChecks[i].classList.add('check-off');
            wrongChecks[i].classList.remove('check-off');
            allCorrect = false;
        }
    }

    // next level
    if (allCorrect) {
        if (level === 4) {
            window.location.href = `./results.html?end=${now()}`;
            return;
        }

        window.location.href = `./level${level + 1}.html`;
    }
}

function checkLevel(solutions) {
    let results = [];

    let outputs = document.querySelectorAll('.lvl-output input');

    for (let i = 0; i < 6; i++) {
        results[i] = outputs[i].value === solutions[i];
    }

    return results;
}