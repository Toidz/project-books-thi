module.exports.image =(req,res)=>{
    res.json({
        location:req.file.path
    })
}