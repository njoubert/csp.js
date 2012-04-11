define(function() {
  
  var Hash = function() {
    
  }
  
  Hash.prototype.clone = function() {
    var a = new this.constructor();
    //...
  }
  
  Hash.prototype.keys = function() {
    return Object.keys(this);
  }
  
  Hash.prototype.set = function(k,v) {
    this[k] = v;
  }
  
  Hash.prototype.get = function(k) {
    return this[k];
  }
  
  
  return Hash;
  
  
})