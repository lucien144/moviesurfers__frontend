export const transformImage = (url: string, transform: string) => {
	try {
		const updated = url.replace(/^http(.*?)\/uploads\//, '');
		return `https://ik.imagekit.io/lucien144/${transform}/${updated}`;
	} catch (e) {
		return url;
	}
};
