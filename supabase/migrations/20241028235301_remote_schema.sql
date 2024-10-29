drop policy "Enable select for authenticated users only" on "public"."organisations";

create policy "Only members can read"
on "public"."organisations"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM memberships m
  WHERE ((m.owner_id = organisations.id) AND (m.type = 'organisation'::text)))));



