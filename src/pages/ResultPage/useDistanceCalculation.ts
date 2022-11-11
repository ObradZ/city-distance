import haversine from 'haversine-distance'
import { useEffect, useState } from "react";
import { CITY_PROPERTY } from "../../_fakeData/cities";
import { TResultData, TResultUrlData } from "../../_types/TForms";
import useCities, { wait } from "../../hooks/useCities";
import { getIsInvalidDate } from "../../functions/validation/formValidation";

const useDistanceCalculation = () => {
    const { getCitiesFromSearch } = useCities(false);
    const [calculatedDistances, setCalculatedDistances] = useState<number[]>([])
    const [fullDistance, setFullDistance] = useState<number | null>(null);
    const [data, setData] = useState<TResultData | null>(null);
    const [fancyLoading, setFancyLoading] = useState({ cities: 0, loaded: 0 });
    const [error, setErrors] = useState('');
    const setDataFromUrlParams = async (urlData: TResultUrlData) => {
        setErrors('');

        try {
            const { originCity, destinationCity, intermediateCities, date, passengers } = urlData;
            const tempCities = [];
            originCity && tempCities.push(originCity.toLowerCase());
            intermediateCities?.forEach((city) => {
                tempCities.push(city.toLowerCase());
            })
            destinationCity && tempCities.push(destinationCity.toLowerCase());

            // Get result data
            const resultData: TResultData = {
                cities: [],
                date: null,
                passengers: null,
            };

            // Simulate error when 'Dijon' is included
            if (tempCities.includes('dijon')) {
                await wait(400);
                setErrors('Something went wrong. Please try again later. (Dijon city error)');
                return;
            }
            // TODO -catch cities here also
            // We need to get data from api
            for (const city of tempCities) {
                const cityData = await getCitiesFromSearch(city);
                if (cityData && cityData?.length > 0) {
                    resultData.cities.push(cityData[0]);
                    setFancyLoading({ cities: resultData?.cities?.length, loaded: tempCities?.length });
                }
            }
            await wait(400);
            if (!getIsInvalidDate(date || '')) {
                resultData.date = date;
            }
            if (passengers) {
                resultData.passengers = passengers;
            }

            setData(resultData);
        } catch (e) {
            console.warn("Caught error in useDistanceCalculations: ",e);
            if (e instanceof Error) {
                setErrors(e.message)
            }
        }

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

    return { data, calculatedDistances, fullDistance, fancyLoading, error, setDataFromUrlParams };
}

export default useDistanceCalculation;