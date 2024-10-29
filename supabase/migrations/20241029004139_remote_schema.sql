drop policy "Only assigned account can query" on "public"."memberships";

create policy "Only assigned account can query"
on "public"."memberships"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (memberships m
     JOIN accounts a ON ((m.account_id = a.id)))
  WHERE ((a.user_id = auth.uid()) AND (m.owner_id = memberships.owner_id)))));



