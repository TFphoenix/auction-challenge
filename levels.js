var nickname;

function main(data) {
    loadNickname(data);
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

function submitLevel(level) {
    results = [];

    // check level
    switch (level) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        default:
            console.error('BAD LEVEL CHECK');
            return;
    }

    // display checks
}