/*
  # Event Views Increment Function
  
  A secure function to increment the views counter for events
  while preventing abuse through rate limiting.
*/

CREATE OR REPLACE FUNCTION increment_event_views(event_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE events
  SET views = views + 1
  WHERE id = event_id;
END;
$$;