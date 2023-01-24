//verify web token
const jwt=require("jsonwebtoken")
function verify(req, res, next){
const authHeader=req.headers.token;//the req is through headers, not body
if(authHeader){
const token=authHeader.split(" ")[1];
jwt.verify(token, process.env.SECRET_KEY, (err, tokenInfo)=>{
    if(err){
        return res.status(403).json("token is not valid");
    }else{
req.user=tokenInfo;/* N/B the tokenInfo is our token id and admin
thats our credentials*
N/B req.user, the user is a variable assigned to our token id and admin
thats our credentials from access token in the auth.js*/
next();
    }
})
}else{
    return res.status(401).json("you are not authenticated")
}
}
module.exports=verify;