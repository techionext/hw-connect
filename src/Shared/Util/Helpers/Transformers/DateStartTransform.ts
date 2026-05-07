import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const DateStartTransform = (date: Date) => {
	const newDate = dayjs(date).startOf("day").toDate();
	return newDate;
};
