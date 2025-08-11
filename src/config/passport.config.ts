import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user';
import argon2 from 'argon2'

passport.use(new LocalStrategy(
    {usernameField:'userName',passwordField:'password'},
    async (userName:string,password:string,done:(user:any,err:any, info:any) => void) => {
        try {
            const user = await User.findOne({
                where:{user_name:userName}
            })
            if(!user) return done(null,true,{message:'Invalid userName.'})
            const match = await argon2.verify(user.password,password);
            if(!match) return done(null,true,{message:'Incorrect password.'})
                return done(user,false,{message:'Login successful.'});
        } catch (error) {
            return done(error,true,{message:'Internal server error.'})
        }
    }
))

export default passport