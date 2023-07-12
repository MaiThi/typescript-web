import { NextFunction, Request, Response } from 'express';

import User from '../models/User';
import jwt from 'jsonwebtoken';


const jwtkey = 'e-commercial';
const login =  async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {

        const user = await User.findOne(req.body).select('-password');
        if(user) {
           
            jwt.sign({user}, jwtkey, {expiresIn: "2h"} , (err: any, token: any) => {
                if(err) {
                    return res.status(404).json({message: "Not found"});
                }
                return res.status(200).json({
                    user,
                    "auth": token
                });
            });
            
        } else {
            return res.status(404).json({message: "Not found"});
        }
       
    }
  
    return  (error: any) => res.status(404).json({ error });
}


export default { login };