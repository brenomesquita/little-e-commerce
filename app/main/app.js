import express from 'express';
import Router from '../api/routes.js';
import config from './config.js'
const app = express();
const router = express.Router();

config.configure(app, router);
router.use(Router)

export default app;