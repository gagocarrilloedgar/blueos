set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_current_account_id()
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    current_account_id BIGINT;
BEGIN
    SELECT a.id INTO current_account_id
    FROM accounts a
    WHERE a.user_id = auth.uid();

    RETURN current_account_id;
END; 
$function$
;


