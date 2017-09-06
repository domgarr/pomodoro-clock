
$(document).ready(function(){
(function(){
	//This module will extract either a motivational picture or video from reddit.com/r/GetMotiviated.
	var motivation = {
		path : "https://www.reddit.com/r/GetMotivated/hot.json?limit=", //Returns 3
		testingPath : "https://www.reddit.com/r/GETMotivated/by_id/t3_6vxhun.json",
		posts : {},
		init : function(){
			this.gatherPosts(1, function() {});
			this.cacheDom();
			
			
		},
		cacheDom: function(){
			this.$motivationImg = $("#motivation-img");
			this.$motivationTitle = $("#motivation-title");
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
		gatherPosts : function(quantity, callback){
			
			$.getJSON(this.testingPath, function(jsonData,status,xhr){
				if(status == "success"){
					this.posts = jsonData["data"]["children"];
					this.count = this.posts.length;

					this.setType(this.posts[0]["data"]);
					this.setTitle(this.posts[0]["data"]);
					this.setImageUrl(this.posts[0]["data"]);
					this.render();
					callback("success");
				}else if(status == "error"){
					callback("error");
				}
			}.bind(this));
		},
		setType : function(childData){
			//Get title, needs [ ] parsed out.
			this.title = childData["title"]; 
			//Parse Title for square brackets since the type is in the square brackets.
			var re = /\[[a-zA-z]+\]/;
			//Match returns an array.
			var result = this.title.match(re); 
			//For consitancy set all characters to lowercase.
			result = result[0].toLowerCase();
			this.type = result;
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
		getCount : function(){
			return this.count;
		}
	};

	motivation.init();

	//module.exports = motivation;
})();
});
		
