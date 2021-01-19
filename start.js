let jsSHA = require('jssha');
let btoa = require('btoa');

let applicationId = "64ba90.vidyo.io";
let developerKey = "e395f57a52094f03a86649d41f8a7bd6";

function getRandomInt() {
return Math.floor(Math.random() * Math.floor(9999));
}

function generateToken(expiresInSeconds) {
var EPOCH_SECONDS = 62167219200;
var expires = Math.floor(Date.now() / 1000) + expiresInSeconds + EPOCH_SECONDS;
var shaObj = new jsSHA("SHA-384", "TEXT");
shaObj.setHMACKey(developerKey, "TEXT");
jid = "demoUser" + getRandomInt() + '@' + applicationId;
var body = 'provision' + '\x00' + jid + '\x00' + expires + '\x00';
shaObj.update(body);
var mac = shaObj.getHMAC("HEX");
var serialized = body + '\0' + mac;
return btoa(serialized);
}

const express = require('express')
const app = express()
const port = process.env.PORT ||3000;

app.use(express.static(__dirname))

app.get('/token', (req, res) => {
let thirtyMinutes = 30 * 60;
let response = JSON.stringify({
token: generateToken(thirtyMinutes)
});
res.send(response);
})

app.listen(port, () => console.log(`Listening on port ${port}!`))