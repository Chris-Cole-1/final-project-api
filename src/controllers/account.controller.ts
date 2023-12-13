import bcrypt from "bcryptjs";
import { Request, Response } from "express";
//import jwt from "jsonwebtoken";
//import nodemailer from "nodemailer";
import Account, { Acc} from "../models/account.model";

export default class AccountController {

  signUp = (req: Request, res: Response) => {
    console.log('SignUp Called!');
    console.log(req.body);
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const account = new Account({
        name: req.body.name,
        password: hash,
        phone: req.body.phone,
        active: false,
        vehicle: req.body.vehicle,
        price: req.body.price,
        venmo: req.body.venmo
      });
      account.save()
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "Account Created!", result: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "ERROR: Account already registered", });
    });
    });
  };

  login = (req: Request, res: Response) => {
    let fetchedUser: Acc;
    Account.findOne({ email: req.body.phone })
      .then((account: Acc | null) => {
        if (!account) {
          res.status(401).json({
            message: "Login failed",
          });
        } else {
          fetchedUser = account;
          return bcrypt.compare(req.body.password, account.password);
        }
      })
      .then((result) => {
        if (!result) {
          res.status(401).json({
            message: "Login failed",
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
      .catch((error) => {
        console.log(error);
        res.status(401).json({
          message: "Invalid Login Information!",
        });
      });
  };

  getAccount = (req: Request, res: Response) => {
    Account.findOne({ phone: req.params.phone, active: true})
      .then((account) => {
        if (!account) {
          res.status(401).json({
            message: "Account does not exist",
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
        res.status(404).json({ message: "Could not find Account" });
      });
  };

  getAllAccounts = (req: Request, res: Response) => {
    Account.findOne({ phone: req.params.phone })
      .then((account) => {
        if (!account) {
          res.status(401).json({
            message: "Error with getting accounts",
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
        res.status(404).json({ message: "Could not find Account" });
      });
  };

  deleteAccount = (req: Request, res: Response) => {
    Account.findOneAndDelete({ phone: req.params.phone })
      .then((account) => {
        if (!account) {
          res.status(401).json({
            message: "Account does not exist",
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
        res.status(404).json({ message: "Could not find Account" });
      });
  };

  editAccount = (req: Request, res: Response) => {
    Account.findOneAndUpdate({ phone: req.params.phone })
      .then((account) => {
        if (!account) {
          res.status(401).json({
            message: "Account does not exist",
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
        res.status(404).json({ message: "Could not find Account" });
      });
  };
}