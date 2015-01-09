var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: __dirname + "/src/"
})

var csp = requirejs('csp');

module.exports = csp;
