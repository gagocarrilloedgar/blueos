drop policy "Only assigned account can query" on "public"."team_assignments";

drop policy "Team assignment insert policy" on "public"."team_assignments";

drop policy "Enable insert for authenticated users only" on "public"."teams";

drop policy "Enable read access for all authenticated users" on "public"."teams";

drop policy "Only people inside the team can create" on "public"."projects";

drop policy "Only teams associated teams can access" on "public"."projects";

revoke delete on table "public"."client_portal_assignments" from "anon";

revoke insert on table "public"."client_portal_assignments" from "anon";

revoke references on table "public"."client_portal_assignments" from "anon";

revoke select on table "public"."client_portal_assignments" from "anon";

revoke trigger on table "public"."client_portal_assignments" from "anon";

revoke truncate on table "public"."client_portal_assignments" from "anon";

revoke update on table "public"."client_portal_assignments" from "anon";

revoke delete on table "public"."client_portal_assignments" from "authenticated";

revoke insert on table "public"."client_portal_assignments" from "authenticated";

revoke references on table "public"."client_portal_assignments" from "authenticated";

revoke select on table "public"."client_portal_assignments" from "authenticated";

revoke trigger on table "public"."client_portal_assignments" from "authenticated";

revoke truncate on table "public"."client_portal_assignments" from "authenticated";

revoke update on table "public"."client_portal_assignments" from "authenticated";

revoke delete on table "public"."client_portal_assignments" from "service_role";

revoke insert on table "public"."client_portal_assignments" from "service_role";

revoke references on table "public"."client_portal_assignments" from "service_role";

revoke select on table "public"."client_portal_assignments" from "service_role";

revoke trigger on table "public"."client_portal_assignments" from "service_role";

revoke truncate on table "public"."client_portal_assignments" from "service_role";

revoke update on table "public"."client_portal_assignments" from "service_role";

revoke delete on table "public"."client_portals" from "anon";

revoke insert on table "public"."client_portals" from "anon";

revoke references on table "public"."client_portals" from "anon";

revoke select on table "public"."client_portals" from "anon";

revoke trigger on table "public"."client_portals" from "anon";

revoke truncate on table "public"."client_portals" from "anon";

revoke update on table "public"."client_portals" from "anon";

revoke delete on table "public"."client_portals" from "authenticated";

revoke insert on table "public"."client_portals" from "authenticated";

revoke references on table "public"."client_portals" from "authenticated";

revoke select on table "public"."client_portals" from "authenticated";

revoke trigger on table "public"."client_portals" from "authenticated";

revoke truncate on table "public"."client_portals" from "authenticated";

revoke update on table "public"."client_portals" from "authenticated";

revoke delete on table "public"."client_portals" from "service_role";

revoke insert on table "public"."client_portals" from "service_role";

revoke references on table "public"."client_portals" from "service_role";

revoke select on table "public"."client_portals" from "service_role";

revoke trigger on table "public"."client_portals" from "service_role";

revoke truncate on table "public"."client_portals" from "service_role";

revoke update on table "public"."client_portals" from "service_role";

revoke delete on table "public"."team_assignments" from "anon";

revoke insert on table "public"."team_assignments" from "anon";

revoke references on table "public"."team_assignments" from "anon";

revoke select on table "public"."team_assignments" from "anon";

revoke trigger on table "public"."team_assignments" from "anon";

revoke truncate on table "public"."team_assignments" from "anon";

revoke update on table "public"."team_assignments" from "anon";

revoke delete on table "public"."team_assignments" from "authenticated";

revoke insert on table "public"."team_assignments" from "authenticated";

revoke references on table "public"."team_assignments" from "authenticated";

revoke select on table "public"."team_assignments" from "authenticated";

revoke trigger on table "public"."team_assignments" from "authenticated";

revoke truncate on table "public"."team_assignments" from "authenticated";

revoke update on table "public"."team_assignments" from "authenticated";

revoke delete on table "public"."team_assignments" from "service_role";

revoke insert on table "public"."team_assignments" from "service_role";

revoke references on table "public"."team_assignments" from "service_role";

revoke select on table "public"."team_assignments" from "service_role";

revoke trigger on table "public"."team_assignments" from "service_role";

revoke truncate on table "public"."team_assignments" from "service_role";

revoke update on table "public"."team_assignments" from "service_role";

revoke delete on table "public"."teams" from "anon";

revoke insert on table "public"."teams" from "anon";

revoke references on table "public"."teams" from "anon";

revoke select on table "public"."teams" from "anon";

revoke trigger on table "public"."teams" from "anon";

revoke truncate on table "public"."teams" from "anon";

revoke update on table "public"."teams" from "anon";

revoke delete on table "public"."teams" from "authenticated";

revoke insert on table "public"."teams" from "authenticated";

revoke references on table "public"."teams" from "authenticated";

revoke select on table "public"."teams" from "authenticated";

revoke trigger on table "public"."teams" from "authenticated";

revoke truncate on table "public"."teams" from "authenticated";

revoke update on table "public"."teams" from "authenticated";

revoke delete on table "public"."teams" from "service_role";

revoke insert on table "public"."teams" from "service_role";

revoke references on table "public"."teams" from "service_role";

revoke select on table "public"."teams" from "service_role";

revoke trigger on table "public"."teams" from "service_role";

revoke truncate on table "public"."teams" from "service_role";

revoke update on table "public"."teams" from "service_role";

alter table "public"."channels" drop constraint "channels_team_id_fkey";

alter table "public"."client_portal_assignments" drop constraint "client_portal_assignments_account_id_fkey";

alter table "public"."client_portal_assignments" drop constraint "client_portal_assignments_client_portal_id_fkey";

alter table "public"."client_portals" drop constraint "client_portals_team_id_fkey";

alter table "public"."clients" drop constraint "clients_team_id_fkey";

alter table "public"."projects" drop constraint "projects_team_id_fkey";

alter table "public"."team_assignments" drop constraint "team_assignments_account_id_fkey";

alter table "public"."team_assignments" drop constraint "team_assignments_team_id_fkey";

alter table "public"."client_portal_assignments" drop constraint "client_portal_assignments_pkey";

alter table "public"."client_portals" drop constraint "client_portals_pkey";

alter table "public"."team_assignments" drop constraint "team_assignments_pkey";

alter table "public"."teams" drop constraint "teams_pkey";

drop index if exists "public"."client_portal_assignments_pkey";

drop index if exists "public"."client_portals_pkey";

drop index if exists "public"."team_assignments_pkey";

drop index if exists "public"."teams_pkey";

drop table "public"."client_portal_assignments";

drop table "public"."client_portals";

drop table "public"."team_assignments";

drop table "public"."teams";

create table "public"."memberships" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "account_id" bigint not null,
    "owner_id" bigint not null,
    "type" text not null default ''::text
);


alter table "public"."memberships" enable row level security;

create table "public"."organisations" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "size" smallint default '1'::smallint
);


alter table "public"."organisations" enable row level security;

create table "public"."portals" (
    "id" bigint generated by default as identity not null,
    "name" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "organisation_id" bigint not null
);


alter table "public"."portals" enable row level security;

alter table "public"."channels" drop column "team_id";

alter table "public"."channels" add column "organisation_id" bigint not null;

alter table "public"."clients" drop column "client_portal_id";

alter table "public"."clients" drop column "team_id";

alter table "public"."clients" add column "organisation_id" bigint not null;

alter table "public"."clients" add column "portal_id" bigint;

alter table "public"."messages" add column "client_id" bigint;

alter table "public"."messages" add column "organisation_id" bigint not null;

alter table "public"."projects" drop column "team_id";

alter table "public"."projects" add column "organisation_id" bigint not null;

alter table "public"."task_assignments" add column "client_id" bigint;

alter table "public"."task_assignments" add column "organisation_id" bigint not null;

CREATE UNIQUE INDEX client_portals_pkey ON public.portals USING btree (id);

CREATE UNIQUE INDEX team_assignments_pkey ON public.memberships USING btree (id);

CREATE UNIQUE INDEX teams_pkey ON public.organisations USING btree (id);

alter table "public"."memberships" add constraint "team_assignments_pkey" PRIMARY KEY using index "team_assignments_pkey";

alter table "public"."organisations" add constraint "teams_pkey" PRIMARY KEY using index "teams_pkey";

alter table "public"."portals" add constraint "client_portals_pkey" PRIMARY KEY using index "client_portals_pkey";

alter table "public"."channels" add constraint "channels_organisation_id_fkey" FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."channels" validate constraint "channels_organisation_id_fkey";

alter table "public"."clients" add constraint "clients_organisation_id_fkey" FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."clients" validate constraint "clients_organisation_id_fkey";

alter table "public"."clients" add constraint "clients_portal_id_fkey" FOREIGN KEY (portal_id) REFERENCES portals(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."clients" validate constraint "clients_portal_id_fkey";

alter table "public"."memberships" add constraint "team_assignments_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE not valid;

alter table "public"."memberships" validate constraint "team_assignments_account_id_fkey";

alter table "public"."messages" add constraint "messages_client_id_fkey" FOREIGN KEY (client_id) REFERENCES clients(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."messages" validate constraint "messages_client_id_fkey";

alter table "public"."messages" add constraint "messages_organisation_id_fkey" FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "messages_organisation_id_fkey";

alter table "public"."portals" add constraint "portals_organisation_id_fkey" FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."portals" validate constraint "portals_organisation_id_fkey";

alter table "public"."projects" add constraint "projects_organisation_id_fkey" FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects" validate constraint "projects_organisation_id_fkey";

alter table "public"."task_assignments" add constraint "task_assignments_client_id_fkey" FOREIGN KEY (client_id) REFERENCES clients(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."task_assignments" validate constraint "task_assignments_client_id_fkey";

alter table "public"."task_assignments" add constraint "task_assignments_organisation_id_fkey" FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."task_assignments" validate constraint "task_assignments_organisation_id_fkey";

alter table "public"."tasks" add constraint "tasks_client_id_fkey" FOREIGN KEY (client_id) REFERENCES clients(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "tasks_client_id_fkey";

alter table "public"."tasks" add constraint "tasks_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "tasks_project_id_fkey";

alter table "public"."tasks" add constraint "tasks_team_id_fkey" FOREIGN KEY (team_id) REFERENCES organisations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "tasks_team_id_fkey";

grant delete on table "public"."memberships" to "anon";

grant insert on table "public"."memberships" to "anon";

grant references on table "public"."memberships" to "anon";

grant select on table "public"."memberships" to "anon";

grant trigger on table "public"."memberships" to "anon";

grant truncate on table "public"."memberships" to "anon";

grant update on table "public"."memberships" to "anon";

grant delete on table "public"."memberships" to "authenticated";

grant insert on table "public"."memberships" to "authenticated";

grant references on table "public"."memberships" to "authenticated";

grant select on table "public"."memberships" to "authenticated";

grant trigger on table "public"."memberships" to "authenticated";

grant truncate on table "public"."memberships" to "authenticated";

grant update on table "public"."memberships" to "authenticated";

grant delete on table "public"."memberships" to "service_role";

grant insert on table "public"."memberships" to "service_role";

grant references on table "public"."memberships" to "service_role";

grant select on table "public"."memberships" to "service_role";

grant trigger on table "public"."memberships" to "service_role";

grant truncate on table "public"."memberships" to "service_role";

grant update on table "public"."memberships" to "service_role";

grant delete on table "public"."organisations" to "anon";

grant insert on table "public"."organisations" to "anon";

grant references on table "public"."organisations" to "anon";

grant select on table "public"."organisations" to "anon";

grant trigger on table "public"."organisations" to "anon";

grant truncate on table "public"."organisations" to "anon";

grant update on table "public"."organisations" to "anon";

grant delete on table "public"."organisations" to "authenticated";

grant insert on table "public"."organisations" to "authenticated";

grant references on table "public"."organisations" to "authenticated";

grant select on table "public"."organisations" to "authenticated";

grant trigger on table "public"."organisations" to "authenticated";

grant truncate on table "public"."organisations" to "authenticated";

grant update on table "public"."organisations" to "authenticated";

grant delete on table "public"."organisations" to "service_role";

grant insert on table "public"."organisations" to "service_role";

grant references on table "public"."organisations" to "service_role";

grant select on table "public"."organisations" to "service_role";

grant trigger on table "public"."organisations" to "service_role";

grant truncate on table "public"."organisations" to "service_role";

grant update on table "public"."organisations" to "service_role";

grant delete on table "public"."portals" to "anon";

grant insert on table "public"."portals" to "anon";

grant references on table "public"."portals" to "anon";

grant select on table "public"."portals" to "anon";

grant trigger on table "public"."portals" to "anon";

grant truncate on table "public"."portals" to "anon";

grant update on table "public"."portals" to "anon";

grant delete on table "public"."portals" to "authenticated";

grant insert on table "public"."portals" to "authenticated";

grant references on table "public"."portals" to "authenticated";

grant select on table "public"."portals" to "authenticated";

grant trigger on table "public"."portals" to "authenticated";

grant truncate on table "public"."portals" to "authenticated";

grant update on table "public"."portals" to "authenticated";

grant delete on table "public"."portals" to "service_role";

grant insert on table "public"."portals" to "service_role";

grant references on table "public"."portals" to "service_role";

grant select on table "public"."portals" to "service_role";

grant trigger on table "public"."portals" to "service_role";

grant truncate on table "public"."portals" to "service_role";

grant update on table "public"."portals" to "service_role";

create policy "Only assigned account can query"
on "public"."memberships"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM accounts
  WHERE ((accounts.id = memberships.account_id) AND (accounts.user_id = auth.uid())))));


create policy "Team assignment insert policy"
on "public"."memberships"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM accounts
  WHERE ((accounts.id = memberships.account_id) AND (accounts.user_id = auth.uid())))));


create policy "Enable insert for authenticated users only"
on "public"."organisations"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all authenticated users"
on "public"."organisations"
as permissive
for select
to authenticated
using (true);


create policy "Only people inside the team can create"
on "public"."projects"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM (memberships ta
     JOIN accounts a ON ((ta.account_id = a.id)))
  WHERE ((ta.owner_id = projects.organisation_id) AND (a.user_id = auth.uid())))));


create policy "Only teams associated teams can access"
on "public"."projects"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (memberships ta
     JOIN accounts a ON ((ta.account_id = a.id)))
  WHERE ((ta.owner_id = projects.organisation_id) AND (a.user_id = auth.uid())))));



