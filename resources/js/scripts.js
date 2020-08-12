//Initializing global variable
const particles = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

	//Assigning amount of particles according to view width.
	const particlesAmount = Math.floor(window.innerWidth / 10);

	for (let i = 0; i < particlesAmount; i++) {
		particles.push(new particle());
	}
}

function draw() {
	background(55, 100, 144);
	particles.forEach((p, index) => {
		p.update();
		p.draw();
		p.checkParticles(particles.slice(index));
	});
}

class particle {
	constructor() {
		//Random particle positioning
		this.pos = createVector(random(width), random(height));

		//Create velocity for particles
		this.vel = createVector(random(-2, 2), random(-2, 2));

		//Size of particles
		this.size = 4;
	}

	//Update movement by adding movement.
	update() {
		this.pos.add(this.vel);
		this.edges();
	}

	//Draw a single particle
	draw() {
		noStroke();
		fill("rgba(255, 255, 255, 0.1)");
		circle(this.pos.x, this.pos.y, this.size);
	}

	//Detect canvas edges:
	edges() {
		if (this.pos.x < 0 || this.pos.x > width) {
			this.vel.x *= -1;
		}
		if (this.pos.y < 0 || this.pos.y > height) {
			this.vel.y *= -1;
		}
	}

	//Connect Particles with lines.
	checkParticles(particles) {
		particles.forEach((particle) => {
			const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

			//Set distance condition for particles to connect each other with lines:
			if (d < 120) {
				stroke("rgba(255, 255, 255, 0.1)");
				line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
			}
		});
	}
}
