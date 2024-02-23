const { Keyboard } = require('vk-io');
const { textButton, urlButton, colors } = require('./methods');
const inDeveloping = require('../pages/adminCommands/inDeveloping');
const { numberWithSpace } = require('../settings/tools');

const whatIsButton = Keyboard.keyboard([
  [textButton('❔ Что такое Кубики? ', 'whatIs', colors.blue)],
]).inline();

const betKeyboard = (balance) =>
  Keyboard.keyboard([
    [textButton(`${numberWithSpace((balance / 10).toFixed(0))}`, 'firstVariant', colors.green)],
    [textButton(`${numberWithSpace((balance / 4).toFixed(0))}`, 'secondVariant', colors.green)],
    [textButton(`${numberWithSpace((balance / 2).toFixed(0))}`, 'thitdVariant', colors.green)],
    [textButton(`${numberWithSpace(balance.toFixed(0))}`, 'fourthVariant', colors.red)],
  ]).inline();

const inlineProfileBoard = Keyboard.keyboard([
  [textButton('📊 Моя статистика', 'myStats', colors.red)],
  [textButton('🎁 Промокод', 'promo', colors.blue)],
  [
    textButton('💰 Пополнить', 'dep', colors.green),
    textButton('💸 Вывести', 'withdraw', colors.green),
  ],
]).inline();

const honestyCheck = Keyboard.keyboard([
  [urlButton('#⃣ Проверка честности', 'http://vk.com/@sokolov_roulette-article-hash')],
]).inline();

const articleAboutCubics = Keyboard.keyboard([
  [urlButton(`📎 «Что такое Caz»`, 'https://vk.com/@sokolov_roulette-article-cubics')],
]).inline();

const chatSettingsBoard = Keyboard.keyboard([
  [textButton('⌛ Изменить время раунда', 'changeEndTime', colors.blue)],
  [textButton('🎰 Сменить игровой режим', 'changeGameMode', colors.blue)],
  [textButton('➕👨‍💻 Добавить админа', 'addChatAdmin', colors.blue)],
  [textButton('➖👨‍💻 Снять админа', 'delAdm', colors.red)],
]).inline();

const chooseGameInGroup = Keyboard.keyboard([
  [
    textButton('Caz Cube ', 'set_game:cube', colors.green),
    textButton('🎰 Wheel ', 'set_game:wheel', colors.green),
  ],
  [
    textButton('🟣 Double', 'set_game:double', colors.green),
    textButton('⭐ Dice  ', 'set_game:dice', colors.green),
  ],
  [textButton('🔥 L7M', 'set_game:l7m', colors.green)],
]).inline();

const topsBoard = Keyboard.keyboard([
  [textButton('⭐ Топ дня', 'dayTop', colors.green)],
  [textButton('💰 Топ недели', 'weekTop', colors.blue)],
]).inline();

const depInlineBoard = Keyboard.keyboard([
  [urlButton('🔗 Быстрое пополнение', `https://vk.com/app6887721_-209099203#donate_10`)],
]).inline();

const reviewMenu = Keyboard.keyboard([
  [urlButton('✏ Оставить отзыв', 'https://vk.com/topic-210769620_50082905')],
]).inline();

const mailingMenu = Keyboard.keyboard([
  [textButton('🎰 Играть', 'games', colors.red)],
  [
    urlButton('💬 Отзывы', 'https://vk.com/topic-210769620_50082905'),
    urlButton(`📎 «Что такое Caz»`, 'https://vk.com/@sokolov_roulette-article-cubics'),
  ],
]).inline();

/*const chooseGameInGroup = (payload) => Keyboard.keyboard([
        [
            textButton('Caz Cube ', `set_game:cube:${payload}`, colors.green),
            textButton('🎰 Wheel ', `set_game:wheel:${payload}`, colors.green)
        ],
        [
            textButton('🟣 Double', `set_game:double:${payload}`, colors.green),
            textButton('⭐ Dice  ', `set_game:dice:${payload}`, colors.green)
        ],
        [
            textButton('🔥 L7M', `set_game:l7m:${payload}`, colors.green),
        ]
    ]).inline()*/

module.exports = {
  inlineProfileBoard,
  betKeyboard,
  topsBoard,
  reviewMenu,
  whatIsButton,
  chooseGameInGroup,
  chatSettingsBoard,
  honestyCheck,
  articleAboutCubics,
  mailingMenu,
};
