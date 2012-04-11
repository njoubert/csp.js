define({
    
    mixin: function(target, src) {
      for (var name in src) {
        if (src.hasOwnProperty(name) && !target.hasOwnProperty(name)) {
          target[name] = src[name];
        }
      }
    },
   
    hashcopy: function(obj) {
      var ret = obj.constructor();
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          ret[p] = obj[p];
        }
      }
      return ret;
    }

 
});