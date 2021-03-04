var nickname;

function loadNickname() {
    nickname = getUser();

    if (nickname === null) {
        nickname = getUrlParam('nickname');
        //TODO: Add user to JSON data
    }

    if (nickname === null) {
        alert('ERROR: Can\'t get your nickname');
        window.location.href = "./index.html";
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