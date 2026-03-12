import { useNavigate } from "react-router-dom"

function ListCard({data, index}){
    const navigate = useNavigate()
    return(
        <tr 
         onClick={() => navigate(`/details/${data[0]}`)} 
         className={`${index % 2 === 0 ? "" : "bg-gray-100"} hover:bg-gray-300 text-center hover:cursor-pointer`}
        >
            <td className="px-4 py-2">{data[0]}</td>
            <td className="px-4 py-2">{data[1]}</td>
            <td className="px-4 py-2">{data[2]}</td>
            <td className="px-4 py-2">{data[3]}</td>
            <td className="px-4 py-2">{data[4]}</td>
            <td className="px-4 py-2">{data[5]}</td>
        </tr>
    )
}

export default ListCard