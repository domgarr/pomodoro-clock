const assert = require("chai").assert;

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const dom = new JSDOM(`<p class="lead text-center" id="task-text"> Complete the clock module and make it look sexy </p>
						<div id = "tasks">
							<input type="text" class="form-control" placeholder="Learn the merge method of mergesort.">
							<input type="text" class="form-control" placeholder="Text input">
							<input type="text" class="form-control" placeholder="Text input">
							<input type="text" class="form-control" placeholder="Text input">
						</div>
						<button type="button" id="start">Click Me!</button>`);

global.$ = require("jquery")(dom.window);
global.document = dom.window.document;

var task = require("../js/task"); 

$(document).ready(function(){
	task.init();
});

var $taskText = $("#task-text");

describe("Task", function(){
	
	it("Clicking the start button on the clock should move the very top task above the timer", function(){
		$("#tasks").children().eq(0).text("Work on task module.") 
		task.update();
		assert.equal($taskText.text(), "Work on task module.")
	});

	//The next task will not be removed until the pomodoro is complete.
});