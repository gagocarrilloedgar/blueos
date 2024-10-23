CREATE TABLE IF NOT EXISTS "public"."projects" (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name TEXT NOT NULL,
    team_id BIGINT NOT NULL,
    client_id BIGINT NOT NULL,
    worked_hours FLOAT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
