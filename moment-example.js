var moment = require('moment');
var now = moment();

// console.log(now.format());
// console.log(now.format('X'));
// console.log(now.format('x'));

//console.log(now.format('MMM-Do-YYYY'));

var timestamp = moment();
var timestampMoment = moment.utc(timestamp);


console.log(timestampMoment.local().format('hh:mma'));



// now.subtract(1,'year');
// console.log(now.format());

