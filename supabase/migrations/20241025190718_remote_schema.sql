alter table "public"."projects" add constraint "projects_client_id_fkey" FOREIGN KEY (client_id) REFERENCES clients(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."projects" validate constraint "projects_client_id_fkey";

alter table "public"."projects" add constraint "projects_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects" validate constraint "projects_team_id_fkey";


