const { numberWithSpace } = require('../../settings/tools');
const Bets = require('../models/Bets');

const bet = {
  getBet: (gameId, userId) => Bets.find({ gameId: gameId, userId: userId, isEnded: false }).lean(),
  getBetsUser: (gameId, userId) =>
    Bets.find({ gameId: gameId, userId: userId, isEnded: false }).lean(),
  getBetsUserOnType: (gameId, userId, collection) =>
    Bets.find({ gameId: gameId, userId: userId, isEnded: false, betCollection: collection }).lean(),
  createBet: (props) => {
    const { gameId, userId, betType, betAmount, betCollection, userName } = props;
    const bet = new Bets({
      gameId,
      userId,
      betType,
      betAmount,
      betCollection,
      userName,
    });
    bet
      .save()
      .then(
        console.log(
          `Новая ставка!\n---\nПоставил: https://vk.com/id${userId}\n---\nСтавка на: ${betType}\n---\nСумма: ${numberWithSpace(
            betAmount,
          )} Caz\n---\nID игры: ${gameId}`,
        ),
      );
  },
  getBets: (gameId) => Bets.find({ gameId: gameId, isEnded: false }).lean(),
  editBet: (gameId, userId, type, amount) => {
    return Bets.findOneAndUpdate(
      { gameId: gameId, betType: type, userId: userId },
      { $inc: { betAmount: amount } },
      { new: true },
    )
      .lean()
      .exec();
  },
};
module.exports = bet;
