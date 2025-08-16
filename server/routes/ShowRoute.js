import express from 'express';
import { getNowPlayingMovies } from '../controllers/showController.js';

const ShowRouter = express.Router();

ShowRouter.get('/now-playing', getNowPlayingMovies);

export default ShowRouter;
