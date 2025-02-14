import bluebird from "bluebird";

const dbValidate = (validators) => {
  return async (ctx, next) => {
    const validationErrors = [];

    await bluebird.map(validators, async (fun) => {
      const err = await fun(ctx);

      if (err) {
        validationErrors.push(err);
      }
    });

    if (validationErrors.length) {
      ctx.body = { success: false, message: validationErrors, msg: "Error" };
      return;
    }
    await next();
  };
};

export default dbValidate;
