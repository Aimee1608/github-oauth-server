const Router = require('koa-router');
const config = require('../config');
const {
  checkToken
} = require('../utils/token');

const router = new Router({
  prefix: config.routerBaseApi // 设置接口基础路径
});

const user = require('../controller/user');

router.get('/user/login', user.login);
router.get('/user/logout', checkToken, user.logout);
router.get('/user/getUserInfo', checkToken, user.getUserInfo);

module.exports = router;
