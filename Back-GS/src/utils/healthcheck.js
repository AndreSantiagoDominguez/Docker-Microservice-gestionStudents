const http = require('http');

const options = {
  host: 'localhost',
  port: process.env.PORT || 5000,
  path: '/health',
  timeout: 3000,
  method: 'GET'
};

const request = http.request(options, (res) => {
  console.log(`Health check status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✓ Health check passed');
      process.exit(0);
    } else {
      console.error('✗ Health check failed');
      process.exit(1);
    }
  });
});

request.on('error', (err) => {
  console.error('✗ Health check error:', err.message);
  process.exit(1);
});

request.on('timeout', () => {
  console.error('✗ Health check timeout');
  request.destroy();
  process.exit(1);
});

request.end();