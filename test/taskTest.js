const assert = require("chai").assert;

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const dom = new JSDOM(`<p> Insert the following tags to be used in testing here! <p>`);

global.$ = require("jquery")(dom.window);
global.document = dom.window.document;

var task = require("../js/task"); 

describe("Task", function(){
	it("Clicking the start button on the clock should move the test in topmost task above the task.", function(){
		assert.equal(0,1);
	});
});