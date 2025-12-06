CREATE TABLE "acciones" (
	"pokemon_id" integer NOT NULL,
	"user_id" uuid NOT NULL,
	"like_foto" boolean DEFAULT false,
	"creado_en" timestamp DEFAULT now(),
	"actualizado_en" timestamp,
	CONSTRAINT "acciones_pokemon_id_user_id_pk" PRIMARY KEY("pokemon_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id_user" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_email" varchar(255) NOT NULL,
	"user_password" varchar(255) NOT NULL,
	"user_name" varchar(100) NOT NULL,
	CONSTRAINT "usuarios_user_email_unique" UNIQUE("user_email")
);
--> statement-breakpoint
ALTER TABLE "acciones" ADD CONSTRAINT "acciones_user_id_usuarios_id_user_fk" FOREIGN KEY ("user_id") REFERENCES "public"."usuarios"("id_user") ON DELETE no action ON UPDATE no action;