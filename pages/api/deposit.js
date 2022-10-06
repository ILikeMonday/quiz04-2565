import { checkToken } from "../../backendLibs/checkToken";
import { writeUsersDB, readUsersDB } from "../../backendLibs/dbLib";

export default function depositRoute(req, res) {
  if (req.method === "PUT") {
    //check authentication
    const user = checkToken(req);
    if (!user || user.isAdmin) {
      return res
        .status(403)
        .json({ ok: false, message: "You do not have permission to deposit" });
    }
    // return res.status(403).json({ ok: false, message: "You do not have permission to deposit" });
    const amount = req.body.amount;
    //validate body
    if (typeof amount !== "number")
      return res.status(400).json({ ok: false, message: "Invalid amount" });

    //check if amount < 1
    if (amount < 1) {
      return res
        .status(400)
        .json({ ok: false, message: "Amount must be greater than 0" });
    }
    // return res.status(400).json({ ok: false, message: "Amount must be greater than 0" });
    const users = readUsersDB();
    const AmountIdx = users.findIndex((x) => x.username === user.username);
    users[AmountIdx].money += amount;
    // user[AmountIdx].amount = req.body.amount;
    writeUsersDB(users);
    return res.json({ ok: true, money: users[AmountIdx].money });
    //find and update money in DB

    //return response
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
