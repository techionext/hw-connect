import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const DateEndTransform = (date: Date) => {
	const newDate = dayjs(date).endOf("day").toDate();
	return newDate;
};
