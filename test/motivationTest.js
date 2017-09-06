 
   const assert = require("chai").assert;

	const jsdom = require("jsdom");
	const { JSDOM } = jsdom;
	const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

	global.$ = require('jquery')(dom.window);
	global.document = dom.window.document;

   var motivation = require("../js/motivation");

   
   	describe("gatherPosts", function(){
   		//IF the test takes longer then 2000ms, add below.
         //this.timeout(5000)

         it("Calling gatherPosts(1) should return 'success' ", function(done){
            motivation.gatherPosts(1, function(status){
               assert.equal(status,"success"); 
               done();
            });
   		});
         describe("getCount", function(){
            //After gatherPost is executed, text to ensure our data is saved correctly.
            it("Calling getCount() after executing gatherPosts(1) should return 1", function(){
               assert.equal(motivation.getCount(), 1);
            });
         });

         describe("getType", function(){
            //After gatherPost is executed, text to ensure our data is saved correctly.
            it("Calling getType() will set type value to [image]", function(){
               motivation.setType(motivation.posts[0]["data"]);
               assert.equal(motivation.type, "[image]");
            });
         });

         describe("setTitle", function(){
            //After gatherPost is executed, text to ensure our data is saved correctly.
            it("Calling setTitle() will set title property to 'Conor McGregor' ", function(){
               motivation.setTitle(motivation.posts[0]["data"]);
               assert.equal(motivation.title, "Conor McGregor");
            });
         });

         describe("setImageUrl", function(){
            //After gatherPost is executed, text to ensure our data is saved correctly.
            it("Calling setImageUrl() will set the imageUrl property to 'http://i.imgur.com/GLOH7I1.jpg' ", function(){
               motivation.setImageUrl(motivation.posts[0]["data"]);
               assert.equal(motivation.imageUrl, "http://i.imgur.com/GLOH7I1.jpg");
            });
         });
      
      });



