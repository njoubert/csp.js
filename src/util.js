define({
    
    mixin: function(target, src) {
      for (var name in src) {
        if (src.hasOwnProperty(name) && !target.hasOwnProperty(name)) {
          target[name] = src[name];
        }
      }
    }
    
});