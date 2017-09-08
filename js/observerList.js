//This is a function declaration. A semi-colon after the body brace isnt necessary.
function ObserverList(){
	this.observerList = [];
}
//However if we write a funciton as a statement, then the statement needs to be terminated
//just as we would with a variable.
ObserverList.prototype.add = function(obj){
	return this.observerList.push(obj);
};

ObserverList.prototype.count = function(){
	return this.observerList.length;
};

ObserverList.prototype.get = function(index){
	if(index >= 0 && index < this.count()){
		return this.observerList[index];
	}
};

ObserverList.prototype.indexOf = function(obj, startIndex){
	for( var i = startIndex; i < this.count(); i++){
		if(this.observerList[i] == obj){
			return i;
		}
	}
	return -1;
};

// array.splice(start, deleteCount)
ObserverList.prototype.removeAt = function(index){
	this.observerList.splice(index,1 );
};