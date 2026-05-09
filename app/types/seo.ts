// SEO entity type
export interface Seo {
	seo_id: number;
	title: string;
	description: string;
	keywords: string;
	created_at: string;
	updated_at?: string;
}

// Create type
export type CreateSeo = Omit<Seo, "seo_id" | "created_at" | "updated_at">;

// Update type
export type UpdateSeo = Partial<Omit<Seo, "seo_id">>;
