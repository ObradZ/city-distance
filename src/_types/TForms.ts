import { TCity } from "./TCity"

export type THomepageFormData = {
    originCity: TCity,
    destinationCity: TCity,
    intermediateCities?: TCity[],
    date: string,
    passengers: number,
}

export type THomepageFormErrors = {
    originCity: string,
    destinationCity: string,
    intermediateCities?: { id: string, error: string }[],
    date: string,
    passengers: string,
}