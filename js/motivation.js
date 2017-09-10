
$(document).ready(function(){
(function(){
	//This module will extract either a motivational picture or video from reddit.com/r/GetMotiviated.
	var motivation = {
		path : "https://www.reddit.com/r/GetMotivated/hot.json?limit=", //Returns 3
		testingPath : "https://www.reddit.com/r/GETMotivated/by_id/t3_6vxhun.json",
		after : "",
		threadIndex : 0,
		threads : {},
		currentType : null,
		init : function(){
			this.gatherThreads(20, function() {});
			this.cacheDom();
			
			
		},
		cacheDom: function(){
			this.$motivationImg = $("#motivation-img");
			this.$motivationTitle = $("#motivation-title");
			this.$motivationText = $("motivation-text");
		},
		bindEvents : function(){

		},
		render : function(){
			
			this.$motivationImg.attr({
				"src" : this.imageUrl, 
				"alt" : this.title
			});

			this.$motivationTitle.text(this.title);
		},
		//Gets quantity + 2 threads from reddit.com/r/GetMotivated
		gatherThreads : function(quantity, callback){
			$.getJSON(this.path + quantity + this.after, function(jsonData,status,xhr){
				if(status == "success"){
					this.threads = jsonData["data"]["children"];
					this.initThread();
					this.findNextThread();
					callback("success");
				}else if(status == "error"){
					callback("error");
				}
			}.bind(this));
		},
		getType : function(childData){
			//Get title, needs [ ] parsed out.
			this.title = childData["title"]; 
			//Parse Title for square brackets since the type is in the square brackets.
			var re = /\[[a-zA-z]+\]/;
			//Match returns an array.
			var result = this.title.match(re);
				//If [Image] or [Text] is not found within the title.
				if(result == null){
					return null;
				} 

			//For consitancy set all characters to lowercase.
			result = result[0].toLowerCase();
			return result;
		},
		setTitle : function(childData){
			//Since [Image] or [Video] is lowecases for consistancy
			//Title needs to be fetched again.
			var title = childData["title"];
			var re = /\[[a-zA-z]+\]/;
			//Match returns an array.
			var resultString = title.match(re); 

			this.title = title.replace(resultString + " ", ""); 
		},
		setImageUrl : function(childData){
			this.imageUrl = childData["url"];
		},
		initThread : function(index){
			this.findThread();
			
			if(this.currentType == "[image]"){
				this.setImageUrl(this.threads[this.threadIndex]["data"]);
			}

			this.render();
		},
		findThread : function(){
		//We are looking for the first Image or Text thread type.
			for(var i = this.threadIndex ; i < this.threads.length ;  i++){
				var type = this.getType(this.threads[i]["data"]);
				if(type == "[image]"){
					this.currentType = type;
					break;
				}
			}
			this.threadIndex = i;
			console.log(type);
			if(type != "[image]"){
				this.after = "&" + threads[i]["after"];
				console.log(this.after);
				this.gatherThreads(20, function() {});
			}
		},
		findNextThread : function(){
			this.threadIndex++;
			this.initThread();
		}
	};

	motivation.init();
	//module.exports = motivation;
})();

	

});
		
