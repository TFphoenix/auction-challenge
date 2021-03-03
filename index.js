function enable_start_button() {
    document.querySelector('#start-button').disabled = false;
}

function disable_start_button() {
    document.querySelector('#start-button').disabled = true;
}

document.querySelector('#nickname').addEventListener('input', (event) => {
    const nickname = event.target.value;
    if (nickname === '') disable_start_button();
    else enable_start_button();
});