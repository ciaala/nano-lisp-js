"use strict";

describe("jasmineTree", function(){

	it("Requires jQuery in order to work", function(){
		expect(jQuery).toBeDefined();
	});

	it("Lives inside its own namespace", function(){
		expect(jasmineTree).toBeDefined();
	});

	describe(".version", function(){
		it("Reports the current version number", function(){
			expect(jasmineTree.version).toBeDefined();
		});
	});

	describe(".init()", function(){

		it("Is an utility method to bootstrap the GUI", function(){
			expect(jasmineTree.Suite).toBeDefined();
			expect($.isFunction(jasmineTree.Suite)).toBeTruthy();
		});

		describe("Invokes:", function(){

			it(".addRootClass()", function(){
				spyOn(jasmineTree, "addRootClass");
				jasmineTree.init();
				expect(jasmineTree.addRootClass).toHaveBeenCalled();
			});
			it(".addToolbar()", function(){
				spyOn(jasmineTree, "addToolbar");
				jasmineTree.init();
				expect(jasmineTree.addToolbar).toHaveBeenCalled();
			});
			it(".filterSpec()", function(){
				spyOn(jasmineTree, "filterSpec");
				jasmineTree.init();
				expect(jasmineTree.filterSpec).toHaveBeenCalled();
			});

		});
	});

	describe(".Suite", function(){
		it("Is the constructor for the object that get attached to each suite", function(){
			expect(jasmineTree.Suite).toBeDefined();
			expect($.isFunction(jasmineTree.Suite)).toBeTruthy();
		});
	});

});