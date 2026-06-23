CREATE TABLE IF NOT EXISTS `token` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `user` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL
);
