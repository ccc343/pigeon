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

# add_tag_to_organization(tag_name, org_name)
INSERT INTO tags (name)
VALUES (tag_name);

INSERT INTO organizations_tags (organization_id, tag_id)
VALUES ((SELECT organization_id FROM organizations WHERE name=org_name),
		(SELECT tag_id FROM tags WHERE name=tag_name));

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
SELECT emails.email
FROM emails
INNER JOIN tags_emails ON emails.email_id=tags_emails.email_id
INNER JOIN tags ON tags_emails.tag_id=tags.tag_id
INNER JOIN organizations_tags ON organizations_tags.tag_id=tags.tag_id
INNER JOIN organizations ON organizations_tags.organization_id=organizations.organization_id
WHERE organizations.domain='princeton.edu'
AND tags.name='2016';

# get_num_users_of_tag(tag_id)
SELECT COUNT(*) 
FROM tags_emails 
WHERE tag_id = tag_id;
