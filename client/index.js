const ipcRenderer = require('electron').ipcRenderer;

window.onload = function() {
    ipcRenderer.on("uuid", (event, data) => {
        document.getElementById("code").innerHTML = data;
    })
}

function startShare(){
    ipcRenderer.send("start-share", {});
    document.getElementById("start").style.display = "none";
    document.getElementById("stop").style.display = "block";
}

function stopShare(){
    ipcRenderer.send("stop-share", {});
    document.getElementById("stop").style.display = "none";
    document.getElementById("start").style.display = "block";
}