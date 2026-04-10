-- Xero Seven: Enhanced Database Schema with Secure RLS Policies
-- Idempotent: Safe to run multiple times - all operations use IF NOT EXISTS where applicable
-- Run this after the basic schema in db_setup.sql

BEGIN;

-- Phase 1: Add authentication & team support
CREATE TABLE IF NOT EXISTS auth_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    auth_id UUID NOT NULL UNIQUE, -- Links to InsForge auth.users
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    company TEXT,
    role TEXT DEFAULT 'user', -- user, admin, agent
    team_id UUID,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    owner_id UUID NOT NULL REFERENCES auth_users(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member', -- member, manager, admin
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(team_id, user_id)
);

-- Add team references to existing tables (if not already added)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='agency_leads' AND column_name='team_id') THEN
    ALTER TABLE agency_leads ADD COLUMN team_id UUID REFERENCES teams(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='agency_leads' AND column_name='owner_id') THEN
    ALTER TABLE agency_leads ADD COLUMN owner_id UUID REFERENCES auth_users(id);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='agency_clients' AND column_name='team_id') THEN
    ALTER TABLE agency_clients ADD COLUMN team_id UUID REFERENCES teams(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='agency_clients' AND column_name='owner_id') THEN
    ALTER TABLE agency_clients ADD COLUMN owner_id UUID REFERENCES auth_users(id);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='agency_projects' AND column_name='team_id') THEN
    ALTER TABLE agency_projects ADD COLUMN team_id UUID REFERENCES teams(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='agency_projects' AND column_name='owner_id') THEN
    ALTER TABLE agency_projects ADD COLUMN owner_id UUID REFERENCES auth_users(id);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='agency_proposals' AND column_name='team_id') THEN
    ALTER TABLE agency_proposals ADD COLUMN team_id UUID REFERENCES teams(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='agency_proposals' AND column_name='owner_id') THEN
    ALTER TABLE agency_proposals ADD COLUMN owner_id UUID REFERENCES auth_users(id);
  END IF;
END $$;

-- Enable RLS for new tables
ALTER TABLE auth_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Enable RLS for existing tables (idempotent)
ALTER TABLE agency_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_code_improvements ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_outreach_campaigns ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES: Secure authentication & team-based access
-- ============================================================

-- auth_users: Users can only see their own profile
DROP POLICY IF EXISTS "users_see_own_profile" ON auth_users;
CREATE POLICY "users_see_own_profile" ON auth_users
  FOR SELECT USING (auth_id = auth.uid());

DROP POLICY IF EXISTS "users_update_own_profile" ON auth_users;
CREATE POLICY "users_update_own_profile" ON auth_users
  FOR UPDATE USING (auth_id = auth.uid());

-- teams: Only team members/owners can see the team
DROP POLICY IF EXISTS "team_members_see_team" ON teams;
CREATE POLICY "team_members_see_team" ON teams
  FOR SELECT USING (
    id IN (
      SELECT team_id FROM team_members tm
      WHERE tm.user_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
    )
    OR owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
  );

-- team_members: Only team members/owners can see membership
DROP POLICY IF EXISTS "team_members_see_members" ON team_members;
CREATE POLICY "team_members_see_members" ON team_members
  FOR SELECT USING (
    team_id IN (
      SELECT id FROM teams
      WHERE owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
        OR id IN (
          SELECT team_id FROM team_members tm
          WHERE tm.user_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
        )
    )
  );

-- ============================================================
-- RLS POLICIES: Dashboard Data Access (Leads, Clients, Projects)
-- ============================================================

-- agency_leads: Users see only their team's or personal leads
DROP POLICY IF EXISTS "users_see_team_leads" ON agency_leads;
CREATE POLICY "users_see_team_leads" ON agency_leads
  FOR SELECT USING (
    team_id IN (
      SELECT id FROM teams
      WHERE owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
        OR id IN (
          SELECT team_id FROM team_members tm
          WHERE tm.user_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
        )
    )
    OR owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
    OR (team_id IS NULL AND owner_id IS NULL) -- Allow public leads if no owner
  );

DROP POLICY IF EXISTS "users_insert_leads" ON agency_leads;
CREATE POLICY "users_insert_leads" ON agency_leads
  FOR INSERT WITH CHECK (
    owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
    OR owner_id IS NULL
  );

DROP POLICY IF EXISTS "users_update_own_leads" ON agency_leads;
CREATE POLICY "users_update_own_leads" ON agency_leads
  FOR UPDATE USING (
    owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
  );

DROP POLICY IF EXISTS "users_delete_own_leads" ON agency_leads;
CREATE POLICY "users_delete_own_leads" ON agency_leads
  FOR DELETE USING (
    owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
  );

-- agency_clients: Same pattern as leads
DROP POLICY IF EXISTS "users_see_team_clients" ON agency_clients;
CREATE POLICY "users_see_team_clients" ON agency_clients
  FOR SELECT USING (
    team_id IN (
      SELECT id FROM teams
      WHERE owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
        OR id IN (
          SELECT team_id FROM team_members tm
          WHERE tm.user_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
        )
    )
    OR owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
    OR (team_id IS NULL AND owner_id IS NULL)
  );

DROP POLICY IF EXISTS "users_insert_clients" ON agency_clients;
CREATE POLICY "users_insert_clients" ON agency_clients
  FOR INSERT WITH CHECK (
    owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
    OR owner_id IS NULL
  );

DROP POLICY IF EXISTS "users_update_own_clients" ON agency_clients;
CREATE POLICY "users_update_own_clients" ON agency_clients
  FOR UPDATE USING (owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1));

-- agency_projects: Same pattern
DROP POLICY IF EXISTS "users_see_team_projects" ON agency_projects;
CREATE POLICY "users_see_team_projects" ON agency_projects
  FOR SELECT USING (
    team_id IN (
      SELECT id FROM teams
      WHERE owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
        OR id IN (
          SELECT team_id FROM team_members tm
          WHERE tm.user_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
        )
    )
    OR owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
    OR (team_id IS NULL AND owner_id IS NULL)
  );

DROP POLICY IF EXISTS "users_insert_projects" ON agency_projects;
CREATE POLICY "users_insert_projects" ON agency_projects
  FOR INSERT WITH CHECK (
    owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
    OR owner_id IS NULL
  );

-- agency_proposals: Owner or team can see/edit
DROP POLICY IF EXISTS "users_see_proposals" ON agency_proposals;
CREATE POLICY "users_see_proposals" ON agency_proposals
  FOR SELECT USING (
    owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
    OR team_id IN (
      SELECT id FROM teams
      WHERE owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
        OR id IN (
          SELECT team_id FROM team_members tm
          WHERE tm.user_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
        )
    )
  );

DROP POLICY IF EXISTS "users_insert_proposals" ON agency_proposals;
CREATE POLICY "users_insert_proposals" ON agency_proposals
  FOR INSERT WITH CHECK (
    owner_id = (SELECT id FROM auth_users WHERE auth_id = auth.uid() LIMIT 1)
    OR owner_id IS NULL
  );

-- ============================================================
-- Public Access (NO RLS restriction for public tables)
-- ============================================================

-- agency_messages: Anyone can insert (contact form)
DROP POLICY IF EXISTS "public_insert_messages" ON agency_messages;
CREATE POLICY "public_insert_messages" ON agency_messages
  FOR INSERT WITH CHECK (true);

-- agency_testimonials: Anyone can read
DROP POLICY IF EXISTS "public_read_testimonials" ON agency_testimonials;
CREATE POLICY "public_read_testimonials" ON agency_testimonials
  FOR SELECT USING (true);

-- ============================================================
-- Indexes for Performance
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_auth_users_auth_id ON auth_users(auth_id);
CREATE INDEX IF NOT EXISTS idx_auth_users_team_id ON auth_users(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_agency_leads_team_id ON agency_leads(team_id);
CREATE INDEX IF NOT EXISTS idx_agency_leads_owner_id ON agency_leads(owner_id);
CREATE INDEX IF NOT EXISTS idx_agency_clients_team_id ON agency_clients(team_id);
CREATE INDEX IF NOT EXISTS idx_agency_clients_owner_id ON agency_clients(owner_id);
CREATE INDEX IF NOT EXISTS idx_agency_projects_team_id ON agency_projects(team_id);
CREATE INDEX IF NOT EXISTS idx_agency_projects_owner_id ON agency_projects(owner_id);
CREATE INDEX IF NOT EXISTS idx_agency_proposals_owner_id ON agency_proposals(owner_id);

-- ============================================================
-- Updated Timestamps (Triggers)
-- ============================================================

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS auth_users_update_timestamp ON auth_users;
CREATE TRIGGER auth_users_update_timestamp
  BEFORE UPDATE ON auth_users
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

COMMIT;
