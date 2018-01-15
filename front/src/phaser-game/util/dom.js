export function setElementSizeByScreenSize(id, screenWidthPercent, screenHeightPercent) {
    let divgame = document.getElementById(id);
    divgame.style.width = (window.innerWidth * screenWidthPercent) + "px";
    divgame.style.height = (window.innerHeight * screenHeightPercent) + "px";
}
