import { useMemo } from "react";
import useUserContext from "../hooks/useUserContext";
import MapView from "../components/MapView";

function Analytics() {
    const { userData } = useUserContext();

    const avg_salaryz_cities = useMemo(() => {
        if (!userData) return {};

        const Cities_data = {};
        userData.forEach(data => {
            const city = data[2];
            const salary = Number(data[5].replace(/[$,]/g, ""));
            if (!Cities_data[city]) {
                Cities_data[city] = [];
            }
            Cities_data[city].push(salary);
        });

        const result = {};
        Object.keys(Cities_data).forEach(city => {
            const salaries = Cities_data[city];
            const sum = salaries.reduce((a, b) => a + b, 0);
            result[city] = sum / salaries.length;
        });
        return result;

    }, [userData]);

    const cities = Object.keys(avg_salaryz_cities);
    const salaries = Object.values(avg_salaryz_cities);
    const maxSalary = Math.max(...salaries, 1);
    const svgHeight = 300;
    const barWidth = 50;
    const maxBarHeight = 250;
    const chartWidth = Math.max(cities.length * 90, 600);
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 gap-8">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Analytics</h1>
            {/* Chart Card */}
            <div className="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                <svg 
                    width={chartWidth} 
                    height={svgHeight} 
                    className="mx-auto block"
                >
                    {cities.map((city, index) => {
                        const salary = avg_salaryz_cities[city];
                        const barHeight = (salary / maxSalary) * maxBarHeight;
                        const x = index * 90 + 40;
                        const yOrigin = svgHeight - 40; 
                        const y = yOrigin - barHeight;

                        return (
                            <g key={city} className="group">
                                {/* Bar */}
                                <rect
                                    x={x}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight}
                                    fill="#818cf8" 
                                    rx="6"  
                                    className="transition-all duration-300 group-hover:opacity-80"
                                />

                                {/* Salary Text    */}
                                <text
                                    x={x + barWidth / 2}
                                    y={y - 12}
                                    textAnchor="middle"
                                    fontSize="12"
                                    fontWeight="600"
                                    fill="#475569"  
                                >
                                    ${(salary / 1000).toFixed(1)}k
                                </text>

                                {/* City Text   */}
                                <text
                                    x={x + barWidth / 2}
                                    y={yOrigin + 20}
                                    textAnchor="middle"
                                    fontSize="12"
                                    fill="#64748b"  
                                >
                                    {city}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Map Card */}
            <div className="w-full max-w-5xl bg-white p-4 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <MapView cities={cities} />
            </div>

        </div>
    );
}

export default Analytics;