import express from "express";
import { generatePayslipPDF } from "../services/payslipPdf.service.js";
import { getPayslipById } from "../models/payroll.model.js";
import { getEmployeeById } from "../models/employees.model.js";
import path from "path";

import {
    runPayroll,
    lockPayroll,
    getPayslips,
    generateForm16
} from "../services/payroll.service.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/run", auth, async (req, res) => {
    const { month, year } = req.body;
    const payroll = await runPayroll(month, year, req.user.id);
    res.json(payroll);
});

router.post("/lock", auth, async (req, res) => {
    const { month, year } = req.body;
    await lockPayroll(month, year);
    res.json({ success: true });
});

router.get("/payslips", auth, async (req, res) => {
    const { month, year } = req.query;
    const data = await getPayslips(month, year);
    res.json(data.rows);
});

router.post("/form16", auth, async (req, res) => {
    const { employeeId, financialYear } = req.body;
    await generateForm16(employeeId, financialYear);
    res.json({ success: true });
});

router.get("/payslip/:id/pdf", async (req, res) => {
    const payslip = await getPayslipById(req.params.id);
    const employee = await getEmployeeById(payslip.employee_id);

    const filePath = generatePayslipPDF(payslip, employee);

    res.download(path.resolve(filePath));
});

router.get("/form16/:year", async (req, res) => {
    const employeeId = req.user.id;
    const year = req.params.year;

    const employee = await getEmployeeById(employeeId);
    const form16 = await getForm16Data(employeeId, year);

    const filePath = generateForm16(employee, form16, year);
    res.download(path.resolve(filePath));
});

router.get("/bank/:month/:year", async (req, res) => {
    const { month, year } = req.params;
    const payrollRows = await getPayrollRows(month, year);
    const filePath = generateBankFile(payrollRows, month, year);
    res.download(path.resolve(filePath));
});

export default router;
