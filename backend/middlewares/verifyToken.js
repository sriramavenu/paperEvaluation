import jwt from 'jsonwebtoken';
export const verifyToken=(req,res,next)=>{
    const bearerToken = req.headers.authorization;
    if(bearerToken===undefined){
        throw new Error("Unauthorized access,pls login first!");
    }else{
        const token = bearerToken.split(' ')[1];
        try{
            jwt.verify(token,'pqrstu');
            next();
        }catch(err){
            next(new Error('Your session expired,Login again to continue'));
        }       
    }
}