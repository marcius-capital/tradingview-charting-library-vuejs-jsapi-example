// Require the framework and instantiate it
const server = require('fastify')({
	logger: false
})

const cors = require('cors')
server.use(cors())

server.register(require('fastify-http-proxy'), {
	upstream: 'https://api.binance.com/',
	prefix: '/', // optional
	http2: true // optional
})

server.listen(3000, (err, address) => {
    if (err) throw err
    console.log('🚀 Server ready at http://localhost:3000')
})