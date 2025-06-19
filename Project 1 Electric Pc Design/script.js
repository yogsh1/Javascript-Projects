console.log("Chal rahi hai")

var circle = document.getElementById("circle")
// console.log(circle)
var upBtn = document.getElementById("upBtn")
var downBtn = document.getElementById("downBtn")

var rotateValue = circle.style.transform;
// console.log("sum",rotateValue)
var rotateSum;

upBtn.onclick = function() {
    /* 時計回りに90°回転させる */
    rotateSum = rotateValue + "rotate(-90deg)";
    circle.style.transform = rotateSum;
    rotateValue = rotateSum;

}
downBtn.onclick = function() {
    /* 半時計回りに90°回転させる */
    rotateSum = rotateValue + "rotate(90deg)";
    circle.style.transform = rotateSum;
    rotateValue = rotateSum;

}
