module.exports = (index) => {
    const arr = [
        [
            {
                action: {
                    type: 'text',
                    label: '❌ Пропустить обучение',
                    payload: {
                        command: 'stopEducation',
                        type: 'user'
                    }
                }
            }
        ],
        [
            {
                action: {
                    type: 'text',
                    label: '📊 Статистика',
                    payload: {
                        command: 'info',
                        type: 'user'
                    }
                }
            }
        ],
        [
            {
                action: {
                    type: 'text',
                    label: '💰 Купить',
                    payload: {
                        command: 'getWalletPage',
                        type: 'user'
                    }
                }
            }
        ],
        [
            {
                action: {
                    type: 'text',
                    label: '🏭 Здания',
                    payload: {
                        command: 'getInvesting',
                        type: 'user'
                    }
                }
            }
        ],
        [
            {
                action: {
                    type: 'text',
                    label: '💰 Вывести',
                    payload: {
                        command: 'getWalletPage',
                        type: 'user'
                    }
                }
            }
        ],
    ]

    return arr[index]
}