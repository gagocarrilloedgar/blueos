create policy "Only members can read"
on "public"."organisations"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM memberships m
  WHERE ((m.owner_id = organisations.id) AND (m.type = 'organization'::text)))));



