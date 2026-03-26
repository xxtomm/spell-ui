CREATE TABLE `sponsors` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`tier_id` text NOT NULL,
	`whop_payment_id` text NOT NULL,
	`amount` integer NOT NULL,
	`currency` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sponsors_whop_payment_id_unique` ON `sponsors` (`whop_payment_id`);--> statement-breakpoint
CREATE INDEX `sponsors_userId_idx` ON `sponsors` (`user_id`);--> statement-breakpoint
CREATE INDEX `sponsors_whopPaymentId_idx` ON `sponsors` (`whop_payment_id`);