drop policy "Team assignment insert policy" on "public"."memberships";

drop policy "Enable read access for all authenticated users" on "public"."organisations";

drop function if exists "public"."create_account_team_assignment"(account_name text, team_name text, user_id uuid, email text);

set check_function_bodies = off;

create type "public"."account_memberships_result" as ("account_id" bigint, "organisation_id" bigint);

CREATE OR REPLACE FUNCTION public.create_organisation_membership(account_name text, organisation_name text, user_id uuid, email text)
 RETURNS account_memberships_result
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    new_account_id BIGINT;
    new_organisation_id BIGINT;
BEGIN
    -- Create the account and include the email
    INSERT INTO public.accounts (name, user_id, email)
    VALUES (account_name, user_id, email)
    RETURNING id INTO new_account_id;

    -- Create the team
    INSERT INTO public.organisations (name)
    VALUES (organisation_name)
    RETURNING id INTO new_organisation_id;

    -- Create the membership
    INSERT INTO public.team_assignments (account_id, organisation_id, type)
    VALUES (new_account_id, new_organisation_id, 'organisation');

    -- Return the account_id and organisation_id
    RETURN (new_account_id, new_organisation_id);
END;
$function$
;

create policy "Membership insert policy"
on "public"."memberships"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM accounts
  WHERE ((accounts.id = memberships.account_id) AND (accounts.user_id = auth.uid())))));



