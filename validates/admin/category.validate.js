const Joi = require("joi");
module.exports.categoryPost =(req,res,next)=>{
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .messages({
                "string.empty":"Vui lòng nhập tên danh mục",
            }),
        parent: Joi.string().allow(""),
        position: Joi.string().allow(""),
        status: Joi.string().allow(""),
        avatar: Joi.string().allow(""),
        description: Joi.string().allow("")
    })
    const {error} = schema.validate(req.body);
    if(error)
    {
        const errorDetail = error.details[0].message;
        console.log(error);
        res.json({
            code:"error",
            message:errorDetail
        })
        return;
    }
    next();
}