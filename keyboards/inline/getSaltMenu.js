const { keyboard, blue, saltButton } = require("../helpers");




module.exports = (hash, secretWord) => (keyboard([
    [
        saltButton({
            label: '#️⃣ Проверить честность',
            color: blue,
            payload: 'getHashWithSalt',
            hash: hash,
            secretWord: secretWord
        })
    ]
]).inline())