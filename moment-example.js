var moment = require('moment');
var now= moment();


/*
console.log(now.format());
now.subtract(1,'year');
console.log(now.format());
console.log(now.format('do MMM YYYY h:mma') );
*/

console.log(now.valueOf());



console.log("------------------");
console.log(now.format('X')); // seconds
console.log(now.format('x')); // miliseconds


var timestamp = 1474456926776;
var timeStampMoment = moment.utc(timestamp);
console.log(timeStampMoment.format('h:m a')); // utc 
console.log(timeStampMoment.local().format('h:m a')); // utc 