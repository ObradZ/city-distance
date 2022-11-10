import { TCity } from "../../_types/TCity";

export const getIsRequiredText = (field: string) => {
    return field + " is required.";
};

export const getRandomId = () => {
    return Math.random().toString(16).slice(2);
};

export const getCityFromUrl = (propertyName: string, searchParams: URLSearchParams) => {
    const cityData = searchParams.get(propertyName)?.split(',');
    const typedUrlOriginCity = cityData?.map((item) => typeof +item === 'number' ? +item : item);
    return typedUrlOriginCity as TCity;
}
