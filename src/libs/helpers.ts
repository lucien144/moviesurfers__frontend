export function permalink (categories: [], slug: string) {
	const segment = categories.find(category => ['recenze', 'trailer', 'hry', 'kultovky'].includes(category.slug))?.slug;
	if (segment) {
		return `/${segment}/${slug}/`;
	}
	return `/${slug}/`;
}
