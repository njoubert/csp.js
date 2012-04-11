/* 
 * Benchmarking inspired by JS.Class and by JQuery's benchmark
 */
 
define( function() {
  
  //Do 5 total runs
  var N = 5;
  
  function 
  
  var average = function(arr) {
    return { value: this.mean(list), error: this.stddev(list) };
  }
  
  var mean = function(list, mapper) {
    var values = [],
        mapper = mapper || function(x) { return x },
        n = list.length,
        sum = 0;

    while (n--) values.push(mapper(list[n]));

    n = values.length;
    while (n--) sum += values[n];
    return sum / values.length;
  },
  
  var stddev = function(list) {
    var square = function(x) { return x*x };
    return Math.sqrt(this.mean(list, square) - square(this.mean(list)));
  }
  
  var format: function(average) {
    var error = (average.value === 0) ? 0 : 100 * average.error / average.value;
    return Math.round(average.value) + 'ms +/- ' + Math.round(error) + '%';
  }
  
  var printResult = function(name, times) {
    var avg = average(times);
    console.log(' ');
    console.log('BENCHMARK');
    console.log(' [' + this.format(evarage) + ']');
    console.log(' ' + name);
  }
  
  
  return {
    
    measure_longrunning: function(name, runs, function) {
      var times = [],
        n = N,
        start, 
        end;
      
      while (n--) {
        i = runs;
        start = new Date().getTime();
        while (i--) function.call({});
        end = new Date().getTime();
        times.push(end - start)
      }
      
      printResult(name, times);
      
    },
    
    measure_fast: function(name, runs, function) {
      
      
      
      
    }
    
    
    
    
    
  }
  
});