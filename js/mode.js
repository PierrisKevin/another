const mode = {
    'light' : {
        "bg": "#ebedf4",
        "gris": "#ccd2de",
        "text" : "#151414",
        "text2" : "#1d1c1c"
    },
    'dark' : {
        "bg" : "#030617",
        "gris" : "#040226",
        "text" : "#050115",
        "text2" : "#cdcdcd"
    }
}

function changeMode(valeur){
    document.documentElement.style.setProperty("--text", (mode[valeur]["text"]));
    document.documentElement.style.setProperty("--text2", (mode[valeur]["text2"]));
    document.documentElement.style.setProperty("--gris", (mode[valeur]["gris"]));
    document.documentElement.style.setProperty("--bg", (mode[valeur]["bg"]));
}

let change = true;
const AllMode = document.querySelectorAll("#all-container #nav-bar .options a")
console.log(AllMode)
AllMode.forEach(mode => {
    mode.addEventListener("click", ()=>{
        AllMode[0].classList.toggle("hidden")
        AllMode[1].classList.toggle("hidden")
        if(change) changeMode('light')
        else changeMode('dark')
        change = (change) ? false : true
    })
});