import fs from "fs";
import path from "path";

export const generateBankFile = (payrollRows, month, year) => {
    const fileName = `salary_${month}_${year}.csv`;
    const filePath = path.join("uploads/bank", fileName);

    let csv = "Name,Account,IFSC,Amount,Remark\n";

    payrollRows.forEach(p => {
        csv += `${p.full_name},${p.bank_account},${p.ifsc},${p.net_salary},Salary ${month}-${year}\n`;
    });

    fs.writeFileSync(filePath, csv);

    return filePath;
};
