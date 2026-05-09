// Media entity type
export interface Media {
	media_id: number;
	media_uuid: string;
	media_type: string;
	file_name: string;
	original_filepath_url: string;
	thumbnail_filepath_url?: string;
	watermark_filepath_url?: string;
	file_size: number;
	created_at: string;
}

// Create type
export type CreateMedia = Omit<Media, "media_id" | "created_at">;

// Update type
export type UpdateMedia = Partial<Omit<Media, "media_id">>;
