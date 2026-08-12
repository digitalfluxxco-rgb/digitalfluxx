-- ============ helpers ============
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ admin identity ============
CREATE TABLE public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid NOT NULL UNIQUE,
  username text NOT NULL UNIQUE,
  display_name text NOT NULL DEFAULT 'Administrator',
  role text NOT NULL DEFAULT 'admin',
  is_active boolean NOT NULL DEFAULT true,
  last_login timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_users TO authenticated;
GRANT ALL ON public.admin_users TO service_role;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read own row" ON public.admin_users FOR SELECT TO authenticated USING (auth_user_id = auth.uid());
CREATE TRIGGER trg_admin_users_updated BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users a WHERE a.auth_user_id = auth.uid() AND a.is_active);
$$;

CREATE TABLE public.admin_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_username text,
  action text NOT NULL,
  resource text,
  resource_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.admin_activity TO authenticated;
GRANT ALL ON public.admin_activity TO service_role;
ALTER TABLE public.admin_activity ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read activity" ON public.admin_activity FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admins write activity" ON public.admin_activity FOR INSERT TO authenticated WITH CHECK (public.is_admin());

-- ============ settings (grouped singletons) ============
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_public boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads public settings" ON public.site_settings FOR SELECT TO anon USING (is_public);
CREATE POLICY "authed reads settings" ON public.site_settings FOR SELECT TO authenticated USING (is_public OR public.is_admin());
CREATE POLICY "admins write settings" ON public.site_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ generic content tables ============
CREATE TABLE public.navigation_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  href text NOT NULL,
  location text NOT NULL DEFAULT 'header',
  open_new_tab boolean NOT NULL DEFAULT false,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.homepage_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL UNIQUE,
  label text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.hero_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value text NOT NULL,
  label text NOT NULL,
  count_to integer,
  prefix text NOT NULL DEFAULT '',
  suffix text NOT NULL DEFAULT '',
  animate boolean NOT NULL DEFAULT true,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.marquee_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number_label text NOT NULL DEFAULT '',
  title text NOT NULL,
  short_description text NOT NULL DEFAULT '',
  long_description text NOT NULL DEFAULT '',
  icon text,
  bullets jsonb NOT NULL DEFAULT '[]'::jsonb,
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  cta_label text NOT NULL DEFAULT '',
  cta_url text,
  telegram_message text NOT NULL DEFAULT '',
  whatsapp_message text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.verticals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text,
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  cta_label text NOT NULL DEFAULT '',
  cta_url text,
  telegram_message text NOT NULL DEFAULT '',
  whatsapp_message text NOT NULL DEFAULT '',
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  eyebrow text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  summary text NOT NULL DEFAULT '',
  industry text NOT NULL DEFAULT '',
  channels text NOT NULL DEFAULT '',
  timeline text NOT NULL DEFAULT '',
  geos text NOT NULL DEFAULT '',
  challenge text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  outcome jsonb NOT NULL DEFAULT '[]'::jsonb,
  next_chapter text NOT NULL DEFAULT '',
  disclaimer text NOT NULL DEFAULT '',
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured_image_url text,
  thumbnail_url text,
  cta_label text NOT NULL DEFAULT '',
  telegram_message text NOT NULL DEFAULT '',
  whatsapp_message text NOT NULL DEFAULT '',
  group_key text NOT NULL DEFAULT 'primary',
  seo_title text NOT NULL DEFAULT '',
  seo_description text NOT NULL DEFAULT '',
  og_image_url text,
  status text NOT NULL DEFAULT 'published',
  featured_on_homepage boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.case_study_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id uuid NOT NULL REFERENCES public.case_studies(id) ON DELETE CASCADE,
  value text NOT NULL,
  label text NOT NULL,
  support_text text NOT NULL DEFAULT '',
  animate boolean NOT NULL DEFAULT false,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.case_study_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id uuid NOT NULL REFERENCES public.case_studies(id) ON DELETE CASCADE,
  step_label text NOT NULL DEFAULT '',
  heading text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text,
  icon text,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.case_study_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id uuid NOT NULL REFERENCES public.case_studies(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text NOT NULL DEFAULT '',
  caption text NOT NULL DEFAULT '',
  highlight text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.process_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_label text NOT NULL DEFAULT '',
  title text NOT NULL,
  lead text NOT NULL DEFAULT '',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  icon text,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.tech_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.ctas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  location text NOT NULL DEFAULT '',
  label text NOT NULL,
  channel text NOT NULL DEFAULT 'telegram',
  url text,
  prefilled_message text NOT NULL DEFAULT '',
  style text NOT NULL DEFAULT 'primary',
  open_new_tab boolean NOT NULL DEFAULT true,
  tracking_source text NOT NULL DEFAULT '',
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.form_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_key text NOT NULL UNIQUE,
  label text NOT NULL,
  helper_text text NOT NULL DEFAULT '',
  field_type text NOT NULL DEFAULT 'single_select',
  required boolean NOT NULL DEFAULT false,
  auto_advance boolean NOT NULL DEFAULT true,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.form_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES public.form_questions(id) ON DELETE CASCADE,
  label text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path text NOT NULL,
  public_url text NOT NULL,
  file_name text NOT NULL,
  category text NOT NULL DEFAULT 'misc',
  alt_text text NOT NULL DEFAULT '',
  mime_type text NOT NULL DEFAULT '',
  file_size integer,
  width integer,
  height integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '',
  website text NOT NULL DEFAULT '',
  vertical jsonb NOT NULL DEFAULT '[]'::jsonb,
  services_needed jsonb NOT NULL DEFAULT '[]'::jsonb,
  traffic_sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  monthly_spend jsonb NOT NULL DEFAULT '[]'::jsonb,
  main_issue jsonb NOT NULL DEFAULT '[]'::jsonb,
  target_geo text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  landing_url text NOT NULL DEFAULT '',
  referrer text NOT NULL DEFAULT '',
  utm_source text NOT NULL DEFAULT '',
  utm_medium text NOT NULL DEFAULT '',
  utm_campaign text NOT NULL DEFAULT '',
  utm_content text NOT NULL DEFAULT '',
  utm_term text NOT NULL DEFAULT '',
  fbclid text NOT NULL DEFAULT '',
  ttclid text NOT NULL DEFAULT '',
  scclid text NOT NULL DEFAULT '',
  contact_destination text NOT NULL DEFAULT '',
  source text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- content grants + RLS (public read of enabled content, admin full control)
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['navigation_items','homepage_sections','hero_metrics','marquee_items','services','verticals','case_studies','case_study_metrics','case_study_steps','case_study_images','faqs','process_steps','tech_categories','ctas','form_questions','form_options','media_assets']
  LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated;', t);
    EXECUTE format('GRANT INSERT, UPDATE, DELETE ON public.%I TO authenticated;', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role;', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
    EXECUTE format('CREATE POLICY "public read %1$s" ON public.%1$I FOR SELECT TO anon, authenticated USING (true);', t);
    EXECUTE format('CREATE POLICY "admin manage %1$s" ON public.%1$I FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());', t);
    EXECUTE format('CREATE TRIGGER trg_%1$s_updated BEFORE UPDATE ON public.%1$I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();', t);
  END LOOP;
END $$;

GRANT INSERT ON public.leads TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone submits a lead" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read leads" ON public.leads FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admins update leads" ON public.leads FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "admins delete leads" ON public.leads FOR DELETE TO authenticated USING (public.is_admin());
CREATE TRIGGER trg_leads_updated BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ seeds: settings ============
INSERT INTO public.site_settings (key, value, is_public) VALUES
('brand', '{"brand_name":"Digitalfluxx","logo_url":"","logo_dark_url":"","logo_light_url":"","favicon_url":"","footer_copyright":"© {year} Digitalfluxx. All rights reserved.","business_disclaimer":"Digitalfluxx provides marketing, funnel, analytics and acquisition services. References to past campaign performance describe specific historical engagements and do not guarantee future results. Clients remain responsible for ensuring their products, offers and advertising comply with applicable laws, licensing requirements and platform policies in their target markets."}', true),
('contact', '{"preferred_channel":"both","default_cta_label":"Discuss Your Campaign","telegram_enabled":true,"telegram_username":"Gs_sells","telegram_button_label":"Talk on Telegram","telegram_position":"bottom-left","telegram_default_message":"Hello Digitalfluxx,\n\nI came through your website and want to discuss an acquisition project.\n\nVertical:\nGEO:\nCurrent Spend:\nMain Goal:","whatsapp_enabled":true,"whatsapp_number":"923037240099","whatsapp_display":"+92 303 7240099","whatsapp_button_label":"Talk on WhatsApp","whatsapp_position":"bottom-right","whatsapp_default_message":"Hello Digitalfluxx,\n\nI came through your website and want to discuss a performance acquisition project.\n\nVertical:\nTarget GEO:\nCurrent Spend:\nMain Goal:\n\nCan we discuss the setup?","email":"","privacy_url":"","terms_url":""}', true),
('hero', '{"eyebrow":"Restricted Verticals · Paid Acquisition · Funnels · Attribution","headline_line_1":"Performance Acquisition","headline_line_2":"For Markets That Aren''t Easy.","kicker":"Forex. Affiliate. iGaming. Crypto. Subscriptions. Complex funnels. Multi-geo campaigns.","description_primary":"Digitalfluxx builds paid acquisition systems for high-friction verticals where creative, funnel structure, attribution and lead quality matter as much as the media buying itself.","description_secondary":"From multi-market Forex lead generation to Snapchat subscription acquisition, affiliate funnels and regulated financial campaigns — we work across the complete path from traffic to conversion signal.","primary_cta_label":"Discuss Your Campaign →","primary_cta_message":"Hello Digitalfluxx,\n\nI came through your acquisition funnel and want to discuss a campaign.\n\nVertical:\nTarget GEO:\nCurrent Monthly Spend:\nMain Problem:","secondary_cta_label":"View Case Studies ↓","secondary_cta_url":"#case-studies","status_items":["Multi-Geo","Lead Quality","Attribution","Conversion Feedback"],"marquee_title":"Experience across","animation_enabled":true,"form_enabled":true,"hero_image_url":""}', true),
('seo', '{"site_title":"Digitalfluxx | Performance Acquisition for Forex, iGaming & Complex Verticals","meta_description":"Digitalfluxx builds paid acquisition, funnels, attribution and multi-geo growth systems for Forex, affiliate, FinTech, iGaming, crypto and other high-friction verticals.","keywords":"performance marketing, forex acquisition, igaming acquisition, multi-geo campaigns","canonical_url":"","og_title":"","og_description":"","og_image_url":"","twitter_image_url":"","robots_index":true,"sitemap_enabled":true}', true),
('tracking', '{"gtm_id":"","ga4_id":"","meta_pixel_id":"","tiktok_pixel_id":"","snapchat_pixel_id":"","custom_head_script":"","custom_body_script":"","events":{"PageView":true,"ViewCaseStudy":true,"ServiceView":true,"QualificationStarted":true,"QualificationCompleted":true,"TelegramClick":true,"WhatsAppClick":true,"PrimaryCTAClick":true,"Scroll50":true,"Scroll90":true}}', true),
('design', '{"accent_color":"","background_color":"","card_background":"","border_color":"","text_primary":"","text_secondary":"","border_radius":"medium","animation_intensity":"normal","marquee_speed":40,"button_style":"solid","animations":{"hero_reveal":true,"grid_movement":true,"cta_shine":true,"metric_reveal":true,"case_hover":true,"marquee":true,"section_reveal":true,"screenshot_zoom":true}}', true),
('footer', '{"description":"Performance acquisition for restricted verticals. Funnels. Attribution. Multi-geo scaling.","responsible_advertising":"Digitalfluxx supports responsible, compliant advertising in every market it operates in."}', true),
('form', '{"title":"Qualify Your Campaign","description":"Five quick questions. Then continue the conversation directly.","completion_message":"Thanks — your details are ready to send.","destination":"save_lead_and_telegram","final_prompt":"Where do you want to continue?","telegram_button_label":"Continue on Telegram →","whatsapp_button_label":"Continue on WhatsApp","submit_label":"Continue","telegram_template":"Hello Digitalfluxx,\n\nI want to discuss an acquisition project.\n\nVERTICAL\n{{vertical}}\n\nSERVICES\n{{services}}\n\nTRAFFIC SOURCES\n{{traffic_sources}}\n\nMONTHLY SPEND\n{{monthly_spend}}\n\nMAIN ISSUE\n{{main_issue}}\n\nTARGET GEO\n{{target_geo}}\n\nBRAND\n{{company}}\n\nWEBSITE\n{{website}}\n\nSOURCE\n{{utm_source}} / {{utm_campaign}}\n\nCan you review the setup?","whatsapp_template":"Hello Digitalfluxx,\n\nI came through your website and would like to discuss an acquisition project.\n\nVertical: {{vertical}}\nTarget GEO: {{target_geo}}\nMonthly Spend: {{monthly_spend}}\nMain Issue: {{main_issue}}\nBrand: {{company}}\n\nCan we discuss the setup?"}', true);

-- ============ seeds: sections + nav ============
INSERT INTO public.homepage_sections (section_key, label, sort_order) VALUES
('hero','Hero',1),('verticals','Verticals',2),('case_studies','Case Studies',3),('hard_verticals','Positioning — Hard Verticals',4),
('services','Services',5),('optimize_for','What We Optimize For',6),('process','Process',7),('tech_stack','Tech Stack',8),
('performance_signals','Performance Signals',9),('fit','Fit Section',10),('qualifier','Lead Qualifier',11),('telegram_cta','Mid-page CTA',12),
('faq','FAQ',13),('final_cta','Final CTA',14);

INSERT INTO public.navigation_items (label, href, location, sort_order) VALUES
('Services','#services','header',1),('Case Studies','#case-studies','header',2),('Process','#process','header',3),
('Expertise','#expertise','header',4),('FAQ','#faq','header',5),
('Services','#services','footer',1),('Verticals','#expertise','footer',2),('Case Studies','#case-studies','footer',3),
('Process','#process','footer',4),('FAQ','#faq','footer',5);

INSERT INTO public.hero_metrics (value, label, count_to, suffix, sort_order) VALUES
('3,000+','Qualified Forex Leads',3000,'+',1),
('~$1M/mo','Forex Spend Managed at Scale',NULL,'',2),
('2,800+','Sweden Qualified Leads',2800,'+',3),
('1,800+','Snapchat Subscriptions',1800,'+',4);

INSERT INTO public.marquee_items (label, sort_order) VALUES
('Forex',1),('Affiliate Forex',2),('Prop',3),('FinTech',4),('Crypto',5),('Casino',6),('iGaming',7),
('Subscriptions',8),('Multi-Geo',9),('CAPI',10),('Postback',11),('CRM Routing',12);

INSERT INTO public.process_steps (step_label, title, lead, items, sort_order) VALUES
('01','Diagnose','Review:','["Offer","Audience","Creative","Funnel","Tracking","Sales feedback"]',1),
('02','Build','Create:','["Campaign architecture","Funnel","Tracking","Qualification","Creative testing framework"]',2),
('03','Validate','Run controlled testing to determine:','["Winning audiences","Winning messages","Winning creatives","Funnel bottlenecks","Lead quality"]',3),
('04','Scale','Move budget toward validated signals:','["Sales feedback loop","CRM signal into optimization","Continuous budget reallocation"]',4);

INSERT INTO public.tech_categories (title, items, sort_order) VALUES
('Traffic','["Meta","Google","TikTok","Snapchat","LinkedIn"]',1),
('Funnels','["VSL","Quiz","Advertorial","Pre-Lander","Lead Form","Subscription Flow"]',2),
('Attribution','["Meta CAPI","Pixel","GTM","GA4","S2S Postback","Offline Events"]',3),
('CRM / Routing','["GHL","Trackbox","Getlinked","Zoho","HubSpot","n8n","Webhooks"]',4),
('Optimization Signals','["Qualified Lead","Accepted Lead","Booking","FTD","Subscription","Revenue Event"]',5);
