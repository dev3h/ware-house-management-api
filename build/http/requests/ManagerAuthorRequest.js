"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _RoleSysEnum = _interopRequireDefault(require("../../enums/RoleSysEnum"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ManagerAuthorRequest = function ManagerAuthorRequest(req, res, next) {
  var role = req.body.role;
  var rules = {
    username: _joi["default"].string().required().messages({
      "string.base": "Tên đăng nhập phải là chuỗi",
      "string.empty": "Tên đăng nhập không được để trống",
      "any.required": "Tên đăng nhập là bắt buộc"
    }),
    display_name: _joi["default"].string().required().messages({
      "string.base": "Tên hiển thị phải là chuỗi",
      "string.empty": "Tên hiển thị không được để trống",
      "any.required": "Tên hiển thị là bắt buộc"
    }),
    email: _joi["default"].string().email().required().messages({
      "string.base": "Email phải là chuỗi",
      "string.empty": "Email không được để trống",
      "string.email": "Email không hợp lệ",
      "any.required": "Email là bắt buộc"
    })
  };
  if (role) {
    rules.role = _joi["default"].required().custom(function (value, helper) {
      if (!Object.values(_RoleSysEnum["default"]).includes(+value)) return helper.message("Role không hợp lệ");
      return true;
    }).messages({
      "any.required": "Role là bắt buộc"
    });
  }
  var dataToValidate = _objectSpread({}, req.body);
  if (role) {
    dataToValidate.role = +role;
  }
  var _joi$object$validate = _joi["default"].object(rules).validate(dataToValidate),
    error = _joi$object$validate.error;
  if (error && error.details[0].path[0] === "username" && error.details[0].type === "any.required" && req.method === "PUT") {
    // Nếu là phương thức PUT và không có sửa đổi tên, bỏ qua lỗi required
    next();
  } else if (error) {
    return res.status(422).json({
      message: error.message
    });
  }
  next();
};
var _default = exports["default"] = ManagerAuthorRequest;