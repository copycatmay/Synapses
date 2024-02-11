var colorValue;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.id('baseAnimation');
}
  
  //this function is taken from the sine cos 3d animation example
  function draw() {
    background(250);
    rotateY(frameCount * 0.03);

    let scrollDistance = window.scrollY;

    //looked at mouse1d reference to map out mouse movement
    let sphereSize = map(scrollDistance, 0, height*2, 1, 80);
    let sphereSize2 = map(scrollDistance, 0, height*2, 1, 3);
    //let sphereComp = map(mouseY, 0, height, 20, 30); //for x/y vertexes

    scale(sphereSize2); //added zoom that changes based on mouse movement 


    let alphaValue = map(scrollDistance, 0, height, 0.2, 100);
    colorValue = color(0, 0, 0, alphaValue); // Changed color to black
  
    for (let j = 0; j < 1; j++) {
      push();

      //increased loop count 
      for (let i = 0; i < 150; i++) {
        translate(
          sin(frameCount * 0.001 + j) * 100,
          sin(frameCount * 0.001 + j) * 100,
          i * 0.1
        );
        rotateZ(frameCount * 0.001);
        push();

        fill(colorValue)
        //size changes based on mouseY position
        sphere(sphereSize, 20, 20);
        pop();
      }
      pop();
    }
  }

  //https://p5js.org/examples/3d-sine-cosine-in-3d.html --animation one resource
  //https://p5js.org/examples/input-mouse-2d.html --mouse 2d input
  //https://p5js.org/examples/input-mouse-1d.html --mouse 1d


  //refs:
  //https://p5js.org/reference/#/p5/map -- mapping reference