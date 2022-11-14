let cityShift

function setup(){
    createCanvas(windowWidth, windowHeight)   
}

function draw(){
    background(0)
    cityShift = frameCount%1920
    translate(width-cityShift, height)
    scale(1, -1)
    skyline()

}

    
function skyline(){
    fill(150, 255, 80)
    noStroke()
    rect(0, 0, 1920, 200)
    rect(100, 0, 80, 300)
    rect(1300, 0, 130, 400)
    rect(1100, 0, 180, 300)
    rect(400, 0, 120, 250)
    rect(600, 0, 200, 450)
    rect(1600, 0, 200, 350)
}

