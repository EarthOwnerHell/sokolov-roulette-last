const { keyboard, textButton, green, blue, white } = require("../helpers");

/* 
adminLvL ? ([
            textButton({
                label: 'Бонус привилегии',
                payload: 'getBonuseForPrivilege',
                color: green
            }),
        ],[
            textButton({
                label: 'Сменить ник',
                payload: 'setNickname',
                color: green
            }),
        ])
*/


module.exports = (adminLvL) => {

    const buttonsArray = [
        [
            textButton({
                label: '📝 Сменить QIWI',
                payload: 'setQiwi',
                color: blue
            })
        ],
        [
            textButton({
                label: '🎭 Выбрать персонажа',
                payload: 'chooseAvatar',
                color: blue
            })
        ]
    ]

    if (adminLvL) {
        buttonsArray.push([
            textButton({
                label: '👑 Бонус привилегии',
                payload: 'getBonuseForPrivilege',
                color: green
            }),
        ], [
            textButton({
                label: '👤 Сменить ник',
                payload: 'setNickname',
                color: green
            }),
        ])
    }

    return keyboard(buttonsArray).inline()
}