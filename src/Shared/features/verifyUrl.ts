interface IVerifyUrl {
	url: string;
}

/**
 * @description should return if url is valid
 * @param url: https://example.com -> valid
 * @returns if url is valid return true else false
 */

export function VerifyUrl({ url }: IVerifyUrl): boolean {
	const regex = /^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}([a-zA-Z0-9.\-_~:@?#[\]$&'()*+,;=!]*)?$/;
	const isValid = regex.test(url);

	return isValid;
}
