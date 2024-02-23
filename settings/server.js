const https = require('https');
const { plusCubics } = require('./vkdice');
const fs = require('fs');
const { plusCazis } = require('./cazis');

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/blackjack-server.online/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/blackjack-server.online/fullchain.pem'),
};
function serverListen() {
  https
    .createServer(options, (req, res) => {
      if (req.method === 'POST') {
        // Обработка POST запроса
        console.log('да, это пост запрос');
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          // Ваш код обработки POST запроса здесь
          console.log('POST запрос получен:', body);
          const data = JSON.parse(body); // преобразование строки в объект JSON
          console.log(data.amount);
          res.end('POST запрос получен');
        });
      } else {
        // Обработка других типов запросов
        res.end('Server is working');
      }
    })
    .listen(443, () => {
      console.log('Сервер запущен на порту 443');
    });
}

module.exports = serverListen;
