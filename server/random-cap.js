import cryptoRandomString from 'crypto-random-string'

// This function generates crygraphically strong random strings that can be safely copy-pasted as in URLs
// This is intended to be used in capability urls: https://w3ctag.github.io/capability-urls/

export default function(){
    return cryptoRandomString({length: 20, type: 'url-safe'});
}