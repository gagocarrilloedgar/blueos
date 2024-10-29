set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_orgs_for_account(account_id bigint)
 RETURNS SETOF bigint
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$SELECT owner_id from memberships where account_id = $1$function$
;


