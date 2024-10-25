alter table "public"."projects" add column "description" text;

create policy "Only people inside the team can create"
on "public"."projects"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM (team_assignments ta
     JOIN accounts a ON ((ta.account_id = a.id)))
  WHERE ((ta.team_id = projects.team_id) AND (a.user_id = auth.uid())))));


create policy "Only teams associated teams can access"
on "public"."projects"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (team_assignments ta
     JOIN accounts a ON ((ta.account_id = a.id)))
  WHERE ((ta.team_id = projects.team_id) AND (a.user_id = auth.uid())))));



