var crypto = require('crypto-js');

var secretMessage = {
   name: 'Dalius',
   secretName: '007'
};
var secretKey = '123abc';


var encryptedMessage = crypto.AES.encrypt(JSON.stringify(secretMessage), secretKey);
console.log('Encrypted Message ' + encryptedMessage);

var bytes = crypto.AES.decrypt(encryptedMessage, secretKey);
var decrypted = JSON.parse(bytes.toString(crypto.enc.Utf8));

console.log('Decrypted message ' + decrypted);
console.log(decrypted.secretName);