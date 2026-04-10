-- Xero Seven AI Agency Database Schema
-- Idempotent: Safe to run multiple times

CREATE TABLE IF NOT EXISTS agency_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    company TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agency_clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    company TEXT,
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agency_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    client_id UUID,
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agency_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agency_testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author TEXT,
    role TEXT,
    company TEXT,
    content TEXT,
    rating INT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for all tables
ALTER TABLE agency_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_testimonials ENABLE ROW LEVEL SECURITY;

-- Create public access policies (adjust as needed for security later)
CREATE POLICY "public_insert_messages" ON agency_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "public_read_testimonials" ON agency_testimonials FOR SELECT USING (true);

-- Phase 7: AI Agent Tables
CREATE TABLE IF NOT EXISTS agency_tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID,
    title TEXT,
    description TEXT,
    status TEXT,
    assigned_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agency_proposals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_name TEXT,
    lead_email TEXT,
    content TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agency_social_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    platform TEXT,
    content TEXT,
    status TEXT DEFAULT 'draft',
    scheduled_for TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Phase 8: Meta Agent 
CREATE TABLE IF NOT EXISTS agency_operations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    target_industry TEXT,
    service_idea TEXT,
    pricing_model TEXT,
    outbound_email TEXT,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Phase 9: Autonomous Coder Agents
CREATE TABLE IF NOT EXISTS agency_code_improvements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agent_type TEXT,
    target_component TEXT,
    suggested_code TEXT,
    improvement_reason TEXT,
    status TEXT DEFAULT 'pending_review',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Phase 10: AI Outbound Automation
CREATE TABLE IF NOT EXISTS agency_outreach_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_type TEXT NOT NULL, 
    target_name TEXT,
    target_company TEXT,
    target_role TEXT,
    generated_content TEXT,
    follow_up_content TEXT,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT now()
);

