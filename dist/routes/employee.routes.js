"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const employee_schema_1 = require("../schemas/employee.schema");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', (0, auth_middleware_1.authorize)('manage_employees'), employee_controller_1.getAllEmployees);
router.get('/:id', (0, auth_middleware_1.authorize)('manage_employees'), employee_controller_1.getEmployeeById);
router.post('/', (0, auth_middleware_1.authorize)('manage_employees'), (0, validate_middleware_1.validate)(employee_schema_1.createEmployeeSchema), employee_controller_1.createEmployee);
router.put('/:id', (0, auth_middleware_1.authorize)('manage_employees'), (0, validate_middleware_1.validate)(employee_schema_1.createEmployeeSchema), employee_controller_1.updateEmployee);
router.delete('/:id', (0, auth_middleware_1.authorize)('admin'), employee_controller_1.deleteEmployee); // Only admin can delete
exports.default = router;
