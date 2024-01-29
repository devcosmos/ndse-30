import { Router } from 'express';

const userRouter = Router();

// авторизация пользователя
userRouter.post('/login', (req, res) => {
  res.status(201)
  res.json({ id: 1, mail: "test@mail.ru" })
});

export default userRouter;
