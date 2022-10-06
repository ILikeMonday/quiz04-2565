import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        ok: false,
        message: "Permission denied",
      });
    }
    //return res.status(403).json({ ok: false, message: "Permission denied" });
    const users = readUsersDB();
    let countC = 0;
    let countA = 0;
    let countM = 0;

    for (let i = 0; i < users.length; i++) {
      if (users[i].isAdmin) {
        countA++;
      } else {
        countC++;
        countM += users[i].money;
      }
    }

    return res.json({
      ok: true,
      UserCount: countC,
      adminCount: countA,
      totalMoney: countM,
    });
    //compute DB summary
    //return response
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
