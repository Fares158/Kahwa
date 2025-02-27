-- Create analytics tables
CREATE TABLE site_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  visitors integer NOT NULL DEFAULT 0,
  unique_visitors integer NOT NULL DEFAULT 0,
  page_views integer NOT NULL DEFAULT 0,
  avg_session_duration integer NOT NULL DEFAULT 0, -- in seconds
  bounce_rate numeric(5,2) NOT NULL DEFAULT 0, -- percentage
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE page_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  path text NOT NULL,
  title text NOT NULL,
  views integer NOT NULL DEFAULT 0,
  avg_time integer NOT NULL DEFAULT 0, -- in seconds
  bounce_rate numeric(5,2) NOT NULL DEFAULT 0, -- percentage
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE traffic_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  source text NOT NULL,
  visitors integer NOT NULL DEFAULT 0,
  percentage numeric(5,2) NOT NULL DEFAULT 0, -- percentage
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create settings table for admin configurations
CREATE TABLE admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE site_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Site metrics are viewable by authenticated users only"
  ON site_metrics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Site metrics are modifiable by authenticated users only"
  ON site_metrics FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Page metrics are viewable by authenticated users only"
  ON page_metrics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Page metrics are modifiable by authenticated users only"
  ON page_metrics FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Traffic sources are viewable by authenticated users only"
  ON traffic_sources FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Traffic sources are modifiable by authenticated users only"
  ON traffic_sources FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin settings are viewable by authenticated users only"
  ON admin_settings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin settings are modifiable by authenticated users only"
  ON admin_settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at triggers
CREATE TRIGGER update_site_metrics_updated_at
  BEFORE UPDATE ON site_metrics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_metrics_updated_at
  BEFORE UPDATE ON page_metrics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_traffic_sources_updated_at
  BEFORE UPDATE ON traffic_sources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for analytics
INSERT INTO site_metrics (date, visitors, unique_visitors, page_views, avg_session_duration, bounce_rate)
VALUES
  (CURRENT_DATE - 6, 245, 180, 720, 135, 32.5),
  (CURRENT_DATE - 5, 267, 195, 810, 142, 30.2),
  (CURRENT_DATE - 4, 289, 210, 870, 138, 31.8),
  (CURRENT_DATE - 3, 312, 230, 920, 145, 29.5),
  (CURRENT_DATE - 2, 335, 245, 980, 150, 28.7),
  (CURRENT_DATE - 1, 358, 260, 1050, 155, 27.9),
  (CURRENT_DATE, 380, 275, 1120, 160, 27.2);

INSERT INTO page_metrics (date, path, title, views, avg_time, bounce_rate)
VALUES
  (CURRENT_DATE, '/', 'Home', 450, 120, 25.5),
  (CURRENT_DATE, '/menu', 'Menu', 320, 180, 15.2),
  (CURRENT_DATE, '/events', 'Events', 210, 150, 20.8),
  (CURRENT_DATE, '/gallery', 'Gallery', 180, 200, 18.5),
  (CURRENT_DATE, '/contact', 'Contact', 140, 90, 35.0);

INSERT INTO traffic_sources (date, source, visitors, percentage)
VALUES
  (CURRENT_DATE, 'Direct', 150, 39.5),
  (CURRENT_DATE, 'Google', 120, 31.6),
  (CURRENT_DATE, 'Social Media', 75, 19.7),
  (CURRENT_DATE, 'Referral', 35, 9.2);

-- Insert default admin settings
INSERT INTO admin_settings (key, value)
VALUES
  ('security', '{"session_timeout": 60, "password_min_length": 8, "require_special_chars": true}'::jsonb);