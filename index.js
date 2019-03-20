

// endpoints here

const server = require('./server/server');

const port = process.env.PORT || 3300;

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
