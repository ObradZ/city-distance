import { Typeahead } from "react-bootstrap-typeahead";
import useCities from "../../hooks/useCities";
import useDebounce from "../../hooks/useDebounce";
import { useState, useEffect } from "react";
import { TCity } from "../../_types/TCity";
import { CITY_PROPERTY } from "../../_fakeData/cities";

export type CityTypeaheadProps = {
    label: string;
    id: string;
    isInvalid: boolean;
    defaultValue: TCity | null;
    setStateData: (city: TCity | null) => void;
};

const CityTypeahead = ({ label, id, setStateData, isInvalid, defaultValue }: CityTypeaheadProps) => {
    const isDefaultValue =
        defaultValue?.[CITY_PROPERTY.LONGITUDE] === 0 && defaultValue?.[CITY_PROPERTY.LONGITUDE] === 0;

    const { cities, isLoading, getCitiesFromSearch } = useCities();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debounceCityQuery = useDebounce(searchQuery);

    const onCityChange = (selected: TCity[]) => {
        if (selected.length > 0) {
            setStateData(selected[0]);
        }
    };

    // Let's give a little debounce between user typing and API call
    // With this we can make sure that user is finished typing and we have better performance
    useEffect(() => {
        getCitiesFromSearch(debounceCityQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceCityQuery]);

    // Get real default value from url params if needed
    // Wanted to show that is possible to handle large objects from url
    // Usually we would go with object id and then pull it from API
    useEffect(() => {
        // We want to do this only in case we have default value from url
        if (!defaultValue || !isDefaultValue) {
            return;
        }
        (async () => {
            const targetCityName = defaultValue[CITY_PROPERTY.NAME];
            const cities = await getCitiesFromSearch(targetCityName);
            const targetCity = cities?.find((c) => c[CITY_PROPERTY.NAME] === targetCityName);
            // If city from url is not found we want to reset state to null
            setStateData(targetCity || null);
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue]);

    return (
        <div>
            <label htmlFor={id} className="text-dark w-100 text-center">
                {label}
            </label>
            <Typeahead
                options={cities}
                id={id}
                labelKey={(option) => (option as TCity)[CITY_PROPERTY.NAME]}
                onInputChange={(text) => setSearchQuery(text)}
                isLoading={isLoading}
                emptyLabel="No cities"
                placeholder={defaultValue?.[CITY_PROPERTY.NAME] || ""}
                onChange={(selected) => onCityChange(selected as TCity[])}
                inputProps={{
                    className: isInvalid ? "border-danger" : "",
                    style: { width: "325px" },
                }}
            />
        </div>
    );
};

export default CityTypeahead;
