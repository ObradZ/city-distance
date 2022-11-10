import { TCity } from "../../_types/TCity";
import haversine from 'haversine-distance'
import { useEffect, useState } from "react";
import { CITY_PROPERTY } from "../../_fakeData/cities";
import { TResultData, TResultUrlData } from "../../_types/TForms";
import useCities from "../../hooks/useCities";
import { getIsInvalidDate } from "../../functions/validation/formValidation";

// const isValidData = (urlData: TResultUrlData) => {
//     // Check if data is valid, these are required fields from the form
//     const { originCity, destinationCity, date, passengers } = urlData;
//     if(!originCity || !destinationCity ||)
// }

const useDistanceCalculation = () => {
    const { getCitiesFromSearch } = useCities(false);
    const [calculatedDistances, setCalculatedDistances] = useState<number[]>([])
    const [fullDistance, setFullDistance] = useState<number | null>(null);
    const [data, setData] = useState<TResultData | null>(null);
    const [fancyLoading, setFancyLoading] = useState({ cities: 0, loaded: 0 });

    const setDataFromUrlParams = async (urlData: TResultUrlData) => {
        const { originCity, destinationCity, intermediateCities, date, passengers } = urlData;
        const tempCities = [];
        originCity && tempCities.push(originCity);
        intermediateCities?.forEach((city) => {
            tempCities.push(city);
        })
        destinationCity && tempCities.push(destinationCity);

        // Get result data
        const resultData: TResultData = {
            cities: [],
            date: null,
            passengers: null,
        };
        // We need to get data from api
        for (const city of tempCities) {
            const cityData = await getCitiesFromSearch(city);
            if (cityData && cityData?.length > 0) {
                resultData.cities.push(cityData[0]);
                console.log('city push');
                setFancyLoading({ cities: resultData?.cities?.length, loaded: tempCities?.length });
            }
        }
        if (!getIsInvalidDate(date || '')) {
            resultData.date = date;
        }
        if (passengers) {
            resultData.passengers = passengers;
        }

        setData(resultData);
    }

    useEffect(() => {
        if (!data) {
            return;
        }
        const { cities } = data;
        const tempDistances = [];
        let sumDistances = 0;
        for (let i = 0; i < cities.length - 1; i++) {
            // Removing first element which is name, so we can have longitude and latitude only
            const cur = cities[i];
            const next = cities[i + 1];
            const aCoordinates = { latitude: cur[CITY_PROPERTY.LATITUDE], longitude: cur[CITY_PROPERTY.LONGITUDE] };
            const bCoordinates = { latitude: next[CITY_PROPERTY.LATITUDE], longitude: next[CITY_PROPERTY.LONGITUDE] };

            const distance = (haversine(aCoordinates, bCoordinates) / 1000);
            sumDistances += distance;
            tempDistances.push(distance);
        }
        // Index will match with the cities - check render method of ResultPage
        setCalculatedDistances(tempDistances);
        setFullDistance(sumDistances);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return { data, calculatedDistances, fullDistance, fancyLoading, setDataFromUrlParams };
}

export default useDistanceCalculation;