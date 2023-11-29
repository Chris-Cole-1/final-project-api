import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
//import jwt from "jsonwebtoken";
//import nodemailer from "nodemailer";
import Account, { Acc} from "../models/account.model";

export default class AccountController {
  //private url = "";

  signUp = (req: Request, res: Response, next: NextFunction) => {
    console.log('SignUp Called!');
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const account = new Account({
        name: req.body.name,
        password: hash,
        phone: req.body.phone,
        active: false,
        vehicle: false,
        price: req.body.price,
        venmo: req.body.venmo
      });
      account.save()
    .then((result) => {
      //console.log(result);
      res.status(201).json({ message: "User Created", result: result });
    })
    .catch((err) => {
      //console.log(err);
      res.status(500).json({ message: "Account already registered", });
    });
    });
  };

  login = (req: Request, res: Response, next: NextFunction) => {
    
  };

  getAccount = (req: Request, res: Response, next: NextFunction) => {
    
  };

  getAllAccounts = (req: Request, res: Response, next: NextFunction) => {

  };

  deleteAccount = (req: Request, res: Response, next: NextFunction) => {
    
  };

  editAccount = (req: Request, res: Response, next: NextFunction) => {
    
  };
}