//Can't export objects while wrapped in JQuery ready function.
// Comment the JQuery ready function to run test.
$(document).ready(function(){

//Constructor for the Timer.
function Timer(countDownLength, $clock, $play, $pause, $stop){
	//Expected to be in minutes.
	var _countDownLength = countDownLength;
	//Cache DOM
	var _$clock = $($clock);
	var _$play = $($play);
	var _$pause = $($pause);
	var _$stop = $($stop);
	
//Revealing Module Pattern
//A self-calling anonymous function.
//All methods and variables of innerTime are private except for those returned.
var innerTimer = (function(){
	
	const MS = 1000;
	const MINUTE_IN_MS = MS * 60;
	const HOUR_IN_MS = MINUTE_IN_MS * 60;

	var countDownLengthMS = countDownLength * MINUTE_IN_MS;
	
	var intervalID = null;
	var intervalCounter = 0;

	//bind events
	_$play.on("click", start);
	_$pause.on("click", pause);
	_$stop.on("click", stop);

	function start(){
		if(intervalID == null){
			intervalID = setInterval(countDown,MS);
			intervalCounter++;
		}
	
	}

	function countDown(){
		countDownLengthMS -= MS;
		render();
	}

	function pause(){
		clearInterval(intervalID);
		if(intervalCounter > 0)
			intervalCounter--;
		intervalID = null;
	}

	function stop(){
		pause();
		resetTime();
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

	function notify(){

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
		console.log(this);
		this.notify();
	}.bind(this));

	
	
}
	Timer.prototype = new Subject();
	var timer = new Timer(25, "#clock", "#start", "#pause", "#stop");
	
	//console.log(timer);
	//console.log(timer);
	console.log(task);
	timer.addObserver(task);

});

//Uncomment below to test. Need to automate this somehow.
//module.exports = timer;
	

