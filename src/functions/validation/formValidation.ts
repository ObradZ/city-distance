import { THomeInputData, THomeFormErrors } from "../../_types/TForms";
import { getIsRequiredText } from "../helpers/helpers";

export const getIsInvalidDate = (date: string) => {
    const pickedDate = new Date(date);
    const isInvalidDate = pickedDate.toString() === "Invalid Date";
    return isInvalidDate;
}

export const validateForm = (inputData: THomeInputData) => {
    const { originCity, destinationCity, intermediateCities, date, passengers } = inputData;
    let isFormValid = true;
    const newErrors: THomeFormErrors = {
        originCity: "",
        destinationCity: "",
        intermediateCities: [],
        date: "",
        passengers: "",
    };

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
    intermediateCities?.forEach((iCity) => {
        if (iCity.value === null || iCity.value === undefined) {
            newErrors.intermediateCities?.push({
                id: iCity.id,
                error: "Intermediate city is required.",
            });
            isFormValid = false;
        }
    });

    // Date validation
    const isInvalidDate = getIsInvalidDate(date);
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

    return { isFormValid, newErrors };
};
