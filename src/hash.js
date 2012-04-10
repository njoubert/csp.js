define(function() {
  
  var Hash = function() {
    
  }
  
  Hash.prototype.clone = function() {
    var a = new this.constructor();
    //.....
  }
  
  Hash.prototype.set = function(k,v) {
    this.k = v;
  }
  
  Hash.prototype.get = function() {
    return this.k;
  }
  
  
  return Hash;
  
  
})