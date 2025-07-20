"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var roleSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String, required: true }],
});
exports.default = (0, mongoose_1.model)('Role', roleSchema);
//# sourceMappingURL=role.schema.js.map