-- ============ services ============
INSERT INTO public.services (number_label, title, short_description, tags, cta_label, telegram_message, sort_order) VALUES
('01','Restricted-Vertical Paid Acquisition','Performance campaigns for regulated, restricted and high-friction markets where generic media-buying playbooks break down.','["Forex","Prop","FinTech","Crypto","iGaming","Subscription acquisition","Multi-geo scaling","Platform-specific campaign architecture"]','Discuss Paid Acquisition →','Hello Digitalfluxx,

I came through your website and want to discuss a paid acquisition project.

Vertical:
Target GEO:
Current Spend:
Main Goal:',1),
('02','Affiliate Lead Generation','Acquisition systems built around lead quality, downstream conversion and source-level performance rather than raw form volume.','["Forex affiliate","Casino affiliate","Lead funnels","Pre-qualification","Source attribution","CRM routing","FTD feedback","Qualified-lead optimization"]','Discuss Affiliate Acquisition →','Hello Digitalfluxx,

I want to discuss an affiliate acquisition project.

Vertical:
Traffic Source:
Target GEO:
Current CPL:
Qualified Lead Rate:',2),
('03','Funnel & Pre-Lander Architecture','Conversion paths built for cold traffic, long consideration cycles and performance offers.','["Quiz funnels","VSL funnels","Advertorials","Pre-landers","Lead forms","Multi-step funnels","Subscription flows","GEO-specific landing pages"]','Review My Funnel →','Hello Digitalfluxx,

I want you to review my funnel.

Funnel Type:
Traffic Source:
Current Conversion Rate:
Main Problem:',3),
('04','Attribution & Conversion Signals','Connect advertising platforms to the outcomes that actually matter downstream.','["Meta CAPI","Pixel","S2S postback","Offline conversion events","Qualified-lead events","FTD signals","Subscription events","CRM disposition feedback"]','Fix My Attribution →','Hello Digitalfluxx,

I need help with attribution and conversion signals.

Platforms:
CRM:
Current Tracking Setup:
Main Problem:',4),
('05','Multi-Geo Scaling','Separate acquisition logic by geography instead of contaminating signals across fundamentally different audiences.','["Australia","Canada","Sweden","UK","Europe","UAE","GCC","Japan","South Korea","Pakistan","International campaigns"]','Discuss GEO Expansion →','Hello Digitalfluxx,

I want to discuss multi-geo expansion.

Current GEOs:
Target GEOs:
Vertical:
Monthly Spend:',5),
('06','Creative Testing Systems','Systematic testing of messages, formats, hooks and funnel combinations until scalable patterns emerge.','["Static creative","Video","VSL","UGC","Authority angles","Localized angles","Offer framing","Weekly winner / loser cycle"]','Build a Testing System →','Hello Digitalfluxx,

I want to build a creative testing system.

Vertical:
Channels:
Current Creative Volume:
Main Problem:',6);

-- ============ verticals ============
INSERT INTO public.verticals (title, description, tags, cta_label, telegram_message, sort_order) VALUES
('Forex Brokers','Multi-market lead generation built around qualification, local positioning, funnel architecture and downstream conversion signals.','["Meta","CAPI","VSL","Lead Gen","Multi-Geo"]','Forex Acquisition →','Hello Digitalfluxx,

I want to discuss a Forex acquisition project.

Type:
Target GEO:
Current Spend:
Current CPL:
Qualified Lead / FTD Rate:

Can you review the setup?',1),
('Affiliate Forex','Traffic-to-lead systems where source quality, CRM routing and qualified-lead feedback matter more than raw CPL.','["Affiliate","Lead Gen","Tracking","Postback","CRM"]','Talk About Affiliate Traffic →','Hello Digitalfluxx,

I want to discuss an affiliate Forex project.

Traffic Source:
Target GEO:
Current CPL:
Qualified Lead Rate:',2),
('Forex Signals','Subscription and lead-generation funnels for trading-signal audiences with clear risk-aware positioning and performance attribution.','["Funnels","Subscription","Meta","Telegram","Attribution"]','','Hello Digitalfluxx,

I want to discuss a Forex signals acquisition project.

Offer:
Target GEO:
Current Spend:',3),
('Prop Firms','Acquisition, pre-qualification, funnel testing and localized campaign architecture for prop-firm audiences.','["Meta","Funnels","Creative","CRO","GEO"]','','Hello Digitalfluxx,

I want to discuss a prop firm acquisition project.

Target GEO:
Current Spend:
Main Problem:',4),
('Casino / iGaming','Performance acquisition for operator, subscription and affiliate models with strong creative-testing and geo-level campaign control.','["Snapchat","Affiliate","Multi-Geo","Creative Testing"]','Discuss iGaming Acquisition →','Hello Digitalfluxx,

I want to discuss an iGaming / casino acquisition project.

Business Model:
Target GEO:
Traffic Source:
Monthly Spend:
Primary KPI:

Can we discuss the acquisition strategy?',5),
('Casino Affiliate','Traffic acquisition, comparison funnels, pre-landers, attribution and source-level optimization for affiliate models.','["Comparison Funnels","Pre-Lander","Postback","Source Optimization"]','','Hello Digitalfluxx,

I want to discuss a casino affiliate acquisition project.

Traffic Source:
Target GEO:
Current CPA:',6),
('Crypto','Performance funnels for crypto-related acquisition where trust, education, targeting and compliance-aware positioning matter.','["Education Funnels","Meta","Native","Attribution"]','Discuss Crypto Acquisition →','Hello Digitalfluxx,

I want to discuss a crypto acquisition project.

Offer:
Target GEO:
Current Spend:',7),
('Adult / Subscription','Non-explicit acquisition infrastructure for age-appropriate subscription products, including creative testing, geo segmentation and conversion tracking.','["Subscription","Creative Testing","GEO Segmentation","Tracking"]','Discuss Subscription Acquisition →','Hello Digitalfluxx,

I want to discuss a subscription acquisition project.

Offer:
Target GEO:
Current Spend:
Primary KPI:',8),
('FinTech / Payments','Qualified B2B pipeline generation across paid search, paid social, retargeting and localized landing pages.','["Google","LinkedIn","Retargeting","Localized LPs"]','Discuss FinTech Acquisition →','Hello Digitalfluxx,

I want to discuss a FinTech acquisition project.

Product:
Target Markets:
Current Spend:
Pipeline Goal:',9);

-- ============ case studies ============
INSERT INTO public.case_studies (slug, name, eyebrow, title, subtitle, summary, challenge, role, outcome, next_chapter, tags, cta_label, telegram_message, group_key, sort_order) VALUES
('multi-geo-forex','Multi-Geo Forex','Forex · Meta Ads · CAPI · VSL','54 Campaigns. Four GEOs. One Acquisition System.','AU · CA · JP · KR','Rather than optimizing purely for raw lead volume, the system used qualification signals, geo-isolated funnels and localized positioning across quiz funnels, advertorials and VSLs.','Scale Forex acquisition across four very different markets without collapsing lead quality or first-time-deposit rates.','Paid media strategy, funnel architecture, creative testing, tracking and scaling.','["Winning AU/CA VSL campaigns at approximately $0.32–$0.36 CPC","Best VSL CPL range of $3.64–$8.61","54 simultaneous campaigns in operation","6 high-performing funnels isolated through structured testing"]','','["CAPI Scoring","GEO Isolation","VSL","Quiz Funnel","Advertorial","Localization"]','Discuss Forex Acquisition →','Hello Digitalfluxx,

I want to discuss a Forex acquisition project.

Source: Multi-Geo Forex Case Study

Type:
Target GEO:
Current Spend:
Current CPL:',
'primary',1),
('sweden-forex','Sweden Forex','Sweden · Forex Lead Generation','12 Funnels Tested. 8 Cleared the Quality Threshold.','Nordic market entry','Twelve distinct funnel architectures were tested using different trust mechanisms and offer structures, then budget was concentrated on the quality-approved winners.','A high-skepticism Nordic market where generic Forex messaging fails to build trust.','Market entry strategy, funnel testing programme, creative localization, media buying.','["8 of 12 funnels passed the quality threshold","Approximate average qualified CPL of ~$214 across the engagement"]','','["Funnel Testing","Quality Scoring","Localization","Lead Gen"]','Discuss Nordic Acquisition →','Hello Digitalfluxx,

I want to discuss a Nordic acquisition project.

Source: Sweden Forex Case Study

Vertical:
Target GEO:
Current Spend:','primary',2),
('snapchat-igaming','Snapchat iGaming','Snapchat · iGaming / Subscription','One Winning Creative → 45+ GEO Campaigns','Creative isolation, then geo expansion','Phase one isolated the best-performing creative — image campaigns materially outperformed the first video variants — then the winner was expanded into dozens of city-level campaigns.','Find a repeatable Snapchat acquisition unit and expand it without diluting performance.','Creative testing system, Snapchat media buying, multi-geo campaign scaling.','["Expanded into city-level campaigns including New York, LA, Chicago, Houston, Phoenix, San Jose, San Diego, Dallas, Philadelphia, Austin, Seattle, Washington DC and Denver"]','','["Snapchat","Creative Testing","GEO Isolation","Subscription"]','Discuss Snapchat Acquisition →','Hello Digitalfluxx,

I want to discuss a Snapchat acquisition project.

Source: Snapchat Case Study

Offer:
Target GEO:
Current Spend:','primary',3),
('b2b-fintech','B2B FinTech','B2B FinTech · 5 Markets','A Cross-Channel Funnel Across Five International Markets','','High-intent search → awareness → retargeting → qualified lead → sales, with paid and organic operating as one acquisition system.','Generate qualified B2B pipeline without flooding the sales team with low-intent leads.','Funnel architecture, channel strategy, localization, tracking.','["One acquisition architecture across 5 markets and 4 channels."]','','["Google","Meta","TikTok","SEO","Multi-Market"]','Discuss FinTech Acquisition →','Hello Digitalfluxx,

I want to discuss a FinTech acquisition project.

Source: B2B FinTech Case Study

Product:
Target Markets:
Current Spend:','primary',4),
('b2b-trading-software','B2B Trading SaaS','B2B Trading SaaS · Meta · LinkedIn','Scaling Spend 3× Without Breaking Unit Economics','','Instead of broadening targeting during scaling, audience qualification was tightened around higher-value roles and brokerage profiles.','Increase media spend without degrading unit economics.','CRO, audience strategy, paid social scaling.','["The landing-page conversion rate approximately doubled, making increased media spend sustainable."]','','["Meta","LinkedIn","CRO","Qualification"]','Discuss B2B SaaS Scaling →','Hello Digitalfluxx,

I want to discuss a B2B SaaS acquisition project.

Source: B2B Trading SaaS Case Study

Product:
Target Markets:
Current Spend:','primary',5),
('glowrish','Glowrish','DTC Skincare · Meta · TikTok','Research-Led DTC Launch With 4.6× ROAS','','A Pakistan-based medicated cosmeceutical brand launching four SKUs with no existing paid-media history — and without discount-stacking.','Launch four SKUs from zero paid-media history while protecting margin from discounting.','Acquisition strategy, campaign build, creative direction, testing cadence.','["The brand launched without discount-stacking."]','','[]','Discuss E-commerce Growth →','Hello Digitalfluxx,

I want to discuss an e-commerce acquisition project.

Source: Glowrish Case Study

Brand:
Target GEO:
Current Spend:','additional',6),
('maryam-derma','Maryam Derma','Aesthetic Clinic · Local Lead Generation','From Cheap Leads to Booking Intent','','Previous vendors had produced inexpensive leads that rarely became patients. The system was rebuilt around booking intent instead of form submissions.','Cheap leads consumed front-desk time and rarely converted into booked, commercially meaningful procedures.','Local acquisition strategy, funnel qualification, creative direction.','["Fewer leads, higher intent, and better alignment with procedures that actually matter commercially."]','','[]','Discuss Local Lead Generation →','Hello Digitalfluxx,

I want to discuss a local lead generation project.

Source: Maryam Derma Case Study

Business:
Target GEO:
Current Spend:','additional',7),
('real-estate','Real Estate','Real Estate · Meta · Google','Rebuilding Lead Generation Around Buyer Intent','','The account generated cheap leads but consumed sales-team time with people who could not transact. Qualification moved upstream.','Low CPL was hiding an unqualified pipeline that the sales team could not convert.','Funnel rebuild, qualification logic, media buying.','["Higher-quality pipeline mattered more than artificially low CPL."]','','[]','Discuss Real Estate Acquisition →','Hello Digitalfluxx,

I want to discuss a real estate acquisition project.

Source: Real Estate Case Study

Market:
Target GEO:
Current Spend:','additional',8);

-- case study metrics
INSERT INTO public.case_study_metrics (case_study_id, value, label, sort_order)
SELECT c.id, m.value, m.label, m.ord FROM public.case_studies c JOIN (VALUES
('multi-geo-forex','3,000+','Qualified Leads',1),
('multi-geo-forex','~$1M/mo','Spend Managed',2),
('multi-geo-forex','10–20/day','FTDs at Scale',3),
('multi-geo-forex','27–30%','Winning VSL CTR',4),
('multi-geo-forex','$0.32–$0.36','Winning VSL CPC',5),
('sweden-forex','$600K','Spend',1),
('sweden-forex','2,800+','Qualified Leads',2),
('sweden-forex','67%','Funnel Win Rate',3),
('sweden-forex','~$214','Average Qualified CPL',4),
('snapchat-igaming','1,800+','Subscriptions',1),
('snapchat-igaming','€1,265','Spend',2),
('snapchat-igaming','8,175','Clicks',3),
('snapchat-igaming','6.38%','Click Rate',4),
('snapchat-igaming','€0.07–€0.10','Winning eCPC',5),
('snapchat-igaming','€5K–€6K','Client Revenue',6),
('b2b-fintech','5 Markets','One Architecture',1),
('b2b-fintech','4 Channels','Google · Meta · TikTok · SEO',2),
('b2b-trading-software','~3×','Spend Scaling',1),
('glowrish','4.6×','ROAS',1),
('maryam-derma','Fewer leads.','Higher intent.',1),
('real-estate','Upstream','Qualification',1)
) AS m(slug, value, label, ord) ON m.slug = c.slug;

-- case study strategy steps
INSERT INTO public.case_study_steps (case_study_id, step_label, heading, sort_order)
SELECT c.id, lpad(s.ord::text, 2, '0'), s.heading, s.ord FROM public.case_studies c JOIN (VALUES
('multi-geo-forex','Geo-specific funnel architecture',1),
('multi-geo-forex','Market-level creative isolation',2),
('multi-geo-forex','Lead-quality feedback into optimization',3),
('multi-geo-forex','VSL vs advertorial vs quiz testing',4),
('multi-geo-forex','Structured campaign scaling',5),
('sweden-forex','Swedish market research',1),
('sweden-forex','Local credibility signals in creative',2),
('sweden-forex','12 distinct funnel architectures built and tested',3),
('sweden-forex','Quality scoring applied before scaling',4),
('sweden-forex','Kill losers — four weakest funnels removed',5),
('sweden-forex','Scale winners — budget concentrated on eight funnels',6),
('snapchat-igaming','Creative isolation phase before any geo expansion',1),
('snapchat-igaming','Image vs video variant testing',2),
('snapchat-igaming','City-level campaign split with individual performance monitoring',3),
('snapchat-igaming','Continuous pruning of underperforming geos',4),
('b2b-fintech','Different channel role per market',1),
('b2b-fintech','Qualified-lead-seeded audiences',2),
('b2b-fintech','Warm-then-convert sequencing in zero-equity markets',3),
('b2b-fintech','Paid and organic working as one acquisition system',4),
('b2b-fintech','Localized landing pages and creative',5),
('b2b-trading-software','Tighter audience qualification around higher-value roles',1),
('b2b-trading-software','Landing-page product demonstration',2),
('b2b-trading-software','Social proof placement',3),
('b2b-trading-software','Pricing anchor',4),
('b2b-trading-software','Stronger pre-qualification',5),
('glowrish','SKU-level campaign architecture',1),
('glowrish','Offline sales data used for prioritization',2),
('glowrish','TikTok used as a discovery layer',3),
('glowrish','Meta used heavily for conversion and retargeting',4),
('glowrish','Problem → solution → proof creative structure',5),
('glowrish','Weekly creative testing cycle',6),
('maryam-derma','High-value services prioritized',1),
('maryam-derma','Hyper-local targeting',2),
('maryam-derma','Treatment-specific campaigns',3),
('maryam-derma','Qualification questions before submission',4),
('maryam-derma','Clinical authority creative',5),
('maryam-derma','Booking intent as the optimization target',6),
('real-estate','Budget qualification',1),
('real-estate','Timeline qualification',2),
('real-estate','Buying intent screening',3),
('real-estate','Financing readiness',4),
('real-estate','Investor vs end-buyer profiling',5),
('real-estate','Nurture path for low-intent visitors',6)
) AS s(slug, heading, ord) ON s.slug = c.slug;

-- proof screenshot placeholders (captions preserved)
INSERT INTO public.case_study_images (case_study_id, image_url, caption, alt_text, featured, sort_order)
SELECT c.id, '', i.caption, i.caption, true, 1 FROM public.case_studies c JOIN (VALUES
('multi-geo-forex','Ads Manager — multi-geo Forex campaign performance'),
('sweden-forex','Ads Manager — Sweden funnel test performance'),
('snapchat-igaming','Snapchat Ads Manager — winning creative and geo split')
) AS i(slug, caption) ON i.slug = c.slug;

-- ============ faqs ============
INSERT INTO public.faqs (question, answer, sort_order) VALUES
('Do you only manage Meta Ads?','No. Digitalfluxx works across Meta, Google, TikTok, Snapchat and LinkedIn depending on the market, offer and acquisition stage.',1),
('Can you build the funnel as well?','Yes. Funnel architecture, landing-page structure, qualification logic and tracking are core parts of the service.',2),
('Do you work with regulated or difficult verticals?','Yes. Experience includes Forex, Prop, FinTech and other compliance-sensitive acquisition environments. Campaign execution still depends on platform rules, offer structure and market regulations.',3),
('Can you guarantee ROAS, CPL or lead volume?','No. Digitalfluxx does not guarantee arbitrary performance numbers. We build controlled testing and optimization systems designed to find and scale economically viable acquisition.',4),
('Do you work internationally?','Yes. Experience includes multi-market acquisition across Europe, North America, Australia, Asia, Pakistan and GCC markets.',5),
('Can you fix an existing campaign rather than rebuild everything?','Yes. Existing accounts can be audited first to determine whether the bottleneck is media buying, creative, tracking, funnel conversion or lead quality.',6),
('Do you work with Forex and affiliate Forex campaigns?','Yes. Digitalfluxx has experience with multi-geo Forex lead generation, qualification funnels, attribution infrastructure and affiliate-style acquisition models.',7),
('Do you work with casino and iGaming campaigns?','Yes. Experience includes multi-geo subscription and iGaming-related acquisition, including Snapchat creative testing and geo-isolated scaling.',8),
('Can you work with crypto offers?','Digitalfluxx can evaluate crypto acquisition opportunities based on the offer, market, compliance requirements and traffic source.',9),
('Do you work with adult subscription offers?','Digitalfluxx can evaluate age-appropriate subscription acquisition projects where the offer, creative and traffic strategy can operate within applicable platform and legal requirements.',10),
('Can you guarantee ad account approval?','No. Platform review decisions remain controlled by the advertising platform. Digitalfluxx focuses on compliant campaign structure, creative, funnels, measurement and optimization.',11),
('Can you build the pre-lander and funnel?','Yes. Pre-landers, VSLs, advertorials, quiz funnels, lead funnels and conversion flows are core parts of the acquisition system.',12),
('Can you connect lead quality back to the campaign?','Yes. Depending on the stack, attribution can use CRM dispositions, CAPI events, S2S postbacks and offline conversion signals.',13),
('How do we start?','Message Digitalfluxx on Telegram at @Gs_sells with your website, vertical, market and current advertising situation.',14);

-- ============ form ============
INSERT INTO public.form_questions (question_key, label, field_type, required, sort_order) VALUES
('vertical','What are you running?','single_select',true,1),
('needs','What do you need?','multi_select',false,2),
('channels','Which traffic sources are involved?','multi_select',false,3),
('spend','Approximate monthly advertising budget?','single_select',false,4),
('issue','What''s blocking scale right now?','single_select',false,5);

INSERT INTO public.form_options (question_id, label, sort_order)
SELECT q.id, o.label, o.ord FROM public.form_questions q JOIN (VALUES
('vertical','Forex Broker',1),('vertical','Affiliate Forex',2),('vertical','Forex Signals',3),('vertical','Prop Firm',4),
('vertical','Crypto',5),('vertical','Casino / iGaming',6),('vertical','Casino Affiliate',7),('vertical','Adult / Subscription',8),
('vertical','FinTech / Payments',9),('vertical','Other Restricted Vertical',10),
('needs','Paid Media Management',1),('needs','Lead Generation',2),('needs','Affiliate Acquisition',3),('needs','Funnel / Pre-Lander',4),
('needs','Creative Testing',5),('needs','Tracking / Attribution',6),('needs','CAPI / Postback Setup',7),('needs','CRM / Lead Routing',8),
('needs','Multi-Geo Scaling',9),('needs','Campaign Audit',10),
('channels','Meta',1),('channels','Google',2),('channels','TikTok',3),('channels','Snapchat',4),('channels','Native',5),
('channels','YouTube',6),('channels','LinkedIn',7),('channels','SEO / Organic',8),('channels','Affiliate Traffic',9),('channels','Not Running Yet',10),
('spend','Not running yet',1),('spend','Under $5K',2),('spend','$5K–$20K',3),('spend','$20K–$50K',4),('spend','$50K–$100K',5),
('spend','$100K–$250K',6),('spend','$250K+',7),
('issue','High CPL / CPA',1),('issue','Poor Lead Quality',2),('issue','Low FTD / Conversion Rate',3),('issue','Creative Fatigue',4),
('issue','Account / Platform Limitations',5),('issue','Funnel Conversion',6),('issue','Tracking Problems',7),('issue','Attribution Problems',8),
('issue','New GEO Expansion',9),('issue','Need Better Traffic',10),('issue','Starting From Scratch',11)
) AS o(qkey, label, ord) ON o.qkey = q.question_key;

-- ============ reusable CTAs ============
INSERT INTO public.ctas (name, location, label, channel, tracking_source, prefilled_message, sort_order) VALUES
('nav_primary','Navigation','Talk to Digitalfluxx','telegram','nav','Hello Digitalfluxx,

I came through your website and want to discuss an acquisition project.

Vertical:
GEO:
Current Spend:
Main Goal:',1),
('services_cta','Services','Show Us Your Numbers →','telegram','services_cta','Hello Digitalfluxx,

Here are my current numbers.

Vertical:
Monthly Spend:
Current CPL:
Conversion Rate:
Main Problem:',2),
('midpage_cta','Mid-page CTA','Message Digitalfluxx on Telegram →','telegram','telegram_section','Hello Digitalfluxx,

Here are my current numbers.

Vertical:
Monthly Spend:
Current CPL:
Conversion Rate:
Main Problem:',3),
('mobile_sticky','Mobile Sticky','Talk to Digitalfluxx →','telegram','sticky_mobile','Hello Digitalfluxx,

I came through your website and want to discuss an acquisition project.

Vertical:
GEO:
Current Spend:
Main Goal:',4),
('floating_telegram','Floating Button','Talk on Telegram','telegram','floating_telegram','Hello Digitalfluxx,

I came through your website and want to discuss an acquisition project.

Vertical:
GEO:
Current Spend:
Main Goal:',5),
('floating_whatsapp','Floating Button','Talk on WhatsApp','whatsapp','floating_whatsapp','Hello Digitalfluxx,

I came through your website and want to discuss a performance acquisition project.

Vertical:
Target GEO:
Current Spend:
Main Goal:

Can we discuss the setup?',6);