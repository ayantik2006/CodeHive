export async function checkLogin(req,res,next){
    if(!req.cookies.user){
        return res.status(401).json({msg:"logged out"});
    }
    next();
}
