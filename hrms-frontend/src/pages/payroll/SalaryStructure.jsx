import { useEffect, useState } from "react";
import api from "../../config/axios";

const SalaryStructure = () => {
    const [employees, setEmployees] = useState([]);
    const [selected, setSelected] = useState(null);
    const [ctc, setCtc] = useState(0);

    useEffect(() => {
        api.get("/employees").then((res) => setEmployees(res.data));
    }, []);

    const calculate = () => {
        const basic = ctc * 0.4;
        const hra = basic * 0.4;
        const allowances = ctc - (basic + hra);
        const pf = basic * 0.12;
        const gross = basic + hra + allowances;
        const net = gross - pf;

        return { basic, hra, allowances, pf, gross, net };
    };

    const save = async () => {
        const c = calculate();
        await api.post("/salary-structure", {
            employee_id: selected.id,
            ctc,
            ...c
        });
        alert("Salary structure saved");
    };

    const calc = calculate();

    return (
        <div style={{ padding: 24 }}>
            <h2>Salary Structure</h2>

            <select onChange={(e) => setSelected(JSON.parse(e.target.value))}>
                <option>Select employee</option>
                {employees.map((e) => (
                    <option key={e.id} value={JSON.stringify(e)}>
                        {e.full_name}
                    </option>
                ))}
            </select>

            {selected && (
                <>
                    <div style={{ marginTop: 20 }}>
                        <label>Annual CTC</label>
                        <input
                            type="number"
                            value={ctc}
                            onChange={(e) => setCtc(Number(e.target.value))}
                        />
                    </div>

                    <table border="1" cellPadding="8" style={{ marginTop: 20 }}>
                        <tbody>
                            <tr><td>Basic</td><td>{calc.basic}</td></tr>
                            <tr><td>HRA</td><td>{calc.hra}</td></tr>
                            <tr><td>Allowances</td><td>{calc.allowances}</td></tr>
                            <tr><td>PF</td><td>{calc.pf}</td></tr>
                            <tr><td>Gross</td><td>{calc.gross}</td></tr>
                            <tr><td>Net</td><td>{calc.net}</td></tr>
                        </tbody>
                    </table>

                    <button onClick={save} style={{ marginTop: 20 }}>
                        Save Salary Structure
                    </button>
                </>
            )}
        </div>
    );
};

export default SalaryStructure;
