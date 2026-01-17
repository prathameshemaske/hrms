const StatutoryReports = () => {
    return (
        <div style={{ padding: 24 }}>
            <h2>Statutory Reports</h2>

            <ul>
                <li>
                    <a href={`${import.meta.env.VITE_API_URL}/reports/pf-ecr`} target="_blank">
                        PF ECR File
                    </a>
                </li>
                <li>
                    <a href={`${import.meta.env.VITE_API_URL}/reports/esi`} target="_blank">
                        ESI Challan
                    </a>
                </li>
                <li>
                    <a href={`${import.meta.env.VITE_API_URL}/reports/pt`} target="_blank">
                        Professional Tax
                    </a>
                </li>
                <li>
                    <a href={`${import.meta.env.VITE_API_URL}/reports/gratuity`} target="_blank">
                        Gratuity Register
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default StatutoryReports;
