import { useState } from "react";
import { TCity } from "../_types/TCity";
import { citiesData, CITY_PROPERTY } from "../_fakeData/cities";

export const wait = async (waitTime = 400) => {
	await new Promise((resolve) => setTimeout(resolve, waitTime));
};
const useCities = (updateState = true) => {
	const [cities, setCities] = useState<TCity[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	/**throws new error when search query equals to fail */
	const getCitiesFromSearch = async (query: string) => {
		// Here we can set min characters number which triggers api call
		if (query.length < 1 || query === " ") {
			return;
		}

		const lowerCaseQuery = query.toLowerCase();

		if (lowerCaseQuery === "fail") {
			await wait();
			throw new Error("Search 'fail' word error caught.", { cause: "query fail word." });
		}
		if (updateState) {
			setCities([]);
			setIsLoading(true);
		}
		// timeout simulate backend
		await wait();

		const result = citiesData.filter((city) =>
			city[CITY_PROPERTY.NAME].toLowerCase().includes(lowerCaseQuery)
		);
		if (updateState) {
			setCities(result);
			setIsLoading(false);
		}
		return result;
	};

	return { cities, getCitiesFromSearch, isLoading };
};

export default useCities;
