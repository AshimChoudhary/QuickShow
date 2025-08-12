import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { serve } from 'inngest/express';
import { inngest, functions } from './inngest/index.js';
import { clerkMiddleware } from '@clerk/express';

const app = express();
const port = 3000;

await connectDB();

app.use(express.json());
app.use(cors());

// Clerk middleware (auth)
app.use(clerkMiddleware());

// Inngest route - updated for v3 syntax
app.use(
  '/api/inngest',
  serve({
    client: inngest, // 👈 instead of passing directly
    functions: functions, // or just `functions` if it's already an array
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
