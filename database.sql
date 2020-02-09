DROP TABLE "user";
DROP TABLE "prompt";
DROP TABLE "image";
DROP TABLE "comment";
DROP TABLE "like";
DROP TABLE "following";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "bio" VARCHAR DEFAULT 'about me...',
    "avatar" VARCHAR DEFAULT 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/empty-avatar.jpg'
);

CREATE TABLE "prompt" (
	"id" SERIAL PRIMARY KEY,
	"prompt" VARCHAR NOT NULL
);

CREATE TABLE "image" (
	"id" SERIAL PRIMARY KEY,
	"image_url" VARCHAR,
	"likes" INT DEFAULT 0,
	"caption" VARCHAR,
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "comment" (
	"id" SERIAL PRIMARY KEY,
	"comment" VARCHAR,
	"image_id" INT REFERENCES "image",
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "like" (
	"id" SERIAL PRIMARY KEY,
	"liked" BOOLEAN DEFAULT false,
	"image_id" INT REFERENCES "image",
	"user_id" INT REFERENCES "user"
);


CREATE TABLE "following" (
	"id" SERIAL PRIMARY KEY,
	"connection_id" INT REFERENCES "user",
	"user_id" INT REFERENCES "user"
);

INSERT INTO prompt (prompt) VALUES ('Unique Tree'), ('Cloud Creature'), ('Red Structure'), ('Beauty'), ('Resilient Flower');