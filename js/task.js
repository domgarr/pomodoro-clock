//Figure out how to add the Observer prototype to the task object
//so that update needs to be overwritten.

var TESTING = false;

function Observer(){
	this.update = function(context){
		//Needs to be overwritten.
		console.log("Hello World");
	};
}

//Constructor if the associated object has behaviour, or an object literal otherwise.
function Task(quantityOfInputs){
	Observer.call(this);
			this.init = function(){
				this.cacheDom();

			},
			this.cacheDom = function(){
				this.$tasks = $("#tasks");
			},
			this.update = function(context){
				var firstTask = this.$tasks.children().eq(0);
				var taskText = firstTask.val();
			
				if(!taskText == ""){
					context.text(taskText);
					firstTask.remove();
				}

			} 
		};

var task = new Task();

if(!TESTING){
	$(document).ready(function(){
		task.init();		
	});
}else{
	module.exports = task;
}