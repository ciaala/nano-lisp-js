nanolisp = {};
Object.defineProperty(nanolisp, 'version', {
	writable: false,
	configurable: false,
	value: "0.0.1"
});

nanolisp.expression = function(){

};

nanolisp.interpreter = function(){
	"use strict";
	var scope = {};
	var isAString = function(value){
		return Object.prototype.toString.apply(value) === "[object String]";
	};


	var parse = function(code){

		var expression = new nanolisp.expression();

	};

	this.eval = function(code){
		if(arguments.length === 0 || code === null || code === undefined){
			throw new Error("Invalid null or undefined code");
		}
		if(!isAString(code)){
			throw new Error("Invalid type for code, expected String")
		}
		var expression = parse(code);
		var result = expression.eval(scope);
		return {expression: code, result: result};
	};
};
