import dayjs from "dayjs";

export const getDaysDiff = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
	const currentStart = dayjs(startDate);
	const currentEnd = dayjs(endDate);
	const daysDiff = currentEnd.diff(currentStart, "day");

	const previousEnd = currentStart.subtract(1, "day").endOf("day");
	const previousStart = previousEnd.subtract(daysDiff, "day").startOf("day");

	return {
		daysDiff,

		currentStart,
		currentEnd,

		previousStart,
		previousEnd,
	};
};
