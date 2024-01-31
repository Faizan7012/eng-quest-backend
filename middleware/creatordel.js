const jwt = require("jsonwebtoken");

const isCreatordel = (req,res,next)=>{
    try {
        const token = req.headers.token
        const check = jwt.decode(token)
        if(check?.role == 'CREATOR'){
            next();
        }
        else{
            return res.status(401).json({
                status:false,
                message:"not authorized"
            })
        }
        
    } catch (error) {
        return res.status(401).json({
            status:false,
            message:error.message
        })
    }
}

module.exports = {isCreatordel}