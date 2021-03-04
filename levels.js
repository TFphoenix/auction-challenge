var nickname;
var level;

//TODO: Display timer in upper corner

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
    for (let i = 0; i < data.users.length; i++) {
        if (data.users[i].name === nickname) {
            // if finished already
            if (data.users[i].end !== null) {
                window.location.href = "./results.html";
                return;
            }

            // if current level inferior 
            if (data.users[i].level > level) {
                window.location.href = `./level${data.users[i].level}.html`;
                return;
            }

            // if current level equal
            if (data.users[i].level === level) {
                return;
            }

            if (getUrlParam('passed') === 'true') {
                data.users[i].level = level;
            }
            else {
                window.location.href = `./level${data.users[i].level}.html`;
                return;
            }
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
            results = checkLevel([
                '-,1,A,1,B,6,B,9,A,11,A,17',
                '-,100,A,100',
                '-,100,C,100,G,158,C,159',
                '-,1,N,1,H,16,P,25,M,31,H,32,T,56,F,58,E,60,P,62,E,66,E,70,E,72,F,75,F,78,O,79,H,96,Q,104',
                '-,15,U,15',
                '-,1,R,1,A,51,D,2001,E,3559,K,4000,Y,5000,Y,5001,Y,6001,Y,7001,Y,8001,L,8333,Y,9000,Z,10000,I,11001,N,11111,N,12568,N,12668,T,13000,G,13001,M,14001,H,15000,N,15401,D,17001,T,18501,U,18751,Q,18851,D,19000,S,19050']);
            break;
        case 4:
            results = checkLevel([
                '-,1,A,1,B,6,B,9,A,11,A,15',
                '-,100,C,100,G,158,C,159',
                '-,100,C,100,G,158,C,159',
                '-,100,C,100,G,158,C,159',
                '-,1,N,1,H,16,P,25,M,31,H,32,T,56,F,58,E,60,P,62,E,66,E,70,E,72,F,75,F,78,O,79,H,96,Q,104',
                '-,1,A,1,A,6,A,11,A,16,C,18,C,21,C,26,H,29,L,42,H,43,H,44,L,45,L,48',
                '-,1,A,1,A,6,A,11,A,16,C,18,C,21,C,26,H,29,Q,42,H,43,H,44,Q,45,Q,47'
            ]);
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

        window.location.replace(`./level${level + 1}.html?passed=true`);
    }
}

function checkLevel(solutions) {
    let results = [];

    let outputs = document.querySelectorAll('.lvl-output input');

    for (let i = 0; i < solutions.length; i++) {
        results[i] = outputs[i].value === solutions[i];
    }

    return results;
}

function copyInput(btn) {
    const index = btn.id.split('-')[2];
    var copyText = document.querySelectorAll(".lvl-input")[index - 1].innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = copyText;
    elem.select();
    elem.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(elem);

    var tooltip = document.getElementById(`tooltip-${index}`);
    tooltip.innerText = "Copied!";
}

function copyInputOut(btn) {
    const index = btn.id.split('-')[2];
    var tooltip = document.getElementById(`tooltip-${index}`);
    tooltip.innerText = "Copy to clipboard";
}