function doWork () {
   throw new Error ('Unable to work');
}

try{
   doWork();
}catch (e) {
   console.log(e.message);
}finally {
   console.log('finaly block executed');
}

console.log('try catch ended');