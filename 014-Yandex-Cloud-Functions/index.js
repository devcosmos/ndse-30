const express = require('express');
const serverless = require('serverless-http');

class Characters {
  constructor(id, name = "", description = "", modified = "", thumbnail = "") {
      this.id = id;
      this.name = name;
      this.description = description;
      this.modified = modified;
      this.thumbnail = thumbnail;
      this.comics = [];
  }
}

const store = {
  characters: [
    new Characters(
      1,
      "Человек-паук",
      "Укушенный радиоактивным пауком, старшеклассник Питер Паркер обрел скорость, силу и силу паука. Приняв имя Человек-паук, Питер надеялся начать карьеру, используя свои новые способности. Наученный тому, что с большой силой приходит большая ответственность, Паук поклялся использовать свои силы, чтобы помогать людям.",
      "2020-07-21T10:30:10-0400",
      "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg",
      [
        {
          id: 1,
          name: "Spider-Man: 101 Ways to End the Clone Saga (1997) #1"
        }
      ]
    ),
  ],
};

const app = express();

app.use(express.json());

app.get('/api/characters', (req, res) => {
  const { characters } = store;
  const { id } = req.query;

  if (id) {
    const idx = characters.findIndex(el => el.id.toString() === id);
  
    if (idx !== -1) {
      res.json(characters[idx]);
    } else {
      res.status(404);
      res.json('404');
    }
  } else {
    res.json(characters);
  }
});

module.exports.handler = serverless(app);