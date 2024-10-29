drop function if exists "public"."get_organisations"(accountid integer);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_organisations(accountid bigint)
 RETURNS TABLE(id bigint, name text)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT o.id, o.name
  FROM memberships m
  JOIN organisations o ON m.owner_id = o.id
  WHERE m.account_id = accountId AND m.type = 'organisation';
END;
$function$
;


