import { useEffect, useState } from "react";
import ListCard from "../components/ListCard";
import useUserContext from "../hooks/useUserContext";

function List(){
    const {userData} = useUserContext<object | null>()
    const [visibleRows, setVisibleRows] = useState(17);
    useEffect(() => {

        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 100
            ) {
                setVisibleRows((prev) => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);
    return(
        <div>
           <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Position</th>
                        <th className="px-4 py-2 border">City</th>
                        <th className="px-4 py-2 border">Extension</th>
                        <th className="px-4 py-2 border">Start Date</th>
                        <th className="px-4 py-2 border">Salary</th>
                    </tr>
                </thead>

                <tbody className="text-gray-700">
                    {userData &&(
                        userData.map((data : object, index : number)=>{
                            if(index > visibleRows) return null
                            return <ListCard key={index} data={data} index={index} />
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default List;