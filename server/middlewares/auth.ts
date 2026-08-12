import { Request,Response, NextFunction } from "express";

const protect = async (req: Request, res: Response, next: NextFunction) => {
   const {isLoggedIn,userID} = req.session;
   if (!isLoggedIn || !userID){
      return res.status(401).json({message: "You are not logged in"})
   }
   next()
}

export default protect;