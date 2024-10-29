set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_organisations(account_id integer)
 RETURNS TABLE(id integer, name text)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT o.id, o.name
  FROM memberships m
  JOIN organisations o ON m.owner_id = o.id
  WHERE m.account_id = account_id AND m.type = 'organisation';
END;
$function$
;


