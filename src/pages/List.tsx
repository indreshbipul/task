import ListCard from "../components/ListCard";
import useUserContext from "../hooks/useUserContext";

function List(){
    const {userData} = useUserContext<object | null>()
    return(
        <div>
           <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Position</th>
                        <th className="px-4 py-2 border">Office</th>
                        <th className="px-4 py-2 border">Extension</th>
                        <th className="px-4 py-2 border">Start Date</th>
                        <th className="px-4 py-2 border">Salary</th>
                    </tr>
                </thead>

                <tbody className="text-gray-700">
                    {userData &&(
                        userData.map((data : object, index : number)=>{
                            return <ListCard key={index} data={data} index={index} />
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default List;