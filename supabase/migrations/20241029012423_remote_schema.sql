drop policy "Membership insert policy" on "public"."memberships";

drop policy "Enable select for authenticated users only" on "public"."memberships";

create policy "Enable insert for authenticated users only"
on "public"."memberships"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable select for authenticated users only"
on "public"."memberships"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
  WHERE (memberships.owner_id IN ( SELECT memberships_1.owner_id
           FROM memberships memberships_1
          WHERE (memberships_1.account_id = ( SELECT accounts.id
                   FROM accounts
                  WHERE (accounts.user_id = auth.uid()))))))));



