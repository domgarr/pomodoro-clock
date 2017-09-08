//Figure out how to add the Observer prototype to the task object
//so that update needs to be overwritten.

var task = {
			init : function(){
				this.cacheDom();
			},
			cacheDom : function(){
				this.$tasks = $("#tasks");
			},
			update : function(context){
				this.$tasks.children().eq(1).remove();
			}
		};


$(document).ready(function(){
	task.init();

		
		
		
});
