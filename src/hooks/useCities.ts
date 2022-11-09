import { useState } from "react";
import { TCity } from "../_types/TCity";
import { citiesData, CityProperty } from "./cities";

const useCities = () => {
    const [cities, setCities] = useState<TCity[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const getCitiesFromSearch = async (query: string) => {
        setCities([]);
        // We can modify this to set limit of characters before sending API call
        if (query.length < 1 || query === ' ') {
            return;
        }
        setIsLoading(true);
        // timeout simulate backend
        setTimeout(() => {
            const result = citiesData.filter((city) => (
                city[CityProperty.NAME].toLowerCase().includes(query)
            ));
            setCities(result);
            setIsLoading(false);
        }, 400);

    }

    return { cities, getCitiesFromSearch, isLoading }
};

export default useCities;
