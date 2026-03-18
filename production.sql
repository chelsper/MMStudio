-- Schema
--
-- PostgreSQL database dump
--

-- Dumped from database version 17.8 (6108b59)
-- Dumped by pg_dump version 17.8 (6108b59)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth_accounts; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.auth_accounts (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    type character varying(255) NOT NULL,
    provider character varying(255) NOT NULL,
    "providerAccountId" character varying(255) NOT NULL,
    refresh_token text,
    access_token text,
    expires_at bigint,
    id_token text,
    scope text,
    session_state text,
    token_type text,
    password text
);


ALTER TABLE public.auth_accounts OWNER TO neondb_owner;

--
-- Name: auth_accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.auth_accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auth_accounts_id_seq OWNER TO neondb_owner;

--
-- Name: auth_accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.auth_accounts_id_seq OWNED BY public.auth_accounts.id;


--
-- Name: auth_sessions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.auth_sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    expires timestamp with time zone NOT NULL,
    "sessionToken" character varying(255) NOT NULL
);


ALTER TABLE public.auth_sessions OWNER TO neondb_owner;

--
-- Name: auth_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.auth_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auth_sessions_id_seq OWNER TO neondb_owner;

--
-- Name: auth_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.auth_sessions_id_seq OWNED BY public.auth_sessions.id;


--
-- Name: auth_users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.auth_users (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    "emailVerified" timestamp with time zone,
    image text,
    stripe_id text,
    is_admin boolean DEFAULT false
);


ALTER TABLE public.auth_users OWNER TO neondb_owner;

--
-- Name: auth_users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.auth_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auth_users_id_seq OWNER TO neondb_owner;

--
-- Name: auth_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.auth_users_id_seq OWNED BY public.auth_users.id;


--
-- Name: auth_verification_token; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.auth_verification_token (
    identifier text NOT NULL,
    expires timestamp with time zone NOT NULL,
    token text NOT NULL
);


ALTER TABLE public.auth_verification_token OWNER TO neondb_owner;

--
-- Name: character_assignments; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.character_assignments (
    id integer NOT NULL,
    mystery_id text NOT NULL,
    character_name text NOT NULL,
    contact text NOT NULL,
    contact_type text DEFAULT 'email'::text NOT NULL,
    token text NOT NULL,
    secret_clues jsonb DEFAULT '[]'::jsonb NOT NULL,
    clues_revealed integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    is_killer boolean DEFAULT false NOT NULL
);


ALTER TABLE public.character_assignments OWNER TO neondb_owner;

--
-- Name: character_assignments_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.character_assignments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.character_assignments_id_seq OWNER TO neondb_owner;

--
-- Name: character_assignments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.character_assignments_id_seq OWNED BY public.character_assignments.id;


--
-- Name: coupons; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.coupons (
    id integer NOT NULL,
    code text NOT NULL,
    discount_type text DEFAULT 'percent'::text NOT NULL,
    discount_value integer NOT NULL,
    max_uses integer,
    times_used integer DEFAULT 0,
    valid_from timestamp with time zone DEFAULT now(),
    valid_until timestamp with time zone,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT coupons_discount_type_check CHECK ((discount_type = ANY (ARRAY['percent'::text, 'fixed'::text, 'free_game'::text])))
);


ALTER TABLE public.coupons OWNER TO neondb_owner;

--
-- Name: coupons_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.coupons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coupons_id_seq OWNER TO neondb_owner;

--
-- Name: coupons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.coupons_id_seq OWNED BY public.coupons.id;


--
-- Name: email_logs; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.email_logs (
    id integer NOT NULL,
    recipient_email text NOT NULL,
    subject text NOT NULL,
    body_text text,
    sent_by integer,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.email_logs OWNER TO neondb_owner;

--
-- Name: email_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.email_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.email_logs_id_seq OWNER TO neondb_owner;

--
-- Name: email_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.email_logs_id_seq OWNED BY public.email_logs.id;


--
-- Name: mysteries; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.mysteries (
    id text NOT NULL,
    mystery_data jsonb NOT NULL,
    config jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    global_clues_revealed integer DEFAULT 0 NOT NULL,
    voting_open boolean DEFAULT false NOT NULL,
    gm_token text,
    user_email text
);


ALTER TABLE public.mysteries OWNER TO neondb_owner;

--
-- Name: purchases; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.purchases (
    id integer NOT NULL,
    user_id integer NOT NULL,
    user_email text NOT NULL,
    payment_type text NOT NULL,
    stripe_session_id text,
    stripe_payment_intent text,
    amount_cents integer NOT NULL,
    games_allowed integer DEFAULT 1,
    games_used integer DEFAULT 0,
    expires_at timestamp with time zone,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT purchases_payment_type_check CHECK ((payment_type = ANY (ARRAY['one_time'::text, 'subscription'::text])))
);


ALTER TABLE public.purchases OWNER TO neondb_owner;

--
-- Name: purchases_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.purchases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.purchases_id_seq OWNER TO neondb_owner;

--
-- Name: purchases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.purchases_id_seq OWNED BY public.purchases.id;


--
-- Name: votes; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.votes (
    id integer NOT NULL,
    mystery_id text NOT NULL,
    voter_token text NOT NULL,
    voted_for text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.votes OWNER TO neondb_owner;

--
-- Name: votes_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.votes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.votes_id_seq OWNER TO neondb_owner;

--
-- Name: votes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.votes_id_seq OWNED BY public.votes.id;


--
-- Name: auth_accounts id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.auth_accounts ALTER COLUMN id SET DEFAULT nextval('public.auth_accounts_id_seq'::regclass);


--
-- Name: auth_sessions id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.auth_sessions ALTER COLUMN id SET DEFAULT nextval('public.auth_sessions_id_seq'::regclass);


--
-- Name: auth_users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.auth_users ALTER COLUMN id SET DEFAULT nextval('public.auth_users_id_seq'::regclass);


--
-- Name: character_assignments id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.character_assignments ALTER COLUMN id SET DEFAULT nextval('public.character_assignments_id_seq'::regclass);


--
-- Name: coupons id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.coupons ALTER COLUMN id SET DEFAULT nextval('public.coupons_id_seq'::regclass);


--
-- Name: email_logs id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.email_logs ALTER COLUMN id SET DEFAULT nextval('public.email_logs_id_seq'::regclass);


--
-- Name: purchases id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.purchases ALTER COLUMN id SET DEFAULT nextval('public.purchases_id_seq'::regclass);


--
-- Name: votes id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.votes ALTER COLUMN id SET DEFAULT nextval('public.votes_id_seq'::regclass);


--
-- Name: auth_accounts auth_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.auth_accounts
    ADD CONSTRAINT auth_accounts_pkey PRIMARY KEY (id);


--
-- Name: auth_sessions auth_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.auth_sessions
    ADD CONSTRAINT auth_sessions_pkey PRIMARY KEY (id);


--
-- Name: auth_users auth_users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.auth_users
    ADD CONSTRAINT auth_users_pkey PRIMARY KEY (id);


--
-- Name: auth_verification_token auth_verification_token_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.auth_verification_token
    ADD CONSTRAINT auth_verification_token_pkey PRIMARY KEY (identifier, token);


--
-- Name: character_assignments character_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.character_assignments
    ADD CONSTRAINT character_assignments_pkey PRIMARY KEY (id);


--
-- Name: character_assignments character_assignments_token_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.character_assignments
    ADD CONSTRAINT character_assignments_token_key UNIQUE (token);


--
-- Name: coupons coupons_code_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key UNIQUE (code);


--
-- Name: coupons coupons_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (id);


--
-- Name: email_logs email_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.email_logs
    ADD CONSTRAINT email_logs_pkey PRIMARY KEY (id);


--
-- Name: mysteries mysteries_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mysteries
    ADD CONSTRAINT mysteries_pkey PRIMARY KEY (id);


--
-- Name: purchases purchases_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_pkey PRIMARY KEY (id);


--
-- Name: votes votes_mystery_id_voter_token_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_mystery_id_voter_token_key UNIQUE (mystery_id, voter_token);


--
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);


--
-- Name: idx_assignments_mystery; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_assignments_mystery ON public.character_assignments USING btree (mystery_id);


--
-- Name: idx_assignments_token; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_assignments_token ON public.character_assignments USING btree (token);


--
-- Name: idx_purchases_email; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_purchases_email ON public.purchases USING btree (user_email);


--
-- Name: idx_purchases_stripe_session; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_purchases_stripe_session ON public.purchases USING btree (stripe_session_id);


--
-- Name: idx_purchases_user; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_purchases_user ON public.purchases USING btree (user_id);


--
-- Name: idx_votes_mystery; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_votes_mystery ON public.votes USING btree (mystery_id);


--
-- Name: auth_accounts auth_accounts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.auth_accounts
    ADD CONSTRAINT "auth_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.auth_users(id) ON DELETE CASCADE;


--
-- Name: auth_sessions auth_sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.auth_sessions
    ADD CONSTRAINT "auth_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.auth_users(id) ON DELETE CASCADE;


--
-- Name: character_assignments character_assignments_mystery_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.character_assignments
    ADD CONSTRAINT character_assignments_mystery_id_fkey FOREIGN KEY (mystery_id) REFERENCES public.mysteries(id) ON DELETE CASCADE;


--
-- Name: email_logs email_logs_sent_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.email_logs
    ADD CONSTRAINT email_logs_sent_by_fkey FOREIGN KEY (sent_by) REFERENCES public.auth_users(id);


--
-- Name: votes votes_mystery_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_mystery_id_fkey FOREIGN KEY (mystery_id) REFERENCES public.mysteries(id) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--



-- Data
COPY "character_assignments" FROM stdin;
1	1773787928392	Victoria Price	Damonjasper@gmail.com	email	q2zd2zy3vew4ie35fdqn0dbe	[{"clueIndex": 1, "secretInfo": "I distinctly remember Derek rustling around in the bushes near Charles' yurt right around the time I heard some cursing about a fitness band. Could be incriminating, but Derek always made a habit of drunkenly stumbling 'cross paths at suspicious times, maybe just to add flavor to his tales."}, {"clueIndex": 2, "secretInfo": "Funny, Charles detested cooking competitions, once calling them 'soulless culinary reality circuses.' So why would Fiona's knife mysteriously show up? Although, maybe the pristine condition means it was just borrowed for a cheeky photo op. Surely harmless, right?"}, {"clueIndex": 3, "secretInfo": "There was that draft where Charles mocked Derek's workout video — particularly harsh even by Charles' standards. I half expected Derek to announce a dramatic pivot into interpretive dance."}, {"clueIndex": 4, "secretInfo": "Now, Kevin, clumsy as always, raved about schnapps last night. As Charles often said, 'There’s no accounting for alcohol-fueled foolery.' Makes me wonder if Kevin's antics turned more...inspired, shall we say?"}, {"clueIndex": 5, "secretInfo": "I overhead a heated exchange between Derek and Fiona discussing sauerkraut — well, I assume 'kraut' isn't code for knockout. Must be those bootlegging kraut shops trending on GaiaPreneur these days."}, {"clueIndex": 6, "secretInfo": "Harold seemed tense when I glimpsed him with rejected investment documents. Perhaps he knows more about risky gambits than he'd ever accept in a shared portfolio."}, {"clueIndex": 7, "secretInfo": "Isn't it peculiar that Derek had a peculiar fondness for enormous vintage boots? He chortled once about stealing Charles' style, though I doubt Charles would abandon good treads without cause."}, {"clueIndex": 8, "secretInfo": "Charles' midnight alarm was set because, as he smugly quipped, 'great ideas strike at witching hour.' Perhaps he planned an eloquent location scout, or maybe fell victim to his own creativity."}]	1	2026-03-17 22:53:24.29327+00	f
2	1773787928392	Lance Brightly	9044769052	phone	sfztdwmvfqcksk5eiomt4d6o	[{"clueIndex": 1, "secretInfo": "I swear, I saw Derek kicking the dirt around his tent just hours before the band showed up busted. He's always had a flair for dramatics, especially when he's had a few too many of those kale-tinis."}, {"clueIndex": 2, "secretInfo": "I stumbled upon Fiona and Lance taking selfies by the kitchen late at night. She claimed her knife was just a prop for the perfect capture. Yet, curated knife glint meant little to Charles, who believed candid was chic."}, {"clueIndex": 3, "secretInfo": "Oh, I got a glimpse of that blog post of Charles’ during breakfast. It's brutal enough to make Derek squirm like a giddy novice speaker at his motivation seminars. Can’t say it's unjust — Derek’s lunges at fake fame deserve a critique or two."}, {"clueIndex": 4, "secretInfo": "Now about those schnapps — Derek bragged about creating a secret schnapps-infused gym session. His remedy for fatigue apparently involved boozy deep lunges."}, {"clueIndex": 5, "secretInfo": "Funny enough, I heard Fiona fretting over how 'ingredients' didn't mix well — definitely chatting with Derek. Could they be recipe testing or did their sauerkraut turn foul? Business tactics or malfunctioned?"}, {"clueIndex": 6, "secretInfo": "I caught Harold fiddling with investment charts in an effort only an agitated broker recognizes. Spiraled investments or recovery gambits, only the quiver in his eyebrow spoke more truths."}, {"clueIndex": 7, "secretInfo": "Derek’s boots? Worn bragging rights, as he proudly declared them ideal 'for stomping bullcrap in style.' Perhaps stomped more than mere dirt this night."}, {"clueIndex": 8, "secretInfo": "Charles' midnight alarm vibe-checked our brainstorming walks. He mused that night was prime for sourcing 'intellectual gold' — or maybe Derek's quest for preservation tripped the innovative pulpit."}]	1	2026-03-17 22:57:05.185417+00	f

\.

COPY "auth_users" FROM stdin;
1	\N	admin@mysterygames.test	\N	\N	cus_UAOan6srI5Ovlg	t
2	\N	chels.santoro@gmail.com	\N	\N	\N	f
3	\N	damonjasper@gmail.com	\N	\N	\N	f
4	\N	chelsrazellner@yahoo.com	\N	\N	\N	f
5	\N	chelseacjasper@gmail.com	\N	\N	\N	f
6	\N	gpicotte1@gmail.com	\N	\N	\N	f
7	\N	mpiggott12@yahoo.com	\N	\N	\N	f

\.

COPY "auth_accounts" FROM stdin;
1	1	credentials	credentials	1	\N	\N	\N	\N	\N	\N	\N	$argon2id$v=19$m=65536,t=3,p=2$c5NS3pX+IS37d0nKQ7724A$hg0U0qqD0XRAqmArpZXqukaLH3G/ErgXrR15vX0qkdU
2	2	credentials	credentials	2	\N	\N	\N	\N	\N	\N	\N	$argon2id$v=19$m=65536,t=3,p=2$HF+tboFJoGqps7LJcGgdWw$4hLvSFMDy8kjRHwPc/1NMkgWqH85O987uhb6Lz1Xgts
3	3	credentials	credentials	3	\N	\N	\N	\N	\N	\N	\N	$argon2id$v=19$m=65536,t=3,p=2$6m4hn2EEIPd+XbvWQD1ZxA$lk+FFHkbCiYAJtY2O9EM1dXmiVJ0Q70RAEEyAL0Kzx4
4	4	credentials	credentials	4	\N	\N	\N	\N	\N	\N	\N	$argon2id$v=19$m=65536,t=3,p=2$Jxp4xfGkYucWMAkdk5AX8A$vqrO50IQlyRJ+vVjU6nJ26zVGdsKklkt31FBMC64SZg
5	5	credentials	credentials	5	\N	\N	\N	\N	\N	\N	\N	$argon2id$v=19$m=65536,t=3,p=2$Wvc1+vP8YxmK1vKzyPThxA$Bt5hyF4FIECfmsGXHAIeSD7NrjgNjaWb0f93fCBHFaY
6	6	credentials	credentials	6	\N	\N	\N	\N	\N	\N	\N	$argon2id$v=19$m=65536,t=3,p=2$i8IFTJEiR5td6iWK3X6sWA$awT4fpwXVwAxj4r0Q7m3Jf6TvLbUzZtIluE3ZPFEBVc
7	7	credentials	credentials	7	\N	\N	\N	\N	\N	\N	\N	$argon2id$v=19$m=65536,t=3,p=2$5sPk+6jMIEGLzvP13DHqvA$E517HYrp+29kbHpeKZ4sYZhiS/HMLgK5TXbvcgZgoxw

\.

COPY "mysteries" FROM stdin;
1773781004260	{"clues": [{"title": "The Spiked Skewer", "description": "A wooden skewer with traces of chili and skin cells was found near Chester's body.", "significance": "The ruffled nature of the skewer indicates it was quickly pulled from a nearby BBQ dish, indicting its impromptu use as a weapon."}, {"title": "Chester's Tasting Spoon", "description": "Chester's tasting spoon, wiped clean, found several feet away from the body.", "significance": "Suggests Chester had no idea he'd be attacked, being in the middle of a tasting; shows Alexis had a moment of spontaneity."}, {"title": "Unedited Video", "description": "Harry's camera captured footage of Alexis suspiciously alibi-checking with Chester during a lull.", "significance": "Reveals Alexis trying to ensure Chester's silence doesn't escalate publically, implying motive for murder."}, {"title": "Spilled Spice Mix", "description": "Greg's actions of utilizing Paula’s spilled spice draws suspicion since it mimics his earlier theft from Chester.", "significance": "While suspicious, it reveals the theft was unrelated to the murder, a red herring."}, {"title": "Backed Up Grill Schedule", "description": "Linda’s documentation of grilling schedules, with an anomaly showing Chester supposed to demo later than scheduled.", "significance": "Indicates Alexis likely shifted time due to personal objectives against Chester."}, {"title": "Paula's Recipe Book", "description": "A copy of Paula’s unpublished book found by Chester’s side, with a message 'To my dearest rival.'", "significance": "Act as a red herring suggesting plagiarism motives, but more of a friendly affectionate sign-off."}, {"title": "Alexis’ Wrong Tour", "description": "Alexis was caught leading a supposed 'house tour' unrelated to property, overheard referencing Chester’s knowledge about funds.", "significance": "Shows Alexis concocting a plan and using distractions to mitigate Chester revealing her secrets."}, {"title": "Beer Bottle Caps", "description": "Several caps with Greg's beer labels found near Chester’s grilling spot.", "significance": "Indicates Chester didn't drink them, as he hated beer; however, it misdirects to potential poisoning theme."}, {"title": "Sauce Spatters", "description": "Fiona’s camera captured sauce splatters on Alexis’ bag, intriguing but not condemning.", "significance": "While initially suspicious, it's simply indicative of the ongoing chaos."}, {"title": "Propane Valve Turned", "description": "Tommy’s propane grill valve manually turned the wrong way in apparent prank escalation with Chester.", "significance": "Redirects suspicion to Tommy’s prank, not the murder, due to lack of connection to timeline."}], "title": "Grill, Thrill, & Kill: A Backyard BBQ Mystery", "victim": {"name": "Chester \\"Chestnut\\" Reeves", "background": "Chester was a legendary figure in the neighborhood cookout scene. A fiery personality with a booming voice, he was as generous with his criticism as he was with his secret sauce (which he never shared, of course). Known for his hyper-competitive nature, Chester always ensured he was the center of attention, whether that meant sharing his grilling tips or aggressively critiquing others. He'd been known to 'accidentally' knock over a rival's sauce bowl or slightly adjust the heat on someone's grill.", "reasonKilled": "Chester's combative nature and constant belittling drove more than a few competitors to frustration, most notably when he publicly shamed someone for using store-bought buns last year, nearly causing a desertion of the BBQ League."}, "premise": "It was supposed to be a sun-soaked afternoon of sizzling steaks and chilled drinks, neighbors haphazardly sprawled across checkered blankets and folding chairs. But this wasn't just any neighborhood BBQ—it was the first annual \\"Grillin' and Chillin' Championship,\\" a culinary face-off where egos simmered hotter than the coals. Everyone was vying for the coveted Golden Spatula, but not everyone was playing fair.\\n\\nAs the afternoon unfolded, tensions were as palpable as the aroma of BBQ sauce. But when the sun dipped beyond the horizon and the fairy lights flickered to life, the discovery of Chester \\"Chestnut\\" Reeves' lifeless body put a damper on the festivities. Found face-down in his own prize-winning chili, this might have been a punchline if not for the wooden skewer lodged between his ribs. \\n\\nChester, the reigning BBQ king known for his devilishly spicy recipes and a knack for rubbing contestants the wrong way, suddenly found himself at odds with more than just sour stomachs. The question lingered: who among them didn't just want to beat Chester at the competition, but wanted to knock him out permanently?", "solution": "The murder's thrust lies in the blend of spontaneity and premeditation typical of Alexis' dramatic flair. The damning clue involved Alexis' anxious interaction with Chester at the grill contest, captured incidentally on Harry's footage. Under the guise of concern for structural integrity, Alexis coerced Chester into revealing what he knew about her shady dealings, buying time until a more opportune moment arose. The BBQ's bustling nature and misplaced grilling schedule provided Alexis the cover, skillfully turning the everyday backyard objects, like a skewer, into lethal weapons.\\n\\nDuring the lull in activity after the incident at 5:30, Chester, distracted by reviewing Linda's mistakenly provided schedule, was caught off-guard. Alexis seized the unexpected opening, abandoning her grainy house tour alibi with little ceremony, to confront him. With culinary fuel simmering around them, Alexis instinctively capitalized on the tumult, skewering Chester in abrupt determination-fueled precision, masquerading it as an impromptu accident to others. The outcome suggested to Fiona's lens – despite lingering suspicions – was less conspicuous, save for Harry’s observational knack.\\n\\nIn the culmination of chaos, Alexis' plan might have dissolved were it not for the resulting questions: why her initiative to shield papers incriminated her before the true ownership of ideas could unravel. Ultimately, the weight of building logistics into veiled threats solidified Alexis’ downfall upon scrutinous re-examination.", "timeline": [{"time": "3:00 PM", "event": "Guests begin arriving, placing their entries for the BBQ contest on the community grilling tables. Chester bickers with Linda about contest rules."}, {"time": "3:30 PM", "event": "Tommy attempts a DJ set, but the feedback from faulty speakers causes argument with Chester over noise quality."}, {"time": "4:00 PM", "event": "Chester accidentally spills Paula’s spice mix, to which Greg adds a pinch to his beer, doubling down on unapproved ingredients."}, {"time": "4:30 PM", "event": "Fiona is seen snapping photos and scribbling notes furiously after tasting Chester's spicy chili."}, {"time": "5:00 PM", "event": "Burt presents his new sauce but is mocked by Chester for tasting like 'a greasy incident report.'"}, {"time": "5:30 PM", "event": "Chester discovers Alexis’ real estate documents mixed in with the BBQ contest forms, leading to a tense disagreement."}, {"time": "6:00 PM", "event": "Chester is found face-down dead in his chili, skewer through his ribs, with no immediate witnesses."}], "characters": [{"name": "Linda Meltner", "role": "Neighborhood Association Dictator", "secret": "Linda has been embezzling funds from the neighborhood association for her personal spa treatments.", "isMurderer": false, "personality": "Linda greets everyone with a syrupy sweetness that stains like glucose. She's the self-appointed ruler of social events, known for compulsively organizing gatherings, and for having an encyclopedic knowledge of the HOA bylaws.", "relationshipToVictim": "Chester once publicly accused Linda of misappropriating funds after he noticed suspicious expense reports."}, {"name": "Greg Tanner", "role": "Local Craft Brewer", "secret": "Greg was using Chester's secret spices for his signature BBQ beer without permission.", "isMurderer": false, "personality": "Greg is the guy who can make a casual comment about hops sound pretentious. He's meticulous about his brewing process and frequently interrupts conversations with unsolicited beer facts. His puns, much like his ales, are equally strong and complex.", "relationshipToVictim": "Greg frequently clashed with Chester over their standing rivalries, especially when Chester threatened to go public with Greg's spice theft."}, {"name": "Paula Pepper", "role": "Stay-at-Home Chef and Gossip Extraordinaire", "secret": "Paula has been passing off Chester’s recipes as her own in an underground cookbook she self-publishes.", "isMurderer": false, "personality": "Paula thrives on the latest community drama, which she spreads faster than she cooks her savory stews. Armed with an innocent-looking notebook, she's infamous for 'accidentally' finding out secrets.", "relationshipToVictim": "Chester accused Paula of plagiarism at last year's BBQ battle, which stained her reputation in front of her foodie fans."}, {"name": "Tommy \\"T-Bone\\" Bowden", "role": "Personal Trainer and Aspiring DJ", "secret": "Tommy sabotaged Chester's propane one year after losing the weight-loss challenge Chester mocked.", "isMurderer": false, "personality": "Tommy tries to be the life of every party, equipped with dad jokes and a Bluetooth speaker pumping outdated club hits. He promotes fitness through any means, even if it means grilling tofu steaks.", "relationshipToVictim": "Chester teased Tommy endlessly for his DJ gigs and tofu-based 'grilling adventures,' calling them 'grills without thrills.'"}, {"name": "Fiona Fenwick", "role": "Food Blogger and Critics Enthusiast", "secret": "Fiona writes scathing reviews under an online pseudonym, targeting larger BBQ events to drive up her readership.", "isMurderer": false, "personality": "Fiona is critical perfection embodied; any event she covers becomes a page in her pungent reviews. She's quick to make enemies by rating local dishes harsher than a Michelin star judge.", "relationshipToVictim": "Fiona's negative review of Chester's award-winning ribs lost him some major fans, a grudge he never let go of."}, {"name": "Burt \\"Burnt\\" Bonfire", "role": "Retired Firefighter and Grill Master", "secret": "Burt accidentally burned down Chester's deck during a grill demonstration gone wrong last summer.", "isMurderer": false, "personality": "Burt thinks of each BBQ as a multi-alarm blaze to tame, and his teasing stories of extinguishing 'burned' attempts are infamous. He's gruff but warm-hearted, with a knack for storytelling.", "relationshipToVictim": "Though Burt and Chester publicly mocked one another, there was an underlying friendly rivalry – but tempers flared when Chester demanded monetary compensation for the incident."}, {"name": "Alexis \\"Lex\\" Dupree", "role": "Real Estate Agent with a Taste for Drama", "secret": "Alexis has been laundering money through property transactions involving Chester's properties.", "isMurderer": true, "personality": "Alexis lives for the theater of life. She could sell water in a storm and make it seem like liquid gold. Known for using open houses as impromptu gatherings, she's always juggling potential buyers and potential gossip.", "relationshipToVictim": "Chester threatened to reveal her dealings, having stumbled upon incriminating documents during a BBQ showcase at his home."}, {"name": "Harold \\"Harry\\" Knutt", "role": "Amateur Detective and Puzzle Enthusiast", "secret": "Harry installed a hidden camera at last year's BBQ, capturing potentially embarrassing footage.", "isMurderer": false, "personality": "Harry is the self-proclaimed Sherlock of the suburb. Too curious for his own good, he documents everything like it’s part of a grander mystery, often connecting dots nobody else sees.", "relationshipToVictim": "Harry and Chester had a mutual respect, though Chester wasn’t above mocking Harry's conspiracy theories, once claiming Harry’s amateur dramatics would make a fine roast."}], "murdererMotive": "Chester discovered Alexis was involved in money laundering, threatening to expose her shady dealings. Fearing her real estate empire would crumble and she’d face legal consequences, she saw no option but to silence him."}	{"tone": "Funny", "setting": "Backyard BBQ", "difficulty": "Medium", "playerCount": "8", "genderCounts": {"male": 4, "female": 4, "neutral": 0}}	2026-03-17 20:56:44.768323+00	0	f	\N	\N
1773781109645	{"clues": [{"title": "Floury Fingerprints", "description": "Beverly's guest bathroom revealed fingerprints some guests recognized as Delilah's on her forbidden cookie jar, found empty.", "significance": "Leads to suspicion that Delilah might have poisoned Ralph, as she frequently sneaks sweets, emphasizing her access to the weapon - a red herring."}, {"title": "Eggs-ercise Video", "description": "A footage found on Priscilla's tablet shows her workout session, featuring a distracted Ralph messing with her script.", "significance": "Shows Ralph's potential awareness of Priscilla's forgery; suggests tension between them and Priscilla's irritation at Ralph."}, {"title": "The Costume Carrot", "description": "A misplaced carrot found tucked into Ralph's bunny suit, undeniably Stanley's trademark mischief.", "significance": "A red herring implicating Stanley's attempt possibly to prank rather than murder Ralph."}, {"title": "Golden Eggshells", "description": "Tiny shards of the legendary Golden Egg, coated in sticky sugar, found smashed near the dining area window.", "significance": "Indicates Ralph got hold of the Golden Egg, causing resentment or anger in some guests."}, {"title": "Sweaty Forged Checks", "description": "Three half-torn checks found within Priscilla's leg warmers when she was questioned, noticeably written in Ralph's name.", "significance": "Damning evidence linking Priscilla's crime directly to financial motives tied to her altercation with Ralph."}, {"title": "Violet Stain Smudge", "description": "Stained reddish-violet grass stains found leading from the lunch area directly to Ralph's body.", "significance": "Implies someone at lunch with a fondness for the violets had time and motive to lure Ralph to his fate — remains clueful but not conclusive."}, {"title": "Crumpled Letter of No Confidence", "description": "A letter found in Lenny Lark's guitar case outlining a complaint Ralph made about Lenny's charity deceit before he threatened exposure.", "significance": "Positions Lenny as a suspect due to his anger towards Ralph for risking his public altruistic persona."}, {"title": "Hidden Knife in Vegan Dish", "description": "A sharpened carrot knife surreptitiously placed under Maggie's table setting, though not the murder weapon, remained suspiciously cleaned.", "significance": "Suggests Maggie's readiness to eliminate candy-based competition but unsuccessfully as a non-lethal weapon of (non)choice."}], "title": "Homicide at the Easter Eggstravaganza", "victim": {"name": "Ralph \\"The Rabbit\\" Willoughby", "background": "Ralph was a local legend, known for his boisterous nature and his annual role as the Easter Bunny. His history as the founder of the town's successful chain of candy shops had made him as wealthy as he was infamous. Ralph's knack for business was matched only by his tendency to irritate those around him — be it through rejecting partnership proposals or winning every local trivia contest with smug know-it-all-ism.", "reasonKilled": "Ralph had a knack for making enemies by swaggeringly treating every competition and every negotiation as one more battle in which to wittily triumph. Recently, his refusal to sell his business to a certain influential buyer left more than just a bittersweet taste in some mouths."}, "premise": "The annual Easter Eggstravaganza is the high point of Dollywood Acres' social calendar. Set against the backdrop of Beverly Bunch's sprawling estate, the event features a competitive egg hunt where rivals clash over cunningly hidden treasures in the hope of winning the legendary Golden Egg — and the yearlong bragging rights that come with it. This year's gathering promises the usual mix of mirth and mayhem, yet, as the echoes of laughter blend with clinking glasses, an unexpected murder cracks open the festive scene.\\n\\nIn the midst of delectable feasts and vibrant egg-painted displays, chaos reigns when redoubtable Ralph \\"The Rabbit\\" Willoughby is found sprawled among a bed of pastel violets, his trademark bunny suit poignantly stained. Rumors swirl like the bitter whiff of Easter egg dye gone wrong. Suspicions multiply faster than bunnies as Ralph's intricate web of friendships, rivalries, and questionable dealings comes to light.\\n\\nAs secrets simmer just beneath the surface, it's up to the attendees to peel back layers of deception and determine who transformed this sunny field day into a murderous affair. Was it a crime of passion — or a sugary plot left out in the sun too long?", "solution": "Priscilla Peep, fueled by financial desperation and the existential risk of Ralph exposing her fraudulent dealings, saw her chance amidst the Eggstravaganza chaos. Her motive was stitched together by the undeniable evidence of the checks shoved hastily into her leg warmers, which she forgot during choreography.\\n\\nDuring their high-energy fitness session, she managed to slip an untraceable dose of lavender essence — purloined delicately from Beverly's ornate sachet collection — into Ralph's sports drink. Coupled with his widespread, mildly competitive allergy to flower-based additives, the combination was lethal.\\n\\nThe trail of rainbow-stained violets, cleverly mimicked against Ralph’s bunny suit, kept inquiries veiled until the connection between the checks and Priscilla's financial anxieties rendered her guilty. Her 'egg-treme' paranoia had led her to a desperate choice, all while guest-driven diversions like costume dramas and merry guitar recitals veiled her tracks until the case cracked open under scrutiny.", "timeline": [{"time": "10:00 AM", "event": "Guests arrive, and Beverly Bunch gives her cheerful welcome speech, opening the Eggstravaganza with fanfare and promises of an exciting day."}, {"time": "11:15 AM", "event": "The egg hunt begins, chaos ensues, and Gerald Goose loudly claims to have already found the fabled Golden Egg, which riles up the more competitive attendees."}, {"time": "12:45 PM", "event": "Ralph becomes the self-appointed Easter Bunny, handing out lesser eggs from his basket, neatly sneaking snide comments into his distribution to Stanley."}, {"time": "1:30 PM", "event": "Priscilla leads eager exercisers, including Ralph, into a high-energy egg-spired jumping jacks session, suspiciously eyeing Ralph's bubbling laughter."}, {"time": "2:15 PM", "event": "Lunch is served, with Maggie Meadow promoting her vegan 'n-eggs' dishes, skilfully making egg-related puns as she collects accolades and protest messages alike."}, {"time": "3:00 PM", "event": "Ralph is discovered dead among the violets by an unsuspecting poet searching for inspiration; not an egg in sight but a perplexing rainbow hue scattered on his clothes."}], "characters": [{"name": "Beverly Bunch", "role": "Host of the Easter Eggstravaganza and real estate mogul", "secret": "Beverly is deeply in debt despite her wealthy facade and planned to swindle Ralph into a business deal that would have transferred his candy empire to her.", "isMurderer": false, "personality": "Annoyingly cheerful while cunningly driven, Beverly feigns interest in every conversation, often using them to gather useful tidbits. Her Easter brunches are infamous for featuring marmalade that somehow mysteriously disappears by the spoonful.", "relationshipToVictim": "Beverly saw Ralph as both a friend and business opportunity owing to his candy chain, hoping to tie him into the lush real estate deals she often spun in post-brunch tête-à-têtes."}, {"name": "Stanley Sillyman", "role": "Carrot farmer and Ralph's archrival in local costumes", "secret": "Stanley once planted secret carrots on Ralph's property to sabotage the latter's prize rose bushes as a prank gone too far.", "isMurderer": false, "personality": "Perpetually stuck in Dad joke mode, Stanley is as irritating as a soggy woolen jumper but with a taste for the dramatic — he frequently changes into yet another costume at inopportune times.", "relationshipToVictim": "A longtime rival who used to compete with Ralph for the 'Best Bunny' title at every Easter contest, only to be outshone each time."}, {"name": "Delilah Dobbins", "role": "Gossipy town baker with a cunning edge", "secret": "Delilah is conducting an illicit egg-trading business on the side to boost her poorly-performing bakery sales.", "isMurderer": false, "personality": "Always has flour in her hair and a rumor on her lips, Delilah doesn’t just knead dough — she kneads information. Her notorious pastries come with handwritten notes — some sweet, others spicy.", "relationshipToVictim": "Supplier of baked goods to Ralph's candy stores. They had a love-hate relationship due to their constant negotiating over confectionery contracts, which might as well have been deathmatches."}, {"name": "Gerald Goose", "role": "Ex-lawyer turned egg enthusiast", "secret": "Gerald lost his law license due to unethical client dealings and has been laying low by collecting eggs.", "isMurderer": false, "personality": "Approaches egg collection like a courtroom interrogation, in which everything is outrageously dramatic and just a touch disorganized. Known for his feigned indignation and oddball metaphors.", "relationshipToVictim": "Ralph's frequent companion on egg hunts that transformed from innocent fun into heated battles to protect the rights of his rarer finds."}, {"name": "Priscilla Peep", "role": "Fitness instructor with a proclivity for mystery shows", "secret": "Priscilla has been forging checks in Ralph's name to fund questionable egg-related health products she insists she can make 'eggcellent'.", "isMurderer": true, "personality": "Energetic and zealous about eggs-ercise, constantly talks about the 'core' of issues and quite literally runs circles around others during conversations — usually to the intense annoyance of less athletic types.", "relationshipToVictim": "She put Ralph through grueling Easter-themed workout regimens last month after crossing paths at his candy shop in between relapses of his sweet tooth fix."}, {"name": "Lenny Lark", "role": "Folksy musician and Ralph's childhood friend", "secret": "Lenny pocketed some donations from a charity concert meant to aid bee preservation, but things went awry when Ralph found out and threatened to expose him.", "isMurderer": false, "personality": "Plays guitar karaoke inappropriately at formal events, loudly reminiscing about 'the good old days'. His stories would be far-fetched if only you could stay awake through them. ", "relationshipToVictim": "He grew up with Ralph, sharing childhood escapades and always losing to him in almost every contest — even pie-eating ones."}, {"name": "Maggie Meadow", "role": "Vegan chef and radical environmentalist", "secret": "Recently took things too far in sabotaging Ralph's business by intercepting a key shipment to promote her own vegan treats.", "isMurderer": false, "personality": "Politely attempts to wow people with terrible vegan egg dishes, even when unasked. Combines an obsession with 'eggless' alternatives and frequent discussions about tiny house living.", "relationshipToVictim": "Their relationship teetered on mutual distrust, as Ralph couldn't stand her anti-candy campaigns and she secretly loathed his dominance in local edible appeals."}], "murdererMotive": "Priscilla Peep feared Ralph discovered her forgery when he jokingly asked her during a training session if she had 'exercised' her fingers by writing checks recently, anxious that his uncanny suspicion would root her scam out at his stores, thus threatening her burgeoning egg-centric health venture."}	{"tone": "Funny", "setting": "Holiday - Easter", "difficulty": "Medium", "playerCount": "7", "genderCounts": {"male": 4, "female": 3, "neutral": 0}}	2026-03-17 20:58:30.022865+00	0	f	\N	\N
1773782251701	{"clues": [{"title": "Stained Napkin", "description": "A fancy monogrammed paper napkin found near the punch bowl, with an unusual bright-colored stain.", "significance": "The stain was incongruent with the dinner menu, possibly indicating another drink—or poison—was involved in the murder."}, {"title": "Peculiar Playlist", "description": "A song that was unexpectedly upbeat played in the moments prior to Chase's death, causing a brief crowd silence.", "significance": "Chosen specifically by Kai who used it to mask the sound of a struggle during everyone’s start-and-stop dance moves."}, {"title": "Silenced Phone", "description": "Chase’s phone, found on silent and perilously close to water spillage, typically was ablaze with notifications.", "significance": "Reflects Kai’s knowledge of Chase silence-managing notifications for infamous post-reunion activities, a method to ensure he wasn't interrupted during the murder."}, {"title": "Broken Earring", "description": "A single earring found clenched tightly in Chase’s hand, ornately designed, artistically fashioned.", "significance": "The earring was in fact from Kai’s preferred body aesthetics, ignored due partly from similar design to Paisley’s patterns. A red herring, but vital elevation in suspect’s angle."}, {"title": "Alibi Note", "description": "Crumbled, hastily-sprawled note in Chase’s dressing robe, outlining rapid, disconnected points.", "significance": "Reflects Kai’s incessant preoccupation with details, potentially his drafting before performing an act.”"}, {"title": "Vanishing Video", "description": "Footage missing of Chase in his last known moments. According to the timeframe notes, should exist enduringly.", "significance": "Suggests a knowledgeable hand or willingness to edit out what kindled revelations toward Kai’s motive."}, {"title": "Forged Invitation", "description": "Adds another guest to the list, an unknown persona not present, projecting namesake of shared persona-house fame.", "significance": "A deliberate distraction imitated in tandem with event schedule to tent cast shades elsewhere, ensuring their expulsion by sincerity’s hand."}], "title": "Recoil Reunion: Famous for Fifteen Minutes", "victim": {"name": "Chase Glitter", "background": "Chase Glitter was the show's breakout star, once dubbed \\"reality TV's golden child\\" before squandering his fame on dubious endorsement deals and attention-seeking stunts. Known for his dazzling smile and propensity for melodrama, Chase had a knack for stirring the proverbial pot, gaining friends as easily as he burned bridges with his opportunistic charm.", "reasonKilled": "As the reunion's focal point, Chase was about to sell damaging stories about his old castmates to a tabloid—information gleaned from when he pretended to be their confidante just to bolster his own publicity."}, "premise": "Welcome to the first-ever reality TV reunion-takedown extravaganza! The stars of the hit-and-miss reality show \\"Famous for Fifteen Minutes\\" have gathered under one leaky roof for a weekend filled with reminiscing, revisiting old feuds, and potentially reviving once-famous antics. Hosted by the ever-snarky and questionably sober TV producer Randy Glint, this reunion promises all the drama and none of the dignity. \\n\\nIt's day one, and tensions have already boiled over more than the coffee urn. Scandals, schemes, and simmering secrets pop up between handshakes and air-kisses, but the stage is set for a shocking twist: our once-glorious housemate, Chase Glitter, is found face-first in his own novelty punch bowl, utterly and irrevocably deceased. Was it accidental death by embarrassing drunkenness, or something far more sinister behind the scenes of this reality revival?", "solution": "The seemingly innocuous social media manager, Kai Pixel, is revealed to be the murderer. Kai couldn't bear the thought of having his secrets exposed by Chase, who relished holding power over his once-sycophants. Knowing Chase too often exploited pixelated secrets past Kai’s quashes, he acted when pressure sucked expression from personal pixels themselves.\\n\\nKai preemptively plotted the night, using his orchestrated playlist selection to cover any noises during the brief struggle, slyly adding somnolent syrup from a compromised drinking tray. His monogram napkin taints held the vile substance mixed daintily. Moment’s unique exposure and familiarity enabled Chase’s midslow silence banter show their webs effectively—evoked through event-phobic foresight, live-to-air hearsay unable to articulate fouler truths dashed against pixelated persuasions challenged until Kai’s clear hand lay indelibly fleshed unique until thorough ferocity extinguished the irksome influence from his path for independence.", "timeline": [{"time": "4:30 PM", "event": "Guests begin arriving for the reunion, with pomp and flair while production captures B-roll footage."}, {"time": "5:00 PM", "event": "Chase greets everyone with his usual magnum charisma, gathering circles of intrigue and avoidance."}, {"time": "7:15 PM", "event": "Dinner is served, laughs shared, with early tension dismissed as harmless bravado from former escapades."}, {"time": "8:45 PM", "event": "Kai Pixel has a discrete, tense argument with Chase near the verandah, witnessed only by ambient lighting."}, {"time": "9:30 PM", "event": "Chase is discovered unresponsive, submerged in his own punch bowl. Chaos ensues, reality warped as everyone scrambles."}], "characters": [{"name": "Randy Glint", "role": "Producer", "secret": "He has been embezzling money from the show's budget for years, covering tracks by blaming cast expenses.", "isMurderer": false, "personality": "Cynical yet charismatic, constantly makes behind-the-scenes digs at cast members while keeping his public persona amped up for the cameras.", "relationshipToVictim": "Always had a soft spot for Chase's drama, seeing him as the goose with golden eggs, despite personal disdain."}, {"name": "Poppy Daze", "role": "Influencer", "secret": "Sells counterfeit beauty products disguised under her successful makeup brand.", "isMurderer": false, "personality": "Bubbly yet backstabbing, she churns out sweet but shallow personas for her followers, with sass lurking beneath her Instagram-worthy aesthetic.", "relationshipToVictim": "Constant frenemy who envied Chase's effortless spotlight-stealing capabilities."}, {"name": "Tank Crushmore", "role": "Ex-Wrestler", "secret": "Runs an underground fight club in the guise of a charity gym.", "isMurderer": false, "personality": "Gruff but unexpectedly sentimental, often muddled in intent, confuses brute strength for charisma.", "relationshipToVictim": "Frenemy who remembered Chase more for their on-show wrestling shenanigans than the backstabbing afterwards."}, {"name": "Paisley Feather", "role": "Fashion Designer", "secret": "Has been stealing designs from upcoming, naive designers and claiming them as her own.", "isMurderer": false, "personality": "Eccentrically chic, sketches designs during conversations, often oblivious to human emotions that aren't trendy enough for her.", "relationshipToVictim": "Adores Chase's dramatic flair but despises his inability to appreciate high fashion truly."}, {"name": "Jules Trent", "role": "Comedian", "secret": "Ghostwrites celebrity jokes and scandals instead of performing his own material.", "isMurderer": false, "personality": "Always quick with a quip, hides a storm of emotions beneath the jokes, distracts with relentless humor, but rarely serious.", "relationshipToVictim": "Relied on Chase's unpredictability for the best unscripted reactions during the show's conflicts."}, {"name": "Sunny Shores", "role": "Lifestyle Guru", "secret": "Faked most of her spiritual journeys and discoveries for the fame and lifestyle brand deals.", "isMurderer": false, "personality": "Virtually zen yet secretly anxious, overcompensates with wellness tips and forced optimism hiding underlying stress.", "relationshipToVictim": "Resentful that Chase often mocked her advice, yet relies on his outrageousness to sell her serene contrast."}, {"name": "Blaine Brooks", "role": "Real Estate Agent", "secret": "Involved in multiple real estate fraud schemes, using show connections for illicit deals.", "isMurderer": false, "personality": "Smooth-talking and relentlessly competitive, thrives on charm masking a cutthroat approach to sales and life alike.", "relationshipToVictim": "Saw Chase as an irksome client who could never settle on one persona off-camera."}, {"name": "Lila Luxe", "role": "Actress", "secret": "Pays for rave reviews and attention, artificially boosting her acting career with fabricated acclaim.", "isMurderer": false, "personality": "Performs daily life as if always auditioning, often led by dramatics over logic, dynamic and intense.", "relationshipToVictim": "On-air chemistry was electric with Chase, but off-air, she found him flaky and self-serving."}, {"name": "Diego Rhythm", "role": "DJ", "secret": "Unknowingly sampled unauthorized music, gaining fame off audio piracy.", "isMurderer": false, "personality": "Easily distracted beats-match maker, focuses on his music more than interactions; juggles beats and social grace clumsily.", "relationshipToVictim": "Played up his friendship with Chase for exposure at self-promotional events."}, {"name": "Sydney Glimmer", "role": "Makeup Artist", "secret": "Tampered with products as revenge against clients who failed to recognize her artistry.", "isMurderer": false, "personality": "Meticulous perfectionist, loves blending colors and people, but can be exacting and bristles at failures.", "relationshipToVictim": "Provided Chase's essential camera-ready face during improv shows, often abhorred his last-minute requests."}, {"name": "Carter Wind", "role": "Ex-Reality Star", "secret": "Spends millions maintaining the mirage of wealth on social media, while penniless in reality.", "isMurderer": false, "personality": "Haughty, still reliving fame through lens flares, adorning himself with nostalgia-infused delusion.", "relationshipToVictim": "Once best friends with Chase, set apart by Chase’s eventual superficial fallout for TV ratings."}, {"name": "Riley Sparks", "role": "Talent Agent", "secret": "Secretly signed away half her clients to a competitor for double commissions, duplicitous and greedy.", "isMurderer": false, "personality": "Savvy negotiator with a tendency for impatience, parses through talent as if flicking through a deck of cards relentlessly.", "relationshipToVictim": "Reluctantly parted ways with Chase when he sabotaged his career potential for quick-calculated storylines."}, {"name": "Jamie Lynx", "role": "Bartender", "secret": "Keeps records of every secret overheard and sells them to tabloids.", "isMurderer": false, "personality": "Generous pourer who listens more than speaks, catches secrets in bottoms of glasses, watchful and wily.", "relationshipToVictim": "Facilitated Chase’s party-animal feats with discretion-albeit self-interest, profiting from anecdotes."}, {"name": "Jessie Storm", "role": "Personal Trainer", "secret": "Uses banned substances in training regimens to push clients to better results.", "isMurderer": false, "personality": "Bullish motivator, drives clientele from zestful workouts to motivational diatribes; energy uncontained, occasionally abrasive.", "relationshipToVictim": "Cajoled Chase into multiple health-risks televised rather than improving his (literal) fitness fame."}, {"name": "Kai Pixel", "role": "Social Media Manager", "secret": "Ran multiple fake fan accounts bolstering competitors’ assets for a price.", "isMurderer": true, "personality": "Hyper-focused on online personas, prone to snark behind anonymous accounts, managing narratives both real and illusionary.", "relationshipToVictim": "Helped Chase manage social backlash, all for the algorithm bumps of his ridiculous stunts."}, {"name": "Robin Harmony", "role": "Vegan Chef", "secret": "Mixes non-vegan ingredients in recipes while branding meals as authentically animal-free.", "isMurderer": false, "personality": "Campfire warmth, nurturing inclusivity in cooking, delivers feedback sandwiches insincerely spiced with ulterior motives.", "relationshipToVictim": "Fed into Chase's vanity with specialties at events; wasn't slipped reimbursements for cost."}, {"name": "Tyler Loop", "role": "Aspiring Filmmaker", "secret": "Stole tape evidence, using raw footage for possible blackmail material.", "isMurderer": false, "personality": "Artistic dreamer entrapped by ambition, oft begging reality to match narrative vision; accidentally absent-minded.", "relationshipToVictim": "Turned Chase’s dramas into naive auteur reels, finding his antics both muse and curtain-call."}, {"name": "Jordan Flare", "role": "Occultist", "secret": "Performs sleight-of-hand cons between genuine mystic tricks for extra cash.", "isMurderer": false, "personality": "Occasionally ethereal, weaves mystery as if predicting future hits, often speaks in hopeful if poisoned visitors’ metaphors.", "relationshipToVictim": "Chased down ghostly rumors at Chase’s behest, oft grimly entangled with futile pursuits."}], "murdererMotive": "Kai Pixel, tired of changing careers and temperament to dodge Chase's mercurial whims, learned that Chase clandestinely planned to reveal all his secrets compiled from previous social media mishaps. To avoid derailing his future in digital branding, Kai plotted Chase's end."}	{"tone": "Funny", "setting": "Reality Show Reunion", "difficulty": "Medium", "playerCount": "18", "genderCounts": {"male": 8, "female": 7, "neutral": 3}}	2026-03-17 21:17:32.590664+00	0	f	\N	\N
1773787601489	{"clues": [{"title": "Glass Slipper", "description": "Found shattered near the punch table, a high-heeled shoe with a broken heel lies abandoned.", "significance": "The shoe belongs to Dr. Rivera, suggesting she was at the scene soon before murder."}, {"title": "Wet Feather Boa", "description": "A sodden feather boa is discovered tangled with the cords of a nearby sound system.", "significance": "The boa initially implicates socialite guests, but actually belonged to Thomas Fink in a costume mistake."}, {"title": "Cuffed Flasks", "description": "Several empty, monogrammed flasks of whiskey disposed under the table.", "significance": "Indicates that more than one person knew a distraction would happen during the performance."}, {"title": "Program Schedule", "description": "A gala program with certain acts circled in pen—one of them is the performance that preceded the murder.", "significance": "Andover's notes, which highlight 'secrets to share' during specific events, indicate planned confrontations."}, {"title": "Stolen Keys", "description": "Found in an auditorium seat, the master keys to the building are missing from the janitor’s ring.", "significance": "The keys could allow any character access to secure areas, but are traced back to Nathaniel Sykes' jacket."}, {"title": "Broken Lab Glass", "description": "Shards of a science lab beaker, stained with punch, litter the ground behind the refreshment table.", "significance": "Glass directly from Dr. Rivera's lab with her fingerprints ties her to tampering with the punch."}], "title": "Murder at the Mascot's Masquerade", "victim": {"name": "Professor Richard Andover", "background": "Professor Richard Andover was a long-standing member of Whistleberry Academy's faculty, esteemed in public but controversial behind closed doors. Known for his charming wit and cutthroat business acumen, he spearheaded numerous successful fundraising campaigns, all while skimming portions of the funds for his personal investment schemes.", "reasonKilled": "Richard Andover's penchant for financial manipulation and elitist snobbery earned him enemies among students, faculty, and benefactors alike. His latest scandal involved embezzling from a scholarship fund, threatening the educational futures of the Academy's promising students."}, "premise": "At the prestigious Whistleberry Academy's annual fundraiser gala, the school's influential alumni gather under the guise of elegance and philanthropy. This year's gala, themed \\"The Roaring Twenties,\\" transforms the ornate school gymnasium into a grand speakeasy, complete with flappers and fedoras. faculty members, students, and wealthy benefactors from all walks of life mingle beneath the shimmering chandeliers, their laughter and jazz music creating an intoxicating haze.\\n\\nAs the evening progresses, the centerpiece of the night—a gleaming golden statue of the school's mascot, a whimsical raccoon—captures everyone's attention. But beneath the glitz, rivalries brew and old grudges simmer. When the event's illustrious benefactor, Professor Richard Andover, is found face-down in the punch bowl, it sends shockwaves through the event. With a storied history of misappropriating school funds and using his academic clout for personal gain, Professor Andover had amassed a long list of enemies. Now, amidst the clinking glasses and Charleston tunes, a murderer lurks, hidden behind a mask of respectability.", "solution": "Dr. Elena Rivera, fearing the ruination of her scientific career, planned to eliminate Professor Andover after he threatened to expose her falsified research. She intended to confront him while everyone's attention was on the dance performance. Her distinctive shoe broke during the scuffle, leaving the glass slipper behind. During the chaos of the flickering lights, Elena seized the brief moment to drown Andover in the punch bowl, using the lab beaker to ensure it looked like an accident due to his drunken state already being covered by the premeditated whiskey distraction. The glass shards and shoe prove her presence and motive, as her research fraud was the only secret dire enough to risk everything.", "timeline": [{"time": "7:00 PM", "event": "Guests begin arriving at the gala, with flappers and suits creating a lively atmosphere."}, {"time": "8:00 PM", "event": "Professor Andover makes a grand entrance, making rounds to charm donors."}, {"time": "8:30 PM", "event": "Andover is seen in a heated discussion with Dr. Rivera, making gestures as if revealing secrets."}, {"time": "9:00 PM", "event": "A dance performance captures everyone's attention, providing a perfect distraction."}, {"time": "9:15 PM", "event": "The lights flicker briefly, then Andover is found dead in the punch bowl as the lights stabilize."}], "characters": [{"name": "Maggie DuPont", "role": "School Librarian", "secret": "Maggie has been secretly selling rare books from the school library to pay off her gambling debts.", "isMurderer": false, "personality": "Maggie's tendency to shush the world around her and her obsession with Dewey Decimal jokes make her a quirky but endearing figure.", "relationshipToVictim": "Maggie once had a relationship with Professor Andover, but their romance soured when she discovered his financial indiscretions."}, {"name": "Thomas Fink", "role": "Athletic Coach", "secret": "Thomas was bribed by Andover to ensure certain benefactors' children made the sports teams, regardless of talent.", "isMurderer": false, "personality": "Thomas is boisterous, always conducting imaginary plays and heartily slapping everyone on the back, often harder than expected.", "relationshipToVictim": "Andover's manipulations led Thomas into uncomfortable ethical gray areas, but he complied due to the lucrative payoffs."}, {"name": "Dr. Elena Rivera", "role": "Science Teacher", "secret": "Dr. Rivera fabricated research data to gain a prestigious grant, and Andover found out.", "isMurderer": true, "personality": "Elena is passionate about her experiments, often blowing things up in the lab, to the chagrin of her students and faculty.", "relationshipToVictim": "She often clashed with Andover, whose traditional values she saw as stifling innovation."}, {"name": "Graham Kendall", "role": "Head of Alumni Relations", "secret": "Graham embezzled small sums from alumni donations to fund his personal yachting trips.", "isMurderer": false, "personality": "Graham is smooth-talking, always ready with a story about 'the good old days' that invariably bores everyone to tears.", "relationshipToVictim": "Graham's schemes paled in comparison to Andover's, but they frequently collaborated on \\"creative accounting\\" projects."}, {"name": "Lila Summers", "role": "Student Council President", "secret": "Lila forged student records to grant undeserving students special privileges.", "isMurderer": false, "personality": "Lila is overly enthusiastic, orchestrating pep rallies and endless committees, much to everyone's fatigue.", "relationshipToVictim": "Andover's endorsement was crucial for Lila’s rise to power, but she feared his leverage over her growing weak."}, {"name": "Jackie Beaumont", "role": "Secretary to the Dean", "secret": "Jackie has been siphoning office supplies to sell online.", "isMurderer": false, "personality": "Jackie's no-nonsense attitude means she runs the office with military precision, despite often resorting to dark humor.", "relationshipToVictim": "Jackie was Andover's main confidante, in charge of covering up his financial dalliances."}, {"name": "Nathaniel Sykes", "role": "Tech Support Specialist", "secret": "Nathaniel hacked into the school’s databases for personal revenge against a professor who failed him.", "isMurderer": false, "personality": "Nathaniel is reserved, preferring the company of computers to people, often late-night coding under his breath.", "relationshipToVictim": "Though unaware, Andover's passive aggressive attitude towards \\"geeks\\" always rubbed Nathaniel the wrong way."}, {"name": "Beatrice Morris", "role": "Cafeteria Manager", "secret": "Beatrice has been diverting gourmet ingredients meant for the school into her aspiring catering business.", "isMurderer": false, "personality": "Beatrice rules the lunchroom with an iron ladle, her stern facade occasionally cracked by an irrepressible cackle.", "relationshipToVictim": "Professor Andover orchestrated unnecessary health inspections, jeopardizing her reputation and business."}], "murdererMotive": "Dr. Elena Rivera killed Professor Andover after he threatened to expose her falsified research data, which would ruin her academic career and discredit her life's work."}	{"tone": "Funny", "setting": "Private School Fundraiser Gala", "difficulty": "Medium", "playerCount": "8", "genderCounts": {"male": 4, "female": 4, "neutral": 0}}	2026-03-17 22:46:42.050008+00	0	f	\N	\N
1773787928392	{"clues": [{"title": "Broken Fitness Band", "description": "A shattered fitness band, found near Charles' yurt, has dirt on it.", "significance": "Confirms Charles was out after the campfire session, playing into Derek's ruse about a late-night run."}, {"title": "Culinary Knife", "description": "A clean knife from Fiona's set appeared behind the kitchen tent, sparking immediate suspicion.", "significance": "Intended as a red herring, initially implicating Fiona with a weapon from her professional set."}, {"title": "Mocking Blog Post", "description": "A draft blog post by Charles, harshly ridiculing Derek's latest workout routine, unfinished, on his tablet.", "significance": "Confirms motive for Derek. This post suggested his downfall wasn't quite over."}, {"title": "Schnapps Bottle", "description": "An empty bottle of potent schnapps discovered in the communal area.", "significance": "Initially suggests Genevieve had something to celebrate or hide, given her known fondness for schnapps."}, {"title": "Secret Text Exchange", "description": "Texts between Derek and Fiona discussing a potential 'business venture' gone sour seem ominous.", "significance": "Red herring, merely cryptic discussions about health food collaboration."}, {"title": "Denied Investment Documents", "description": "Rejected investment paperwork addressed to Charles found in Harold's briefcase.", "significance": "Red herring, irrelevant but casts suspicion on Harold for financial motives."}, {"title": "Abandoned Hiking Boots", "description": "A pair of muddy boots too large for Charles' feet uncovered outside Derek's tent.", "significance": "Critical clue confirming Derek's late-night travel and implicating him further."}, {"title": "Midnight Alarm on Phone", "description": "Charles' phone alarm set to midnight but no calendar notes or meetings listed.", "significance": "Implies meetings planned intentionally by Derek to cover up his movement."}], "title": "Glamping Gone Grim", "victim": {"name": "Charles Detritus", "background": "Charles Detritus was an enigmatic mogul in the lifestyle industry, having built a multi-million dollar brand on minimalism and self-sufficiency. Despite the wealth, Charles preferred obscurity, leading many to speculate wildly about his personal life and provocative ideas.", "reasonKilled": "Charles often tangled with competitors and former allies, unafraid to strip them of dignity or business via his candid exposés and truthful blogs."}, "premise": "When ten so-called influential socialites retreat to the Wilderness Palatial Yurts for a weekend of bonding and luxury under canvas, none expect the adventure to be literally cut short. Hosted by the formerly reclusive lifestyle magnate, Charles Detritus, this jaunt into nature promises gourmet dinners, engaging fireside discussions, and some well-needed R&R. Each guest, handpicked for their charm, skill, or flair for drama, is anticipating an unforgettable weekend: echoes of owls hooting and the crackle of campfires are meant to replace their urban cacophony.\\n\\nBut on the first morning, amidst dew-kissed leaves and the smell of artisanal coffee, Charles is discovered sprawled out on his bed of nature—dead, clutching a tuft of grass in his hand. As panic erupts and accusations fly, it becomes clear that the placid surface of this retreat hides a cesspool of grudges, envy, and betrayal.", "solution": "Derek Steele, entangled in a web strung from desperation and losing his foothold in the wellness industry, carefully slipped out post-campfire stories. With his reputation shredded, he couldn't bear another blow from Charles' blog. He feigned a retreat to bed, but instead donned Charles' missing under-a-yurt boots. He skulked through slick paths towards Charles' plush tent when others were either sleeping or puffing indulgent cigars in circles.\\n\\nDerek's intention was simple: stop one more exposition from driving another nail into his faltering persona. The clue unraveling his plan lies in the draft post on Charles' tablet and the distinct footprint trail leading to and from the scene. It was Derek's moment of wrath disguised as an impulsive walk in nature that clinched what seemed merely far-fetched. His presence earlier ensured, when followed later, the murder at Glamping Gullible only had its guest of failure to backtrack.", "timeline": [{"time": "3:00 PM", "event": "Guests arrive and are shown their accommodations, followed by a welcome speech by Charles."}, {"time": "6:00 PM", "event": "Gourmet dinner prepared by Fiona marks the official start of the retreat."}, {"time": "9:00 PM", "event": "Guests gather around the campfire; Charles shares some 'harmless' industry gossip."}, {"time": "11:00 PM", "event": "Charles bids goodnight, while some guests continue to chat or retire to their yurts."}, {"time": "7:00 AM", "event": "Charles is found dead in his yurt by Lance Brightly during a morning yoga session."}], "characters": [{"name": "Victoria Price", "role": "Reclusive Novelist", "secret": "She plagiarized some of her early work from Charles' unpublished material.", "isMurderer": false, "personality": "Victoria consistently channels her mystery writing prowess into off-putting anecdotes, delighting in unnerving her fellow campers with unexpected trivia.", "relationshipToVictim": "An old confidant turned estranged due to his discovery of her plagiarism."}, {"name": "Lance Brightly", "role": "Motivational Speaker", "secret": "His techniques were debunked by Charles in a viral article, diminishing his reputation.", "isMurderer": false, "personality": "Lance's booming voice is rivaled only by his equally inflated ego. His claims to fame rest on his questionable motivational tactics.", "relationshipToVictim": "Former friend burned by public humiliation after Charles exposed his wacky tactics."}, {"name": "Fiona Sweets", "role": "Gourmet Chef", "secret": "Fiona poisoned a competitor’s souffle to win a major cooking competition years ago.", "isMurderer": false, "personality": "Fiona aims to please with constant culinary confections, overflowing with ideas and critiques; she treats every meal as a competitive cook-off.", "relationshipToVictim": "Once hired by Charles to cater events, their partnership soured over a dish gone wrong."}, {"name": "Derek Steele", "role": "Fitness Guru", "secret": "Derek defrauded fans with falsified health benefits.", "isMurderer": true, "personality": "Derek's enthusiasm for life is matched only by his resistance to anything involving gluten or sugar. He promotes eccentric workout regimens with militant zeal.", "relationshipToVictim": "Another victim of an unflattering Detritus blog post that ruined a lucrative sponsorship deal."}, {"name": "Clara Bell", "role": "Lifestyle Blogger", "secret": "Her blog plagiarized heavily from Charles, leading to a nasty settlement.", "isMurderer": false, "personality": "Clara captures every moment in technicolor perfection, though the act of chronicling life leaves her missing many nuances.", "relationshipToVictim": "Once a mentee who eventually manipulated his work for profit."}, {"name": "Oscar Leafson", "role": "Tech Entrepreneur", "secret": "His 'revolutionary' app was cribbed from an idea sketched by Charles over coffee.", "isMurderer": false, "personality": "Oscar's never more than a second away from his next big breakthrough, though most folks dismiss him as a walking pitch deck.", "relationshipToVictim": "Stealthy admirer who learned a bit too well from Charles' business tricks."}, {"name": "Genevieve Glow", "role": "Influencer", "secret": "She blackmailed Charles over years-old intimate photos that could sink his reputation.", "isMurderer": false, "personality": "Genevieve blends charm with the art of persuasion, having convinced nearly everyone without trying.", "relationshipToVictim": "Occasional collaborator with benefits that turned mortal foe due to blackmail."}, {"name": "Harold Plum", "role": "Wealth Manager", "secret": "He invested a hefty sum in a failing venture, using insider info from Charles to recover some but not all losses.", "isMurderer": false, "personality": "He speaks the language of digits and dividends so fluently, it's a wonder he communicates with people at all.", "relationshipToVictim": "Financial confidant whose trust dwindled after catastrophic investment advice."}, {"name": "Lilith Vaughn", "role": "Interior Designer", "secret": "She designed Charles' new office then leaked celebrity-style photos without permission.", "isMurderer": false, "personality": "Lilith's vision turns chaos into surprisingly cozy spaces, though her penchant for overly complex concepts tends to bemuse clients.", "relationshipToVictim": "Close collaborator clashed over style and subterfuge."}, {"name": "Kevin Sparks", "role": "Comedic Influencer", "secret": "His 'private jokes' often stepped over the line, including tasteless parodies of Charles’ seminars.", "isMurderer": false, "personality": "Kevin lives to find laughter in the absurdities of life, pranking friends into every opportunity.", "relationshipToVictim": "Fellow prankster burned relationship after capturing Charles on a bad day."}], "murdererMotive": "Derek Steele, humiliated by a brutally honest critique from Charles that decimated his income, concocted a plan to enact ultimate revenge. Charles' revelation didn't just expose Derek's questionable practices; it obliterated his self-worth, leaving him desperate and deadly."}	{"tone": "Funny", "setting": "Luxury Glamping Retreat", "difficulty": "Messy", "playerCount": "10", "genderCounts": {"male": 4, "female": 6, "neutral": 0}}	2026-03-17 22:52:08.915569+00	1	f	\N	\N
1773788545307	{"clues": [{"title": "The Butterfield's Bad Taste (Shattered Goldfish)", "description": "A small, garish ceramic figurine of a goldfish wearing a monocle lies shattered on the study floor near Barty's body. It looks cheaply made, yet the pedestal it fell from is clearly antique. A faint, almost imperceptible scratch near the base of the pedestal suggests it was recently moved.", "significance": "Coco had just swapped out one of Barty's genuine (but ugly) heirlooms for one of her fakes. Barty might have dropped it just before he died, possibly noticing the replacement, or simply fumbling. This implicates Coco, initially."}, {"title": "A Doctor's Discomfort (Crumpled Prescription)", "description": "A crumpled, empty prescription bottle for 'Barty's Bliss' (a known placebo but highly expensive and rare) is found near the study door, as if hastily dropped. The label states: 'Dr. A. Finch, M.D. - Take 3 times daily, exactly as directed.'", "significance": "Dr. Finch was likely in the study, perhaps arguing with Barty over his threat to get a 'second opinion' for his non-existent disease, or administering a dose. This implicates Dr. Finch, initially."}, {"title": "The Chef's Culinary Critique (Blog Printout)", "description": "Tucked under a stack of bewildering 'basket weaving' sketches on Barty's desk is a printout of a highly critical food blog post. The headline reads: 'Gastronomic Abomination: The Billionaire's Bland Banquets.' The anonymous author savagely details Barty's bizarre dietary requests.", "significance": "Barty had discovered Pierre's anonymous blog and was planning to invest, which would have revealed Pierre's identity and livelihood. This implicates Pierre, initially."}, {"title": "An Oily Rag (Engine Room Cloth)", "description": "A greasy, heavy-duty canvas rag, faintly smelling of diesel and seawater, is balled up and partially hidden under a plush velvet couch cushion in Barty's study. It's the kind of rag used routinely in the yacht's engine room.", "significance": "This suggests someone from the engine room—Captain Bea—was recently in the study and left it behind. It links her to the crime scene, potentially after a confrontation."}, {"title": "The Captain's Cryptic Log Snippet", "description": "A torn page from Captain Bea's personal, handwritten ship's logbook is found tucked into Barty's discarded (and very expensive) ascot near his body. An entry, dated for that evening at 20:15 (8:15 PM), reads: 'Abn. comp. in aux. hold. Threat to op. imminent. Prep. for 'unforeseen maintenance'.'", "significance": "'Abn. comp.' refers to an 'abnormal compartment' or component in the auxiliary hold, where her illegal salvage gear is stored. 'Threat to op. imminent' directly refers to Barty's new hobby and his intention to explore. 'Unforeseen maintenance' is a clear euphemism for taking care of the 'problem'—Barty—before he exposed her operation."}, {"title": "A Missing Tool (Engraved Wrench)", "description": "Captain Bea Thorne's personal tool belt, usually hanging meticulously by the ship's wheel, is present, but her custom-made, heavy-duty wrench is missing. The wrench is engraved with her initials: 'B.T.'", "significance": "This is the likely murder weapon. A heavy, blunt instrument could easily deliver a fatal blow without leaving a 'stab' or 'gunshot' wound, consistent with the muffled thud heard earlier. Its absence from her belt suggests it was used and perhaps disposed of, or simply left in haste."}, {"title": "The Engine Room Access Card", "description": "An electronic key card, specifically for accessing restricted areas like the engine room and auxiliary holds, is found wedged beneath a loose floorboard near a decorative bookshelf in Barty's study. The card is clearly marked with 'CAPT. B. THORNE.' A faint outline on the wall behind the bookshelf suggests a concealed panel or door.", "significance": "Barty was likely trying to gain access to the engine room or related areas, which might have been a hidden access point to her illicit operations, perhaps attempting to take Bea's card. Alternatively, Bea might have used the hidden entrance to confront Barty or retrieve something, accidentally dropping her card in her haste."}, {"title": "Barty's Final Note", "description": "Clutched tightly in Barty's lifeless hand is a hastily scrawled, crumpled piece of paper. The trembling writing reads: 'Bea! You wouldn't DARE! My basket weaving will EXPOSE…' The message abruptly trails off, smudged with what appears to be a small drop of oil.", "significance": "This note directly implicates Captain Bea Thorne as the murderer. 'Expose' clearly points to her secret operations, which Barty's new hobby threatened to reveal. The oil smudge links it to the engine room and Bea's work."}], "title": "High Seas, High Stakes, Low Tide for Mr. B.", "victim": {"name": "Bartholomew \\"Barty\\" Butterfield III", "background": "An eccentric tech billionaire who inherited an unfathomable fortune, Barty was less a financial genius and more a 'curator of chaos.' He made his billions through bizarre, often nonsensical investments (like a social media platform for pet rocks) and a startling lack of self-awareness. He was known for his atrocious taste in art, his even more atrocious business decisions, and his uncanny ability to accidentally insult everyone he met.", "reasonKilled": "Barty was a walking, talking liability. He meddled in everyone's affairs, threatened their secrets with his clueless enthusiasm, and generally made life unbearable for anyone in his orbit. He likely stumbled upon a secret, was about to expose a precarious lie, or simply pushed someone beyond their breaking point with his peculiar demands."}, "premise": "The magnificent *Aphrodite's Folly*, a yacht whose opulence was only matched by its questionable aesthetic choices, sliced through the tranquil azure waters. Onboard, Bartholomew 'Barty' Butterfield III, eccentric tech billionaire and connoisseur of all things gaudy, was hosting his annual 'Gala of Grandiosity and Questionable Canapés.' The guest list was, by Barty's estimation, 'fantastically exclusive' – meaning he'd invited exactly four people who hadn't yet found a convincing excuse to escape his orbit.\\n\\nThe evening began with the usual Barty-isms: a lengthy, self-congratulatory toast involving a golden goblet shaped like a dolphin, followed by a 'performance art' piece where he attempted to juggle caviar-filled olives (unsuccessfully). The air was thick with polite forced laughter and the clinking of very expensive, very tasteless glassware. Everyone was present, everyone was feigning delight, and everyone was probably wondering if they could get better cell signal to call for rescue.\\n\\nThen, just as Chef Pierre Dubois was having a public meltdown over Barty's request for 'tuna casserole-flavored macarons,' a piercing scream echoed from Barty's private study. The door, usually locked with a retina scan and a secret handshake, was ajar. Inside, amidst a collection of truly hideous abstract sculptures and a suspiciously comfortable chaise lounge, lay Barty Butterfield III. Deceased. His face wore an expression of profound shock, as if he'd just seen his stock portfolio *and* his reflection in the same moment. The dolphin goblet lay shattered beside him, its golden snout pointing accusingly at the four surviving guests.", "solution": "Captain Beatrix 'Bea' Thorne murdered Bartholomew 'Barty' Butterfield III. Her motive was to prevent Barty from discovering her highly illegal deep-sea salvage operation, which his new 'deep-sea basket weaving' hobby and stated intention to 'explore every last nook and cranny' of the yacht threatened to expose. Barty, with his lack of discretion, would have inadvertently revealed her secret, leading to her ruin and incarceration. Bea, seeing her entire life's work and freedom on the line, acted decisively in a moment of panic.\\n\\nBea murdered Barty by striking him with her heavy, custom-made wrench, likely during a heated confrontation in his study. 'Barty's Final Note' directly names 'Bea' and mentions his 'basket weaving' will 'EXPOSE' something, clearly linking her to his death and her secret. The 'Captain's Cryptic Log Snippet' explicitly details her awareness of a 'threat to op. imminent' from 'Abn. comp.' (abnormal compartment, related to her illicit salvage) and her intent to prepare for 'unforeseen maintenance' (a euphemism for the murder). The 'Missing Tool,' her engraved wrench, is the specific weapon, its absence from her belt confirming its use. The 'Engine Room Access Card' found in the study and the 'Oily Rag' left behind further connect Bea to the crime scene and the very secrets Barty was about to uncover, providing an airtight case against Captain Beatrix Thorne.", "timeline": [{"time": "7:00 PM", "event": "Dinner begins in the opulent dining salon. Barty delivers a lengthy, self-congratulatory toast involving his golden dolphin goblet."}, {"time": "8:00 PM", "event": "Over a particularly gruesome 'caviar-and-marshmallow surprise' dessert, Barty excitedly announces his new hobby: 'deep-sea basket weaving.' He declares his intention to spend more time 'down below' in the engine room and explore the yacht's deepest recesses, much to Captain Bea's visible discomfort."}, {"time": "8:30 PM", "event": "Pierre Dubois has a public, melodramatic meltdown in the galley after Barty demands 'tuna casserole-flavored macarons' for a midnight snack. His screams of 'Mon Dieu! Mon art!' echo throughout the yacht."}, {"time": "9:00 PM", "event": "Barty, claiming 'private philosophical contemplation' and a need to 'document my basket weaving designs,' retreats to his study, instructing not to be disturbed for at least an hour."}, {"time": "9:25 PM", "event": "A sudden, muffled thud is heard from the direction of Barty's study, followed by a faint clatter. It's quickly dismissed by most guests as Barty probably dropping something expensive and ugly."}, {"time": "9:30 PM", "event": "One of the guests, drawn by an inexplicable urge for more 'caviar-and-marshmallow surprise' or perhaps a desperate need to escape the others, discovers Barty's study door ajar and his lifeless body within."}], "characters": [{"name": "Lady Cordelia \\"Coco\\" Cavendish", "role": "Renowned (and slightly infamous) Socialite & 'Art Appraiser'", "secret": "Coco has been secretly replacing Barty's 'priceless' (to him) but genuinely worthless art collection with expertly crafted fakes. Her plan? To eventually sell the *real* fakes (which are actually more valuable than Barty's originals) for a fortune on the black market. Barty recently commissioned her to 'authenticate' his entire collection, bringing her dangerously close to exposure.", "isMurderer": false, "personality": "Coco is flamboyantly dramatic, prone to theatrical pronouncements, and possesses an eagle eye for both genuine antiques and the juiciest gossip. She carries a bedazzled opera glass everywhere, occasionally using it to inspect people's jewelry – or their soul. She believes the world is her stage, and she's always playing the lead.", "relationshipToVictim": "Childhood frenemy and social rival. They shared a bizarre symbiotic relationship: Barty provided the wealth and outrageousness, Coco provided the 'class' (or at least the appearance of it) and the cutting remarks. They constantly bickered but also relied on each other for entertainment."}, {"name": "Dr. Alistair Finch", "role": "Barty's Perpetually Flustered Personal Physician", "secret": "For years, Dr. Finch has been prescribing Barty ridiculously expensive, 'experimental' placebos for a non-existent tropical disease he fabricated. He's been billing Barty's trust fund exorbitant fees for 'rare medication' and 'specialist consultations,' using the funds to discreetly pay off his own crippling medical school debts. Barty, in a moment of unusual clarity, recently announced he wanted a 'second opinion' from a 'real jungle doctor.'", "isMurderer": false, "personality": "Jittery, speaks in a torrent of medical jargon (often misused), and is a walking encyclopedia of obscure ailments – usually his own. He is constantly dabbing his brow and fretting about the general state of human health, particularly his own. He carries a small, personalized first-aid kit that looks suspiciously like a child's lunchbox.", "relationshipToVictim": "Barty's long-suffering personal physician and reluctant confidant. Barty often dragged him to social events, insisting he 'monitor his vital signs' and 'provide medical anecdotes' for his guests."}, {"name": "Captain Beatrix \\"Bea\\" Thorne", "role": "Gruff, No-Nonsense Captain of the *Aphrodite's Folly*", "secret": "Captain Bea has been secretly using the *Aphrodite's Folly*, without Barty's knowledge, for highly lucrative (and slightly illegal) deep-sea salvage operations, retrieving sunken treasures for a shady international consortium. The yacht's engine room and auxiliary holds contain custom modifications and hidden compartments. Barty recently declared his new hobby was 'deep-sea basket weaving' and insisted he wanted to 'help' in the engine room and explore 'every last nook and cranny' of his vessel.", "isMurderer": true, "personality": "Pragmatic, stoic, and prefers the company of the open sea to most humans. Captain Bea possesses a dry wit that could strip paint and a perpetually unimpressed expression. She can navigate any storm but struggles profoundly with small talk. There's always a smudge of grease somewhere on her immaculate uniform, a badge of her hands-on approach.", "relationshipToVictim": "Barty's employee and the highly competent captain of his yacht. Barty often 'assisted' her with her duties, usually making things infinitely more complicated and dangerous."}, {"name": "Pierre Dubois", "role": "Barty's Long-Suffering, Overly Dramatic Personal Chef", "secret": "Pierre has been secretly moonlighting as a wildly popular, anonymous food blogger under the pseudonym 'The Gastronomic Avenger.' His blog's primary content involves hilariously scathing, thinly veiled critiques of Barty's bizarre dietary requests and calling him a 'culinary philistine,' which has garnered him a cult following and lucrative endorsement deals. Barty, ever the entrepreneur, just announced he wanted to 'invest in your brilliant blog, Pierre, and take it public!' which would have revealed Pierre's identity.", "isMurderer": false, "personality": "A French culinary artist prone to fits of gastronomic despair and grand pronouncements about his 'divine genius.' Pierre believes food is life, passion, and poetry, and Barty's palate is a personal affront to all three. He frequently threatens to 'retire to a monastery of cheese' whenever Barty requests another 'smoothie of mystery meats.'", "relationshipToVictim": "Barty's personal chef, responsible for all meals and snacks. Barty constantly made outlandish and often disgusting demands on his culinary skills, pushing Pierre to the brink of a whisk-related nervous breakdown."}], "murdererMotive": "Captain Bea Thorne murdered Barty to protect her highly illegal deep-sea salvage operation. Barty's new 'deep-sea basket weaving' hobby, coupled with his stated intention to 'help' in the engine room and 'explore every last nook and cranny' of the yacht, directly threatened to expose the custom modifications, hidden compartments, and illicit cargo on board. For Bea, discovery meant not only the loss of her lucrative business and the yacht she considered her true home, but also prison time. Barty, with his lack of discretion, would undoubtedly have boasted about his 'discovery' to the authorities and tabloids, ruining her completely. She had to silence him before he inadvertently stumbled upon her secret and destroyed her life."}	{"tone": "Funny", "setting": "Luxury Yacht", "difficulty": "Medium", "playerCount": "4", "genderCounts": {"male": 2, "female": 2, "neutral": 0}}	2026-03-17 23:02:26.019049+00	0	f	\N	\N
1773788729174	{"clues": [{"title": "Blood on Paul's Sleeve", "description": "A small bloodstain was found on Paul Turner's sleeve after Adriano's death.", "significance": "Paul was in the vicinity of the murder, a clue to his physical involvement."}, {"title": "Misplaced Letter Opener", "description": "The murder weapon, a letter opener, was found in Sofia's cabin.", "significance": "Attempts to frame Sofia, leading to a misunderstanding of her involvement."}, {"title": "Victor's Missing Knife", "description": "One of Victor Morales' prized chef's knives is missing from his set.", "significance": "Diverts suspicion towards Victor as a viable suspect."}, {"title": "Signed Agreement", "description": "A crumpled contract between Adriano and Diana is found on his desk, incomplete.", "significance": "Indicates Diana's frustration with Adriano and suggests motive."}, {"title": "Emily's Art Forgery", "description": "A document in Adriano's study reveals an art piece purchased recently was a forgery.", "significance": "Connects to Emily Nguyen's secret and potential motive."}, {"title": "The Comms Tapes", "description": "Audio tapes reveal Paul speaking mysteriously about \\"securing the asset.\\"", "significance": "Pinpoints a conversation that hints at Paul's ulterior motives."}, {"title": "Threatening Letter", "description": "A letter from Sofia demanding money was found, threatening Adriano with exposure.", "significance": "Compelling evidence against Sofia, suggesting financial incentive."}, {"title": "Digital Logbook", "description": "Paul's suspicious movements recorded in The Odyssey's log suggest access to restricted areas.", "significance": "Proof of Paul being at the crime scene at critical moments."}], "title": "A Storm of Secrets", "victim": {"name": "Adriano Vita", "background": "Adriano was an enigmatic entrepreneur known for transforming high-risk ventures into thriving empires. His extravagant lifestyle and penchant for controversy made him as many enemies as admirers. Rumors of shady deals and cutthroat tactics followed him wherever he went.", "reasonKilled": "Adriano's ruthless business tactics and personal betrayals left many with grudges. Recent financial maneuvers threatened several associates, and his romantic escapades entangled him in messy dramas."}, "premise": "Under the stormy skies and amidst roiling waves, eight individuals find themselves aboard The Odyssey, a sprawling luxury yacht cutting through the Mediterranean waters. They have gathered for the launch of Adriano Vita's latest business venture, a high-stakes luxury casino cruise line. Under the shimmering chandeliers and the clinking of champagne glasses, the evening seems poised for success until a scream pierces the night. Adriano is found lifeless in his private suite, a gilded letter opener plunged into his chest.\\n\\nAs thunder rumbles ominously outside, the yacht is trapped until the storm clears, leaving the guests with no choice but to reckon with one another. Behind the facade of wealth and opulence, it's clear that everyone harbors secrets darker than the turbulent sea beneath them. The question hangs heavy in the air: who among them had the spite—and the gall—to murder their host?", "solution": "Paul Turner, driven by desperation, killed Adriano after being confronted in the suite. Adriano's discovery of Paul's espionage threatened to ruin him, creating an irreconcilable moment of confrontation. The letter opener was opportunistic, but Paul's stoic nature cracked under pressure. The blood on his sleeve, corroborated by the comm tapes and digital logbook entries, reveal his abrupt access to the rooms and validate his guilt. The additional circumstantial evidence against others ultimately distracts but collapses under scrutiny, revealing the murderer's calculated tenacity amidst the chaos.", "timeline": [{"time": "6:00 PM", "event": "Guests arrive on The Odyssey and are welcomed by Adriano with cocktails on the deck."}, {"time": "8:00 PM", "event": "Adriano holds a formal dinner, unveiling his new business plans."}, {"time": "9:30 PM", "event": "A thunderstorm begins to build, confining everyone indoors."}, {"time": "10:15 PM", "event": "Adriano is seen leaving the gathering, heading towards his private suite."}, {"time": "10:45 PM", "event": "The sound of a scream is heard, and guests rush to discover Adriano's body."}], "characters": [{"name": "Clara Marchand", "role": "Financial Advisor", "secret": "She has been covertly siphoning funds from Adriano's accounts.", "isMurderer": false, "personality": "Calculating and reserved, Clara always projects a calm facade but is never far from dispassionately weighing opportunities and risks.", "relationshipToVictim": "Adriano relied heavily on her for financial advice and trusted her with his most sensitive dealings."}, {"name": "Victor Morales", "role": "Celebrity Chef", "secret": "Victor's culinary empire started with seed money from Adriano that he never repaid.", "isMurderer": false, "personality": "Charismatic and flamboyant, Victor wields both knives and charm with precision, making him popular among highbrow social circles.", "relationshipToVictim": "Adriano funded Victor's first restaurant but business tensions soured their relationship."}, {"name": "Sofia Ricci", "role": "Ex-Wife", "secret": "She has been threatening to expose Adriano's illegal dealings unless she received additional alimony.", "isMurderer": false, "personality": "Fiery and unapologetic, Sofia speaks with conviction and refuses to be sidelined by anyone, least of all her former husband.", "relationshipToVictim": "Despite their divorce, unresolved feelings and financial disputes lingered between them."}, {"name": "Paul Turner", "role": "Bodyguard", "secret": "He was blackmailed into spying on Adriano for a corporate rival.", "isMurderer": true, "personality": "Stoic and imposing, Paul rarely lets anything crack his professional veneer, always watching and waiting for signs of danger.", "relationshipToVictim": "Adriano trusted him implicitly, but Paul knew secrets that could endanger his own life."}, {"name": "Diana Walters", "role": "Up-and-Coming Actress", "secret": "Adriano promised her a lead role in his next film project, a promise he's yet to deliver.", "isMurderer": false, "personality": "Bubbly and keen to please, Diana often uses her charm to distract from her inexperience and insecurities.", "relationshipToVictim": "Diana alternated between infatuated admirer and disillusioned critic as Adriano's promises remained unfulfilled."}, {"name": "Thomas Everett", "role": "Journalist", "secret": "Adriano caught him snooping for a scandalous article that could ruin his career.", "isMurderer": false, "personality": "Inquisitive and relentless, Thomas harbors a moral crusade against the corrupt elite, slinking in shadows to uncover the truth.", "relationshipToVictim": "Thomas sought to unearth Adriano's many sins for an exposé that would catapult his career."}, {"name": "Emily Nguyen", "role": "Art Dealer", "secret": "She secretly forged art pieces, selling them to Adriano among others.", "isMurderer": false, "personality": "Sophisticated and perceptive, Emily navigates social situations with ease while appraising hidden worth.", "relationshipToVictim": "They shared a fondness for art, but privately Emily exploited Adriano's ignorance for her benefit."}, {"name": "Lucas Boyd", "role": "Old Friend", "secret": "Lucas has been selling insider information about Adriano's ventures to competitors.", "isMurderer": false, "personality": "Easgoing, charming but with a hint of opportunism, Lucas uses connections like bargaining chips.", "relationshipToVictim": "Once childhood companions, their paths diverged into a tangled web of competition and jealousy."}], "murdererMotive": "Paul Turner, the bodyguard, was coerced into spying on Adriano. When Adriano suspected and confronted him, the situation escalated, and Paul felt he had no choice but to kill Adriano to protect himself."}	{"tone": "Chaotic", "setting": "Luxury Yacht", "difficulty": "Messy", "playerCount": "8", "genderCounts": {"male": 4, "female": 4, "neutral": 0}}	2026-03-17 23:05:29.886664+00	0	f	\N	\N

\.

COPY "purchases" FROM stdin;
1	1	admin@mysterygames.test	one_time	\N	\N	0	1	1	\N	t	2026-03-17 20:25:29.404022+00
2	1	admin@mysterygames.test	one_time	\N	\N	0	1	1	\N	t	2026-03-17 20:59:48.207627+00
3	1	admin@mysterygames.test	one_time	\N	\N	0	1	0	\N	t	2026-03-17 21:41:36.05787+00
4	2	chels.santoro@gmail.com	one_time	\N	\N	0	-1	0	\N	t	2026-03-17 21:43:03.388632+00
5	3	damonjasper@gmail.com	one_time	\N	\N	0	-1	0	\N	t	2026-03-17 21:47:49.762394+00
6	3	damonjasper@gmail.com	one_time	\N	\N	0	-1	0	\N	t	2026-03-17 21:49:32.039963+00
7	2	chels.santoro@gmail.com	one_time	\N	\N	0	-1	0	\N	t	2026-03-17 22:13:07.002732+00
8	5	chelseacjasper@gmail.com	subscription	\N	\N	0	-1	0	2026-09-17 22:45:30.262+00	t	2026-03-17 22:45:30.269458+00
9	3	damonjasper@gmail.com	subscription	\N	\N	0	-1	0	2026-09-17 22:50:26.123+00	t	2026-03-17 22:50:26.130885+00
10	7	mpiggott12@yahoo.com	one_time	\N	\N	0	1	1	\N	t	2026-03-17 23:01:39.386078+00
11	6	gpicotte1@gmail.com	subscription	\N	\N	0	-1	0	2026-09-17 23:03:48.078+00	t	2026-03-17 23:03:48.086549+00

\.

COPY "coupons" FROM stdin;
2	TESTFREE	free_game	100	100	0	2026-03-17 22:36:13.721597+00	\N	t	2026-03-17 22:36:13.721597+00
1	TESTING	percent	100	10	10	2026-03-17 20:40:42.136396+00	\N	t	2026-03-17 20:40:42.136396+00

\.
