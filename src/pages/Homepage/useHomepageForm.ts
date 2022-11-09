import { useState } from "react";
import { TCity, TIntermediateCity } from "../../_types/TCity";
import { getTomorrowDate } from "../../functions/date";
import { THomepageFormErrors } from "../../_types/TForms";

const getIsRequiredText = (field: string) => {
    return field + " is required.";
};

const useHomepageForm = () => {
    const [originCity, setOriginCity] = useState<TCity | null>(null);
    const [destinationCity, setDestinationCity] = useState<TCity | null>(null);
    const [intermediateCities, setIntermediateCities] = useState<TIntermediateCity[]>([]);

    const tomorrowDate = getTomorrowDate();
    const [date, setDate] = useState(tomorrowDate);
    const [passengers, setPassengers] = useState<string | null>(null);

    const [errors, setErrors] = useState<THomepageFormErrors | null>(null);

    const validateForm = () => {
        let isFormValid = true;
        const newErrors: THomepageFormErrors = {
            originCity: "",
            destinationCity: "",
            intermediateCities: [],
            date: "",
            passengers: "",
        };
        console.log(originCity);
        // Origin city validation
        if (originCity === null) {
            newErrors.originCity = getIsRequiredText("Origin city");
            isFormValid = false;
        }

        // Destination city validation
        if (destinationCity === null) {
            newErrors.destinationCity = getIsRequiredText("Destination city");
            isFormValid = false;
        }

        // Intermediate cities validation
        intermediateCities.forEach((iCity) => {
            if (iCity.value === null || iCity.value === undefined) {
                newErrors.intermediateCities?.push({
                    id: iCity.id,
                    error: "Intermediate city is required.",
                });
                isFormValid = false;
            }
        });

        // Date validation
        const pickedDate = new Date(date);
        const isInvalidDate = pickedDate.toString() === "Invalid Date";
        newErrors.date = isInvalidDate ? "Date is invalid." : "";
        isFormValid = !isInvalidDate;

        // Passengers validation
        const passengersNum = parseInt(passengers || "");
        if (typeof passengersNum !== "number") {
            newErrors.passengers = "Number of passengers must be a valid number.";
            isFormValid = false;
        }
        if (typeof passengersNum === "number" && passengersNum < 1) {
            newErrors.passengers = "Number of passengers must be greater than 0.";
            isFormValid = false;
        }
        if (isNaN(passengersNum)) {
            newErrors.passengers = getIsRequiredText("Number of passengers");
            isFormValid = false;
        }

        setErrors(newErrors);
        return isFormValid;
    };

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
        validateForm,
    };
};

export default useHomepageForm;
