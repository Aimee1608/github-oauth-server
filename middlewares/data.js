module.exports = async function (ctx, next) {
  ctx.data = function ({ data, code, msg }) {
    ctx.body = {
      code: code || 0,
      msg: msg || 'ok',
      data: data || {}
    };
  };
  await next();
};
