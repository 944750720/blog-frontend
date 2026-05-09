// Section entity type (supports hierarchical structure via parent_id)
export interface Section {
	section_id: number;
	type: string;
	title: string;
	slug: string;
	description?: string;
	parent_id?: number;
	is_active: boolean;
	created_at: string;
	updated_at?: string;
}

// Create type
export type CreateSection = Omit<
	Section,
	"section_id" | "created_at" | "updated_at"
>;

// Update type
export type UpdateSection = Partial<Omit<Section, "section_id">>;
