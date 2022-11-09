import { FormEvent } from "react";
import styles from "./homepage.module.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import CityTypeahead from "../../components/CityTypeahead";
import useHomepageForm from "./useHomepageForm";
import FormField from "../../components/FormField";
import { TCity } from "../../_types/TCity";
import { THomepageFormData } from "../../_types/TForms";

const getRandomId = () => {
    return Math.random().toString(16).slice(2);
};

const Homepage = () => {
    const {
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
        validateForm,
    } = useHomepageForm();

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
        const isFormValid = validateForm();
        if (!isFormValid) {
            return;
        }

        const interCities = intermediateCities.map((c) => c.value);
        const formData = {
            originCity,
            destinationCity,
            intermediateCities: interCities,
            date,
            passengers: parseInt(passengers || '0'),
        } as THomepageFormData;


    };

    return (
        <div className="page-wrapper">
            <h1 className="h1 text-primary text-center mb-3">
                Calculate your travel distance
            </h1>
            <form onSubmit={onSubmit} className={`${styles.form} bg-light rounded`}>
                <div>
                    <CityTypeahead
                        label="Origin city"
                        id="origin-city"
                        isInvalid={!!errors?.originCity}
                        setStateData={setOriginCity}
                    />
                    {!!errors?.originCity && <p className="text-danger">{errors?.originCity}</p>}
                </div>
                <div>
                    <CityTypeahead
                        label="Destination city"
                        id="destination-city"
                        isInvalid={!!errors?.destinationCity}
                        setStateData={setDestinationCity}
                    />
                    {!!errors?.destinationCity && <p className="text-danger">{errors?.destinationCity}</p>}
                </div>
                <div className="w-100">
                    <h2 className="h4 my-3">Intermediate cities</h2>
                    {intermediateCities.map((item) => {
                        const error = errors?.intermediateCities?.find((c) => c.id === item.id);
                        return (
                            <div key={item.id} className="d-flex align-items-start mb-2">
                                <div>
                                    <CityTypeahead
                                        label={"Intermediate city"}
                                        id={item.id}
                                        isInvalid={!!error?.error}
                                        setStateData={(city) =>
                                            onIntermediateCityChange(city, item.id)
                                        }
                                    />
                                    {!!error?.error && <p className="text-danger">{error?.error}</p>}
                                </div>
                                <button
                                    className={`btn btn-primary mx-3 ${styles.removeCityBtn}`}
                                    type="button"
                                    onClick={() => onRemoveIntermediateCities(item.id)}
                                >
                                    X
                                </button>
                            </div>
                        )
                    })}
                    <button
                        className="btn btn-primary my-4 btnPrimary"
                        type="button"
                        onClick={onAddIntermediateCities}
                    >
                        Add city
                    </button>
                </div>
                <FormField
                    id="date"
                    label="Date of the trip"
                    type="date"
                    min={tomorrowDate}
                    defaultValue={date}
                    setStateData={setDate}
                    errorMessage={errors?.date}
                />
                <FormField
                    id="passengers"
                    label="Passengers"
                    type="number"
                    setStateData={setPassengers}
                    errorMessage={errors?.passengers}
                />
                <button type="submit" className="btn btn-primary my-4 btnPrimary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Homepage;
