drop policy "Only assigned account can query" on "public"."memberships";

create policy "Only assigned account can query"
on "public"."memberships"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM accounts a
  WHERE ((a.user_id = auth.uid()) AND (memberships.owner_id IN ( SELECT memberships_1.owner_id
           FROM memberships memberships_1
          WHERE (memberships_1.account_id = a.id)))))));



