import express from 'express';
import * as chartController from '../controllers/chartController';

const router = express.Router();

router.get('/laika/:range/:countBack', chartController.getChartData);

export default router;
