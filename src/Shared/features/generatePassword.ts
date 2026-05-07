interface IHandleGeneratePassword {
	limit: number;
}

/**
 * @description generate a new password with size defined by limit param
 * @param limit: 8 -> akl12mnA
 * @returns returns a new password
 */
export const handleGeneratePassword = ({ limit }: IHandleGeneratePassword) => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let password = "";

	for (let i = 0; i < limit; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		password += characters[randomIndex];
	}

	return password;
};
