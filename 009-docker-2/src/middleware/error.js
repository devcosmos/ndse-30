export const error404 = ((req, res) => {
  res.render('base/error', {
    title: '404 | Страница не найдена'
  });
});

export const error400 = ((req, res) => {
  res.render('base/error', {
    title: '400 | Некорректный запрос'
  });
});

export const error500 = ((req, res) => {
  res.render('base/error', {
    title: '500 | Внутренняя ошибка сервера'
  });
});
