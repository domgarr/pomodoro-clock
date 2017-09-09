var TESTING = false;


//Constructor for the Timer.
function Timer(countDownLength,breakLength, $clock, $play, $pause, $stop, $taskText){
	//Expected to be in minutes.
	var _countDownLength = countDownLength;
	var _breakLength = breakLength;
	//Cache DOM
	var _$clock = $($clock);
	var _$play = $($play);
	var _$pause = $($pause);
	var _$stop = $($stop);

	var _$taskText = $($taskText);
	
//Revealing Module Pattern
//A self-calling anonymous function.
//All methods and variables of innerTime are private except for those returned.
var innerTimer = (function(){
	
	const MS = 1000;
	const MINUTE_IN_MS = MS * 60;
	const HOUR_IN_MS = MINUTE_IN_MS * 60;

	var countDownLengthMS = countDownLength * MINUTE_IN_MS;

	var pomodoroCount = 0;
	var isBreakTime = false;
	
	var intervalID = null;
	var intervalCounter = 0;

	var sound = new Howl({
		src: ["../sounds/analog-watch-alarm.wav"]
	});

	//bind events
	_$play.on("click", start);
	_$pause.on("click", pause);
	_$stop.on("click", reset);

	function start(){
		if(intervalID == null && countDownLengthMS > 0){
			intervalID = setInterval(countDown,MS);
			intervalCounter++;
		}
	}

	function countDown(){
		countDownLengthMS -= MS;
		if(countDownLengthMS <= 0){
			if(!isBreakTime){
				isBreakTime = true;
				_$clock.attr("style", "background-color: #801515" );
				_$clock.addClass('animated flash');
				sound.play();
				pause();
				this.setTimeout(function(){
					sound.stop();
					initBreak();
				},2750)
			}else{
				isBreakTime = false;
			
				_$taskText.text("Back to work!");
				animateBounceInDown(_$taskText);
			
				reset();
			}

			pause();

		}
		render();
	}

	function pause(){
		clearInterval(intervalID);
		if(intervalCounter > 0)
			intervalCounter--;
		intervalID = null;
	}

	function reset(){
		pause();
		resetTime();
		_$clock.attr("style", "background-color: #79B363" );
		render();
	}

	function resetTime(){
		countDownLengthMS = _countDownLength * MINUTE_IN_MS;
	}

	function render(){
		_$clock.text(getTime());
	}

	function getTime(){
		var second = '0' + extractSeconds();
		var minute = '0' + extractMinutes();
		var hour = '0' + extractHours();
		var sizeOfString = 2;
		

		return  hour.substring(hour.length - sizeOfString, hour.length) + ':'  
			   + minute.substring(minute.length - sizeOfString, minute.length) + ':' 
			   + second.substring(second.length - sizeOfString, second.length);
	}

	function extractSeconds(){
		return (countDownLengthMS % MINUTE_IN_MS) / MS;
	}

	function extractMinutes(){
		return Math.floor((countDownLengthMS % HOUR_IN_MS) / MINUTE_IN_MS);
	}

	function extractHours(){
		return Math.floor(countDownLengthMS / HOUR_IN_MS); 
	}

	function setLength(newCountDownLength){
		countDownLengthMS = newCountDownLength * MINUTE_IN_MS;
		render();
	}

	function getRemainingMinutes(){
		return extractMinutes();
	}

	function getIntervalCounter(){
		return intervalCounter;
	}

	function initBreak(){
		setLength(_breakLength);
		_$clock.attr("style", "background-color: #6B949E" );
		_$taskText.text("Take a break!");
		animateBounceInDown(_$taskText);
		start();
	}

	function animateBounceInDown($name){
		$name.addClass('animated bounceInDown');
		this.setTimeout(function(){
			$name.removeClass('animated bounceInDown');
		}, 1000);
	}



	render();

	return {
		setLength : setLength,
		getRemainingMinutes : getRemainingMinutes,
		getIntervalCounter : getIntervalCounter
	};    
	


})();
	//Time in minutes.
	this.setLength = function(newCountDownLength){
		if(newCountDownLength >= 1){
			_countDownLength = newCountDownLength;
			return innerTimer.setLength(newCountDownLength);
		}
		_countDownLength = 0;
		return innerTimer.setLength(_countDownLength);
	}

	this.getLength = function(){
		return _countDownLength;
	}

	this.getRemainingMinutes= function(){
		return innerTimer.getRemainingMinutes();
	}

	this.getIntervalCounter = function(){
		return innerTimer.getIntervalCounter();
	}

	_$play.on("click", function(){
		console.log(_$taskText.text() +" CHECKK");
		this.notify(_$taskText);
	}.bind(this));	
}
	
//Can't export objects while wrapped in JQuery ready function.
// Comment the JQuery ready function to run test.
if(!TESTING){
	$(document).ready(function(){
		Timer.prototype = new Subject();
		var timer = new Timer(25, 5, "#clock", "#start", "#pause", "#stop", "#task-text");

		timer.addObserver(task);
	});
}else{
	//Uncomment below to test. Need to automate this somehow.
		Timer.prototype = new Subject();
		var timer = new Timer(25, "#clock", "#start", "#pause", "#stop");
		timer.addObserver(task);

		module.exports = timer;
}



	

