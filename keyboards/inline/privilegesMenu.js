const { createPayment } = require("../../settings/qiwi")
const { buyPrivilegeButton, white, keyboard, blue, green } = require("../helpers")




module.exports = async (privilegeLvl, userId) => {

    if (privilegeLvl === 3) return keyboard([]).inline();

    const privileges = [
        buyPrivilegeButton({
            label: 'Admin',
            url: await createPayment(999, `admin_${userId}`)
        }),
        buyPrivilegeButton({
            label: 'Premium',
            url: await createPayment(499, `premium_${userId}`)
        }),
        buyPrivilegeButton({
            label: 'VIP',
            url: await createPayment(299, `vip_${userId}`)
        }),
    ]

    return keyboard(privileges.map((item, index) => 3 - index <= privilegeLvl ? [] : item)).inline()

}
