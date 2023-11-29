import express from "express";
import AccountController from "../controllers/account.controller";

const router = express.Router();
const accountController = new AccountController();

router.post("/signup", accountController.signUp);
router.post("/login/:phone", accountController.login);
router.get("/getAccount/:phone", accountController.getAccount);
router.get("/getAllAccounts", accountController.getAllAccounts);
router.delete("/delete/:phone", accountController.deleteAccount);
router.put("/edit/:phone", accountController.editAccount);
//router.get("/verify/:phone", accountController.verifyPassword);

export default router;