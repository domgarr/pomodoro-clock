 	const assert = require("chai").assert;

	const jsdom = require("jsdom");
	const { JSDOM } = jsdom;
	const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

	global.$ = require('jquery')(dom.window);
	global.document = dom.window.document;

   	var motivation = require("../js/motivation");

   	console.log(motivation);

   	describe("getType", function(){
   		it("TEST", function(){
   		   assert.equal(5, 5);
   		});
   	});

   	describe("gatherPosts", function(){
   		it("Calling gatherPosts(1) should returns 3 posts", function(){
   			motivation.gatherPosts();
   			assert.equal(motivation.posts.length)
   		})
   	});
   	