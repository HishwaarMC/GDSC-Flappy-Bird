import kaboom from "kaboom";

// initialize context
kaboom({
  width: 1024,
  height: 768,
  stretch: true,
  letterbox: true,
});

const WIDTH = 1024;
const HEIGHT = 768;

// load assets
loadSprite("flappy", "sprites/flappy.png");
loadSprite("bg", "sprites/bg.png");
loadSprite("bean","sprites/bean.png");

scene("main", () =>{

const JUMPFORCE = 250;
const PIPE_OPEN = 240;
const PIPE_MIN = 60;
const SPEED = 320;
const CEILING = -55;
// add a character to screen
layers(["bg","obj","ui"], "obj");

gravity(500);

const flappy = add([
	// list of components
	sprite("flappy"),
	pos(WIDTH / 4, 0),
  layer("obj"),
	area(),
  body(),
]);


add([
  sprite("bg"),
  pos(0,0),
  layer("bg"),
])

mouseClick(() => [
  flappy.jump(JUMPFORCE),
])

flappy.action(()=>{
  if (flappy.pos.y >= HEIGHT || flappy.pos.y <= CEILING){
    go("lose");
  }
})

function spawnPipe() {
  let h1 = rand(PIPE_MIN, HEIGHT - PIPE_MIN - PIPE_OPEN);
  let h2 = HEIGHT - h1 - PIPE_OPEN;

  add([
    pos(WIDTH,0),
    rect(64,h1),
    color(111,187,49),
    area(),
    outline(4),
    move(LEFT, SPEED),
    cleanup(),
    "pipe",
  ])

  add([
    pos(WIDTH,h1 + PIPE_OPEN),
    rect(64,h2),
    outline(4),
    move(LEFT,SPEED),
    area(),
    cleanup(),
    color(111,187,49),
    "pipe",
  ])
}

loop(1.5,()=>{
  spawnPipe();
})

flappy.collides("pipe",() => {
  go("lose");
})

})

scene("lose",()=>{
 add([
   sprite("bg"),
   pos(0,0),
    ])

  add([
    sprite("bean"),
    pos(WIDTH / 2, HEIGHT / 2 - 100),
    scale(3),
    origin("center"),
  ])

  add([
    text("GAME OVER"),
    pos(WIDTH / 2, HEIGHT / 2 + 100),
    origin("center"),
  ])

  add([
    text("CLICK TO PLAY AGAIN"),
    pos(WIDTH / 2, HEIGHT / 2 + 300),
    origin("center"),
  ])

  mouseClick(() =>{
    go("main");
  })
})
go("main");