import dotenv from "dotenv";
import { decodeJwt } from "../service/jwtService";
import { findStaffById } from "../mongodb/staff";
import { findCustomerById } from "../mongodb/customer";
import roles from "../constants/roles";
import { findInvitedStaff } from "../mongodb/invitedStaff";

dotenv.config();

const authMiddleware = async (ctx, next) => {
  const token = ctx.header["authorization"];

  if (!token) {
    ctx.body = { success: false, msg: "Unauthorized!" };
    return;
  }

  const user = decodeJwt(token);

  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, msg: "Authentication error 1" };
    return;
  }

  try {
    // ctx.user = user

    if (!user) {
      ctx.status = 404;
      ctx.body = { success: false, msg: "Authentication error 1" };
      return;
    }

    let dbUser;
    if (user.role === roles.CUSTOMER) {
      dbUser = await findCustomerById(user._id);
    } else if (user?.isInvited) {
      dbUser = await findInvitedStaff({ email: user.email });
    } else {
      dbUser = await findStaffById(user._id);
    }

    if (!dbUser) {
      ctx.status = 404;
      ctx.body = { success: false, msg: "User doesnt exist" };
      return;
    }

    ctx.user = dbUser;
    ctx.request.user = dbUser;

    return next();
  } catch (err) {
    console.log(err.message);
    ctx.body = { success: false, msg: "Authentication error 2" };
  }
};

export default authMiddleware;
