const { formClick, numberWithSpace, allTopsCoefficent } = require('../../settings/tools');
const { vkHelp } = require('../../settings/vk');
const { Users } = require('../models/user');
const { getGlobal, editDayTopBudget, editWeekTopBudget } = require('./global');

const getUser = async (id) => {
  const user = await Users.findOne({ id });
  return user;
};
const getUserByNumber = (phone) => Users.findOne({ phone });

const plusBalanceUser = (id, sum) =>
  Users.findOneAndUpdate(
    {
      id,
    },
    {
      $inc: {
        balance: sum,
      },
    },
  ).then();

const plusBonuseBalanceUser = (id, sum) =>
  Users.findOneAndUpdate(
    {
      id,
    },
    {
      $inc: {
        bonuseBalance: sum,
      },
    },
  ).then();

const plusWinCubes = (id, sum) =>
  Users.findOneAndUpdate(
    {
      id,
    },
    {
      $inc: {
        winCubes: sum,
      },
    },
  ).then();

const plusWithdrawnCubes = (id, sum) =>
  Users.findOneAndUpdate(
    {
      id,
    },
    {
      $inc: {
        withdrawnCubes: sum,
      },
    },
  ).then();

const plusDeppedCubes = (id, sum) =>
  Users.findOneAndUpdate(
    {
      id,
    },
    {
      $inc: {
        deppedCubes: sum,
      },
    },
  ).then();

const plusWinCubesAll = (id, sum) =>
  Users.findOneAndUpdate(
    {
      id,
    },
    {
      $inc: {
        winCubes: sum,
      },
    },
  ).then();

const setBan = (id) =>
  Users.findOneAndUpdate(
    {
      id,
    },
    {
      $set: {
        ban: true,
      },
    },
  ).then(console.log(`--> Забанили пользователя https://vk.com/id${id}`));

/*const editPrivilege = (id, privilege) => (
    Users.findOneAndUpdate({
       id,
   }, { 
       $set: {
            "privilege": privilege
      }
  }).then(console.log("Сменили привилегию"))
)*/

const editSymbol = (id, symbol) =>
  Users.findOneAndUpdate(
    {
      id,
    },
    {
      $set: {
        forTopSymbol: symbol,
      },
    },
  );

const minusBalanceUser = (id, sum) =>
  Users.findOneAndUpdate(
    {
      id,
    },
    {
      $inc: {
        balance: -sum,
      },
    },
  ).then(console.log(sum));

const setQiwiPhone = (id, phone) =>
  Users.findOneAndUpdate(
    {
      id,
    },
    {
      $set: {
        phone: phone,
      },
    },
  ).then();

/*const setNewLastEarn = (id) => {
    Users.findOneAndUpdate({
        id
    }, {
        $set: {
            'lastEarn': Date.now()
        }
    }).then()
}*/

const editWinPerDay = (id, sum) =>
  Users.findOneAndUpdate(
    {
      id,
    },
    {
      $inc: {
        winPerDay: sum,
      },
    },
  ).then(console.log(sum));

const editWinPerWeek = (id, sum) =>
  Users.findOneAndUpdate(
    {
      id,
    },
    {
      $inc: {
        winPerWeek: sum,
      },
    },
  ).then(console.log(sum));

const getAllTopers = async (name) => Users.find({ admin: false }).sort({ [`${name}`]: -1 });

const resetDayTopers = async () => {
  const { dayTopBudget } = await getGlobal();
  const allTopers = await getAllTopers('winPerDay');
  allTopers.forEach(async ({ id, winPerDay }, index) => {
    if (winPerDay != 0) {
      if (allTopsCoefficent[index]) {
        const awardForTop = (dayTopBudget * allTopsCoefficent[index]).toFixed(0);
        vkHelp({
          peer_id: id,
          message: `🍀 Поздравляем вас!\n\n🏆 Вы заняли ${
            index + 1
          } место в топе дня!\n\n🔥 Ваша награда: ${numberWithSpace(
            awardForTop,
          )} 🎲\n\n🍀 Удачи в дальнейших победах!`,
        });
        plusBalanceUser(id, awardForTop);
      }
      const setWinPerDay = await editWinPerDay(id, -winPerDay);
    }
  });
  const minusBudget = await editDayTopBudget(-dayTopBudget);
};

const resetWeekTopers = async () => {
  const { weekTopBudget } = await getGlobal();
  const allTopers = await getAllTopers('winPerWeek');
  allTopers.forEach(async ({ id, winPerWeek }, index) => {
    if (allTopsCoefficent[index]) {
      if (winPerWeek != 0) {
        const awardForTop = (weekTopBudget * allTopsCoefficent[index]).toFixed(0);
        vkHelp({
          peer_id: id,
          message: `🍀 Поздравляем с победой в еженедельном топе!\n\n🏆🏆🏆 Вы заняли ${
            index + 1
          } место!\n\n🔥 Ваша награда: ${numberWithSpace(
            awardForTop,
          )} 🎲\n\n🍀 Удачи в дальнейших победах!`,
        });
        plusBalanceUser(id, awardForTop);
      }
      const setWinPerDay = await editWinPerWeek(id, -winPerWeek);
    }
  });
  const minusBudget = await editWeekTopBudget(-weekTopBudget);
};

const createUser = async (props) => {
  const { id, name, refferer } = props;

  const user = new Users({
    id,
    name,
    ['ref.refferer']: refferer ? Number(refferer) : 297789589,
    admin: [297789589, 262489448].includes(id) ? true : false,
  });

  user.save().then(console.log(`--> Новый пользователь: https://vk.com/id${id}`));

  if (refferer) {
    const { forRef } = await getGlobal();
    const forRefferer = await getUser(refferer);

    console.log(await plusBalanceUser(id, forRef));

    Users.findOneAndUpdate(
      {
        id: [forRefferer.id],
      },
      {
        $inc: {
          ['ref.value']: 1,
          balance: forRef,
        },
      },
    ).then(console.log);

    vkHelp({
      peer_id: id,
      message: `💸 Вы получили ${numberWithSpace(forRef)} 🎲 за переход по реф.ссылке!`,
    });
    vkHelp({
      peer_id: forRefferer.id,
      message: `🚀 ${formClick(
        id,
        'Пользователь',
      )} перешёл по вашей ссылке!\n🎁 На баланс начислено ${numberWithSpace(
        forRef,
      )} 🎲\n\n🍀Удачной игры!`,
    });
  }
};

/*function setLastGetBonuses(id){
    Users.findOneAndUpdate(
        {
            id,
        },
        {
            $set: {
                lastGet: Date.now(),
            },
        }
    ).then();
}*/

const setUnban = (id) =>
  Users.findOneAndUpdate(
    {
      id,
    },
    {
      $set: {
        ban: false,
      },
    },
  ).then(console.log(`--> Разбанили пользователя https://vk.com/id${id}`));

module.exports = {
  createUser,
  getUser,
  plusBalanceUser,
  minusBalanceUser,
  setQiwiPhone,
  setBan,
  editSymbol,
  getUserByNumber,
  setUnban,
  plusWinCubes,
  plusWithdrawnCubes,
  getAllTopers,
  resetDayTopers,
  resetWeekTopers,
  editWinPerDay,
  editWinPerWeek,
  plusBonuseBalanceUser,
  plusDeppedCubes,
  plusWinCubesAll,
};
