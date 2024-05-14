
// Ritorna una stringa contenente la rappresentazione binaria di n, assumento che sia rappresentato in "n" bits
function toBinRep(n, length = 32) {
  let rv = ""
  for (let i = 0; i < length; i++)
    rv += (n >> i) & 1
  return rv.split('').reverse().join('');
}

// Ritorna una stringa contenente la rappresentazione esadecimale di n, assumento che sia rappresentato in "n" bits
function toHexRep(n, length = 32) {
  let rv = ""
  const mask = 0x0000000f


  for (let i = 0; i < length / 4; i++) {
    const x = ((n & (mask << (i * 4))) >>> (i * 4))
    rv += x < 10 ? x : String.fromCharCode('a'.charCodeAt(0) + x - 10)
  }
  return rv.split('').reverse().join('');
}

// "mescola" l'intero "n", spezzandolo in "nSplits" parti. nSplits deve essere in [2,4,8,16,32]
// Lalgorito procede come segue: 
// Spezzo la rapresentazione binaria in due "nSplits" chunks, ciascuna da 32/"nSplits" bits
// Per ogni coppia di chunks, scambio un chunk col precedente
// Supponendo di avere i seguenti chunks
//    1 2 3 4 5 6 7 8
// otterrei 
//    2 1 4 3 6 5 8 7
function splitAndMix(n, nSplits) {
  let newN = n
  const nOperations = Math.floor(nSplits / 2)
  const integerSize = 32
  const chunkSize = integerSize / nSplits

  //console.log(toBinRep(n))
  for (let i = nOperations - 1; i >= 0; i--) {
    const leadingBits = ((nOperations - i - 1) * 2) * chunkSize

    const mask1 = ((~0 << (chunkSize * 2 * i + chunkSize)) << leadingBits) >>> leadingBits
    const mask2 = mask1 >>> chunkSize

    //printBinRep(n)
    const nl = newN & mask1
    const nr = newN & mask2

    const invertedN = (mask1 | mask2) & ((nl >>> chunkSize) | (nr << chunkSize))
    newN = (~(mask1 | mask2) & newN) | invertedN
  }
  return newN
}


// Ritorna una stringa di 8 bit contenente un intero decimale
// La funzione hash NON è crittografica
// Si assume che questo sia rappresentato su 32 bit
// L'hash function usata è perfetta garantendo la completa assenza di collisioni
function hash(n) {
  const dividers = [32, 16, 8, 4, 2]
  const randomizers = [
    0x22918930,
    0x106ed320,
    0xad2ae800,
    0x20083460,
    0x22da95d0,
    0xbf013ed0,
    0x11a8b3c0,
    0x12413b10,
    0x223a9490,
    0x25a6e940,
    0x3d504e90,
    0x1f1cd920,
    0x22bffe60,
    0x1089f7d0,
    0x52fab060,
    0xe002aa70,
  ]

  const key = 0xf2c7c5a0

  n = n ^ (randomizers[n << 28 >>> 28])
  for (let x of dividers) {
    n ^= key
    n = splitAndMix(n, x)
  }
  return toHexRep(n)
}
