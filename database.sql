DROP TABLE "user";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "bio" VARCHAR DEFAULT 'about me...',
    "avatar" VARCHAR DEFAULT 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/empty-avatar.jpg'
);

DROP TABLE "prompt";

CREATE TABLE "prompt" (
	"id" SERIAL PRIMARY KEY,
	"prompt" VARCHAR NOT NULL
);

DROP TABLE "image";

CREATE TABLE "image" (
	"id" SERIAL PRIMARY KEY,
	"image_url" VARCHAR,
	"likes" INT DEFAULT 0,
	"caption" VARCHAR,
	"user_id" INT REFERENCES "user"
);

DROP TABLE "comment";

CREATE TABLE "comment" (
	"id" SERIAL PRIMARY KEY,
	"comment" VARCHAR,
	"image_id" INT REFERENCES "image",
	"user_id" INT REFERENCES "user"
);

DROP TABLE "like";

CREATE TABLE "like" (
	"id" SERIAL PRIMARY KEY,
	"liked" BOOLEAN DEFAULT false,
	"image_id" INT REFERENCES "image",
	"user_id" INT REFERENCES "user"
);

DROP TABLE "following";

CREATE TABLE "following" (
	"id" SERIAL PRIMARY KEY,
	"connection_id" INT REFERENCES "user",
	"user_id" INT REFERENCES "user"
);