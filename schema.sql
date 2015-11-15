CREATE TABLE organizations (
  id                serial PRIMARY KEY,
  domain            varchar(256) NOT NULL UNIQUE,
  name              varchar(64) NOT NULL,
  description       text
);

CREATE TABLE tags (
  id                serial PRIMARY KEY,
  name              varchar(32) NOT NULL,
  description       text,
  organization_id   integer NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  UNIQUE (name, organization_id)
);

CREATE TABLE users (
  id                serial PRIMARY KEY,
  email             varchar(256) NOT NULL UNIQUE,
  organization_id   integer NOT NULL REFERENCES organizations (id) ON DELETE CASCADE
);

CREATE TABLE tags_users (
  tag_id            integer REFERENCES tags (id) ON DELETE CASCADE,
  user_id           integer REFERENCES users (id) ON DELETE CASCADE,
  PRIMARY KEY (tag_id, user_id)
);
