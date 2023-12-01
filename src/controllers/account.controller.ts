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
    let fetchedUser: Acc;
    Account.findOne({ email: req.body.phone })
      .then((account: Acc | null) => {
        if (!account) {
          res.status(401).json({
            message: "Auth failed",
          });
        } else {
          fetchedUser = account;
          return bcrypt.compare(req.body.password, account.password);
        }
      })
      .then((result) => {
        if (!result) {
          res.status(401).json({
            message: "Auth failed",
          });
        }
        res.status(200).json({
          account: {
            name: fetchedUser.name,
            password: fetchedUser.password,
            phone: fetchedUser.phone,
            active: fetchedUser.active,
            vehicle: fetchedUser.vehicle,
            price: fetchedUser.price,
            venmo: fetchedUser.venmo
          },
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Invalid authentication credentials",
        });
      });
  };

  getAccount = (req: Request, res: Response, next: NextFunction) => {
    Account.findOne({ phone: req.params.phone })
      .then((account) => {
        if (!account) {
          res.status(401).json({
            message: "No such User",
          });
        } else {
          res.status(200).json({
            account: {
              name: account.name,
              password: account.password,
              phone: account.phone,
              active: account.active,
              vehicle: account.vehicle,
              price: account.price,
              venmo: account.venmo
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Could not find user" });
      });
  };

  getAllAccounts = (req: Request, res: Response, next: NextFunction) => {
    
  };

  deleteAccount = (req: Request, res: Response, next: NextFunction) => {
    Account.findOneAndDelete({ phone: req.params.phone })
      .then((account) => {
        if (!account) {
          res.status(401).json({
            message: "No such User",
          });
        } else {
          res.status(200).json({
            account: {
              name: account.name,
              password: account.password,
              phone: account.phone,
              active: account.active,
              vehicle: account.vehicle,
              price: account.price,
              venmo: account.venmo
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Could not find user" });
      });
  };

  editAccount = (req: Request, res: Response, next: NextFunction) => {
    Account.findOneAndUpdate({ phone: req.params.phone })
      .then((account) => {
        if (!account) {
          res.status(401).json({
            message: "No such User",
          });
        } else {
          res.status(200).json({
            account: {
              name: account.name,
              password: account.password,
              phone: account.phone,
              active: account.active,
              vehicle: account.vehicle,
              price: account.price,
              venmo: account.venmo
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Could not find user" });
      });
  };
}