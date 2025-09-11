
import { blackList } from "../routers/useRouters"
import { Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
     const token = req.cookies.jwt

     if(token){
        blackList.includes(token)
     }

    res.cookie("jwt", "", { maxAge: 0, httpOnly: true, path: "/" });
    res.status(200).json({ msg: "Sesión cerrada", ok:true });
}