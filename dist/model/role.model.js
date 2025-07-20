"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RoleSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String }],
});
exports.default = (0, mongoose_1.model)('Role', RoleSchema);
//# sourceMappingURL=role.model.js.map