import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateForm16 = (employee, form16, year) => {
    const fileName = `form16_${employee.id}_${year}.pdf`;
    const filePath = path.join("uploads/form16", fileName);

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text("FORM 16 – Income Tax Certificate", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Financial Year: ${year}`);
    doc.text(`Employee Name: ${employee.full_name}`);
    doc.text(`PAN: ${employee.pan || "PANNOTSET"}`);
    doc.text(`Employer: Testriq QA Lab`);
    doc.text(`TAN: MUMT12345A`);
    doc.moveDown();

    doc.fontSize(14).text("Salary Summary");
    doc.moveDown();

    doc.fontSize(12).text(`Gross Salary: ₹ ${form16.gross}`);
    doc.text(`Provident Fund: ₹ ${form16.pf}`);
    doc.text(`Professional Tax: ₹ ${form16.pt}`);
    doc.text(`Tax Deducted (TDS): ₹ ${form16.tds}`);
    doc.moveDown();

    doc.fontSize(14).text(`Net Income: ₹ ${form16.net}`, { underline: true });

    doc.moveDown();
    doc.fontSize(10).text("This is a system generated Form-16.", { align: "center" });

    doc.end();

    return filePath;
};
