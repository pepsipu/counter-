const axios = require("axios");

const profilePictures = {
    fantasu: "https://www.stickpng.com/assets/images/580b57fbd9996e24bc43c10f.png",
    drpeppersu: "https://www.freepnglogos.com/uploads/dr-pepper-logo-png/pepper-soda-soft-drink-11.png",
    crushsu: "https://www.pngkey.com/png/full/202-2029302_crush-orange-soda-crush-soda-png.png",
    spritesu: "https://lh3.googleusercontent.com/proxy/I0Xva8b6U63RqY_WixsO-z3dsE32Mk5yPeTgpWYYazZNTAtRyjvSzL_hPyVgLOkU61zQFJokZzD7_A8_N7csJIpnwduvG5Gf01OBF9ybZk9pEYM",
    colasu: "https://pngimg.com/uploads/cocacola/cocacola_PNG22.png"
};

module.exports.fn = (msg, args, accounts, queue) => {
    accounts.forEach(account => {
        account.user.setAvatar(profilePictures[account.user.username]);
    });
};

module.exports.name = "pfp";
module.exports.firingConstraint = (msg, args) => msg.content.includes("profile picture");
