import { useState, useEffect, FormEvent } from "react";
import { TCity, TIntermediateCity } from "../../_types/TCity";
import { getTomorrowDate } from "../../functions/date/getTomorrowDate";
import { THomeInputData, THomeFormErrors } from "../../_types/TForms";
import { getRandomId } from "../../functions/helpers/helpers";
import { useSearchParams, ParamKeyValuePair, createSearchParams, useNavigate } from "react-router-dom";
import { CITY_PROPERTY } from "../../_fakeData/cities";
import { getIsInvalidDate, validateForm } from "../../functions/validation/formValidation";

const useHomepageForm = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [originCity, setOriginCity] = useState<TCity | null>(null);
    const [destinationCity, setDestinationCity] = useState<TCity | null>(null);
    const [intermediateCities, setIntermediateCities] = useState<TIntermediateCity[]>([]);

    const tomorrowDate = getTomorrowDate();
    const [date, setDate] = useState(tomorrowDate);
    const [passengers, setPassengers] = useState<string | null>(null);

    const [errors, setErrors] = useState<THomeFormErrors | null>(null);

    const onAddIntermediateCities = () => {
        const id = `city-${getRandomId()}-${intermediateCities.length}`;
        const newEntry = { id, value: null };
        setIntermediateCities((prev) => [...prev, newEntry]);
    };

    const onRemoveIntermediateCities = (id: string) => {
        setIntermediateCities((prev) => prev.filter((icity) => icity.id !== id));
    };

    const onIntermediateCityChange = (city: TCity | null, id: string) => {
        const newCity = { id, value: city };
        // Checks if city value already exists and should be updated or we need to add new value
        const targetIndex = intermediateCities.findIndex((cityItem) => cityItem.id === newCity.id);
        if (targetIndex === -1) {
            setIntermediateCities((prev) => [...prev, newCity]);
        } else {
            const updatedCities = [...intermediateCities];
            updatedCities[targetIndex] = newCity;
            setIntermediateCities(updatedCities);
        }
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const inputData = {
            originCity,
            destinationCity,
            intermediateCities,
            date,
            passengers,
        } as THomeInputData;

        const { isFormValid, newErrors } = validateForm(inputData);
        setErrors(newErrors);
        if (!isFormValid) {
            return;
        }

        // const interCities = intermediateCities.map((c) => c.value);
        // const formData = {
        //     originCity,
        //     destinationCity,
        //     intermediateCities: interCities,
        //     date,
        //     passengers: parseInt(passengers || ''),
        // } as THomeFormData;

        const paramValues = generateSearchParamDataFromState();
        const params = createSearchParams(paramValues);
        navigate({
            pathname: "result",
            search: params.toString(),
        });
    };
    // Generating search param data
    const generateSearchParamDataFromState = () => {
        const newParams: ParamKeyValuePair[] = [];
        if (originCity?.[CITY_PROPERTY.NAME]) {
            newParams.push(["originCity", originCity[CITY_PROPERTY.NAME]]);
        }
        if (destinationCity?.[CITY_PROPERTY.NAME]) {
            newParams.push(["destinationCity", destinationCity[CITY_PROPERTY.NAME]]);
        }
        const citiesToAdd: string[] = [];
        intermediateCities?.forEach((i) => {
            if (i?.value?.[CITY_PROPERTY.NAME]) {
                citiesToAdd.push(i.value[CITY_PROPERTY.NAME]);
            }
        });
        if (citiesToAdd.length > 0) {
            newParams.push(["intermediateCities", citiesToAdd.join(",")]);
            setSearchParams([
                ["intermediateCities", citiesToAdd.join(",")],
                ["date", date],
            ]);
        }

        if (date && !getIsInvalidDate(date)) {
            newParams.push(["date", date]);
        }
        if (passengers) {
            newParams.push(["passengers", passengers]);
        }
        return newParams;
    };

    // Reading from url
    useEffect(() => {
        const originCityName = searchParams.get("originCity");
        originCityName && setOriginCity([originCityName, 0, 0] || null);

        const destinationCityName = searchParams.get("destinationCity");
        destinationCityName && setDestinationCity([destinationCityName, 0, 0] || null);

        const intermediateCityNames = searchParams.get("intermediateCities")?.split(",");
        if (intermediateCityNames && intermediateCityNames?.length > 0) {
            const interCities = intermediateCityNames?.map((name) => {
                const cityValue: TCity = [name, 0, 0];
                const id = `city-${getRandomId()}-${intermediateCities.length}`;
                return { id, value: cityValue };
            });

            setIntermediateCities(interCities);
        }

        const urlDate = searchParams.get("date");
        urlDate && setDate(urlDate || tomorrowDate);

        const urlPassengers = searchParams.get("passengers");
        urlPassengers && setPassengers(urlPassengers || tomorrowDate);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Writing to url
    useEffect(() => {
        const newParams = generateSearchParamDataFromState();
        setSearchParams(newParams);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [originCity, destinationCity, intermediateCities, date, passengers]);

    return {
        tomorrowDate,
        originCity,
        destinationCity,
        intermediateCities,
        date,
        passengers,
        errors,
        setOriginCity,
        setDestinationCity,
        setIntermediateCities,
        setDate,
        setPassengers,
        onAddIntermediateCities,
        onRemoveIntermediateCities,
        onIntermediateCityChange,
        validateForm,
        onSubmit,
    };
};

export default useHomepageForm;
