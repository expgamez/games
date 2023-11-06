HTML5 Ping Pong
=========

Making games in HTML5 Canvas is not that hard once you learn the logic of the game you are creating. In this tutorial, you will learn how to create a not-so-basic ping-pong game in Canvas. First of all, lets take a look on the main concept and some basic logic behind this game.

* There should be two paddles and a ball. 
* Ball should bounce back (change direction) after hitting the walls and the paddles.
* When a ball hits the ceiling or floor, the game should end.
* Paddles should be movable and user controlled, either by mouse or keyboard.

Well, this is just the basic concept behind the game from which you should be able to make a fully working ping-pong game. Other things include menus, scoring system, gameplay levels, effects, sounds etc. In my version, I started off with the basic concept and then started adding effects, sounds, scoring system and all.

###Step 1 - Initializing Canvas and Setting it's Dimensions

So first, start by creating a HTML file with an empty `canvas` tag having _cavas_ as id. Next, add some basic styles to keep things in place.

__HTML__:


&amp;lt;canvas id="canvas"&amp;gt;&amp;lt;/canvas&amp;gt;


__CSS__:


body {padding: 0; margin: 0; overflow: hidden;}


Now, it's the time to start creating our ping-ping game. In canvas, everything is controlled by javascript so you must have some basic knowledge about it. You can also it's libraries liek jquery, prototype, mootools etc but I prefer coding in raw javascript only as it makes things fast. So, first start by initializing the canvas and it's context. This can be done by adding the following lines to your JS file.


// Initialize canvas and required variables
var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"), // Create canvas context


Here, `ctx` is what we will use when drawing objects in the canvas like ball and paddles. Almost everything in the canvas will be handled by it. Now, after initializing the canvas, we have to set it's height and width. I decide to fill the canvas in full window but you can go with constant values if you want more control over the space. 


var W = window.innerWidth, // Window's width
	H = window.innerHeight, // Window's height

// Set the canvas's height and width to full screen
canvas.width = W;
canvas.height = H;


First I calculated the `width` and the `height` of the window, stored them in separate variables `W` and `H` and then assigned those values to the height and width of the Canvas. This stuff is pretty easy. Now try to paint the canvas black by adding one more line `ctx.fillRect(0, 0, W, H);` (I will get back to ctx stuff later, just do what I say for now). If your window becomes black, then you are doing good otherwise there is some problem. Make sure you included the stylesheet and the JS file in your HTML's head.

###Step 2 - Defining Paddles and Ball

Now, it's the time we define our ball and paddles objects. Make three new variables like below:


var particles = [], // Array containing particles
	ball = {}, // Ball object
	paddles = [2]; // Array containing two paddles


Now we need to define our ball object first. The ball will have a x-coordinate and a y-coordinate that will define it's position on the canvas, a radius, color, velocity in x-direction and y-direction, and a method to draw it on the canvas. We can define it's object like below:


// Ball object
ball = {
	x: 50,
	y: 50, 
	r: 5,
	c: "white",
	vx: 4,
	vy: 8,
	
	// Function for drawing ball on canvas
	draw: function() {
		ctx.beginPath();
		ctx.fillStyle = this.c;
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
		ctx.fill();
	}
};


To draw the ball, we are using some built in canvas 2d drawing functions and path manipulations. First, we tell the canvas to start drawing the path, then we select the fill color of our ball (you can put anything in here, from color codes to rgba values), then we use the function to draw an arc. This function has six parameters that might look scary at first but they are not. The first two parameters is to define the point from which the arc should be drawn. So here, we are using the ball's x and y position. Next, we have the radius of the arc, after that we have the starting angle and the final angle (we are using 2PI which is the angle of a circle) and then there's a boolean value which, if `true`, makes the arc drawn anti-clockwise. I usually keep it `false` so that all my arcs are drawn clockwise.

So we made the ball object, it's time for paddles. Instead of creating a different object for each ball, I decide to create a class `Paddle` from which I can make two objects with just two lines! So first, we will define the class as a function with one parameter that will decide the position of the paddle.


// Function for creating paddles
function Paddle(pos) {
	// Height and width
	this.h = 5;
	this.w = 150;
	
	// Paddle's position
	this.x = W/2 - this.w/2;
	this.y = (pos == "top") ? 0 : H - this.h;
}


In this, we are just defining the height and width of the paddles, and there x and y positions. Take a look at `this.y = (pos == "top") ? 0 : H - this.h;`, this means that if the position is `top` then the y position of the paddle should be `0` otherwise it should be `H` minus the paddle's height. Pretty neat, eh?

Now we need to fill the `paddles` array with our top and bottom paddles. We can do this by using `new` keyword which will create an object from our class like below.


// Push two new paddles into the paddles[] array
paddles.push(new Paddle("bottom"));
paddles.push(new Paddle("top"));


The `push` method of an array is used to add new values into the array at the end of it. I could have also used `paddles[0] = new Paddle("bottom")` but I like to do everything neatly and so should you. :)

###Step 3 - Drawing Everything on Canvas

So, we now have our two paddles and a ball waiting to be drawn on the canvas. First of all, we will create a function to paint the canvas. You must note that I am using too many functions rather than creating a main function and pushing everything in it. It is a great practice to make code like that because it will make your code look clean and much better to debug. So, for new create a new function named `paintCanvas`.


// Function to paint canvas
function paintCanvas() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, W, H);
}


Here, the first line is used to set the fill color and the second line (we used this before, ain't we?) is used to fill the canvas. The `fillRect` function is the one which you will use to create rectangles and squares. It accepts four parameters, the first two are the start coordinates from where we want to start filling and the other two are for the final coordinates. To fill the whole canvas, we used the initial coordinates (0,0) and the final coordinates as (W,H) which are the window's width and height respectively.

Now before doing anything, let's start running the whole system in a loop. For this, I used `requestAnimationFrame` because it is a much better choice over `setInterval` or `setTimeout` methods. Paste the following at the top of your code.


// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     ||  
		  function( callback ){
			return window.setTimeout(callback, 1000 / 60);
		  };
})();


So now, create a `draw` function which will be used as the loop and be repeated 60 times a second to get smooth animations. We'll get back to animations later, for now, just initiate the loop. In the draw function, we will first paint the canvas, then draw the paddles and then the ball.


// Draw everything on canvas
function draw() {
	paintCanvas();
	for(var i = 0; i &amp;lt; paddles.length; i++) {
		p = paddles[i];
		
		ctx.fillStyle = "white";
		ctx.fillRect(p.x, p.y, p.w, p.h);
	}
	
	ball.draw();
}


To draw the paddles, we are using the same method that we used to paint the canvas. We are using a `for` loop to iterate through the `paddles` array and then using the `fillRect` method again. The parameters used here are self-explanatory. The first two are the coordinates of paddles that we defined in it's class and the other two are the it's width and height that act as the ending point of the `fillRect`. Next, we used the `draw` method that we defined inside our `ball` object.

Now call `draw()` somewhere and you'll see everything in place. Now we need to create a loop using `requestAnimationFrame` that we defined earlier above. To do this, create a new function `animloop` and call it below itself like this.


// Function for running the whole animation
function animloop() {
	requestAnimFrame(animloop);
	draw();
}

animloop();


Here, we are using the `requestAnimFrame` and passing the function itself as it's parameter and then just below it, we are calling the `draw()` function. Make sure sure you removed the calling of it that you did before. Now we have everything running in loop but we can't see anything, right? That's because neither our ball is moving not our paddles. We will animate them in the next section.

###Step 4 - Animating the Ball and the Paddles

Remember we defined the velocity vectors in our `ball` object? It is the time we use them now. So basically, what we'll do is, in each next frame, we'll add those velocity vectors in the positions of our ball so that in each frame the ball's position will get updated and it will look like as if the ball is moving. To do this, first create another function and name it `update`. We will do everything here related to the changes that our game will have in the consecutive frames.


function update() {
	// Move the ball
	ball.x += ball.vx;
	ball.y += ball.vy;
}


Now call this function at the end of our `draw()` function and voila! the ball is moving! So what we did here is update the position of the ball according to its velocity vectors. Now we need to add controls so that the player can move the paddles with their mouse. It's very easy to do that really. First of all we will have to add an event listener to our canvas so that it can detect mouse movements. This can be done by using a single line


canvas.addEventListener("mousemove", trackPosition, true);


Now we need create a function `trackPosition()` that will be called when the mouse cursor change it's position. But first, let's define an empty mouse object by adding `var mouse = {}` where you defined all your variables. Again, it is a good practice to keep everything in place so have your variables at the top of your document (below `requestAnimFrame` in our case).


// Track the position of mouse cursor
function trackPosition(e) {
	mouse.x = e.pageX;
	mouse.y = e.pageY;
}


In this function, we are simply storing the current mouse position in our object as `mouse.x` and `mouse.y` for x and y coordinates respectively. Now get back to your `update()` function and add the following lines to it.


// Move the paddles on mouse move
if(mouse.x &amp;amp;&amp;amp; mouse.y) {
	for(var i = 1; i &amp;lt; paddles.length; i++) {
		p = paddles[i];
		p.x = mouse.x - p.w/2;
	}		
}


Here, we are changing the x position of our paddle according to our mouse's x position. We also subtracted the half of paddle's width from it because we want to make sure that our paddle's center is in the line of our cursor. Now try moving your mouse and you'll see that the paddles are moving like we wanted them to be. Sweet!

###Step 5 - Detection Collisions and Doing the Fun Stuff!

As we have everything moving and in place now, we are just left with making the ball bounce when it hits the paddles and the balls. Let's recall the logic again that we learnt at the beginning.

* Ball should bounce back (change direction) after hitting the walls and the paddles.
* When a ball hits the ceiling or floor, the game should end.

So, we have now two tasks to do. First is, detect the collisions between the ball and the paddles, and the second is to detect the collisions between the ball and one of the walls. The latter is easier to do so we will do it first.


// Collide with walls, If the ball hits the top/bottom,
// walls, run gameOver() function
if(ball.y + ball.r &amp;gt; H) {
	ball.y = H - ball.r;
	gameOver();
} 

else if(ball.y &amp;lt; 0) {
	ball.y = ball.r;
	gameOver();
}

// If ball strikes the vertical walls, invert the 
// x-velocity vector of ball
if(ball.x + ball.r &amp;gt; W) {
	ball.vx = -ball.vx;
	ball.x = W - ball.r;
}

else if(ball.x -ball.r &amp;lt; 0) {
	ball.vx = -ball.vx;
	ball.x = ball.r;
}


In this code, the first two conditions are used for checking the collision of ball with the top and bottom walls and if it comes true, then run the `gameOver` function. Ignore this function for now, we'll get back to it later. The next two conditions are for check the collision between the ball and the left and right walls. If this it is true, then invert the x-velocity vector of the ball. This will make the ball move into opposite direction.

Place this piece of code in your `update` function. Now we need to detect the collision between the ball and the paddles. This seems hard but it's not if you get the logic. We'll first compare the horizontal position of ball and the paddles. First check if the x-position of the ball is greater than or equal to the x-position of the paddles and less than or equal to the end position of them. If that's true, then move onto next conditions which will compare the y-positions of ball and the paddles. For this, first create a function which we will call in our `update` function.


//Function to check collision between ball and one of
//the paddles
function collides(b, p) {
	if(b.x + ball.r &amp;gt;= p.x &amp;amp;&amp;amp; b.x - ball.r &amp;lt;=p.x + p.w) {
		if(b.y &amp;gt;= (p.y - p.h) &amp;amp;&amp;amp; p.y &amp;gt; 0){
			return true;
		}
		
		else if(b.y &amp;lt;= p.h &amp;amp;&amp;amp; p.y == 0) {
			return true;
		}
		
		else return false;
	}
}


This function accepts two parameters, first for the ball and the second one for the paddles. I have made this function such that it will work for both paddles. You can see that the first condition will always return true when the bottom paddle hits the ball while the second one will return true only if top paddle hits the ball. Now we can use this function in our `update()` function and our new updated function will look like this.


function update() {
	
	// Move the paddles on mouse move
	if(mouse.x &amp;amp;&amp;amp; mouse.y) {
		for(var i = 1; i &amp;lt; paddles.length; i++) {
			p = paddles[i];
			p.x = mouse.x - p.w/2;
		}		
	}
	
	// Move the ball
	ball.x += ball.vx;
	ball.y += ball.vy;
	
	// Collision with paddles
	p1 = paddles[1];
	p2 = paddles[2];
	
	if(collides(ball, p1)) {
		ball.vy = -ball.vy;
	}


	else if(collides(ball, p2)) {
		ball.vy = -ball.vy;
	} 
	
	else {
		// Collide with walls, If the ball hits the top/bottom,
		// walls, run gameOver() function
		if(ball.y + ball.r &amp;gt; H) {
			ball.y = H - ball.r;
			gameOver();
		} 
		
		else if(ball.y &amp;lt; 0) {
			ball.y = ball.r;
			gameOver();
		}
		
		// If ball strikes the vertical walls, invert the 
		// x-velocity vector of ball
		if(ball.x + ball.r &amp;gt; W) {
			ball.vx = -ball.vx;
			ball.x = W - ball.r;
		}
		
		else if(ball.x -ball.r &amp;lt; 0) {
			ball.vx = -ball.vx;
			ball.x = ball.r;
		}
	}
}


So now, our update function check for the ball collisions with the walls, floor, ceiling and the paddles. If it hits one of the paddles, then invert the y-velocity so that it can bounce back and ready to be hit by the second paddle.

The main logic of our game is now complete. 

###Step 6 - Game Over and Other Stuff

Now we will define our `gameOver()` function. In this, we will just stop the animation that we started earlier using `requestAnimFrame`. Get back to your `animloop()` function and replace it with the following.


// Function for running the whole animation
function animloop() {
	init = requestAnimFrame(animloop);
	draw();
}


Now, at the top of your document, add the following lines. These are for cancelling the `requestAnimationFrame` that we'll use in our `gameOver()` function.


window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame          ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame     ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout
})();


Now create the `gameOver()` function and add the following lines to it.


function gameOver() {
	ctx.fillStyle = "white";
	ctx.font = "20px Arial, sans-serif";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Game Over", W/2, H/2 + 25 );
	
	// Stop the Animation
	cancelRequestAnimFrame(init);
}


In this function, we are drawing some text on the canvas using the `fillText` function. And finally cancel the animation using `cancelRequestAnimFrame(init)`. Now our game is fully complete, just play the game to check whether everything is working fine or not.

You can see in the live demo above that I have much better features apart from the basic functionality. These includes a sound and some very cool sparks, when the ball hits the paddle, scoring system, start and restart buttons, ball's speed increases as you progress the game to make it more difficult.
You can look at the code to understand how it is done and take this as an exercise. Some of them are easy to do while others like emitting the sparks are hard. But you can always ask me if you get stuck anywhere and I will help you as much as I can.

Now try to do this and add more features to your game or fork this one and show me what you got!
