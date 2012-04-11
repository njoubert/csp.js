define(function() {
  
  var Set = function(/* array */) {
    if (arguments.length === 1) {
      var arr = arguments[0];
      for (var i = 0; i < arr.length; i++) {
        this[arr[i]] = true;
      }
    }
  }
  
  Set.prototype.clone = function() {
    return new this.constructor(this.toArray());
  }
  
  Set.prototype.insert = function(v) {
    if (this[v]) {
      return false;
    } else {
      this[v] = true;
      return true;
    }
  }
  
  Set.prototype.contains = function(v) {
    return (this[v] !== undefined);
  }
  
  Set.prototype.toString = function() {
    return Object.keys(this).toString();
  }
  
  Set.prototype.toArray = function() {
    return Object.keys(this);
  }
  
  
  return Set;
  
  
})