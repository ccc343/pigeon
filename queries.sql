## GENERAL USE

# add_organization(org_domain, org_name)
INSERT INTO organizations (domain, name)
VALUES (org_domain, org_name);

# add_user_to_organization(user_email, org_name)
INSERT INTO emails (email)
VALUES (user_email);

INSERT INTO organizations_emails (organization_id, email_id)
VALUES ((SELECT organization_id FROM organizations WHERE name=org_name),
		(SELECT email_id FROM emails WHERE email=user_email));

# add_tag_to_organization(tag_name, org_id)
with rows as (
INSERT INTO tags (name) VALUES (tag_name) RETURNING tag_id
)
INSERT INTO organizations_tags (organization_id, tag_id) 
VALUES (org_id, (SELECT tag_id FROM rows));

# remove_organization(org_name)
DELETE FROM organizations
WHERE name=org_name;

# remove_user_from_organization(user_email, org_name)
DELETE FROM organizations_emails
WHERE email_id=(SELECT email_id FROM emails WHERE email=user_email)
AND organization_id=(SELECT organization_id FROM organizations WHERE name=org_name);

# remove_tag_from_organization(tag_name, org_name)
DELETE FROM organizations_tags
WHERE tag_id=(SELECT tag_id FROM tags WHERE name=tag_name)
AND organization_id=(SELECT organization_id FROM organizations WHERE name=org_name);


## RECIPIENT-SIDE

# add_user_to_tag(tag_name, user_email)
INSERT INTO tags_emails (tag_id, email_id)
VALUES ((SELECT tag_id FROM tags WHERE name=tag_name),
		(SELECT email_id FROM emails WHERE email=user_email));

# remove_user_from_tag(tag_name, user_email)
DELETE FROM tags_emails
WHERE tag_id=(SELECT tag_id FROM tags WHERE name=tag_name)
AND email_id=(SELECT email_id FROM emails WHERE email=user_email);

## SENDER-SIDE

# get_all_users_of_tag(tag_id)
SELECT emails.email 
FROM tags_emails
INNER JOIN emails
ON tags_emails.email_id=emails.email_id
WHERE tag_id = tag_id;

# get_all_users_of_tag_org(tag_name, org_domain)
SELECT users.email
FROM users
INNER JOIN tags_users ON users.id=tags_users.user_id
INNER JOIN tags ON tags.id=tags_users.tag_id
WHERE tags.name=tag_name 
AND tags.organization_id=(SELECT id FROM organizations WHERE domain=org_domain);


# get_num_users_of_tag(tag_id)
SELECT COUNT(*) 
FROM tags_emails 
WHERE tag_id = tag_id;