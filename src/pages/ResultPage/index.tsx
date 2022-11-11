import { useEffect } from "react";
import { TResultUrlData } from "../../_types/TForms";
import styles from "../Homepage/homepage.module.scss";
import ResultField from "../../components/ResultField";
import { CITY_PROPERTY } from "../../_fakeData/cities";
import useDistanceCalculation from "./useDistanceCalculation";
import { useSearchParams } from "react-router-dom";

const ResultPage = () => {
    const [searchParams] = useSearchParams();
    const { data, calculatedDistances, fullDistance, fancyLoading, error, setDataFromUrlParams } =
        useDistanceCalculation();
    const { cities, date, passengers } = data || {};

    useEffect(() => {
        const urlData: TResultUrlData = {
            originCity: null,
            destinationCity: null,
            intermediateCities: [],
            date: "",
            passengers: null,
        };
        urlData.originCity = searchParams.get("originCity");
        urlData.destinationCity = searchParams.get("destinationCity");
        urlData.intermediateCities = searchParams.get("intermediateCities")?.split(",");
        urlData.date = searchParams.get("date");
        urlData.passengers = searchParams.get("passengers");
        // All validation is done in setDataFromUrlParams
        setDataFromUrlParams(urlData);
    }, []);

    if (!data) {
        return (
            <div className="page-wrapper">
                {error ? (
                    <h1 className="h2 text-danger text-center mb-3">
                        {error}
                    </h1>
                ) : (
                    <h1 className="h1 text-primary text-center mb-3">
                        Calculating distance and loading cities
                        {!!fancyLoading.cities && !!fancyLoading.loaded ?
                            (<span>
                                : {fancyLoading.cities}/
                                {fancyLoading.loaded}
                            </span>) : (<span>...</span>)}
                    </h1>
                )}

            </div>
        );
    }
    return (
        <div className="page-wrapper">
            <h1 className="h1 text-primary text-center mb-3">Calculated distance</h1>
            <div className={`${styles.form} bg-light rounded flex-column`}>
                <ResultField label="Date">
                    <input
                        type="date"
                        id="date"
                        name="date"
                        disabled
                        className={`form-control text-center text-dark bg-white`}
                        value={date || ""}
                    />
                </ResultField>
                <ResultField label="Passengers">
                    <div className="form-control text-center text-dark">{passengers}</div>
                </ResultField>
                <hr className="hr" />
                <ResultField label="Cities">
                    <div>
                        {cities?.map((city, index) => {
                            // Index should match the calculatedDistances - check useDistanceCalculations
                            const distance = calculatedDistances?.[index];
                            return (
                                <div key={index}>
                                    <div className={`form-control text-center`}>
                                        {city?.[CITY_PROPERTY.NAME]}
                                    </div>
                                    {distance !== undefined && (
                                        <div className="text-center text-primary my-1">
                                            Distance: {distance.toFixed(2)}km
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </ResultField>
                <hr className="hr" />
                <ResultField label="Total distance">
                    <div className="form-control text-center text-primary">{fullDistance?.toFixed(2)}km</div>
                </ResultField>
            </div>
        </div>
    );
};

export default ResultPage;
