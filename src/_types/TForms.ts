import { TCity, TIntermediateCity } from "./TCity";

export type THomeInputData = {
    originCity: TCity;
    destinationCity: TCity;
    intermediateCities?: TIntermediateCity[];
    date: string;
    passengers: string;
};

export type THomeFormData = Omit<
    THomeInputData,
    "intermediateCities" | "passengers"
> & { passengers: number; intermediateCities: TCity[] };

export type THomeFormErrors = {
    originCity: string;
    destinationCity: string;
    intermediateCities?: { id: string; error: string }[];
    date: string;
    passengers: string;
};

export const HP_FORM_URL_PARAMS = {
    ORIGIN_CITY: "originCity",
    DESTINATION_CITY: "destinationCity",
    INTERMEDIATE_CITY: "intermediateCity",
    DATE: "date",
    PASSENGERS: "passengers",
};
