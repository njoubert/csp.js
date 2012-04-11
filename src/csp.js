/* 
 * CSP.JS
 *
 * A constraint satisfaction problem solver in Javascript.
 *
 *
 */
 
define(
  
  ["util", "discrete_finite"],
  
  function (util, discrete_finite) {
  
  var ret = {
    version: "0.1",
  }

  util.mixin(ret, discrete_finite);

  return ret;
  
});