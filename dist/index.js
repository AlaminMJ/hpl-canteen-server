"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.get('/', function (req, res) {
    var name = process.env.NAME || 'World';
    res.send("Hello ".concat(name, "!"));
});
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
var port = parseInt(process.env.PORT || '3000');
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
exports.default = app;
//# sourceMappingURL=index.js.map