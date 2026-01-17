import { useEffect, useState } from "react";
import api from "../../config/axios";

const Form16PartB = () => {
    const [data, setData] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        api.get("/form16/part-b", { params: { year } }).then((res) => {
            setData(res.data);
        });
    }, [year]);

    if (!data) return <p>Loading...</p>;

    return (
        <div style={{ padding: 24, maxWidth: 800 }}>
            <h2>Form-16 Part B — {year}</h2>

            <table border="1" cellPadding="8" width="100%">
                <tbody>
                    <tr><td>Employee</td><td>{data.employee_name}</td></tr>
                    <tr><td>PAN</td><td>{data.pan}</td></tr>
                    <tr><td>Tax Regime</td><td>{data.regime}</td></tr>

                    <tr><td>Annual Gross</td><td>{data.annual_gross}</td></tr>
                    <tr><td>Bonus</td><td>{data.bonus}</td></tr>
                    <tr><td>Arrears</td><td>{data.arrears}</td></tr>

                    <tr><td>Standard Deduction</td><td>{data.standard_deduction}</td></tr>
                    <tr><td>80C</td><td>{data.section_80c}</td></tr>
                    <tr><td>80D</td><td>{data.section_80d}</td></tr>
                    <tr><td>HRA</td><td>{data.hra}</td></tr>
                    <tr><td>Home Loan Interest</td><td>{data.home_loan_interest}</td></tr>

                    <tr style={{ fontWeight: "bold" }}>
                        <td>Taxable Income</td>
                        <td>{data.taxable_income}</td>
                    </tr>

                    <tr><td>Total Tax Payable</td><td>{data.tax_payable}</td></tr>
                    <tr><td>TDS Deducted</td><td>{data.tds_deducted}</td></tr>

                    <tr style={{ fontWeight: "bold" }}>
                        <td>Balance (Refund / Due)</td>
                        <td>{data.balance}</td>
                    </tr>
                </tbody>
            </table>

            <button
                style={{ marginTop: 20 }}
                onClick={() =>
                    window.open(
                        `${import.meta.env.VITE_API_URL}/form16/part-b/${year}/pdf`,
                        "_blank"
                    )
                }
            >
                Download Form-16 Part-B PDF
            </button>
        </div>
    );
};

export default Form16PartB;
