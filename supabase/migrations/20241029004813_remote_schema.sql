drop policy "Only assigned account can query" on "public"."memberships";

create policy "Enable select for authenticated users only"
on "public"."memberships"
as permissive
for select
to authenticated
using (true);



