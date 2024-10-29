drop policy "Enable select for authenticated users only" on "public"."memberships";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_current_account_id()
 RETURNS bigint
 LANGUAGE plpgsql
AS $function$
DECLARE
    current_account_id bigint;
BEGIN
    SELECT a.id INTO current_account_id
    FROM accounts a
    WHERE a.user_id = auth.uid();

    RETURN current_account_id;
END; $function$
;

CREATE OR REPLACE FUNCTION public.get_orgs_for_account(account_id bigint)
 RETURNS SETOF bigint
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT owner_id from memberships where account_id = $1
$function$
;

create policy "Select all memberships of all organisaitons the account is part"
on "public"."memberships"
as permissive
for select
to public
using ((owner_id IN ( SELECT get_orgs_for_account(get_current_account_id()) AS get_orgs_for_account)));



