# Запросы для MongoDB:

1. Запрос(ы) для вставки данных минимум о двух книгах в коллекцию books: 
db.books.insertMany(
  {
    title: "first book",
    description: "first book desc",
    authors: "first author"
  }, {
    title: "second book",
    description: "second book desc",
    authors: "second author"
  }
)

2. Запрос для поиска полей документов коллекции books по полю title,
db.books.find({
  title: "first book",
})

3. Запрос для редактирования полей: description и authors коллекции books по _id записи.
db.books.updateOne(
  { _id: 3 },
  { $set: { description: "new description", authors: "new authors" } }
)
