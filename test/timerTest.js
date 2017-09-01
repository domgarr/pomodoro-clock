const assert = require("chai").assert;

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p id ="clock"></p>
						<button type="button" id="start">Click Me!</button>
						<button type="button" id="pause">Click Me!</button>
						<button type="button" id="stop">Click Me!</button>
	`);

global.$ = require("jquery")(dom.window);
global.document = dom.window.document;

var timer = require("../js/timer");
//Cache DOM
var $clockText = $("#clock");

describe("timer", function(){
	//On intialization the timer should equal 25 minutes
	describe("initialization", function(){
		it("On intialization the timer should equal 00:25:00", function(){
			assert.equal($clockText.text(),"00:25:00");
		});	
	});

	describe("Elapsed Timer", function(){
	//When the timer is less than zero. The clock should stop at 00:00:00
		it("When the timer has elapsed, the timer should equal 00:00:00", function(){
			timer.setLength(0);
			assert.equal($clockText.text(), "00:00:00");
			timer.setLength(25);
		});
	// A sound should play upon timer finishing.
		it("When the timer has elapsed, a sound trigger", function(){
			//Sound not implemented yet.
			assert.equal(0,1);
		});
	});

	describe("Start Button", function(){
		//When play is pressed, the time should decrease (IE. Less than intial time)
		it("After play button is pressed, the timer should be less than the initial time (25:00)", function(done){
			//Click play
			$("#start").click();
			//Run assertion after 3 seconds. Give timer room to decrement.
			setTimeout(function(){
				assertion();
			},3000);

			function assertion(){
				//Note: Both return minutes.
				const initialTime = timer.getLength();
				var remainingTime = timer.getRemainingMinutes();
				assert.isBelow(remainingTime, 12);
			}
		});
		//Pressing play multiple times should have no effect on the clock.
		it("The intever counter should remain at 1 after consecutive play clicks", function(){
			for(var i = 0; i < 5; i++)
				$("#start").click();

			assert.equal(timer.innerTimer.getIntervalCounter(),1);
		})

	});


//Pressing pause should stop the time from decrementing.

//Spamming pause should have no greater effect. This means
//spamming play should result in the timer staying the same.

//Pressing play after pause should resume the clock from where it left off.

//Pressing stop should restart the clock back to the initial time.

//Spamming stop should result in no more greater effects. This means the 
//clock should remain at the intial starting time.
});