CREATE TABLE organizations (
  organization_id   serial PRIMARY KEY,
  domain            varchar(256) NOT NULL UNIQUE,
  name              varchar(64) NOT NULL
);

CREATE TABLE tags (
  tag_id            serial PRIMARY KEY,
  name              varchar(64) NOT NULL
);

CREATE TABLE emails (
  email_id          serial PRIMARY KEY,
  email             varchar(256) NOT NULL UNIQUE
);

CREATE TABLE organizations_tags (
  organization_id   integer REFERENCES organizations ON DELETE CASCADE,
  tag_id            integer REFERENCES tags ON DELETE CASCADE,
  PRIMARY KEY (organization_id, tag_id)
);

CREATE TABLE organizations_emails (
  organization_id   integer REFERENCES organizations ON DELETE CASCADE,
  email_id          integer REFERENCES emails ON DELETE CASCADE,
  PRIMARY KEY (organization_id, email_id)
);

CREATE TABLE tags_emails (
  tag_id            integer REFERENCES tags ON DELETE CASCADE,
  email_id          integer REFERENCES emails ON DELETE CASCADE,
  PRIMARY KEY (tag_id, email_id)
);
