// Supported currencies for coffee donations
export type Currency = "CNY" | "JPY" | "USD";

// Coffee (donation) entity type
export interface Coffee {
	coffee_id: number;
	user_id: number;
	payment_method: string;
	amount: number;
	currency: Currency;
	status: string;
	message?: string;
	created_at: string;
}

// Create type
export type CreateCoffee = Omit<Coffee, "coffee_id" | "created_at">;

// Update type
export type UpdateCoffee = Partial<Omit<Coffee, "coffee_id">>;
