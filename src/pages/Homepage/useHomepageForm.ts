import { useState, useEffect, FormEvent } from "react";
import { TCity, TIntermediateCity } from "../../_types/TCity";
import { getTomorrowDate } from "../../functions/date/getTomorrowDate";
import { THomeInputData, THomeFormErrors, THomeFormData } from "../../_types/TForms";
import { getRandomId } from "../../functions/helpers/helpers";
import { useSearchParams } from 'react-router-dom';
import { HP_FORM_URL_PARAMS } from "../../_types/TForms";
import { getCityFromUrl } from "../../functions/helpers/helpers";
import { CITY_PROPERTY } from "../../hooks/cities";
import { validateForm } from "../../functions/validation/formValidation";

const useHomepageForm = () => {
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

    const onIntermediateCityChange = (city: TCity, id: string) => {
        const newCity = { id, value: city };
        // Checks if city value already exists and should be updated or we need to add new value
        const targetIndex = intermediateCities.findIndex((cityItem) => cityItem.id === newCity.id);
        if (targetIndex === -1) {
            setIntermediateCities((prev) => [...prev, newCity])
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

        const interCities = intermediateCities.map((c) => c.value);
        const formData = {
            originCity,
            destinationCity,
            intermediateCities: interCities,
            date,
            passengers: parseInt(passengers || ''),
        } as THomeFormData;
    };

    // Handle routes
    // Reading from url
    useEffect(() => {
        const urlOriginCity = getCityFromUrl(HP_FORM_URL_PARAMS.ORIGIN_CITY, searchParams);
        setOriginCity(urlOriginCity || null);
        const urlDestinationCity = getCityFromUrl(HP_FORM_URL_PARAMS.DESTINATION_CITY, searchParams);
        setOriginCity(urlDestinationCity || null);
        console.log('search params', searchParams.get('intermediateCities'))
        const urlDate = searchParams.get('date');
        setDate(urlDate || tomorrowDate);

        const urlPassengers = searchParams.get('passengers');
        setDate(urlPassengers || tomorrowDate);

    }, []);
    // Writing to url
    useEffect(() => {
        const citiesToAdd: string[] = [];
        intermediateCities?.forEach((i) => {
            if (i?.value?.[CITY_PROPERTY.NAME]) {
                citiesToAdd.push(i.value[CITY_PROPERTY.NAME]);
            }
        });
        if (citiesToAdd.length > 0) {
            setSearchParams([['intermediateCities', citiesToAdd.join(',')]]);
        }
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
