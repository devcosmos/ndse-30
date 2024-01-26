import express, { Router } from 'express';
import redis from 'redis';

const COUNTER_PORT = process.env.COUNTER_PORT || 4000;
const REDIS_URL = process.env.REDIS_URL || '';

const client = redis.createClient({ url: REDIS_URL });
const router = Router();
const counter = express();

(async () => {
  await client.connect();
})();

// получить значение счётчика по ID книги
router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  
  try {
    const count = await client.get(bookId);
    if (count === null) {
      res.status(404);
      res.json('404 | Книга не найдена');
    } else {
      res.status(200);
      res.json(count);
    }
  } catch (error) {
    res.status(500);
    res.json('500 | Redis error');
  }
});

// увеличить счётчик по ID книги
router.post('/:bookId/incr', async (req, res) => {
  const { bookId } = req.params;
  
  try {
    const count = await client.incr(bookId);
    res.status(200);
    res.json(count);
  } catch (error) {
    res.status(500);
    res.json('500 | Redis error');
  }
});

counter.use('/counter', router);

counter.listen(COUNTER_PORT);
