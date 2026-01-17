import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generatePayslipPDF = (payslip, employee) => {
    const fileName = `payslip_${employee.id}_${payslip.month}_${payslip.year}.pdf`;
    const filePath = path.join("uploads/payslips", fileName);

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(fs.createWriteStream(filePath));

    // Header
    doc.fontSize(20).text("HRMS PAYSLIP", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Employee Name: ${employee.full_name}`);
    doc.text(`Designation: ${employee.designation || "-"}`);
    doc.text(`Month: ${payslip.month}/${payslip.year}`);
    doc.moveDown();

    // Salary Table
    doc.fontSize(14).text("Salary Details");
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Basic Salary: ₹ ${payslip.basic}`);
    doc.text(`HRA: ₹ ${payslip.hra}`);
    doc.text(`Allowances: ₹ ${payslip.allowances}`);
    doc.text(`Gross Salary: ₹ ${payslip.gross_salary}`);
    doc.moveDown();

    doc.text(`PF Deduction: ₹ ${payslip.pf}`);
    doc.text(`Professional Tax: ₹ ${payslip.professional_tax}`);
    doc.text(`TDS: ₹ ${payslip.tds}`);
    doc.moveDown();

    doc.fontSize(14).text(`Net Salary: ₹ ${payslip.net_salary}`, { underline: true });

    doc.end();

    return filePath;
};
