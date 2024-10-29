drop policy "Only members can read" on "public"."organisations";

create policy "Enable select for authenticated users only"
on "public"."organisations"
as permissive
for select
to authenticated
using (true);



