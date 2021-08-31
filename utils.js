function swapHex(value) {
  let s = value.toString(16);
  s = s.replace(/^(.(..)*)$/, "0$1");
  var a = s.match(/../g);
  a.reverse();
  var s2 = a.join("");
  return s2;
}

function intToHex(integer) {
  let number = integer.toString(16).toUpperCase()
  if( (number.length % 2) > 0 ) { number= "0" + number }
  return number
}

function numToBytes(num, bytes) {
  if (bytes === undefined) bytes = 8;
  if (bytes == 0) return [];
  else return [num % 256].concat(numToBytes(Math.floor(num / 256), bytes - 1));
}

function numToVarInt(num) {
  if (num < 253) return [num];
  else if (num < 65536) return [253].concat(numToBytes(num, 2));
  else if (num < 4294967296) return [254].concat(numToBytes(num, 4));
  else return [253].concat(numToBytes(num, 8));
}

function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

function bytesToHex(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xf).toString(16));
  }
  return hex.join("");
}
function bytesLen(num) {
  return Math.ceil(num.toString(2).length / 8);
}


function blake3_hash(buffer) {
    var { hash, createHash } = require('blake3');
    hash = createHash();
    hash.update(buffer);
    return hash.digest();
};

function blake3d_hash(buffer) {
    return blake3_hash(blake3_hash(buffer));
};

function reverseBuffer(buff) {
    var reversed = Buffer.alloc(buff.length);
    for (var i = buff.length - 1; i >= 0; i--)
        reversed[buff.length - i - 1] = buff[i];
    return reversed;
};

module.exports = {
  intToHex,
  swapHex,
  numToBytes,
  numToVarInt,
  hexToBytes,
  bytesToHex,  
  bytesLen,
  blake3_hash,
  blake3d_hash,
  reverseBuffer
};
