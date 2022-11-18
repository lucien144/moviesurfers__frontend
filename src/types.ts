export interface MovieCategory {
	id: number;
	title: string;
	slug: string;
}

export interface AcfMovie {
	rating: number;
	youtube_id?: number;
}

export interface Movie {
	slug: string;
	acf: AcfMovie;
	name: string;
	description?: string;
	excerpt?: string;
	date: string;
	author: string;
	image: string;
	tags?: [];
	categories?: MovieCategory[];
}
