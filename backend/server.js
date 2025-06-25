const http=require('http');
const app=require('./app');
const port=process.env.PORT||3000;


const { initDatabase} = require('./models');

async function startServer() {
  await initDatabase(); // now includes DB connection check
  http.createServer(app).listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}

startServer();
