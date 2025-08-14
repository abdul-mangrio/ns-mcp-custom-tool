/**
 * customtool_test1.jsc
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

define([], function() {
    return {
      add: function (args) {
        let a=args["a"];
        let b=args["b"];
        return a+b; //this is a test return
      }

      ,
      reverseText: function (args) {
        let text=args["text"];
        return text.split('').reverse().join('');
      }
    }
  });