const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4001;

// Middleware для обработки JSON
app.use(express.json());

// Middleware для разрешения CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3002"); // Разрешить запросы с React-приложения
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Разрешённые HTTP-методы
  res.header("Access-Control-Allow-Headers", "Content-Type"); // Разрешённые заголовки
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Быстрое завершение preflight-запроса
  }
  next();
});

// Путь к файлу data.json
const dataFilePath = path.join(__dirname, "data.json");

// POST-запрос для получения данных от клиента
app.post("/api/data", (req, res) => {
  const postData = req.body;

  if (!postData) {
    return res.status(400).json({ message: "Нет данных для обработки" });
  }

  // Чтение текущего содержимого data.json
  fs.readFile(dataFilePath, "utf8", (err, fileData) => {
    if (err && err.code !== "ENOENT") {
      console.error("Ошибка чтения файла:", err);
      return res.status(500).json({ message: "Ошибка сервера" });
    }

    const existingData = fileData ? JSON.parse(fileData) : [];
    existingData.push(postData);

    // Запись новых данных в data.json
    fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), (err) => {
      if (err) {
        console.error("Ошибка записи файла:", err);
        return res.status(500).json({ message: "Ошибка сервера" });
      }

      console.log("Данные успешно сохранены:", postData);
      res.status(200).json({ message: "Данные успешно сохранены" });
    });
  });
});

// Запуск сервера
app.listen(4001, () => {
  console.log(`Server started on port ${4001}`);
});
