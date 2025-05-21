const SettingWebsiteInfo = require("../../models/setting-website-info.model")
module.exports.info = async (req,res,next)=>{

    const info = await SettingWebsiteInfo.findOne({})
    res.locals.info = info;
    next()
}