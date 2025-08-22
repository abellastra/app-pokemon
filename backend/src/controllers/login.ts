import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const Login = async (req:Request, res:Response) => {
    
    const result = validationResult(req)
    console.log(result)
    if(!result){
        console.log(!result);
        
    }

    res.status(201).json(req.body)
     
}