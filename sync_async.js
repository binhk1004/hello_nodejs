const fs = require('fs');
console.log(100);
var data = fs.readFile('text.txt',{encoding:'utf-8'}, function(err, data){
    console.log(data);
});
console.log(data);
console.log("우왕");