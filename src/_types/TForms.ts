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

export type TResultUrlData = {
    originCity: string | null;
    destinationCity: string | null;
    intermediateCities?: string[];
    date: string | null;
    passengers: string | null;
};

export type TResultData = {
    cities: TCity[],
    date: string | null;
    passengers: string | null;
}