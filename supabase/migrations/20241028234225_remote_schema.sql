drop policy "Only members can read" on "public"."organisations";

create policy "Only members can read"
on "public"."organisations"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM (memberships m
     JOIN accounts a ON ((m.account_id = a.id)))
  WHERE ((m.owner_id = organisations.id) AND (m.type = 'organization'::text) AND (a.user_id = auth.uid())))));



