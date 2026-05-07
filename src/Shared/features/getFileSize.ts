export const getFileSize = (bytes: number) => {
	const k = 1024;
	const dm = 2;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	const result = `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
	return result;
};
