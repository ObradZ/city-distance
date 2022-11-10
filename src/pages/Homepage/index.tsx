import { useEffect } from "react";
import styles from "./homepage.module.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import CityTypeahead from "../../components/CityTypeahead";
import useHomepageForm from "./useHomepageForm";
import FormField from "../../components/FormField";
import { useSearchParams } from 'react-router-dom';
import { TCity } from "../../_types/TCity";

const Homepage = () => {
    const {
        tomorrowDate,
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
        onSubmit,
    } = useHomepageForm();

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
                    defaultValue={!!passengers ? passengers.toString() : ''}
                />
                <button type="submit" className="btn btn-primary my-4 btnPrimary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Homepage;
