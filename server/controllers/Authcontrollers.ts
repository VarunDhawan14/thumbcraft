import { Request, Response } from "express"
import User from "../models/User.js";
import bcrypt from "bcrypt";

//  Controllers for User Registration

export const registerUser = async (req: Request, res: Response) => {
try {
      const {name,email,password} = req.body;

      // find user by email
      const user = await User.findOne({email});
      if (user){
         return res.status(400).json({message: "User already exists"})
      }

      // Encrypt the Password 
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)
      const newUser = new User({
         name, email, password: hashedPassword
      })
      await newUser.save()

      // setting user Data in session
      req.session.isLoggedIn = true;
      req.session.userID = newUser._id;

      return res.json({
         message: "Account Created Successfully",
         user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
         }
      })
} catch (error: any) {
   console.log(error);
   res.status(500).json({message: error.message})
}
}

// Controllers for User Login

export const loginUser = async (req: Request, res: Response) => {
   try {
        const {email,password} = req.body;

      // find user by email
      const user = await User.findOne({email});
      if (!user){
         return res.status(400).json({message: "Invalid email or password"})
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect){
              return res.status(400).json({message: "Invalid email or password"})
      }

      // setting user Data in session
      req.session.isLoggedIn = true;
      req.session.userID = user._id;

      return res.json({
         message: "Login successfully",
         user: {
            id: user._id,
            name: user.name,
            email: user.email
         }
      })
   } catch (error: any) {
       console.log(error);
   res.status(500).json({message: error.message})
  }
      
}

//  Controllers for User Logout 

export const logoutUser = async (req: Request, res: Response) => {
   req.session.destroy((error: any) => {
      if (error){
         console.log(error)
         return res.status(500).json({
            message: error.message
         })
      }
   })
   return res.json({message: "Logout successful"})
}

//  Controllers for User Verify 

export const verifyUser = async (req: Request, res: Response) => {
 try {
   const  {userID} = req.session;

   const user = await User.findById(userID).select('-password')
   if (!user) {
      return res.status(400).json({
         message: "Invalid user"
      });
   }
   return res.json ({user});
 } catch (error: any) {
       console.log(error);
   res.status(500).json({message: error.message})
  }
}