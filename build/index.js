"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _express = _interopRequireWildcard(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
require("dotenv/config");
var _api = require("@bull-board/api");
var _bullAdapter = require("@bull-board/api/bullAdapter");
var _express2 = require("@bull-board/express");
var _database = _interopRequireDefault(require("./config/database"));
var _routes = _interopRequireDefault(require("./routes"));
var _queues = require("./queues");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var app = (0, _express["default"])();
var corsOption = {
  credentials: true,
  origin: [process.env.URL_CLIENT]
};
app.use((0, _cors["default"])(corsOption));
app.use((0, _cookieParser["default"])());
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: true
}));
(0, _database["default"])();
var serverAdapter = new _express2.ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
var _createBullBoard = (0, _api.createBullBoard)({
    queues: [new _bullAdapter.BullAdapter(_queues.emailQueue)],
    serverAdapter: serverAdapter
  }),
  addQueue = _createBullBoard.addQueue,
  removeQueue = _createBullBoard.removeQueue,
  setQueues = _createBullBoard.setQueues,
  replaceQueues = _createBullBoard.replaceQueues;
app.use("/admin/queues", serverAdapter.getRouter());
(0, _routes["default"])(app);
var PORT = process.env.PORT || 5000;
var listener = app.listen(PORT, function () {
  console.log("Server is running on port ".concat(listener.address().port));
  console.log("For Bull Queue UI, open http://localhost:5000/admin/queues");
  console.log("Make sure Redis is running on port 6379 by default");
});