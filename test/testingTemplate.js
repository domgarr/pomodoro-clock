/*
Install the following using NPM.
- mocha : A testing framwork that runs off of NodeJS
- chai : An improved testing library
- jsdom : required for testing browser interaction. This is due to the fact that
         NodeJS doesn't contain the DOM object needed.

If testing JQuery the $ symbol can retrieved from the DOM.



const assert = require("chai").assert;

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const dom = new JSDOM(`<p> Insert the following tags to be used in testing here! <p>`);


global.$ = require("jquery")(dom.window);
global.document = dom.window.document;

//The object or method to be testing must be exported using NodeJS module.exports
//Ex. module.exports = function() { console.log("Hello World")}
var helloWorld = require("../js/helloWorld"); //Path to the following Javascript file

*/