const assert = require("chai").assert;

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p id ="clock"></p>
						<button type="button" id="start">Click Me!</button>
						<button type="button" id="pause">Click Me!</button>
						<button type="button" id="stop">Click Me!</button> `);

global.$ = require("jquery")(dom.window);
global.document = dom.window.document;

var timer = require("../js/timer");
//Cache DOM
var $clockText = $("#clock");

describe("Timer", function(){
	//On intialization the timer should equal 25 minutes
	describe("Initialization", function(){
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
	});

	describe("Start Button", function(){
		//When play is pressed, the time should decrease (IE. Less than intial time)
		it("After play button is pressed, the timer should be less than the initial time (25:00)", function(){
			this.timeout(5000);
			//Click play
			$("#start").click();
			//Run assertion after 3 seconds. Give timer room to decrement.
			setTimeout(function(){
				assertion();
			},2000);

			function assertion(){
				//Note: Both return minutes.
				var initialTime = timer.getLength();
				var remainingTime = timer.getRemainingMinutes();
				assert.isBelow(remainingTime, 25);
			}
		});
		//Pressing play multiple times should have no effect on the clock.
		it("The intever counter should remain at 1 after consecutive play clicks", function(){
			//Emulate 5 quick mouse clicks.
			for(var i = 0; i < 5; i++) {
				$("#start").click();
			}

			setTimeout(function(){
				assert.equal(timer.getIntervalCounter(),1);
			},1000);
		});

		//Pressing start after pause should resume the clock from where it left off.
		it("Pressing start after pause should resume from the time it left off at", function(){
			var timeBeforePause = $("#clock").text();
			$("#pause").click();

			setTimeout(function(){
				$("start").click();
				var timeBeforeAssertion = $("#clock").text();
				assert.equal(timeBeforeAssertion, timeBeforePause);
			},1000);
		});
	});


	//Pressing pause should stop the time from decrementing.
	describe("Pause Button", function(){
		it("Pause should stop time from decrementing", function(){
			this.timeout(3000);

			var timeBeforePause = $("#clock").text();
			$("#pause").click();

			setTimeout(function(){
				var timeBeforeAssertion = $("#clock").text();
				assert.equal(timeBeforeAssertion, timeBeforePause);
			},2000);
		});

	//Spamming pause should have no greater effect. This means
	//spamming play should result in the timer staying the same.
		it("Spamming play should result in the time remaining paused.", function(){
			//The time is paused from the previous test.
			var timeBeforePause = $("#clock").text();
			//Just need to emulate clicks.
			for(var i = 0; i < 5; i++) {
					$("#pause").click();
				}
				
			setTimeout(function(){
				var timeBeforeAssertion = $("#clock").text();
				assert.equal(timeBeforeAssertion, timeBeforePause);
			},1000);
		});
		//Pressing the stop button should clear all intervals.
		it("Pressing the puase button should result in 0 intervalIDs", function(){
			$("pause").click();
			assert.equal(timer.getIntervalCounter(),0);
		});
	});

	describe("Stop", function(){
		//Pressing stop should restart the clock back to the initial time.
		it("Pressing stop should reset the time to 00:25:00",function(){
			this.timeout(5000);
			//Ensure clock ran for atleast 3 seconds.
			$("start").click();

			setTimeout(function(){
				$("stop").click();
				assert.equal($clockText.text(),"00:25:00");
			},3000);
		});
	
	//Spamming stop should result in no more greater effects. This means the 
	//clock should remain at the default starting time.
		it("Spamming the stop button should reset time over and over again to 00:25:00", function(){
			for(var i = 0; i < 5; i++) {
					$("#stop").click();
			}
				
			setTimeout(function(){
				assert.equal($("#clock").text(), "00:25:00");
			},1000);
		});
	
	//Pressing the stop button should clear all intervals.
		it("Pressing the stop button should result in 0 intervalIDs", function(){
			$("stop").click();
			assert.equal(timer.getIntervalCounter(),0);
		});
	});
});