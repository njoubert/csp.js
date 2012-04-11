/* 
 * Benchmarking inspired by JS.Class and by JQuery's benchmark
 */
 
define( function() {

  //run each test N times and get average
  var N = 5;
  var div = null;
  var log = function(str) {
    if (div) {
      newstr = "<tr><td>" + str.replace(/\|/g, '</td><td>') + "</td></tr>";
      div.innerHTML += newstr;

    } else {
      console.log(str);
    }
  }
  
  var average = function(arr) {
    return { value: mean(arr), error: stddev(arr) };
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
  }
  
  var stddev = function(list) {
    var square = function(x) { return x*x };
    return Math.sqrt(mean(list, square) - square(mean(list)));
  }
  
  var format = function(average, runs) {
    var error = (average.value === 0) ? 0 : 100 * average.error / average.value;
    return Math.round(average.value) + 'ms +/- ' + Math.round(error) + '%';
  }
  
  var printResult = function(name, runs, times) {
    var avg = average(times);
    log(' ' + name + ' | ' + runs + ' runs' + ' | [' + format(avg, runs) + ']');
  }
  
  
  return {
    
    //output to a div rather than the console.
    config: function(output_div) {
        div = output_div;
    },
    
    //"measure" runs the given function in N batches of `runs` times, timing each batch
    //This allows you to define an environment for each run, and calls the function repeatedly.
    measure: function(name, runs, functions, div) {
      var envs = [],
          times = [],
          block = functions.test,
          env,
          n = N,
          start, 
          end;
      
      var i = N*runs;
      while (i--) {
        env = {};
        if (functions.setup) functions.setup.call(env);
        envs.push(env);
      }
      
      while (n--) {
        i = runs;
        start = new Date().getTime();
        while (i--) block.call(envs.pop());
        end = new Date().getTime();
        times.push(end - start)
      }
      
      printResult(name, runs, times);
      
    },
    
    //"measure_chunk" avoids the function call overhead, but does not support an environment
    measure_chunk: function(name, runs, functions) {
      
      
      
      
    }
     
  }
  
});