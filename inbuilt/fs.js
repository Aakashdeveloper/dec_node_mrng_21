var fs = require('fs');

/*
fs.writeFile('myCode.txt',"This is From Nareshit",function(err){
    if(err) throw err;
    console.log('File Created')
})
*/

/*
fs.appendFile('myText.txt',"This is From Nareshit \n",function(err){
    if(err) throw err;
    console.log('File Append')
})*/
/*
fs.readFile('db.json','utf-8',function(err,data){
    if(err) throw err;
    console.log(data)
})*/

/*
fs.rename('myCode.txt','yourCode.txt',function(err){
    if(err) throw err;
    console.log('File Renamed')
})*/

fs.unlink('yourCode.txt',function(err){
    if(err) throw err;
    console.log('File Deleted')
})


