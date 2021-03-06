module.exports = async (ctx, next) => {
  ctx.set({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With',
    'Access-Control-Allow-Methods': 'PUT,PATCH,POST,GET,DELETE,OPTIONS',
    'Access-Control-Max-Age': '1728000',
    'Content-Type': 'application/json;charset=utf-8'
  });

  // Form Data简单请求不会发起OPTIONS请求
  // Request Payload复杂请求会发起OPTIONS请求
  // 设置Access-Control-Max-Age时间，可以避免每个请求都发起OPTIONS
  // OPTIONS
  if (ctx.request.method === 'OPTIONS') {
    ctx.status = 200;
    return false;
  }

  // 传递到下一个中间件
  await next();
};
