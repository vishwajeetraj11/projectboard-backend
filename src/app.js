import { connectDB, initExpress } from './loaders/index.js';
import { config } from './config/index.js';
import express from 'express';

connectDB();

async function startServer() {
	const app = express();
	initExpress({ app });

	app.listen(config.port, () => {
		console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
	}).on('error', (err) => {
		process.exit(1);
	});
}

startServer();
