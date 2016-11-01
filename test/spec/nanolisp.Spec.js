/**
 * Created by fiduccia on 18/10/16.
 */

describe("nanolisp", function(){
	//var CONST;
	/*
	 it("Requires CodeMirror to work", function() {
	 expect(CodeMirror).toBeDefined();

	 }
	 )
	 */
	it("Requires jQuery in order to work", function(){
		expect(jQuery).toBeDefined();
	});
	it("Lives inside its own namespace", function(){
		expect(nanolisp).toBeDefined();
	});
	describe(".version", function(){
		it("Reports the current version number", function(){
			expect(nanolisp.version).toBeDefined();
		});
	});
	/*describe(".init()", function() {
	 it("Is an utility method to bootstrap the GUI", function(){
	 expect(nanolisp.init).toBeDefined();
	 expect($.isFunction(nanolisp.init)).toBeTruthy();
	 });
	 });
	 */
	describe(".interpreter()", function(){
		it("Is a constructor function to instantiate an interpreter", function(){
			expect(nanolisp.interpreter).toBeDefined();
			expect($.isFunction(nanolisp.interpreter)).toEqual(true);
		});
		var interpreter = new nanolisp.interpreter();
		it("The constructor function returns an object", function(){
			expect(interpreter).toBeDefined();
			expect(interpreter.constructor).toEqual(nanolisp.interpreter);
		});
	});
	describe("the Interpreter object", function(){
		it("contains a function .eval()", function(){
			var interpreter = new nanolisp.interpreter();
			expect(interpreter.eval).toBeDefined();
			expect($.isFunction(interpreter.eval)).toEqual(true);
		});


		describe("the function .eval() will throw an exception if called: ", function(){
			it("without a parameter", function(){
				var interpreter = new nanolisp.interpreter();
				expect(function(){
					interpreter.eval()
				}).toThrowError();
			});
			it("with a parameter of any type other than string", function(){
				var interpreter = new nanolisp.interpreter();
				expect(function(){
					interpreter.eval(1);
				}).toThrow();
				expect(function(){
					interpreter.eval([1]);
				}).toThrow();
				expect(function(){
					interpreter.eval({0: 1});
				}).toThrow();
			});
		});
		describe("the eval function returns an object", function(){
			it("", function(){
				var interpreter = new nanolisp.interpreter();
				expect(interpreter.eval(1)).toThrow();
				expect(interpreter.eval([1])).toThrow();
				expect(interpreter.eval({0: 1})).toThrow();
			});
		});
	});
});
