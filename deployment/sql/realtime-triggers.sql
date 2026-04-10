-- ============================================================================
-- PHASE 3: Real-Time Event Triggers for Xero Seven Dashboard
-- ============================================================================
-- This SQL creates triggers that automatically publish database changes
-- to real-time channels, allowing frontend subscribers to get live updates.
--
-- Channels:
--   - leads:{team_id}
--   - projects:{team_id}
--   - clients:{team_id}
--   - proposals:{team_id}
--
-- Events: INSERT, UPDATE, DELETE broadcast as JSON
-- ============================================================================

-- ============================================================================
-- LEADS REAL-TIME TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION notify_leads_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM realtime.publish(
      'leads:' || COALESCE(OLD.team_id::text, 'global'),
      TG_OP,
      jsonb_build_object(
        'id', OLD.id,
        'action', TG_OP,
        'data', to_jsonb(OLD)
      )
    );
    RETURN OLD;
  ELSE
    PERFORM realtime.publish(
      'leads:' || COALESCE(NEW.team_id::text, 'global'),
      TG_OP,
      jsonb_build_object(
        'id', NEW.id,
        'action', TG_OP,
        'data', to_jsonb(NEW)
      )
    );
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS leads_realtime ON agency_leads CASCADE;

-- Create trigger for INSERT/UPDATE/DELETE
CREATE TRIGGER leads_realtime
  AFTER INSERT OR UPDATE OR DELETE ON agency_leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_leads_changes();

-- ============================================================================
-- PROJECTS REAL-TIME TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION notify_projects_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM realtime.publish(
      'projects:' || COALESCE(OLD.team_id::text, 'global'),
      TG_OP,
      jsonb_build_object(
        'id', OLD.id,
        'action', TG_OP,
        'data', to_jsonb(OLD)
      )
    );
    RETURN OLD;
  ELSE
    PERFORM realtime.publish(
      'projects:' || COALESCE(NEW.team_id::text, 'global'),
      TG_OP,
      jsonb_build_object(
        'id', NEW.id,
        'action', TG_OP,
        'data', to_jsonb(NEW)
      )
    );
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS projects_realtime ON agency_projects CASCADE;

CREATE TRIGGER projects_realtime
  AFTER INSERT OR UPDATE OR DELETE ON agency_projects
  FOR EACH ROW
  EXECUTE FUNCTION notify_projects_changes();

-- ============================================================================
-- CLIENTS REAL-TIME TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION notify_clients_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM realtime.publish(
      'clients:' || COALESCE(OLD.team_id::text, 'global'),
      TG_OP,
      jsonb_build_object(
        'id', OLD.id,
        'action', TG_OP,
        'data', to_jsonb(OLD)
      )
    );
    RETURN OLD;
  ELSE
    PERFORM realtime.publish(
      'clients:' || COALESCE(NEW.team_id::text, 'global'),
      TG_OP,
      jsonb_build_object(
        'id', NEW.id,
        'action', TG_OP,
        'data', to_jsonb(NEW)
      )
    );
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS clients_realtime ON agency_clients CASCADE;

CREATE TRIGGER clients_realtime
  AFTER INSERT OR UPDATE OR DELETE ON agency_clients
  FOR EACH ROW
  EXECUTE FUNCTION notify_clients_changes();

-- ============================================================================
-- PROPOSALS REAL-TIME TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION notify_proposals_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM realtime.publish(
      'proposals:' || COALESCE(OLD.team_id::text, 'global'),
      TG_OP,
      jsonb_build_object(
        'id', OLD.id,
        'action', TG_OP,
        'data', to_jsonb(OLD)
      )
    );
    RETURN OLD;
  ELSE
    PERFORM realtime.publish(
      'proposals:' || COALESCE(NEW.team_id::text, 'global'),
      TG_OP,
      jsonb_build_object(
        'id', NEW.id,
        'action', TG_OP,
        'data', to_jsonb(NEW)
      )
    );
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS proposals_realtime ON agency_proposals CASCADE;

CREATE TRIGGER proposals_realtime
  AFTER INSERT OR UPDATE OR DELETE ON agency_proposals
  FOR EACH ROW
  EXECUTE FUNCTION notify_proposals_changes();

-- ============================================================================
-- Deployment Notes:
-- 1. Run this file via: insforge db query < deployment/sql/realtime-triggers.sql
-- 2. Or copy each section and run via: insforge db query 'CREATE TRIGGER...'
-- 3. Verify: insforge db triggers
-- 4. Test: Subscribe in frontend and perform CRUD operation
-- ============================================================================
