import express from 'express';

import '@shared/database/typeorm';

const app = express();

app.use(express.json());

app.listen(3333, () => {
  console.log(`🔥 - SERVER STARTED ON PORT 3333`);
});
