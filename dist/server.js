"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _appjs = require('./app.js'); var _appjs2 = _interopRequireDefault(_appjs);
let PORTA = 3333
_appjs2.default.listen(process.env.PORT || PORTA);