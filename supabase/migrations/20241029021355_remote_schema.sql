drop policy "Enable users to view their own data only" on "public"."accounts";

create policy "Enable users to view their own data only"
on "public"."accounts"
as permissive
for select
to authenticated
using ((id IN ( SELECT memberships.account_id
   FROM memberships)));



