const util = require('util');
const ERROR_MSG = require('./errorMsg');
const constants = require('./constants');

const {
  HTTP_CODE
} = constants;

function CustomError(code, msg) {
  Error.call(this, '');
  this.code = code;
  this.msg = msg || ERROR_MSG[code] || 'unknown error';
  this.getCodeMsg = function () {
    return {
      code: this.code,
      msg: this.msg
    };
  };
}
util.inherits(CustomError, Error);

function HttpError(code, msg) {
  if (Object.values(HTTP_CODE).indexOf(code) < 0) {
    throw Error('not an invalid http code');
  }

  CustomError.call(this, code, msg);
}
util.inherits(HttpError, CustomError);

module.exports = {
  HttpError,
  CustomError
};
