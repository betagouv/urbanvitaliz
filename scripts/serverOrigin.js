const isProduction = location.hostname === 'betagouv.github.io'
const SERVER_ORIGIN = isProduction ? 
    'https://app-20420772-6ed7-40ca-978c-f360edf8941c.cleverapps.io' :
    `http://localhost:4999`
console.log('API server origin:', SERVER_ORIGIN)

export default SERVER_ORIGIN
