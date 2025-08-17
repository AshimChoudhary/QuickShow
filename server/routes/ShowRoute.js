import express from 'express';
import { addShow, getNowPlayingMovies } from '../controllers/showController.js';

const ShowRouter = express.Router();

ShowRouter.get('/now-playing', getNowPlayingMovies);
ShowRouter.post('/add', addShow);

export default ShowRouter;
