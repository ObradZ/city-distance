import { useEffect, useState } from "react";
import styles from "./homepage.module.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import CityTypeahead from "../../components/CityTypeahead";
import { TCity, TIntermediateCity } from "../../_types/TCity";

const Homepage = () => {
    const [intermediateCities, setIntermediateCities] = useState<
        TIntermediateCity[]
    >([]);

    const onAddIntermediateCities = () => {
        const id = `intermediate-city${intermediateCities.length}`;
        const newEntry = { id, value: null };
        setIntermediateCities(prev => [...prev, newEntry])
    };

    const onRemoveIntermediateCities = (id: string) => {
        setIntermediateCities((prev) => prev.filter((icity) => icity.id !== id));
    }

    return (
        <div className="page-wrapper">
            <h1 className="h1 text-primary text-center mb-3">
                Calculate your travel distance
            </h1>
            <form action="" className={`${styles.form} bg-light rounded`}>
                <CityTypeahead label="Origin city" id="origin-city" />
                <CityTypeahead label="Destination city" id="destination-city" />

                <div className="w-100">
                    <h2 className="h4 my-3">Intermediate cities</h2>
                    {intermediateCities.map((item, index) => (
                        <div key={item.id} className="d-flex align-items-end mb-2">
                            <CityTypeahead label={`Intermediate city ${index + 1}`} id={item.id} />
                            <button
                                className="btn btn-primary mx-3"
                                type="button"
                                onClick={() => onRemoveIntermediateCities(item.id)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <button
                        className="btn btn-primary my-4"
                        type="button"
                        onClick={onAddIntermediateCities}
                    >
                        Add intermediate city
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Homepage;
