import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import ApiServices from "../services/ApiServices";

function MapView({ cities }) {
    const [coordinates, setCoordinates] = useState([]);
    useEffect(() => {
        async function fetchCoordinates() {
            const results = await Promise.all(
                    cities.map(async (city) => {
                        const res = await ApiServices.getCordinates(city);
                        if (res) {
                            return {city, lat: Number(res.lat), lon: Number(res.lon)};
                        }
                        return null;
                    })
            );
        setCoordinates(results.filter(Boolean));
        }
        if (cities && cities.length) {
            fetchCoordinates();
        }
    }, [cities]);

    return (
        <MapContainer
            center={[20.5937, 78.9629]}
            zoom={3}
            style={{ height: "600px", width: "1000px" }}
        >

        <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {coordinates.map((city) => (
            <Marker key={`${city.city}-${city.lat}`} position={[city.lat, city.lon]}>
                <Popup>{city.city}</Popup>
            </Marker>
        ))}

        </MapContainer>
    );
}

export default MapView;