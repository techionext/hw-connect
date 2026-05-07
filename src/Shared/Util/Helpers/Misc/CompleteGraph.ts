import type { ServerLanguages } from "@Shared/Util/Errors/Dictionary/schema";
import { logger } from "@Shared/Util/Logger";
import type dayjs from "dayjs";

type GraphItem = { date: dayjs.Dayjs };

type TimeUnit = "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";

type ICompleteGraph<T extends GraphItem> = {
	startDate: dayjs.Dayjs;
	endDate: dayjs.Dayjs;
	graph: T[];
	defaultData: Omit<T, "date">;
	lng: ServerLanguages;
};

// const mappedMonth: Record<number, { [K in ServerLanguages]: string }> = {
// 	0: {
// 		PT_BR: "Jan",
// 		EN_US: "Jan",
// 	},
// 	1: {
// 		PT_BR: "Fev",
// 		EN_US: "Feb",
// 	},
// 	2: {
// 		PT_BR: "Mar",
// 		EN_US: "Mar",
// 	},
// 	3: {
// 		PT_BR: "Abr",
// 		EN_US: "Apr",
// 	},
// 	4: {
// 		PT_BR: "Mai",
// 		EN_US: "May",
// 	},
// 	5: {
// 		PT_BR: "Jun",
// 		EN_US: "Jun",
// 	},
// 	6: {
// 		PT_BR: "Jul",
// 		EN_US: "Jul",
// 	},
// 	7: {
// 		PT_BR: "Ago",
// 		EN_US: "Aug",
// 	},
// 	8: {
// 		PT_BR: "Set",
// 		EN_US: "Sep",
// 	},
// 	9: {
// 		PT_BR: "Out",
// 		EN_US: "Oct",
// 	},
// 	10: {
// 		PT_BR: "Nov",
// 		EN_US: "Nov",
// 	},
// 	11: {
// 		PT_BR: "Dez",
// 		EN_US: "Dec",
// 	},
// };

const mappedWeek: Record<ServerLanguages, string> = {
	PT_BR: "Sem",
	EN_US: "Wk",
};

interface IFormatDate {
	date: dayjs.Dayjs;
	TIME_UNIT: TimeUnit;
	endDate: dayjs.Dayjs;
	lng: ServerLanguages;
}

const formatDate = ({ date, TIME_UNIT, endDate, lng }: IFormatDate) => {
	switch (TIME_UNIT) {
		case "HOUR": {
			return {
				date: date.format("HH:00"),
				min: date,
				max: date.add(1, "hour"),
				newCurrentDate: date.add(1, "hour"),
			};
		}

		case "DAY": {
			return {
				date: date.format("MM/DD"),
				min: date,
				max: date.add(1, "day").subtract(1, "millisecond"),
				newCurrentDate: date.add(1, "day"),
			};
		}

		case "WEEK": {
			const firstDayOfWeek = date.startOf("week");

			const lastDayOfWeek = firstDayOfWeek.add(1, "week");

			return {
				date: `${mappedWeek[lng]} ${firstDayOfWeek.format("MM/DD")}`,
				min: firstDayOfWeek,
				max: lastDayOfWeek,
				newCurrentDate: lastDayOfWeek.add(1, "millisecond"),
			};
		}

		case "MONTH": {
			const firstDayOfMonth = date.startOf("month");

			const lastDayOfMonth = firstDayOfMonth.endOf("month");

			return {
				date: `${firstDayOfMonth.format("YYYY/MM")}`,
				min: firstDayOfMonth,
				max: lastDayOfMonth,
				newCurrentDate: lastDayOfMonth.add(1, "millisecond"),
			};
		}

		case "YEAR": {
			const firstDayOfYear = date.startOf("year");

			const lastDayOfYear = firstDayOfYear.endOf("year");

			return {
				date: `${firstDayOfYear.format("YYYY")}`,
				min: firstDayOfYear,
				max: lastDayOfYear,
				newCurrentDate: lastDayOfYear.add(1, "millisecond"),
			};
		}
	}
};

export const CompleteGraph = <T extends GraphItem>({ startDate, endDate, graph, defaultData, lng }: ICompleteGraph<T>) => {
	let TIME_UNIT: TimeUnit = "DAY";
	const range = endDate.diff(startDate, "day");

	if (range === 0) {
		TIME_UNIT = "HOUR";
	} else if (range <= 31) {
		TIME_UNIT = "DAY";
	} else if (range <= 90) {
		TIME_UNIT = "WEEK";
	} else if (range <= 730) {
		TIME_UNIT = "MONTH";
	} else {
		TIME_UNIT = "YEAR";
	}

	// deixei a variável com __ para nao conflitar com nenhum campo do defaultData
	const refinedGraph: ({ date: string; __startAt: dayjs.Dayjs; __endAt: dayjs.Dayjs } & typeof defaultData)[] = [];

	let CURRENT_DATE = startDate;

	while (CURRENT_DATE <= endDate) {
		const { date: formattedDate, min, max, newCurrentDate } = formatDate({ date: CURRENT_DATE, TIME_UNIT, endDate, lng });

		refinedGraph.push({ date: formattedDate, __startAt: min, __endAt: max, ...defaultData });

		CURRENT_DATE = newCurrentDate;
	}

	for (const item of graph) {
		const itemDate = item.date;

		if (!itemDate.isValid()) {
			logger.warn(`Data inválida encontrada: ${item.date}`);
			continue;
		}

		const matchingRange = refinedGraph.findIndex(
			(rangeItem) =>
				(itemDate.isSame(rangeItem.__startAt) || itemDate.isAfter(rangeItem.__startAt)) &&
				(itemDate.isSame(rangeItem.__endAt) || itemDate.isBefore(rangeItem.__endAt)),
		);

		if (matchingRange >= 0) {
			const rangeItem = refinedGraph[matchingRange];

			for (const [key, value] of Object.entries(item)) {
				if (key !== "date" && key in defaultData && typeof value === "number") {
					const currentValue = (rangeItem as Record<string, unknown>)[key];
					if (typeof currentValue === "number") {
						(rangeItem as Record<string, unknown>)[key] = currentValue + value;
					}
				}
			}
		}
	}

	const resultGraph = refinedGraph.map((item) => {
		const { __startAt, __endAt, ...rest } = item;
		return {
			...rest,
		} as unknown as { [K in keyof typeof defaultData]: (typeof defaultData)[K] } & { date: string };
	});

	return resultGraph;
};
