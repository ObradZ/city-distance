import { Typeahead } from "react-bootstrap-typeahead";
import useCities from "../../hooks/useCities";
import useDebounce from "../../hooks/useDebounce";
import { useState, useEffect } from "react";
import { TCity } from "../../_types/TCity";
import { CityProperty } from "../../hooks/cities";

export type CityTypeaheadProps = {
    label: string,
    id: string,
}

const CityTypeahead = ({ label, id }: CityTypeaheadProps) => {
    const { cities, isLoading, getCitiesFromSearch } = useCities();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debounceCityQuery = useDebounce(searchQuery);

    // Let's give a little debounce between user typing and API call
    // With this we can make sure that user is finished typing and we have better performance
    useEffect(() => {
        getCitiesFromSearch(debounceCityQuery);
    }, [debounceCityQuery]);

    const onCityChange = (selected: TCity[]) => {
        console.log('selected city: ', selected[0]);
    }

    return (
        <div>
            <label htmlFor={id} className="text-dark w-100 text-center">{label}</label>
            <Typeahead
                options={cities}
                id={id}
                labelKey={(option) => (option as TCity)[CityProperty.NAME]}
                onInputChange={(text) => setSearchQuery(text.toLowerCase())}
                isLoading={isLoading}
                emptyLabel="No cities"
                style={{ width: '325px' }}
                onChange={(selected) => onCityChange(selected as TCity[])}
            />
        </div>
    )
}

export default CityTypeahead;