const jwt = require("jsonwebtoken");

const isCreator = (req,res,next)=>{
    try {
        const token = req.headers.token
        const check = jwt.decode(token)
        console.log('new' ,token , check)
        if(check?.role == 'CREATOR'){
            next();
        }
        else{
            return res.json({
                status:false,
                message:"not authorized"
            })
        }
        
    } catch (error) {
        return res.status(401).json({
            status:false,
            message:'token expired login agian !'
        })
    }
}

module.exports = {isCreator}