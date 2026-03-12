import useUserContext from "../hooks/useUserContext";

function Analytics(){
    const {userData} = useUserContext();
    const Cities_data = {};
    if (userData) {
        userData.forEach(data => {
            const city = data[2]; 
            const salary = Number(data[5].replace(/[$,]/g, ''));
            if (!Cities_data[city]) {
                Cities_data[city] = [];
            }
            Cities_data[city].push(salary);
            });
    }
    const avg_salaryz_cities = {};
    Object.keys(Cities_data).forEach(city =>{
        const salaries = Cities_data[city];
        let sumn = 0
        salaries.forEach(salary =>{
            sumn += Number(salary)
        })
        avg_salaryz_cities[city] = sumn/salaries.length
    })

    return (
        <div>
            <svg></svg>
        </div>
    )
}



export default Analytics;