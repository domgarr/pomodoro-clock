

$(document).ready(function(){

//Constructor for the Timer.
function Timer(countDownLength, $clock, $play, $pause, $stop){
	//Expected to be in minutes.
	var _countDownLength = countDownLength;
	//Cache DOM
	var _$clock = $($clock);
	var _$play = $( $play);
	var _$pause = $($pause);
	var _$stop = $($stop);

//Revealing Module Pattern
//A self-calling anonymous function.
//This way the innerTime methods are private.
var innerTimer = (function(){
	
	const MS = 1000;
	var MINUTE_IN_MS = MS * 60;
	var HOUR_IN_MS = MINUTE_IN_MS * 60;

	var countDownLengthMS = countDownLength * MINUTE_IN_MS;
	var intervalID = null;

	//bind events
	_$play.on("click", start);
	_$pause.on("click", pause);
	_$stop.on("click", stop);

	function start(){
		if(intervalID == null)
			intervalID = setInterval(countDown,MS);
	}

	function countDown(){
		countDownLengthMS -= MS;
		render();
	}

	function pause(){
		clearInterval(intervalID);
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

	function getLength(){
		return 
	}

	render();

	return {
		setLength : setLength,
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

	this.getLength = function (){
		return _countDownLength;
	}
}
//module.exports = timer;

var timer = new Timer(26, "#clock", "#start", "#pause", "#stop");



});