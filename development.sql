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
COPY "mysteries" FROM stdin;
test-mystery-1	{"clues": [{"title": "The Empty Bottle", "description": "A small empty bottle labeled 'Extra Spicy Hot Sauce' found behind the condiment table. It smells strange.", "significance": "This was used to mask the taste of the poison"}, {"title": "The Recipe Card", "description": "A crumpled recipe card found in the trash with unusual ingredients listed.", "significance": "Tammy's recipe included a suspicious unlabeled ingredient"}, {"title": "Security Camera", "description": "The neighbor's Ring camera caught someone near the food table at 3:40 PM.", "significance": "Shows Tammy adding something to the potato salad"}, {"title": "The Text Message", "description": "Kendra's phone shows a threatening text: 'You'll regret banning my casserole.'", "significance": "Sent from Tammy's phone the night before"}], "title": "Death at the BBQ", "victim": {"name": "Kendra Kraft", "background": "HOA President who ruled the neighborhood with an iron fist and a clipboard.", "reasonKilled": "She had too many enemies - fines, complaints, and bans on everything fun."}, "premise": "It was a sunny Saturday at the Maple Drive annual BBQ when the unthinkable happened. Kendra Kraft, the dreaded HOA president, was found face-down in the potato salad. Now everyone's a suspect.", "solution": "Tammy Tupperware, enraged that Kendra banned her beloved casserole from the potluck, poisoned the potato salad with a concentrated hot sauce laced with a sedative she obtained from her cousin who works at a veterinary clinic.", "timeline": [{"time": "2:00 PM", "event": "BBQ begins, everyone arrives"}, {"time": "3:15 PM", "event": "Kendra announces new HOA rules banning charcoal grills"}, {"time": "3:45 PM", "event": "Tammy brings out her 'special' potato salad"}, {"time": "4:00 PM", "event": "Kendra eats the potato salad"}, {"time": "4:15 PM", "event": "Kendra found face-down in the remaining potato salad"}], "characters": [{"name": "Bev Bunsen", "role": "BBQ Chemist", "secret": "She was secretly developing a competing HOA takeover plan", "isMurderer": false, "personality": "Nerdy, obsessive about marinades", "relationshipToVictim": "Neighbor who received 14 violations last month"}, {"name": "Barry Barkley", "role": "Competitive Grill Dad", "secret": "He bet $5000 on winning the grill-off and was about to be disqualified by Kendra", "isMurderer": false, "personality": "Loud, proud, competitive", "relationshipToVictim": "Longtime rival at neighborhood events"}, {"name": "Tammy Tupperware", "role": "Potluck Queen", "secret": "She poisoned the potato salad with her special ingredient", "isMurderer": true, "personality": "Sweet on the outside, scheming on the inside", "relationshipToVictim": "Kendra banned her signature casserole"}, {"name": "Trent Tongs", "role": "Gym Bro Grill Enthusiast", "secret": "He was secretly dating Kendra's daughter", "isMurderer": false, "personality": "Flexes at everything, talks about protein", "relationshipToVictim": "Was fined for having too many weights in his garage"}], "murdererMotive": "Kendra banned Tammy's signature casserole from the neighborhood potluck, the final straw after years of petty tyranny."}	{"tone": "Funny", "setting": "Backyard BBQ", "killerMode": "Pre-assigned killer", "playerCount": "8"}	2026-03-17 13:47:01.304043+00	0	f	\N	\N
1773756704263	{"clues": [{"title": "Pill Bottle", "description": "A bottle of anti-anxiety medication with Eddie's pharmacy label on it found in Richie's coat pocket.", "significance": "Suggests a professional connection between Richie and Eddie."}, {"title": "Burnt Roast Notes", "description": "Charred fragments of notes intended for Richie's comedy roast with names and secrets.", "significance": "Hints that Richie was planning to reveal sensitive information about the attendees."}, {"title": "Stage Light Bulb", "description": "A recently replaced bulb found backstage, partially loosened.", "significance": "Indicates tampering with the electrical setup for creating distractions."}, {"title": "Jenny's Invitation List", "description": "A crumpled list of confirmed guests with extra marks next to Richie and Eddie's names.", "significance": "Highlights that Jenny anticipated an issue with these guests."}, {"title": "Gary's Encrypted Laptop", "description": "A rapidly closed laptop with new code related to data encryption apps.", "significance": "Shows Gary's obsession with digital security, tying back to his paranoia."}, {"title": "Lisa's Indie Film Flyer", "description": "A flyer promoting Lisa's new film featuring a character suspiciously like Richie.", "significance": "Reflects on Lisa’s personal and professional ties to Richie."}, {"title": "Nancy's Selling Documents", "description": "Real estate files with Richie's forged signature found in her bag.", "significance": "Suggests Nancy's reliance on Richie for shady business deals."}, {"title": "Paul's DJ Playlist", "description": "A scratched vinyl record with the final track dangerously looped at high volume.", "significance": "Shows Paul's carelessness or possibly intended noise to cover altercations."}], "title": "School's Out... Forever!", "victim": {"name": "Richie 'Rich' Parker", "background": "Richie Parker was known for his humor and mischief. After high school, he struck it rich by creating a viral app for dog owners. Despite his wealth, Richie maintained his class clown persona, often returning to Crestwood to boast about his success.", "reasonKilled": "Richie knew damaging secrets about several classmates and was planning to expose them in his next 'reunion roast' segment."}, "premise": "The Crestwood High School's Class of 2003 Reunion is the event nobody wanted but everyone showed up for. Jenny Thompson, the overzealous class president, is hosting the event in the old gymnasium. Just as nostalgia hits its peak and the decorated banners start to peel, someone is found dead—Richie 'Rich' Parker, the class clown turned self-made millionaire. He was always a prankster, but his jokes have now reached a dead end.\\n\\nAmidst the disco ball lighting and poorly chosen gourmet appetizers, the attendees must unravel the mystery behind Richie's untimely demise. With a group of quirky former classmates, each with a distinct relationship with the victim, the investigation becomes a mix of hilarity and sleuthing. Can they uncover the culprit before the evening concludes and the killer makes their escape?", "solution": "Eddie Jones, harboring feelings of resentment and fear of exposure, planned the murder meticulously. He used his pharmacy knowledge to spike Richie’s drink with sedatives before the roast, ensuring Richie felt dizzy on stage. During the distraction caused by the flickering lights—arranged by Eddie loosening the stage bulb through Paul—Eddie slipped away and pushed Richie from the stage, leading to his fatal fall. The pill bottle was left on Richie intentionally to hint at a regular interaction between them, masking his real motive.", "timeline": [{"time": "6:00 PM", "event": "Guests arrive at the gymnasium for the reunion, greeted by Jenny Thompson."}, {"time": "6:30 PM", "event": "Richie Parker makes a grand entrance riding a rented pony, drawing everyone's attention."}, {"time": "7:00 PM", "event": "The first round of drinks is served, and Richie begins his planned 'reunion roast'."}, {"time": "7:30 PM", "event": "Richie is heard arguing with Eddie in the refreshment area."}, {"time": "8:00 PM", "event": "The lights flicker, and there's a loud crash from the stage. Richie is found dead."}], "characters": [{"name": "Jenny Thompson", "role": "Event Organizer & Class President", "secret": "She's broke and needs this event to win an alumni award with a cash prize.", "isMurderer": false, "personality": "Perfectionist, cheerful, a bit controlling", "relationshipToVictim": "Old childhood friend who finds Richie's humor annoying"}, {"name": "Tommy Reed", "role": "High School Jock, now a Sports Coach", "secret": "He was fired from his coaching job for inappropriate behavior.", "isMurderer": false, "personality": "Friendly, but stuck in the past, slightly egotistical", "relationshipToVictim": "School rival who frequently got pranked by Richie"}, {"name": "Lisa Meyers", "role": "Drama Club Diva, now an Indie Film Director", "secret": "One of her indie films was secretly funded by Richie, who wanted her as an on-screen girlfriend.", "isMurderer": false, "personality": "Dramatic, eccentric, but surprisingly insecure", "relationshipToVictim": "Ex-fling and sometimes partner-in-crime"}, {"name": "Gary Foster", "role": "IT Geek, now a Cybersecurity Consultant", "secret": "He fears Richie's app has stolen data from users, threatening his consultancy's reputation.", "isMurderer": false, "personality": "Nerdy, paranoid, but unexpectedly witty", "relationshipToVictim": "Former best friend who drifted apart due to Richie’s constant jokes about him"}, {"name": "Nancy Green", "role": "Prom Queen, now a Real Estate Agent", "secret": "She sold faulty real estate properties with Richie’s help.", "isMurderer": false, "personality": "Charming, manipulative, and a bit superficial", "relationshipToVictim": "Occasional business partner using his wealth to close deals"}, {"name": "Eddie Jones", "role": "Shy Science Nerd, now a Pharmacist", "secret": "He provided Richie with prescriptions under the table for his stress.", "isMurderer": true, "personality": "Introverted, methodical, with a hidden dark side", "relationshipToVictim": "Used to be bullied by Richie, holds a quiet grudge"}, {"name": "Barbara Walters", "role": "Head Cheerleader, now a Fitness Guru", "secret": "Her fitness videos are barely making profit", "isMurderer": false, "personality": "Bubbly, energetic but conceited", "relationshipToVictim": "Long-time secret admirer hoping for Richie's love"}, {"name": "Paul Young", "role": "Band Geek, now an Event DJ", "secret": "He was using Richie's identity for secretive music festival entries.", "isMurderer": false, "personality": "Sarcastic, laid-back, yet conspiratorial", "relationshipToVictim": "Partnered with Richie for entertainment at the reunion"}], "murdererMotive": "Eddie Jones had developed feelings of resentment towards Richie for the years of bullying and feared his secret role in prescribing medication to Richie would come to light during the reunion roast."}	{"tone": "Funny", "format": "Mobile", "setting": "High School Reunion", "difficulty": "Medium", "killerMode": "Pre-assigned killer", "playerCount": "8"}	2026-03-17 14:11:45.273021+00	0	f	\N	\N
1773757234077	{"clues": [{"title": "Crushed Peonies", "description": "A section of the garden with flattened, destroyed flowers.", "significance": "Points to Hugh Green’s anger at Charlie's dog."}, {"title": "Soggy Swim Trunks", "description": "Charlie's monogrammed swim trunks are found hidden in the gardener’s shed.", "significance": "Implies someone wanted to keep them out of sight, common knowledge Charlie was wearing them as a pool joke."}, {"title": "Muddy Footprints", "description": "Trail of muddy footprints leading from the garden to the pool.", "significance": "Footprints match Hugh’s size."}, {"title": "Floating Grill Utensils", "description": "Grill spatula floating next to Charlie in the pool.", "significance": "Initially a false lead, as it was dropped in panic when Charlie was found."}, {"title": "Unlit BBQ Bricks", "description": "An unlit set of charcoal bricks under the gardener's shed awning.", "significance": "Could imply someone was lingering there before the grill was used."}, {"title": "Displaced Garden Tools", "description": "Garden tools scattered messily near the poolside.", "significance": "Disorder indicates a hurried cleanup effort."}, {"title": "Gourmet Burger Box", "description": "An empty box of special gourmet burgers near the BBQ, nobody remembers eating.", "significance": "Introduced by Gabriel Fudge but never cooked or served, irrelevant but odd."}, {"title": "Unfinished Quilt", "description": "A small quilted square with BBQ stains left on a patio chair.", "significance": "Linda's secret hobby, showing she left in a hurry."}], "title": "Grilled to Death: A BBQ Mystery", "victim": {"name": "Charlie Burgman", "background": "Charlie Burgman was a retired circus ringmaster who settled into the quirky neighborhood, instantly becoming a local celebrity with his penchant for grand parties and prankster antics. His wealth was a constant topic of discussion and his friendly demeanor disguised a man who often stepped on toes without realizing.", "reasonKilled": "Charlie's habit of playing elaborate pranks finally caught up with him, angering several people, including one who had a much darker reaction."}, "premise": "The sun is shining, the grill is sizzling, and laughter fills the air as the annual neighborhood barbecue party is in full swing at the eccentric millionaire Charlie Burgman's backyard. Known for his outlandish pranks and larger-than-life personality, Charlie has been the heartbeat of the neighborhood for years. However, this year's festivities come with an unexpected twist.\\n\\nJust as the burgers were about to be served and everyone raised their glasses for a toast, Charlie is found face down in his enormous backyard pool, a platter of grilled pineapples floating beside him. Was it an accident, or has someone turned this barbecue into a murder scene? The guests, thrown into chaos, must work together to find out whodunit before the police arrive at sundown.", "solution": "Hugh Green, after arguing with Charlie about his dog, let his frustrations boil over. In a quiet moment, when everyone was distracted by Timothy's magic act, Hugh lured Charlie towards the pool with a dispute over garden placement. A struggle ensued as Hugh confronted Charlie about years of neglect towards his complaints. Fueled by anger, Hugh pushed Charlie into the pool. In his panic, Hugh hid Charlie’s swim trunks and scattered the tools, hoping to confuse the timeline of events. Witnesses initially believing Hugh was trying to help when he found Charlie in the pool provided him an unintentional alibi until the clues tied back to his precise anger.", "timeline": [{"time": "10:00 AM", "event": "Guests start arriving; Charlie welcomes everyone with a silly hat and a loud greeting over the PA system."}, {"time": "11:30 AM", "event": "Charlie announces a surprise magic show featuring Timothy Connors."}, {"time": "12:00 PM", "event": "Nancy Bricester is seen chatting heatedly with Charlie, possibly discussing a sensitive scoop."}, {"time": "1:00 PM", "event": "Hugh Green is seen arguing with Charlie over his dog’s misadventures in the garden."}, {"time": "2:00 PM", "event": "Paula Reed presents Charlie with a specially made sculpture, which he publicly critiques."}, {"time": "3:00 PM", "event": "Charlie is found floating in the pool, swim trunks missing."}, {"time": "3:15 PM", "event": "Linda Wattle and Audrey Feldman begin organizing guests to uncover what happened while Nancy Bricester takes notes for her article."}], "characters": [{"name": "Linda Wattle", "role": "Charlie’s Nieghbour & Hosting Partner", "secret": "She secretly loves quilting and sneaks away from parties to sew.", "isMurderer": false, "personality": "Cheerful, nosey, overly optimistic", "relationshipToVictim": "Strong friendship built around shared love for pranks."}, {"name": "Hugh Green", "role": "Gardener", "secret": "Hates BBQs but comes for free drinks.", "isMurderer": true, "personality": "Grumpy, meticulous, old-fashioned", "relationshipToVictim": "Longtime employee constantly frustrated with Charlie's dog wrecking his garden."}, {"name": "Nancy Bricester", "role": "Neighborhood Gossip", "secret": "Selling stories about neighbors to a local tabloid.", "isMurderer": false, "personality": "Chatty, persuasive, curious", "relationshipToVictim": "Sees Charlie as her biggest scoop yet."}, {"name": "Timothy Connors", "role": "Failed Magician", "secret": "Obsessed with making a comeback through a viral magic act at the BBQ.", "isMurderer": false, "personality": "Eccentric, clumsy, optimistic", "relationshipToVictim": "Charlie promised Timothy he'd help with his next big magic show."}, {"name": "Paula Reed", "role": "Local Artist", "secret": "Using recycled materials from other people's garbage for her art without asking.", "isMurderer": false, "personality": "Artsy, aloof, distracted", "relationshipToVictim": "Charlie criticized her artwork for being too outlandish even for his tastes."}, {"name": "Gabriel Fudge", "role": "Chef Extraordinaire", "secret": "Plans to open a competing BBQ joint using recipes from the party.", "isMurderer": false, "personality": "Prideful, creative, easily offended", "relationshipToVictim": "Had a falling out over a shared recipe Charlie took credit for."}, {"name": "Audrey Feldman", "role": "Charlie's Assistant", "secret": "Pockets some of Charlie's cash for personal emergencies, which Charlie never notices.", "isMurderer": false, "personality": "Efficient, impatient, stern", "relationshipToVictim": "She keeps Charlie’s life organized amidst his chaotic events."}, {"name": "Derek “Deck” Buchanan", "role": "Neighborhood Handyman", "secret": "Rents Charlie's storage for extra cash without permission.", "isMurderer": false, "personality": "Charming, lazy, resourceful", "relationshipToVictim": "Fixed multiple issues in Charlie's old house, often with shortcuts."}], "murdererMotive": "Hugh Green was fed up with Charlie's dog, Mr. Barky, ruining his garden despite multiple complaints. On the day of the BBQ, Hugh finally snapped when Mr. Barky destroyed his prize-winning peonies, pushing him to eliminate Charlie in a moment of vengeful rage."}	{"tone": "Funny", "format": "Mobile", "setting": "Backyard BBQ", "difficulty": "Medium", "killerMode": "Pre-assigned killer", "playerCount": "8"}	2026-03-17 14:20:35.049971+00	1	f	\N	\N
1773759080932	{"clues": [{"title": "Spilled Wine Glass", "description": "A glass of wine is found spilled on the poker table with traces of Victor’s medication.", "significance": "Suggests that Victor's drink may have been tampered with to induce drowsiness or incapacitation."}, {"title": "Broken Watch", "description": "Victor’s expensive smartwatch is found broken near his body, stopped at 11:47 PM.", "significance": "Indicates the possible time of struggle or foul play."}, {"title": "Unsolved Cipher", "description": "A torn page from a notebook is found in Callie's room with an incomplete cipher roughly pertaining to financial numbers.", "significance": "Hints at Callie's involvement in an insider plot against Victor."}, {"title": "Chipped Poker Chip", "description": "A damaged poker chip with a sharp edge is found on Grant’s person.", "significance": "Could suggest a tool used in a struggle or gain access to Victor's room."}, {"title": "Disguised Wig", "description": "A blonde wig found in the dressing area next to Olivia's belongings.", "significance": "Points to someone potentially impersonating Olivia or hiding their identity."}, {"title": "Keycard Access Log", "description": "Records show a keycard entry to Victor's room at 11:35 PM not matching the alibi of the accused players.", "significance": "Indicates unauthorized entry to Victor’s room, possibly identifying the murderer."}, {"title": "Old Love Letters", "description": "A set of old love letters between Victor and Olivia is found torn apart in the wastebasket.", "significance": "Reflects Olivia's past relationship with Victor and potential lingering resentment."}, {"title": "Naval Knife", "description": "A ceremonial knife belonging to Jonathan is found wiped clean of fingerprints near the crime scene.", "significance": "Implicates Jonathan due to his naval background, raising suspicions."}], "title": "Murder on the High Seas", "victim": {"name": "Victor Astor", "background": "Victor Astor is a self-made billionaire known for his investments in technology and fintech. He has a reputation for being ruthless in business, often leaving competitors and partners alike in ruin. Victor is also a notorious gambler, organizing exclusive high-stakes games reserved for the elite.", "reasonKilled": "Victor's aggressive business tactics and tendency to manipulate others have left a trail of enemies, both professional and personal. He recently initiated a hostile takeover of a fellow guest's company, causing financial devastation and igniting a thirst for revenge."}, "premise": "The luxurious yacht, The Serendipity, is hosting an exclusive high-stakes poker tournament on the shimmering waters of the Mediterranean. With celebrity guests, business tycoons, and shadowy millionaires aboard, the weekend promised glamour, wealth, and perhaps a chance to forge powerful connections. However, the fervor of the poker tables is brought to a screeching halt when the host, renowned venture capitalist Victor Astor, is found dead in his stateroom.\\n\\nAs the yacht continues to drift, tension and suspicion hang in the salty air. Locked away from the world with patchy satellite communication, the guests and crew realize they must navigate a chaotic storm of secrets, lies, and betrayals to uncover the truth behind Victor's untimely demise. It's a race against time to determine who amongst them is capable of murder before the vessel makes its next port call and the killer can slip away.", "solution": "Victor was killed by an opportunistic push onto the edge of a dresser during a struggle. Each suspect had spent the final days finding ways to leverage the tournament to their advantage or perniciously settle scores. The murderer had slipped into Victor's room while the lights flickered, taking advantage of the chaotic environment, and pushed him during a confrontation over his manipulative dealings. The keycard access log ultimately revealed an invalid alibi, leading to the uncovering of the culprit's identity.", "timeline": [{"time": "6:00 PM", "event": "Guests are welcomed aboard the yacht by Victor Astor for dinner and drinks."}, {"time": "8:00 PM", "event": "The poker tournament begins in the yacht's luxurious game room."}, {"time": "10:00 PM", "event": "A break for refreshments; tensions rise as Victor wins a significant sum."}, {"time": "11:00 PM", "event": "Victor retires to his stateroom, citing fatigue and asking not to be disturbed."}, {"time": "11:30 PM", "event": "The yacht's crew hears a loud thud but assumes it’s a guest dropping furniture."}, {"time": "11:45 PM", "event": "Lights flicker on the yacht due to electrical issues, adding to the chaotic ambiance."}, {"time": "12:00 AM", "event": "Victor is found dead by a crew member in his locked stateroom."}], "characters": [{"name": "Olivia Lancaster", "role": "Hollywood Actress", "secret": "Olivia is struggling financially after a series of flop movies and is using the tournament to secure a much-needed windfall.", "isMurderer": false, "personality": "Charismatic, dramatic, and slightly narcissistic", "relationshipToVictim": "Olivia and Victor were romantically involved in the past, but their relationship ended on bad terms when Victor's indiscretion went public."}, {"name": "Grant Hathaway", "role": "Tech Mogul", "secret": "Grant holds a grudge against Victor for blocking several of his projects in Silicon Valley and wanted to confront him on the yacht.", "isMurderer": false, "personality": "Eccentric, genius, and socially awkward", "relationshipToVictim": "Professional rivals in the tech industry, Grant and Victor have been at odds over intellectual property rights repeatedly."}, {"name": "Callie Morton", "role": "Professional Poker Player", "secret": "Callie has been secretly hired by a conglomerate to bankrupt Victor using her skills in poker to induce him into reckless betting.", "isMurderer": false, "personality": "Calculating, perceptive, and suspicious of everyone", "relationshipToVictim": "Victor's strategic business mind intrigued Callie, leading them to forge a temporary alliance during the tournament."}, {"name": "Jonathan Reed", "role": "Retired Naval Officer", "secret": "Jonathan once worked in a security firm linked to one of Victor’s corporate espionage cases that damaged his reputation.", "isMurderer": false, "personality": "Disciplined, authoritative, and harboring a secretive past", "relationshipToVictim": "Jonathan respects Victor’s intellect but despises his lack of ethical business practices."}], "murdererMotive": "Each character has a plausible motive involving personal loss, betrayal, or financial ruin due to Victor's unscrupulous actions. Their potential motives range from revenge, financial gain, or protecting career and reputation."}	{"tone": "Chaotic", "format": "Mobile", "setting": "Luxury Yacht", "difficulty": "Medium", "killerMode": "Randomized killer", "playerCount": "4"}	2026-03-17 14:51:21.77458+00	2	f	\N	\N
1773762379671	{"clues": [{"title": "Jessica's Phone", "description": "Discovered in her handbag containing recent messages to a contact labeled as 'Secret Keeper.'", "significance": "The messages hint at an impending reveal of someone's secret, possibly suggesting blackmail."}, {"title": "Fingerprint on Glass", "description": "A clear fingerprint found on Jessica's wine glass that doesn't belong to her.", "significance": "Indicates that someone may have slipped something into her drink or handled her glass in an unusual manner."}, {"title": "A Torn Note", "description": "A note, torn in half, found near Jessica’s body stating, 'If you tell anyone, we'll all be ruined.'", "significance": "Implies a serious joint secret, suggesting conspiracy among the guests."}, {"title": "Conflicted Witness Statement", "description": "Witness claims to have seen Jessica and Mark in an intense whispering conversation earlier in the night, which Mark denies.", "significance": "Creates suspicion about Mark's interactions with Jessica and her eventual discovery."}, {"title": "Lily’s Sweater", "description": "Faint traces of wine matching Jessica’s found on Lily’s cashmere sweater.", "significance": "Suggests a possible physical altercation or accidental spillage during a heated exchange."}, {"title": "Pictures from the Past", "description": "Old high school photos found on the reunion display board with Jessica's face scratched out.", "significance": "Indicates deep-rooted resentment towards Jessica from an unknown party."}, {"title": "Misplaced Button", "description": "A colorful button found near Jessica's body, not matching her clothing style.", "significance": "Could belong to someone directly involved in the altercation leading to her death."}, {"title": "Recent Article Draft", "description": "A draft on Jessica’s tablet, titled 'Secrets of Oakridge: The Dark Side of Alumni,' detailing potential scandals.", "significance": "Confirms Jessica was planning an expose which involved her classmates and could provide a motive for her murder."}, {"title": "Mark’s Missing Handcuff Key", "description": "Mark’s handcuff key was found dropped beside the make-shift bar.", "significance": "Raises questions about why he would need or use handcuffs during the reunion."}, {"title": "Ethan’s Business Card", "description": "Ethan’s business card found, with a note saying 'You owe me,' underlined twice.", "significance": "Hints at underlying financial tension or blackmail interaction between Ethan and Jessica."}], "title": "Echoes of Alumni", "victim": {"name": "Jessica Parker", "background": "Jessica Parker was once the queen bee of Oakridge High, known for her striking looks and high school spirit as the head cheerleader. After graduation, she found success as a celebrity gossip columnist, using her charm and shrewdness to gather insider information and scandalous stories, some of which involved her former classmates.", "reasonKilled": "Jessica's work as a gossip columnist led to her knowing—and sometimes exploiting—the secrets of her peers. Many feared or resented her potential to reveal damaging information."}, "premise": "The Oakridge High School graduating class of 2003 is gathering for their 20-year reunion, held at the local community center, which has been transformed into a nostalgic recreation of the old school hall. Old friendships, dormant rivalries, and forgotten secrets simmer beneath the polished façade as former classmates reunite and reminisce about their teenage years. \\n\\nAs the night progresses, laughter and music fill the air. However, tension arises when Jessica Parker, the once-popular cheerleader and now a celebrity gossip columnist, is found dead under suspicious circumstances. Her demise casts a pall over the event as it becomes clear that someone among the returning alumni wanted her silenced. Everyone had a history with Jessica, and they all carry secrets—secrets Jessica was notorious for exploiting in her career.\\n\\nNow, the attendees must work together—or perhaps against one another—to unearth the truth. Was Jessica's murder an act of long-awaited revenge, a silencing of blackmail, or something more sinister? The room is filled with possible culprits, each with their own secrets and motives.", "solution": "Jessica's murder was a crime of opportunity, exploiting the chaos of the high school reunion and the darkness from the temporary power flicker as a cover. The investigation reveals multiple motives tied to secrets Jessica had gathered about her classmates. The murderer took advantage of the moment when the lights flickered to approach Jessica and commit the crime, relying on the crowded, distracted environment to create a perfect alibi. Whoever had the strongest motive or the most to lose if their secret got out ended up pulling the trigger—figuratively or literally—on a plot that many had pondered but only one had the courage to carry out. Whether through poison, blunt force, or other means, it was a murder born from preservation of self-image and the fear of massive personal fallout.", "timeline": [{"time": "7:00 PM", "event": "Guests begin to arrive and catch up with old friends."}, {"time": "8:00 PM", "event": "Jessica makes a grand entrance, immediately involved in several conversations, seemingly insinuating knowledge of significant secrets."}, {"time": "9:00 PM", "event": "Tension rises during the trivia quiz about school memories, especially when incriminating details are joked about."}, {"time": "9:30 PM", "event": "The lights flicker briefly, causing a minor commotion."}, {"time": "10:00 PM", "event": "Jessica is found dead near the old locker installation setup, marking the end of the light-hearted reunion mood."}], "characters": [{"name": "Ethan Graves", "role": "Successful Tech Entrepreneur", "secret": "Ethan bribed Jessica to keep quiet about a financial scandal during his startup's early days, which could ruin his reputation.", "isMurderer": false, "personality": "Charismatic but aloof, analytical, and ambitious.", "relationshipToVictim": "Jessica and Ethan shared a brief romantic fling in high school that ended amicably—but she knew too much about his past business dealings."}, {"name": "Lily Tran", "role": "High School Teacher", "secret": "Lily once plagiarized a research paper in college, a fact Jessica discovered and subtly threatened to expose.", "isMurderer": false, "personality": "Compassionate, optimistic, with a tendency to over-apologize.", "relationshipToVictim": "Jessica was one of Lily’s best friends during high school, but their friendship soured over an undisclosed argument."}, {"name": "Mark Rodriguez", "role": "Local Police Officer", "secret": "Mark had a misconduct incident swept under the rug at work thanks to a favor from a superior; Jessica learned of it through her connections.", "isMurderer": false, "personality": "Tough, authoritative, with a hidden soft side.", "relationshipToVictim": "Mark and Jessica dated briefly and intensely but broke up when Jessica left for her career in the city."}, {"name": "Sarah Klein", "role": "Stay-at-home Parent and PTA President", "secret": "Sarah had an affair with a married man, which Jessica was on the verge of exposing to the PTA.", "isMurderer": false, "personality": "Perfectionist, nurturing, with a tendency to gossip.", "relationshipToVictim": "Sarah was envious of Jessica’s charisma and influence, feeling overshadowed by her during high school."}, {"name": "David Chang", "role": "Freelance Graphic Designer", "secret": "David was involved in a hit-and-run accident where Jessica was the sole witness; her silence was arranged and precarious.", "isMurderer": false, "personality": "Quirky, introverted, artistically inclined.", "relationshipToVictim": "Despite never interacting much in high school, Jessica represented a persistent threat due to her knowledge of the accident."}], "murdererMotive": "Jessica had accumulated secrets and scandals about her former classmates, making her a potential threat to anyone who had skeletons in their closet. Her murder was likely motivated by a desperate need to keep a damaging secret from being exposed."}	{"tone": "Dramatic", "format": "Mobile", "setting": "High School Reunion", "difficulty": "Easy", "killerMode": "You Pick", "playerCount": "5"}	2026-03-17 15:46:21.647979+00	1	f	\N	\N
1773765006877	{"clues": [{"title": "Ketchup Bottle with Missing Cap", "description": "Found near Rick's body, sprayed around haphazardly.", "significance": "Suggests a struggle around the grill area, possible accidental spill during altercation."}, {"title": "Smudged Fingerprints on Bean Pot", "description": "Fingerprints partially wiped, found on the bean pot where Rick was found.", "significance": "Indicate someone tried to clean prints—consistent with Amber's care for cleanliness."}, {"title": "Charcoal Smudge on Amber's Shoes", "description": "A charcoal mark inconsistent with the area around where Rick was grilling.", "significance": "Suggests she was closer to the grill than she claimed, contradicting her story."}, {"title": "Tina's Burnt Recipe Notes", "description": "Crumbled notes on creative grill techniques that caught fire, found in the trash.", "significance": "Shows she was preoccupied, suggesting innocence due to lack of time to commit murder."}, {"title": "Charlie's Sauce Stash", "description": "Discovery of premade sauce bottles hidden in his trunk.", "significance": "Diverts suspicion to Charlie, although unrelated to murder."}, {"title": "Amber's Scathing Review Draft", "description": "An unfinished draft of a negative review of Rick found in her bag.", "significance": "Shows her continued animosity towards Rick and possible motive."}, {"title": "Barry's 'Cook-Off Betting' Sheet", "description": "List of participants with odds, found in his pocket.", "significance": "Hints at motivation for murder related to rigging bets, but a red herring."}, {"title": "Rick's Grill Master Sélection Award", "description": "The trophy is notably missing, last seen in Amber's possession during a critique session.", "significance": "Links Amber directly to the scene and suggests possible theft motive."}], "title": "Grillin' and Killin' at Rick's", "victim": {"name": "Rick Brisket", "background": "Rick Brisket was a local legend in the BBQ circuit, winning numerous awards for his smoked meats. He was cocky and often rubbed his victories in people's faces (figuratively and literally with a turkey leg). He was financially secure and hosted extravagant BBQs that doubled as neighborhood parties.", "reasonKilled": "Rick was a formidable rival in the BBQ championship circuit, hoarding secrets and sabotaging competitors to maintain his top spot."}, "premise": "Rick Brisket, known for his legendary backyard BBQs, has invited his closest friends and neighbors for his annual cook-off contest. But just as the scent of smoked ribs fills the air, Rick is found facedown in his prized bean pot, lifeless. As jokes fly and tensions rise, everyone becomes a suspect. Who among them turned up the heat and why?\\n\\nAmidst the chaos of misplaced ketchup bottles, broken lawn chairs, and a poorly timed potato sack race, it's up to the players to piece together the clues and find out who killed Rick before the cops arrive. In a setting where overcooked burgers are mortal sins, finding the real murderer requires more than just a love for chargrilled meats—it requires knowing the darkest corners of backyard BBQ rivalries.", "solution": "Amber Ash is the murderer. Her deep-seated resentment towards Rick, exacerbated by his public humiliation of her, pushed her over the edge. She planned to kill him at the BBQ, knowing she could move about freely and with ample opportunity. Her motives become clear through the scathing review draft and her possession of the missing award. The charcoal smudge on her shoes placed her near the grill at the crucial moment, and the partial wiping of her fingerprints on the bean pot further incriminated her. The smudged fingerprints, discovered through a clue analysis, and inconsistencies in her arrival timeline cemented her as the killer. Her attempt to spin a narrative of an accidental death was foiled by consistent clues pointing towards her deliberate actions.", "timeline": [{"time": "2:00 PM", "event": "Guests arrive, Rick starts his famous 'Grillmaster Showdown' BBQ contest."}, {"time": "3:00 PM", "event": "Tina Tongs films a live stream with Rick, showcasing his grilling secrets."}, {"time": "4:00 PM", "event": "Charlie Charcoal arrives late, visibly agitated, and heads straight to the grill."}, {"time": "4:30 PM", "event": "Amber Ash arrives, jokingly critiques everyone's grill settings."}, {"time": "5:00 PM", "event": "Rick found dead facedown in bean pot, BBQ in uproar."}], "characters": [{"name": "Tina Tongs", "role": "Aspiring Grilling YouTuber", "secret": "Accidentally caused a string of small propane explosions during her live streams to boost views.", "isMurderer": false, "personality": "Energetic and a little too obsessed with marinades. Often makes puns about grilling.", "relationshipToVictim": "Neighbor and protege; Rick taught her the art of grilling."}, {"name": "Charlie Charcoal", "role": "Underdog BBQ Competitor", "secret": "Disqualified last year for allegedly using premade sauce, tarnishing his reputation.", "isMurderer": false, "personality": "Charismatic but always on edge, known for his explosive temper and unfiltered comments.", "relationshipToVictim": "Bitter rival obsessed with beating Rick in the grill-off."}, {"name": "Amber Ash", "role": "Food Critic and Blogger", "secret": "Wrote a scathing review of Rick's BBQ once, causing tension between her and Rick.", "isMurderer": true, "personality": "Witty and sharply critical, with a nose for uncovering hidden flavors and secrets.", "relationshipToVictim": "Frequent critic; Rick never forgave her for a bad review."}, {"name": "Barry Briquette", "role": "Disgruntled Accountant", "secret": "Embezzling money from his clients, including from Rick’s BBQ competitions.", "isMurderer": false, "personality": "Detail-oriented, sarcastic, and loathes anything to do with BBQs despite turning up every year.", "relationshipToVictim": "Handled Rick’s competition winnings; Rick was suspicious of his accounting."}], "murdererMotive": "Amber Ash wanted to sabotage Rick's legacy after their feud intensified when he publicly humiliated her during a previous BBQ event. She saw the BBQ scenario as a perfect way to metaphorically roast him as revenge for her tarnished credibility."}	{"tone": "Funny", "format": "Mobile", "setting": "Backyard BBQ", "difficulty": "Messy", "playerCount": "4"}	2026-03-17 16:30:07.0012+00	8	f	\N	\N
1773768752881	{"clues": [{"title": "Blood-Stained Handkerchief", "description": "Found near the body, embroidered with initials 'M.S.'", "significance": "Belongs to Marco Stamos, links him directly to the murder scene."}, {"title": "Broken Wine Glass", "description": "Shards of glass scattered near the entrance of the grand salon.", "significance": "Knocked over during Marco's hasty departure, conflicting with his stated alibi."}, {"title": "Diary Page", "description": "Torn page recovered from Lionel's desk, mentioning 'the end of their partnership' without names.", "significance": "Hints at Lionel's fallout with an associate; implicates more than one character but hints at Marco's animosity."}, {"title": "Luxury Watch", "description": "Engraved with a personal message, belonging to Lionel, missing at the time of the murder.", "significance": "Adds suspicion elsewhere since it could be seen as a theft motive."}, {"title": "Footprints in the Corridor", "description": "Distinct footprints leading away from the salon towards the kitchens. Larger than a woman's shoe would typically be.", "significance": "Suggests a male suspect, narrowing it down to Jasper or Marco."}, {"title": "Perfume Scent", "description": "Lingering scent of Ava's signature perfume outside the grand salon.", "significance": "Red herring; puts suspicion on Ava but nothing more substantial connects her."}, {"title": "Financial Report", "description": "A dossier of financial irregularities Lionel compiled about Vivian's charity.", "significance": "Incriminating for Vivian; potentially a motive for confrontation but not murder."}, {"title": "Chef's Knife Set", "description": "Marco's personal knife set missing one piece, not connected to murder weapon but suggesting animosity.", "significance": "Draws further suspicion to Marco due to his culinary role."}], "title": "Murder on the High Seas: Waves of Deception", "victim": {"name": "Lionel Chakravarti", "background": "Lionel Chakravarti was a self-made magnate whose fortune arose from a series of audacious business ventures and silencing competitors with questionable methods. Known for his magnetic charisma and ruthless ambition, Lionel cultivated a lavish lifestyle and famously hosted elaborate events on his yacht. Yet, beneath the polished exterior lurked a man with many enemies — both professional rivals and those personally wronged by his swaggering duplicity.", "reasonKilled": "Lionel's aggressive tactics left a trail of betrayed partners and scandalized confidants. Many have long waited for an opportunity to bring him down."}, "premise": "A balmy summer breeze ripples across the deck of the S.S. Mirage as it glides silently under the opalescent moon. The glittering yacht hosts an eclectic group of pleasure-seekers for an aura of exclusivity and indulgence, with champagne flowing as freely as the gossip. The world-famous yacht is known for its extravagant parties, thrown by the illustrious and rather daunting host, Lionel Chakravarti, a man known for his charm and his controversial dealings.\\n\\nIn the midst of the festivities, a sudden chill grips the heart of the gathering. Lionel's body is discovered in the opulent grand salon, a sharp letter opener embedded in his back. The music screeches to a halt as panicked voices rise and clash, each guest suspecting the other. The yacht is miles from shore, and with no escape from the truth, chaos reigns under the sparkling starlight.", "solution": "Marco Stamos, blinded by rage and humiliation, committed the murder in a fit of passion. He had quietly entered the grand salon after observing Lionel retreat from the festivities. With Lionel turned away, oblivious to Marco's presence due to his own gloating over others' misfortunes, Marco seized the weapon — a conspicuously unnamed item Lionel collected as a memento from his naval ventures. As Marco departed, he knocked over a wine glass in his haste, a detail that contradicted his claim of never having entered the salon. \\n\\nThe blood-stained handkerchief embroidered with Marco's initials, found by the body, was damning. Combined with the footprints leading to his workplace — the kitchen — these clues pieced together Marco's frantic escape after the crime. Lionel's diary page, vague but poignant, painted Marco's desperation to sever ties as more than business-related; it was personal, blemishing Marco's identity and ambitions. \\n\\nThe signs all aligned: the public affront, Marco’s anguished vulnerability under layers of bravado, and the tangible evidence that linked all to him. His motive could not have been more potent or more damning, when unveiled through the evidence: avenging his life's passion held hostage by Lionel's treacherous critique.", "timeline": [{"time": "7:00 PM", "event": "Guests board the S.S. Mirage, welcomed with cocktails and a view of the setting sun."}, {"time": "8:30 PM", "event": "The main course is served by Marco, who is visibly on edge after Lionel snubs his dish."}, {"time": "9:15 PM", "event": "Vivian and Jasper are seen engaged in a heated conversation on the upper deck, casting suspicious glances at Lionel."}, {"time": "10:00 PM", "event": "Lionel makes a show of confronting Vivian publicly about her charity's mismanagement."}, {"time": "10:45 PM", "event": "Ava steps away from the party, seemingly upset after a whispered exchange with Lionel."}, {"time": "11:30 PM", "event": "Lionel retreated to the grand salon; minutes later, Marco was seen leaving hurriedly."}, {"time": "12:00 AM", "event": "Lionel's body is discovered, sending the party into uproar and confusion."}], "characters": [{"name": "Vivian Castille", "role": "Heiress and Philanthropist", "secret": "She embezzled money from her family’s charity fund to settle gambling debts due to her secret addiction.", "isMurderer": false, "personality": "Vivian exudes luxury with an imperious air, speaking in lilting tones that command attention, only to direct it strategically away from topics that may unearth her inner vulnerabilities.", "relationshipToVictim": "Lionel was her financial advisor, who discovered her siphoning."}, {"name": "Marco Stamos", "role": "Celebrity Chef", "secret": "Held a grudge against Lionel for ruining his restaurant's reputation with a sour review after their business fallout.", "isMurderer": true, "personality": "Marco lives in a world of culinary creation, speaking passionately about his dishes with an unpredictable temper. His sharp wit often cuts conversations short, revealing nothing of his inner turmoil.", "relationshipToVictim": "Lionel wrote a scathing article about Marco's restaurant after a failed joint venture, significantly impacting Marco's career."}, {"name": "Ava Duval", "role": "Renowned Actress", "secret": "Ava was blackmailed by Lionel over a scandalous affair from her past that threatened her career.", "isMurderer": false, "personality": "Ava navigates the social currents with dramatic flair, always yearning for the spotlight. Her stories enthrall, though they often dissolve truth to mere performance.", "relationshipToVictim": "Lionel cultivated Ava's career, leveraging his power over her with secrets from her early days."}, {"name": "Jasper Long", "role": "Tech Mogul", "secret": "Engaged in insider trading, acquiring information that Lionel stumbled upon.", "isMurderer": false, "personality": "Jasper, typically reserved, considers social events as obligatory nuisances, observed from the periphery with detached curiosity. His intellect pierces conversational facades.", "relationshipToVictim": "Lionel confronted Jasper about his illicit activities, threatening to expose him unless compensated."}], "murdererMotive": "Marco Stamos felt his entire career and reputation stood on quicksand after Lionel's caustic review. The damage extended beyond financial losses — it was a blow to Marco's identity and pride as a chef, prompting him to seek irrevocable vengeance when Lionel would offer no amends."}	{"tone": "Chaotic", "format": "Printable", "setting": "Luxury Yacht", "difficulty": "Easy", "playerCount": "4"}	2026-03-17 17:32:33.002378+00	3	f	\N	\N
1773770817494	{"clues": [{"title": "Sheathed Dagger", "description": "A decorative dagger was found sheathed and lying underneath the table, far too obvious for the killer to have used without removing it from its case. It gleamed untouched and purely ornamental.", "significance": "Red herring suggesting a weapon, but lacking evidence of actual use."}, {"title": "Spilled Champagne", "description": "A half-empty champagne flute tilted over the edge of the table, forming a small pool that reflected the flickering candlelight ominously.", "significance": "Marks the area where Lennox was last seen engaged in animated conversation before his demise."}, {"title": "Shattered Pocket Watch", "description": "The broken remnants of an ornate pocket watch lay near Lennox's body, its hands frozen at exactly 9:45 PM.", "significance": "Contradicts the murder timeline, suggesting something happened before 10:30 PM."}, {"title": "Barnaby's Note", "description": "A crumpled note found in Barnaby's coat, detailing a recipe for a suspicious concoction along with a series of veiled threats against Lennox.", "significance": "Incriminating evidence hinting at premeditation due to Barnaby's desire to protect his secrets."}, {"title": "Orville's Sputtering Gadget", "description": "One of Orville’s gadgets found inexplicably jammed under Lennox’s chair with dried residue, possibly sabotage material from extensive tinkering.", "significance": "Another red herring, making Orville look suspicious but ultimately unrelated to the actual murder."}, {"title": "Magnolia’s Paint Smudge", "description": "A streak of vivid yellow paint crossing Lennox’s fingers, leading to speculation that he struggled against his fate.", "significance": "Links Magnolia to the scene due to her expressive, paint-laden outbursts, misleadingly so."}, {"title": "Jemima’s Magnifying Glass", "description": "Claims she found it abandoned close to the scene, tactical considering her enthusiasm for dramatic reveals.", "significance": "Fits her narrative of bouncing from suspect to suspect, fueling her egotistical narrations."}, {"title": "Thaddeus’s Poetic Scribbles", "description": "Scraps of paper torn from Thaddeus's ever-present notebook, found near the victim carved with dramatically circled moons and indecipherable night imagery.", "significance": "Only superficially connects to the crime, representing his melancholy obsession rather than anything sinister."}, {"title": "Petunia’s Diary Entry", "description": "A cryptically suggestive diary page discovered during Lennox’s inspection of Petunia’s chamber, hinting at dissatisfaction not just with him but the entire staff.", "significance": "Shows motive for broader resentment, feeding her desire for upheaval rather than focused malice."}], "title": "Murder Over Mimosas", "victim": {"name": "Sir Lennox Vanderweil", "background": "Sir Lennox was a former theater impresario, celebrated for his wit, flair, and penchant for the theatrical. Known for his larger-than-life persona, he was both adored and envied within his circles. His capacity for charm was matched by a talent for uncovering—and exploiting—the secrets of those around him, a skill that made many tread carefully around him. Despite his charisma, Lennox had a knack for inciting rivalries and unrest.", "reasonKilled": "While Lennox's charm was undeniable, he was also a master manipulator with a knack for holding leverage over others using their secrets. His annual parties, though flamboyant, were notorious for reviving old grudges and tensions."}, "premise": "In the heart of a storm-soaked October, a group of eccentric characters huddled under the shadowy eaves of Castle Macabre—a sprawling Gothic mansion notorious for its labyrinthine corridors and dubious history. The occasion? The dubious thirteenth annual \\"Roundabout Royale,\\" a tongue-in-cheek murder mystery party thrown by the estate’s charismatic and mischievous owner, Sir Lennox Vanderweil. Guests, donned in their most theatrical attire, were prepared for an evening of witticisms, old tales, and pretentious games.\\n\\nAs the rain pattered insistently against tall windows, the jovial atmosphere turned starkly sobering after the group discovered Sir Lennox's lifeless body at the center of the grand dining room, sprawled dramatically over the table amid the remnants of an uneaten feast. It seemed the night's pretend murder had become gravely real.\\n\\nThe room erupted into a chorus of gasps and speculations, curiosity mingling with a farcical kind of horror as the guests (some a tad inebriated from the endless mimosas) realized the game was no longer a fiction. With a murderer among them, the guests must sift through a ridiculous tangle of clues while keeping their wits sharp and their repartee sharper.", "solution": "Dr. Barnaby Thistlewaite, overcome by dread as Sir Lennox threatened to publicly dismantle his falsified credentials, crafted a devious plan to silence him. Before heading to Castle Macabre, Barnaby concocted a slow-acting poison designed to be undetectable in champagne—Lennox’s favored indulgence. Throughout the evening, in the midst of roundabout games and rambunctious laughter, Barnaby ensured that Lennox's glass was never empty, knowing full well his flamboyant friend would not notice the added bitterness amid his merrymaking.\\n\\nThe key lay in the broken pocket watch, halted at 9:45 PM. This was the true time of Lennox’s initial collapse, cleverly disguised by the lively facade of the party. Barnaby had counted on the lateness of the hour to obscure the true point of Lennox’s demise, offering ample opportunity to feign shock and confusion like the others. He had planted misleading artifacts, such as Petunia’s diary and a poisoned timepiece, deliberately to skew suspicion—knowing such objects would ensnare the eager sleuths.\\n\\nThe crux of solving Lennox’s murder lay in connecting the dots between Barnaby's note and the absence of any struggle at the scene—highlighting how Lennox’s final sip came from a trusted glass, amidst trusted company. As revelations unfold, it becomes clear that the twists of the evening aligned perfectly with Lennox’s own dramatic flair—an irony not wasted on Barnaby, who orchestrated his charade with near-farcical precision.", "timeline": [{"time": "7:00 PM", "event": "Guests arrive at Castle Macabre, mingling and engaging in Sir Lennox’s deliberately absurd icebreakers."}, {"time": "8:00 PM", "event": "Charades of the macabre commence, with Lennox reveling as the audience eagerly participates."}, {"time": "9:00 PM", "event": "Dinner is served; heated discussions and over-the-top debates pepper the meal."}, {"time": "10:00 PM", "event": "Lennox announces the beginning of the murder mystery game and separates guests into teams."}, {"time": "10:30 PM", "event": "Lennox is found dead, having seemingly perished in the midst of his own contrived mystery scenario."}, {"time": "11:00 PM", "event": "The guests, in various states of shock, start exchanging accusations and scrutinizing timelines."}], "characters": [{"name": "Petunia Bulstrode", "role": "Nosy Housekeeper", "secret": "Petunia had been blackmailing Sir Lennox for his secret involvement in a tawdry affair with a rival's spouse.", "isMurderer": false, "personality": "Always lurking around corners, her hunched silhouette often mistaken for cobwebs. She's notorious for her eavesdropping and her two-faced smile that flips with alarming speed.", "relationshipToVictim": "She was his loyal servant but secretly despised him, knowing all too well about his manipulative ways."}, {"name": "Dr. Barnaby Thistlewaite", "role": "Dubious Doctor", "secret": "Lennox threatened to expose Barnaby’s fraudulent credentials and experiments with dubious results.", "isMurderer": true, "personality": "Forever lost in thoughts of questionable science, he often interrupts himself with wild laughter, startling those around him with peculiar anecdotes about bizarre experiments.", "relationshipToVictim": "An \\"old friend\\" from their days in London, bonded over liquor-laden evenings but secretly despised each other's methods."}, {"name": "Felicity Fiddleworth", "role": "Socialite and Gossip", "secret": "She was in financial ruin due to reckless gambling and received funds from Lennox, who now threatened to expose her debts.", "isMurderer": false, "personality": "Felicity knows every juicy detail about everyone, often found twirling her expensive jewelry while slyly probing for new tidbits to spread.", "relationshipToVictim": "Claimed to be a dear friend, but their relationship was transactional; they traded secrets and favors like currency."}, {"name": "Orville Pigsnov", "role": "Aspiring Inventor", "secret": "Lennox had stolen Orville’s designs, passing them off as his own, causing a substantial rift.", "isMurderer": false, "personality": "A bumbling genius at best, he drapes himself with an assortment of peculiar gadgets that often whir and click at awkward times, protesting loudly when malfunctions occur.", "relationshipToVictim": "Initially partners in crime, Lennox’s betrayal turned Orville into a silent, resentful shadow."}, {"name": "Cypress Nettle", "role": "Mysterious Gardener", "secret": "Cypress was aware of Lennox’s plans to sell Castle Macabre, jeopardizing their beloved gardens.", "isMurderer": false, "personality": "Stoic and cryptic, they communicate in cryptic metaphors, presenting an enigmatic veneer, intriguingly marked by occasional outbursts of almost poetic rage.", "relationshipToVictim": "Bound by a mutual appreciation of the estate’s grounds, yet civility masked underlying resentment."}, {"name": "Jemima Brambleton", "role": "Amateur Sleuth", "secret": "Discovered that Lennox was basing a character in his next play on her, a bumbling fool, and threatened to sue for libel.", "isMurderer": false, "personality": "Keenly observant with an annoying habit of narrating her findings aloud, to the exasperation of those around her. Known to don exaggerated magnifying spectacles.", "relationshipToVictim": "Engaged in a ludicrous rivalry over detective skills, often debating who solved more paper cases."}, {"name": "Thaddeus Slumber", "role": "Languid Poet", "secret": "His latest anthology was directly plagiarized from writings Lennox found during travels, which Thaddeus had managed to acquire mysteriously.", "isMurderer": false, "personality": "Seldom conscious during daytime, Thaddeus speaks in laborious, haunting verses, usually preferring to snooze with a draped arm over his eyes.", "relationshipToVictim": "Their association was a silent nod to mutual disdain, occasionally swapping insincere compliments."}, {"name": "Magnolia Pivett", "role": "Eccentric Artist", "secret": "Lennox had copies of her earlier, lesser works, threatening to reveal her gradual descent into chaos after a particular art show embarrassment.", "isMurderer": false, "personality": "Her vivid attire mimics her temperamental mood swings; one moment she's visionary, and the next, she's hurling paint in melodramatic passion.", "relationshipToVictim": "Though initially she considered him a muse, their relationship soured after he exploited her artistic crises for amusement."}], "murdererMotive": "Barnaby Thistlewaite, driven by desperation to protect his reputation, needed to eliminate Lennox, who was about to dismantle his false identity and expose his fraudulent medical claims to the world, which would ruin his career and life."}	{"tone": "Funny", "setting": "Gothic Mansion", "difficulty": "Medium", "playerCount": "8", "genderCounts": {"male": 3, "female": 4, "neutral": 1}}	2026-03-17 18:06:57.626349+00	9	t	\N	\N

\.

COPY "character_assignments" FROM stdin;
1	test-mystery-1	Bev Bunsen	bev@test.com	email	ecu5a5p6bqas8yt8ohzq90u7	[{"clueIndex": 1, "secretInfo": "Bev distinctly remembers mixing up batches of her new 'Fusion Flame Marinade' to test on Kendra's ribs, but she never left an empty bottle there. Has someone been borrowing her sauces?"}, {"clueIndex": 2, "secretInfo": "Bev had experimented with adding an ingredient called 'Capsaicin Conqueror' in her latest marinade—which was only supposed to be tried on backyard pests, not in human food."}, {"clueIndex": 3, "secretInfo": "Bev knows the time because she had a reminder set to check on her special slow-cooked brisket; she was deeply engrossed in ensuring its 'experimental phase' wasn't burnt."}, {"clueIndex": 4, "secretInfo": "Bev sent a string of texts earlier that day discussing new potential bylaws for the neighborhood. She cringes, realizing how they could be misconstrued given recent events."}]	1	2026-03-17 13:48:57.333792+00	f
2	1773756704263	Jenny Thompson	8134182823	email	zw29iazjec35psfwobtwag0y	[{"clueIndex": 1, "secretInfo": "I saw Eddie sneaking into the venue earlier, looking super nervous about something. Maybe that's why his medication ended up here."}, {"clueIndex": 2, "secretInfo": "Richie had asked me to prepare a few zingers for his roast but made me promise to keep it low-key. I wonder who else was in on this."}, {"clueIndex": 3, "secretInfo": "I specifically asked the tech crew to check the stage lights twice. It's odd they were fiddling with it again. Maybe Richie was doing a naughty prank?"}, {"clueIndex": 4, "secretInfo": "I made notes on the guest list to remind myself who needed extra tickets and special mentions. Richie and Eddie both had extra plus-ones."}, {"clueIndex": 5, "secretInfo": "Gary was talking about his new encryption app all night—claims it was inspired by Richie’s app success. Perhaps they were collaborating?"}, {"clueIndex": 6, "secretInfo": "Lisa once mentioned to me that Richie was her 'muse' for character inspiration. She might have gone overboard trying to portray him."}, {"clueIndex": 7, "secretInfo": "Nancy and Richie had a long talk during dinner about 'contracts,' but I assumed it was just small talk. Maybe there's more to it."}, {"clueIndex": 8, "secretInfo": "Paul asked me if Richie had a particular song he loved as a kid, something about playing it on repeat at the reunion. I guess he was being nostalgic."}]	1	2026-03-17 14:13:03.154786+00	f
3	1773759080932	Olivia Lancaster	chels.santoro@gmail.com	email	zbftentywfqnmxgh0oewdzc3	[{"clueIndex": 1, "secretInfo": "Olivia knows that Victor never drank wine without first tasting it for his allergies, which makes her wonder why it was on the table."}, {"clueIndex": 2, "secretInfo": "Olivia had seen Victor checking his watch nervously throughout the night, making her certain that something was set to happen precisely at 11:47 PM."}, {"clueIndex": 3, "secretInfo": "Victor once tried to teach Olivia about financial ciphers during their time together, claiming their codes were safer than any bank."}, {"clueIndex": 4, "secretInfo": "She recalls Grant boasting about a lucky poker chip he carries for every high-stakes game; Olivia wonders if a fight broke out."}, {"clueIndex": 5, "secretInfo": "Olivia had worn the wig earlier, not to disguise herself, but because Victor had once said he preferred blondes."}, {"clueIndex": 6, "secretInfo": "Olivia saw a suspicious-looking deckhand loitering around Victor's room just before the listed time but didn't think much of it until now."}, {"clueIndex": 7, "secretInfo": "Olivia had angrily torn up those letters earlier that evening after an argument with Victor about past betrayals."}, {"clueIndex": 8, "secretInfo": "Jonathan had spoken fondly of his ceremonial knife during dinner, which Olivia found oddly possessive."}]	0	2026-03-17 14:56:11.083685+00	f
4	1773759080932	Grant Hathaway	8134182823	phone	zo4ppo8oxqyh3ujm72cuoffa	[{"clueIndex": 1, "secretInfo": "Grant knows that Victor had a severe allergy to a certain compound found in his medication. Mixing this with alcohol could be fatal."}, {"clueIndex": 2, "secretInfo": "Grant noticed earlier in the evening that Victor's smartwatch was malfunctioning, occasionally displaying incorrect times."}, {"clueIndex": 3, "secretInfo": "Grant once saw Callie secretly writing complex codes in a notebook while on a different yacht trip a year ago, possibly a similar cipher."}, {"clueIndex": 4, "secretInfo": "Grant habitually spins a poker chip around his fingers when nervous, a quirk from his earlier days trying to fit in with the gambling elite."}, {"clueIndex": 5, "secretInfo": "Grant had overheard Olivia joking about performing for Victor dressed as a Marilyn Monroe impersonator, never suspecting she’d actually bring a wig."}, {"clueIndex": 6, "secretInfo": "Grant had accidentally witnessed someone fiddling with the yacht's keycard system earlier in the evening, but they were wearing a hood and he couldn’t see their face."}, {"clueIndex": 7, "secretInfo": "Grant heard rumors that Olivia and Victor's romance ended on bad terms when Victor chose business over love, but the details were always vague."}, {"clueIndex": 8, "secretInfo": "Grant recalls Jonathan bragging about the cleanliness of his knife collection, proudly claiming they could pass for brand new at any time."}]	0	2026-03-17 14:56:57.348648+00	f
5	1773762379671	Ethan Graves	8134182823	phone	wx7eiwoa648b5533u6pqtq4a	[{"clueIndex": 1, "secretInfo": "Months before the reunion, Jessica asked Ethan to be her 'Secret Keeper,' sparking old memories of their short-lived romance, but leaving him wary of her motives."}, {"clueIndex": 2, "secretInfo": "Ethan remembers offering Jessica a drink earlier, but why she never returned the glass is unsettling him."}, {"clueIndex": 3, "secretInfo": "Years ago, Jessica had warned Ethan, 'Secrets are my currency,' and seeing the note feels eerily reminiscent of her words."}, {"clueIndex": 4, "secretInfo": "Ethan overheard Jessica tell Mark, 'You’re not the only one with something to lose tonight,' but assumed it was just the usual high school drama."}, {"clueIndex": 5, "secretInfo": "Lily had confided in Ethan about a complicated history with Jessica, hinting at a long-standing rivalry, though Ethan didn't take it seriously."}, {"clueIndex": 6, "secretInfo": "Ethan barely skimmed through the photos earlier in the evening, but recalls seeing them marked was odd, as if someone wanted to erase her presence."}, {"clueIndex": 7, "secretInfo": "Ethan distinctly recalls the button looks like one from an accessory Jessica wore back in high school, but he's unsure where it came from now."}, {"clueIndex": 8, "secretInfo": "Months ago, Jessica had hinted to Ethan about a 'killer' article she was working on, teasing it about making headline news and rattling Oakridge's foundations."}, {"clueIndex": 9, "secretInfo": "During a small chat, Mark mentioned losing a key that once belonged to his late father, but Ethan didn't connect it until now."}, {"clueIndex": 10, "secretInfo": "The 'You owe me' note beneath his business card is unfamiliar, but reinforces Ethan's suspicion of Jessica's determination to leverage secrets."}]	1	2026-03-17 15:54:43.658066+00	f
8	1773762379671	Sarah Klein	chels.santoro@gmail.com	email	yfj7cyqc7flq3kmiph34fd1r	[{"clueIndex": 1, "secretInfo": "Sarah had been texting someone anonymously labeled as 'Secret Keeper' to try to uncover gossip on Jessica, hoping to beat her at her own game."}, {"clueIndex": 2, "secretInfo": "Sarah remembers handing Jessica the glass but didn't drink any wine herself, ensuring her lipstick wouldn't smudge her perfect look."}, {"clueIndex": 3, "secretInfo": "Sarah once warned Jessica that exposing others' secrets could backfire. Could the note be in reference to that conversation?"}, {"clueIndex": 4, "secretInfo": "Sarah knows Mark and Jessica used to be close friends in high school and suspects their reunion chat was about the past rather than anything sinister."}, {"clueIndex": 5, "secretInfo": "Sarah lent her sweater to Lily earlier in the night because she was cold, and it might have come into contact with the wine then."}, {"clueIndex": 6, "secretInfo": "Sarah knew Jessica had become more paranoid recently, scratching out pictures due to imagined enemies she believed were out to get her."}, {"clueIndex": 7, "secretInfo": "Sarah tore a button from an old jacket she was adjusting at home—a vintage piece Jessica had once envied—but it shouldn't have been near Jessica."}, {"clueIndex": 8, "secretInfo": "Sarah had heard rumors about the article but thought it was more of Jessica's dramatic flair and didn't expect it to be about real scandals."}, {"clueIndex": 9, "secretInfo": "Sarah saw Mark shifting nervously near the bar area, likely dropping something while distracted."}, {"clueIndex": 10, "secretInfo": "Ethan owed Sarah a favor from when she helped him organize a PTA event, so she assumed Jessica was calling in old debts for a juicy story."}]	1	2026-03-17 15:58:50.702524+00	f
9	1773762379671	David Chang	chels.santoro@gmail.com	email	1lii9ylmkidycd5sozifjajj	[{"clueIndex": 1, "secretInfo": "David recognizes the number saved as 'Secret Keeper'. He has seen Jessica dial from her phone, feeling a sense of dread whenever the phone rang."}, {"clueIndex": 2, "secretInfo": "David recalls sharing a quiet drink with Jessica earlier, in an attempt to convince her to not publish certain stories that might ruin reputations."}, {"clueIndex": 3, "secretInfo": "David once wrote anonymous notes to Jessica, pleading her to keep quiet about the accident, though he never used such threatening words."}, {"clueIndex": 4, "secretInfo": "David suspects the witness might have confused Mark with himself; he had a brief, anxious talk with Jessica that night too."}, {"clueIndex": 5, "secretInfo": "David remembers Lily bumping into him, causing his drink to spill, before the party moved outside."}, {"clueIndex": 6, "secretInfo": "David had never noticed the scratched-out photos before, but feels unnerved as he recalls how fiercely Jessica's presence was felt in each picture."}, {"clueIndex": 7, "secretInfo": "The button belongs to David's favorite coat, which he misplaced after arriving, and he wonders how it ended up there."}, {"clueIndex": 8, "secretInfo": "David overheard Jessica bragging about an upcoming revelation that would 'change lives,' which made him worry about their past secret."}, {"clueIndex": 9, "secretInfo": "After mingling at the barside, David noticed Mark and Jessica's intense argument from afar, but the key dropped unnoticed by everyone else."}, {"clueIndex": 10, "secretInfo": "David knows that Jessica had some financial dirt on Ethan, overheard from a whispered conversation at the previous reunion."}]	1	2026-03-17 15:59:52.774942+00	f
6	1773762379671	Lily Tran	chelseazellner@yahoo.com	email	0p0fzpwmjxlc59eszrz6bkhi	[{"clueIndex": 1, "secretInfo": "Lily knows 'Secret Keeper' is a code name Jessica used for Lily in the past after their argument, when she confided in her about sensitive topics."}, {"clueIndex": 2, "secretInfo": "Lily recalls jokingly pretending to be a detective as a child and wonders if her old fingerprint dusting kit could have created some smudges if left in the wrong place."}, {"clueIndex": 3, "secretInfo": "Lily remembers writing a note to Jessica at the height of their argument in high school, saying something similar in frustration, but she thought Jessica had thrown it away."}, {"clueIndex": 4, "secretInfo": "Lily has always suspected that Mark and Jessica had an on-again, off-again romantic entanglement ever since high school."}, {"clueIndex": 5, "secretInfo": "Lily had shared a glass of wine with Jessica earlier in the evening, and Jessica accidentally bumped into her, spilling wine on the sweater."}, {"clueIndex": 6, "secretInfo": "Lily got frustrated and scratched out Jessica’s face in anger one night during their college reunion planning, channeling some leftover bitterness."}, {"clueIndex": 7, "secretInfo": "Lily recognizes the button as one she had sewn onto a sentimental scarf for Jessica in high school as part of their friendship pact."}, {"clueIndex": 8, "secretInfo": "Lily knew about Jessica’s article plan and had reluctantly agreed to give her some background stories about fellow teachers."}, {"clueIndex": 9, "secretInfo": "Lily once used a similar handcuff key as a prop in her drama class but lost it after a chaotic clean-up."}, {"clueIndex": 10, "secretInfo": "Lily saw Ethan talking to Jessica earlier with a serious expression; they seemed to be discussing something crucial relating to money."}]	1	2026-03-17 15:55:57.951952+00	f
7	1773762379671	Mark Rodriguez	csantor@ju.edu	email	3ya3pwkossr9vzq7uztod6km	[{"clueIndex": 1, "secretInfo": "Mark once allowed Jessica to use his backup phone number for an investigation, which she might have labeled as 'Secret Keeper.' He wonders if she still held on to that number."}, {"clueIndex": 2, "secretInfo": "Mark remembers picking up Jessica's glass, planning to refill it for her, which is why his fingerprint might be on it."}, {"clueIndex": 3, "secretInfo": "Mark recalls writing a similar warning to Jessica when they ended things, urging her to keep their breakup details private."}, {"clueIndex": 4, "secretInfo": "Mark admits to himself that he did talk to Jessica privately, urging her to drop an investigation related to their old circle, fearing what she'd dig up."}, {"clueIndex": 5, "secretInfo": "Mark knows Lily accidentally brushed past him, spilling wine, but didn't realize it had splashed so far."}, {"clueIndex": 6, "secretInfo": "Mark noticed the scratched photos early in the evening but decided it wasn’t worth mentioning, thinking it was just someone’s bad joke."}, {"clueIndex": 7, "secretInfo": "The button seems familiar to Mark from the school days—it matches an old jacket of his he'd recently donated in town."}, {"clueIndex": 8, "secretInfo": "Mark saw the article draft at the beginning of the reunion when Jessica showed it to him, saying 'there's more to everyone than meets the eye.'"}, {"clueIndex": 9, "secretInfo": "Mark has mislaid his handcuff key before and wonders if Jessica had nicked it for one of her pranks."}, {"clueIndex": 10, "secretInfo": "Mark had spotted Ethan conspiring with Jessica, reminding him of a debt between them, which he suspected involved some insider trading gossip."}]	1	2026-03-17 15:57:05.421051+00	t
10	1773765006877	Tina Tongs	chels.santoro@gmail.com	email	9j6inoajgvjd7st8bipz2y66	[{"clueIndex": 1, "secretInfo": "Tina had a habit of shaking ketchup bottles to make a 'pop' during her live streams. The missing cap could easily be from one of her sauces."}, {"clueIndex": 2, "secretInfo": "Tina borrowed Rick's bean pot yesterday to try a new recipe for 'smoky sweet beans.' She returned it to Rick this morning but didn't clean it thoroughly."}, {"clueIndex": 3, "secretInfo": "Charcoal smudges were all over Tina's BBQ apron after she accidentally knocked over a bag while setting up her equipment earlier."}, {"clueIndex": 4, "secretInfo": "Those burnt recipe notes were from Tina's failed attempt at perfecting her award-winning 'Tina's Turbo Tangy Rub,' which she swears Rick stole and made his own."}, {"clueIndex": 5, "secretInfo": "Tina once saw Charlie refill a 'homemade sauce' bottle with store-bought sauce during a past cook-off, but she decided not to mention it to keep the peace."}, {"clueIndex": 6, "secretInfo": "Amber and Tina had a secret deal−if Amber gave her a good review on her YouTube channel, Tina promised to give Amber a dozen special recipe burgers."}, {"clueIndex": 7, "secretInfo": "Tina noticed Barry glaring at Rick with envy when he won the last Grill Master's Cup, which Barry had secretly bet on—and lost."}, {"clueIndex": 8, "secretInfo": "Tina was the last person who saw Amber with the trophy, but she distinctly remembers Amber claiming she was taking it to polish it up for a photo session."}]	8	2026-03-17 16:55:55.938493+00	f
12	1773765006877	Amber Ash	chels.santoro@gmail.com	email	bhdg1ilh5vv0ngqk4611aal8	[{"clueIndex": 1, "secretInfo": "Amber recalls she once joked about hiding Rick's trophies in ketchup bottles during their last argument. Maybe someone took it literally?"}, {"clueIndex": 2, "secretInfo": "Amber knows the exact BBQ spot Rick swore by for secret beans seasoning after overhearing him boast about it at a party."}, {"clueIndex": 3, "secretInfo": "Amber secretly used her charcoal rubbing technique on random objects to authenticate grill sessions; these might just be her smudges."}, {"clueIndex": 4, "secretInfo": "Amber once advised Tina to write down any and all grilling ideas, no matter how crazy, to spice up her channel. Did she take it too seriously?"}, {"clueIndex": 5, "secretInfo": "Charlie once whispered to Amber during a cook-off that his sauces could make winning a dark art. She dismissed it as playful banter."}, {"clueIndex": 6, "secretInfo": "Amber drafted the critique while testing different spicy sauces one late night, explaining the smudges but not intending it to be seen."}, {"clueIndex": 7, "secretInfo": "Amber knows Barry often features in blogs about underground BBQ gambling; maybe someone's collecting evidence for a saucy expose?"}, {"clueIndex": 8, "secretInfo": "Amber humorously 'borrowed' Rick's award for a photo op on ironic culinary accolades but intended to return it the same evening."}]	8	2026-03-17 16:58:56.940752+00	t
11	1773765006877	Charlie Charcoal	chels.santoro@gmail.com	email	631zfz805htrzl5eza8cshu1	[{"clueIndex": 1, "secretInfo": "Charlie knows Rick always despised anything store-bought, especially sauces and condiments like ketchup."}, {"clueIndex": 2, "secretInfo": "Charlie recalls angrily slamming the lid on the bean pot earlier, thinking Rick would overcook the beans like always."}, {"clueIndex": 3, "secretInfo": "Charlie remembers spilling some charcoal while 'accidentally' putting Amber’s critique drafts into his pit to get them out of her hands."}, {"clueIndex": 4, "secretInfo": "Charlie unwittingly shared one of his better grilling tricks with Tina last week during a friendly practice session—she better not have messed it up!"}, {"clueIndex": 5, "secretInfo": "Charlie admits he's kept those sauce bottles for emergencies, fearing repeat accusations of his own seasoning inadequacies."}, {"clueIndex": 6, "secretInfo": "Charlie heard Amber saying Rick's BBQ would send her into 'a salty panic' — he figures she just meant his over-salted ribs."}, {"clueIndex": 7, "secretInfo": "Charlie spotted Barry nervously watching him wager last year, hinting he might be betting on more than just BBQ skills."}, {"clueIndex": 8, "secretInfo": "Charlie recalls Rick awarding Amber the trophy during their last argument—mockingly, he insists, not in earnest celebration."}]	8	2026-03-17 16:58:05.441814+00	f
13	1773765006877	Barry Briquette	chels.santoro@gmail.com	email	qx7zq8ch5fckgog84jhreiv7	[{"clueIndex": 1, "secretInfo": "You begrudgingly remember Rick joking about the lack of ketchup at last year’s BBQ, but nothing about the cap was mentioned. You pocketed it after all that squabble."}, {"clueIndex": 2, "secretInfo": "Rick often used the bean pot to hide betting slips from his wife, who was oblivious to his gambling on BBQ cook-offs."}, {"clueIndex": 3, "secretInfo": "You recall Amber walking suspiciously around Rick’s station after he shooed her off with a spoonful of coleslaw."}, {"clueIndex": 4, "secretInfo": "The handwriting on Tina’s notes eerily resembles the way Rick used to scrawl his secret rub recipes, which he claimed would be his retirement plan."}, {"clueIndex": 5, "secretInfo": "Charlie’s stash isn’t a surprise to you; he’s known for buying premade sauces and passing them off as artisanal – it’s an open secret among competitors."}, {"clueIndex": 6, "secretInfo": "Amber’s got the habit of writing scathing drafts for everyone, but is Rick's draft over-the-top even for her? Possibly she wished he’d lose a few inches off his ego."}, {"clueIndex": 7, "secretInfo": "After a heated and tipsy discussion with a fellow accountant in the know, you learned Rick’s odds really shifted after last year’s surprising underdog win."}, {"clueIndex": 8, "secretInfo": "Rick was razzing everyone because he misplaced the award during a drinking game and hopped the fence yelling that he’d reclaim it next cook-off, with or without his pants."}]	8	2026-03-17 16:59:46.544486+00	f
14	1773768752881	Vivian Castille	chels.santoro@gmail.com	email	tdax57ofa7ktxqeasokja2zp	[{"clueIndex": 1, "secretInfo": "I distinctly remember Marco storming around earlier with a furious look. When I saw the embroidered initials 'M.S.' on the handkerchief, it reminded me of Marco's uncanny flair for accessorizing."}, {"clueIndex": 2, "secretInfo": "Not long before the glass shattered, I caught Lionel having a smug little rendezvous with Jasper Long. They looked thick as thieves, more than just whispers of tech chatter."}, {"clueIndex": 3, "secretInfo": "I once overheard Lionel dictating notes about ending a partnership. His words dripped with disdain. But honestly, I assumed he meant my errant cousin coming to collect on a dubious investment."}, {"clueIndex": 4, "secretInfo": "Lionel often showed off his luxury watch at gatherings, declaring its engraving as a testament to his masterful 'conquests.' If that watch is missing, it’s pure scandal — someone probably wanted their cut of 'mastery.'"}, {"clueIndex": 5, "secretInfo": "Lionel's voice carries like a foghorn; I could swear I heard it echo towards the kitchens in a game of cat and mouse, not long before I heard someone thundering down the corridor."}, {"clueIndex": 6, "secretInfo": "Ava's perfume is unmistakable, like a garden of secrets walking by. I caught a whiff near the salon, but she hadn't mentioned joining the gathering there when we chatted earlier."}, {"clueIndex": 7, "secretInfo": "While perusing Lionel’s desk once, I glimpsed a financial report detailing something oppressively familiar. His notes about charity funds spelled disaster if left unchecked."}, {"clueIndex": 8, "secretInfo": "Lionel sneered about Marco's famed cuisine, claiming knives could cut through more than food — confidence, perhaps. Marco's missing knife might suggest more than culinary dislike."}]	3	2026-03-17 17:35:02.75837+00	f
15	1773768752881	Marco Stamos	chels.santoro@gmail.com	email	lw3gi5n24b91lfzb276rpmhj	[{"clueIndex": 1, "secretInfo": "Seeing my handkerchief stained like that didn’t sit well with me. I remember someone rifling through my things earlier — could’ve easily lifted it."}, {"clueIndex": 2, "secretInfo": "Lionel always did get under people's skin. I heard a wine glass shatter while Ava and I exchanged culinary barbs. Might’ve been his way of punctuating a conversation, like he was wont to do."}, {"clueIndex": 3, "secretInfo": "Lionel tried to brush off a conversation we had about cutting ties with 'liabilities.' His eyes said one thing while his mouth spun another — typical Lionel."}, {"clueIndex": 4, "secretInfo": "That watch of his had some sort of boastful engraving, hard to forget his constant brags about it. If it’s gone, that’s Lionel’s carelessness, no question."}, {"clueIndex": 5, "secretInfo": "Those footprints are hard to ignore; I've seen many like that around the galley. Could belong to any of the staff — Lionel loved reminding us about his ‘influence’ over everyone."}, {"clueIndex": 6, "secretInfo": "Ava’s scent is hard to miss, especially when it hung around right after Lionel slinked into the salon. It always seems to precede something dramatic with her."}, {"clueIndex": 7, "secretInfo": "I once glimpsed an envelope with Vivian’s name on Lionel’s desk. He shoved it away when he saw me. Some financial blackmail seemed his style."}, {"clueIndex": 8, "secretInfo": "I misplaced one of my knives — Lionel’s taunts about them sliced deeper than culinary critiques. It’s always unnerving to lose something so personal."}]	3	2026-03-17 17:36:09.519545+00	t
16	1773768752881	Ava Duval	chels.santoro@gmail.com	email	x8recfswv45o0vhcpsuaa9m5	[{"clueIndex": 1, "secretInfo": "I remember Lionel cruelly mocking Marco earlier in the night, publicly questioning his taste, right after I saw someone saunter by with a monogrammed handkerchief sticking out of their pocket. The initial 'M' was almost begging for attention."}, {"clueIndex": 2, "secretInfo": "The sound of that breaking glass followed a tense discussion between Lionel and Vivian. It was practically musical, considering Vivian's exquisite but expensive prose when under pressure."}, {"clueIndex": 3, "secretInfo": "I once caught a glimpse of Lionel scribbling furiously in his diary, mumbling about 'the inevitable end.' He was such an enigma that I figured it was just theatrical rambling about his next big deal."}, {"clueIndex": 4, "secretInfo": "Lionel's watch was his token of pride, a gaudy emblem of all his wins. I brushed my fingers over its empty spot earlier, and it felt like missing a character in one of my acts."}, {"clueIndex": 5, "secretInfo": "Right after Lionel retired from the deck, I heard heavy footsteps echoing down to the grumbling kitchen, matching with that momentary rebellious glint I saw in Marco’s eyes during dinner."}, {"clueIndex": 6, "secretInfo": "I do recall wafting past the grand salon, spraying a bit extra of my signature scent, just to linger a while longer after spotting Lionel slip inside looking suspiciously triumphant."}, {"clueIndex": 7, "secretInfo": "While eavesdropping on Lionel earlier, his sly murmurs about financial dirt on someone twisted my stomach; it was a chilling reminder of the leverage he still had over me."}, {"clueIndex": 8, "secretInfo": "Lionel taunted me once about Marco's knives, making some cheeky comment about how they ‘cut through more than poorly cooked duck’. Missing a knife feels almost deliberate amid Lionel’s relish of tension."}]	3	2026-03-17 17:36:30.974279+00	f
17	1773768752881	Jasper Long	chels.santoro@gmail.com	email	0dy1ytcoqkumisw16cvl5h51	[{"clueIndex": 1, "secretInfo": "I can't forget seeing Marco, looking agitated, pinch my favorite vintage wine out of view just before I found that blood-stained handkerchief. A defensive move, or part of a bigger mess?"}, {"clueIndex": 2, "secretInfo": "Before the wine glass shattered, Lionel and I had a heated exchange about my \\"opportunities.\\" Just as the tension reached its peak, I heard crystal break. It made me wonder if someone was eavesdropping."}, {"clueIndex": 3, "secretInfo": "I once overheard Lionel ranting about his \\"journaling strategy\\" in business — always said the pen was mightier when it held others’ secrets — so a torn page about partnerships isn't random."}, {"clueIndex": 4, "secretInfo": "Lionel's luxury watch often dazzled under the cabin lights at these gatherings, its absence felt like an odd silence in an otherwise orchestrated chaos. Seeing that empty wrist made me wary."}, {"clueIndex": 5, "secretInfo": "Footprints leading to the kitchen seem suspect, especially when I knew Lionel had been here conducting controversial business, making backdoor dealings not far from our meals."}, {"clueIndex": 6, "secretInfo": "The lingering scent of Ava’s perfume after Lionel entered the salon was more than theatrical; it seemed like an opening act. I've seen her grip attention like that before."}, {"clueIndex": 7, "secretInfo": "Stumbling across Lionel's pile of financial reports, I glimpsed something related to Vivian. That move didn't seem philanthropic, just ammo for Lionel's endless games."}, {"clueIndex": 8, "secretInfo": "Lionel once scoffed at Marco's knife skills, telling tales about sharp words needing sharper tools. All this talk; a missing knife seemed like his twisted subtlety at work."}]	3	2026-03-17 17:36:58.386116+00	f
25	1773770817494	Magnolia Pivett	chels.santoro@gmail.com	email	0mt510guwaz4iaa23v8nh444	[{"clueIndex": 1, "secretInfo": "Ah, the dagger under the table! Much like Orville's abandoned coffee mugs, I had left it there as a whimsical critique on chaotic household aesthetics. I debated calling it 'Art in Absentia.'"}, {"clueIndex": 2, "secretInfo": "I remember the champagne toppling during one of Thaddeus’s soaring poems; he gestured so dramatically, Lennox couldn't help but reenact the poet's epic tumble."}, {"clueIndex": 3, "secretInfo": "Lennox’s pocket watch, with its delicate heart engraving, always fascinated me. He said it ticked for each secret it held, which I doubted, given its tendency to stop at mere hearsay."}, {"clueIndex": 4, "secretInfo": "I recall Barnaby fretting over some tonic recipe earlier; somehow I got the impression he was more mad scientist than mundane doctor. If Lennox teased him, it was probably with loving exasperation."}, {"clueIndex": 5, "secretInfo": "Orville's gadget was stuck under Lennox’s chair, I saw it there! He had been trying to demonstrate something earlier; knowing Orville, it was likely far too advanced (or absurd) for such an esteemed debut."}, {"clueIndex": 6, "secretInfo": "I've a penchant for adding a bit of extra flair to Lennox's stories, and I must confess—I might've added a dash of yellow streaks to enhance his drama with my ever-ready paintbrush."}, {"clueIndex": 7, "secretInfo": "That magnifying glass was part of Jemima's great 'sleuth's reveal' earlier. I suspect she hastily left behind half her evidence in pursuit of making new mysteries to unravel."}, {"clueIndex": 8, "secretInfo": "Thaddeus penned moons on loose pages that I caught swirling in the air—richly mad, those crumpled sheets! I considered them an accessory to Lennox's enthused Arabian tales."}, {"clueIndex": 9, "secretInfo": "Petunia’s diary read less like facts and more like creative prose, occasionally involving household pets in ridiculous escapades alongside Lennox's imagined whispers."}]	9	2026-03-17 18:30:00.908627+00	f
24	1773770817494	Thaddeus Slumber	chels.santoro@gmail.com	email	urskns9jcww9ooioxknn83oi	[{"clueIndex": 1, "secretInfo": "I dozed in my chair when Orville began discussing daggers as art. When he finished, I noticed the genuine article lounging beneath the table, like it had lost its theatrical sense."}, {"clueIndex": 2, "secretInfo": "While pondering the latest crescendo of woes, I saw Lennox's glass fall to the floor, a playful misstep during someone else's attempt to wax poetic—a humble reminder of life's fragility."}, {"clueIndex": 3, "secretInfo": "Lennox often recounted tales of that gilded pocket watch — its fracture sings a somber song, its hands caught at a moment when finery and fatality intertwined."}, {"clueIndex": 4, "secretInfo": "Barnaby's note, quite the quixotic muse of mine, aligns with Lennox's keen critique. A twist of fate that such loquacious thoughts wove paths that sundered souls."}, {"clueIndex": 5, "secretInfo": "This marvelous, tumultuous party left behind Orville’s contraption—not yet designed to thrive in such chaos—and now it takes repose beneath Lennox's untroubled chair."}, {"clueIndex": 6, "secretInfo": "As Lennox weaved his tales, Magnolia's daubs of yellow adorned him colorfully, innocuously refraining from illuminating its true artist during our curious exchanges."}, {"clueIndex": 7, "secretInfo": "A magnifying glass discovered near Lennox shone dull truths, likely courtesy of whimsical Jemima or someone who sought theatrical flair without clarity."}, {"clueIndex": 8, "secretInfo": "What an inspiring collision—celestial scribbles racing through tragedy smudged with Lennox's shadow. Thaddeus's poignant moon betrayed his well-camouflaged delight."}, {"clueIndex": 9, "secretInfo": "Echoes of Petunia's wistful diary muse more than scandal, delving into imaginary plots where Lennox once seemed part of some tawdry arc rather than daily continuity."}]	9	2026-03-17 18:28:21.339148+00	f
18	1773770817494	Petunia Bulstrode	chels.santoro@gmail.com	email	y0ylkddesz43uduow8skupzy	[{"clueIndex": 1, "secretInfo": "That ornate dagger beneath the table? I saw Magnolia herself drop it there earlier, but she claimed it was part of an artistic statement. Odd sort, that one."}, {"clueIndex": 2, "secretInfo": "I distinctly remember Dr. Barnaby pouring more than one glass of champagne for Sir Lennox, kept refilling the poor man's glasses like he was hydrating a cactus."}, {"clueIndex": 3, "secretInfo": "Lennox’s pocket watch was a sore point; Felicity complained he was constantly reminding her of how badly she kept time, perhaps a metaphor for her empty ledger."}, {"clueIndex": 4, "secretInfo": "I tidied Barnaby’s coat earlier and found a note scribbled with some recipe — something about elderberry, I think, like some forgotten family cordial. He seemed like the troubled sort, pestering Lennox often."}, {"clueIndex": 5, "secretInfo": "Orville's contraption seemed more at home under that chair than it ever did working on his tables. I heard a distinct clang when Lennox adjusted himself, but the din of laughter drowned it out."}, {"clueIndex": 6, "secretInfo": "I saw Lennox gesticulating wildly during his storytelling, splattering yellow paint across his fingers — little did he notice, though it added a peculiar vibrancy to his tale."}, {"clueIndex": 7, "secretInfo": "That magnifying glass was one of Jemima’s prized possessions, yet she clumsily left it behind amidst her sleuthing after Lennox’s fall. That scatterbrain must have been distracted by more than just Sherlockian fantasies."}, {"clueIndex": 8, "secretInfo": "Thaddeus did enjoy his poetic moonlighting; one of his scribbled notes about 'shattered dreams' caught my eye as I tidied the salon. A bold choice given past scandals."}, {"clueIndex": 9, "secretInfo": "While peeking through doors, I once heard Lennox murmur caution about the diary he found in my quarters. Page might have bared secrets, but I reckon he’d only be testing our limits with such curiosities."}]	9	2026-03-17 18:22:10.431864+00	f
19	1773770817494	Dr. Barnaby Thistlewaite	chels.santoro@gmail.com	email	1hjd62r08k137qe9v07mw89j	[{"clueIndex": 1, "secretInfo": "Oh, the dagger beneath the table? I saw Orville tinkering with it earlier, muttering something about turning everyday objects into art. Frankly, I thought he was simply redirecting attention from his stalled inventions."}, {"clueIndex": 2, "secretInfo": "During the evening, I noticed Felicity watching intently as I poured Sir Lennox champagne. The gleam in her eyes hinted at something, perhaps a plan to settle those gambling debts Lennox wouldn't stop teasing her about."}, {"clueIndex": 3, "secretInfo": "Lennox had this annoying habit of showing off that pocket watch, claiming it was a gift from a royal acquaintance — but knowing him, the story probably had more holes than his old theater curtains."}, {"clueIndex": 4, "secretInfo": "The note I had crumpled in my coat — it was merely an experimental recipe for a potent tonic! I jotted it down after listening to one of Lennox's endless critiques on my remedies, merely as an amusing retort, really."}, {"clueIndex": 5, "secretInfo": "Orville mentioned something odd earlier, claiming he was going to debut a new invention at the party. I believe the contraption under Lennox's chair was part of that demonstration, though Orville seemed rather flustered about its premature reveal."}, {"clueIndex": 6, "secretInfo": "Magnolia was notorious for her impromptu painting sessions, swirling colors as if the air was her canvas. I could have sworn I saw her 'accidentally' daub yellow paint on Lennox's fingers earlier, as if adding her mark to our tableaux."}, {"clueIndex": 7, "secretInfo": "Jemima’s magnifying glass abandon near the scene intrigued me, given how she theatrically proclaimed earlier that she was on the brink of a great revelation. It’s amusing to think she might have stumbled instead, leaving clues askew."}, {"clueIndex": 8, "secretInfo": "Thaddeus scribbled furiously all night, frequently tearing pages from his notebook. One piece, struck through with frantic sketches of moons, bore a curious resemblance to Lennox’s dramatic monologues, amplifying our suspicions of poetic theft."}, {"clueIndex": 9, "secretInfo": "Earlier, I overheard Petunia whispering to Felicity about an 'explosive entry' she'd meticulously crafted in her diary — something dramatic involving the entire household. The woman could rival Lennox in theatrical tendencies."}]	9	2026-03-17 18:23:15.148307+00	t
20	1773770817494	Felicity Fiddleworth	chels.santoro@gmail.com	email	5vvryztu5xesw6yq37qgz1qf	[{"clueIndex": 1, "secretInfo": "I caught a glimpse of Orville's gadgets earlier and, knowing his fondness for dramatic reveals, assumed that garish dagger under the table was one of his showpieces. He mentioned turning household trinkets into artworks."}, {"clueIndex": 2, "secretInfo": "I thought it was strange how Barnaby insisted on keeping Lennox's glass full. Twice I saw him refill right after Lennox took barely a sip, like a desperate bartender awaiting tips."}, {"clueIndex": 3, "secretInfo": "Lennox's obsession with that pocket watch! He used to wave it at me when gossiping, insisting on showing its intricate workings. Maybe it ticked too close to things better left unspoken."}, {"clueIndex": 4, "secretInfo": "Oh, Barnaby left a note in his coat pocket? He did mumble something about needing more elderberries or some such for his 'special blend.' Thought his eyes were as shifty as his tonic."}, {"clueIndex": 5, "secretInfo": "Earlier, I overheard Orville ranting about tweaking his latest gizmo before it performed 'like a charm,' but his expression turned sour when he noticed it missing later."}, {"clueIndex": 6, "secretInfo": "Magnolia's paint antics – she just couldn't contain herself, splashing paint here and there, her hands always a hue of brightly absurd. She'd left traces on everyone by the night’s end."}, {"clueIndex": 7, "secretInfo": "Jemima may have left her magnifying glass behind, but she seemed more interested in showcasing her sleuthing skills in front of an audience than performing the actual detective work."}, {"clueIndex": 8, "secretInfo": "Thaddeus’s scribbles had become erratic lately. I found one page telling of 'moons waxing as tales unwound' floated suggestively around; oddly, Petunia’s whispers often mirrored those cryptic verses."}, {"clueIndex": 9, "secretInfo": "That diary of Petunia's wasn't the only one with grumblings! I once found Lennox shaking his head over an entry, dismissing it as melodrama, although his brow furrowed deeper reading along."}]	9	2026-03-17 18:23:50.519421+00	f
21	1773770817494	Orville Pigsnov	chels.santoro@gmail.com	email	zivf10kz7rtpd55cpk9xoqkv	[{"clueIndex": 1, "secretInfo": "I distinctly remember seeing that dagger once in Cypress’s shed, among his gardening tools. How it ended up under the table, though, I cannot say, but sometimes Cypress’s creations stray beyond borders!"}, {"clueIndex": 2, "secretInfo": "During the party, I saw Thaddeus sloshing about the champagne rather jollily, muttering about inspiration as he scribbled in his notebook. Seemed like he was putting more color in his poems than his glass."}, {"clueIndex": 3, "secretInfo": "Lennox’s pocket watch had a peculiar locket design on the back — a tiny disjointed heart. Funny thing, I overheard him tell Petunia it would stop ticking the moment someone broke his trust, a dramatic flourish in true Lennox style."}, {"clueIndex": 4, "secretInfo": "I caught a snippet of conversation between Barnaby and Lennox earlier in the day. Barnaby seemed nervous, talking evasively about 'experimental outcomes' and trying to sound more professional than an overcooked plum pudding."}, {"clueIndex": 5, "secretInfo": "That contraption was mine, alright! I had planned on using it as a demo — until it jammed under Lennox's chair. I’m sure no one saw me desperately fishing under there trying to yank it out, like a fishmonger retrieving a precious catch!"}, {"clueIndex": 6, "secretInfo": "Magnolia’s been trying to mix scent with color lately, everything smelling wild like a flower in stress. Her yellow paints had this curious honey aroma, which still hangs near where Lennox had stood spinning tales earlier."}, {"clueIndex": 7, "secretInfo": "Jemima had been going on and on about her big discovery, waving that magnifying glass like a war flag in the wrong battle. I think she just wanted to outshine Lennox’s dramatics with her own Sherlockian adventures."}, {"clueIndex": 8, "secretInfo": "I suspect Thaddeus pilfered more than just moons for his poetry escapades. His hands were ink-stained, but I heard him muttering something about 'borrowing freely' from the world around him — an odd thing to think when holding stolen lines."}, {"clueIndex": 9, "secretInfo": "That diary of Petunia’s! I saw her writing furiously about Lennox’s antics, hardly a new entry. She liked to fashion stories out of our lives, her smirking hints often mingling fiction with faces, leaving Lennox bemused or flustered depending on his mood."}]	9	2026-03-17 18:26:27.55723+00	f
22	1773770817494	Cypress Nettle	chels.santoro@gmail.com	email	k5xj00eknzrmruapd91wlbqi	[{"clueIndex": 1, "secretInfo": "When I saw that sheathed dagger, I couldn't help but recall Thaddeus, always penning melodramas. He mentioned a fascination with armor and betrayal, didn’t he?"}, {"clueIndex": 2, "secretInfo": "I remember Lennox's glass being knocked over after he lunged in mock conflict with Magnolia – their playful battle nearly upended the entire table."}, {"clueIndex": 3, "secretInfo": "That pocket watch was Lennox’s precious – often he showed me its intricate workings, claiming stories of lost hours and found secrets. Strange how it shattered right when things reached crescendo."}, {"clueIndex": 4, "secretInfo": "Once, near the hibiscus, Barnaby inquired about extracts with vague notions of botanical infusions. His interest stretched beyond mere herbal tea, if you ask me."}, {"clueIndex": 5, "secretInfo": "Orville's jammed gadget? A curious case; I saw him gesticulating wildly about magnetic anomalies earlier, theories now clattering under Lennox's seat."}, {"clueIndex": 6, "secretInfo": "Magnolia’s paint often strayed beyond canvas — I believe she left indelible prints on Lennox during their vivid discussions. The yellow clings like scandal to silk."}, {"clueIndex": 7, "secretInfo": "Jemima’s glass was as much a prop as her sleuth persona. Fanned the flames of her reputation, but it seemed theatrics over earnest investigation."}, {"clueIndex": 8, "secretInfo": "In the moonlight garden, I overheard Thaddeus weaving threads of cosmic woes amidst Lennox's tales — his usual absorption of ambient discourse to fuel verses."}, {"clueIndex": 9, "secretInfo": "Petunia had the uncanny ability to dramatize her diary — whispering unwritten pages to the wind, she feared more for the quandary of mislaid narratives than harsh truths."}]	9	2026-03-17 18:27:12.610314+00	f
23	1773770817494	Jemima Brambleton	chels.santoro@gmail.com	email	a9qh5aphuhdbn1uvrnmt6yni	[{"clueIndex": 1, "secretInfo": "I noticed Orville's hand twitching when that ornamental dagger was mentioned, though he swiftly redirected the chat to some new contraption of his. Could be jittery nerves or his usual device distractions."}, {"clueIndex": 2, "secretInfo": "When Lennox's champagne spilled, I swore I saw barnacles of mischief glinting in Dr. Barnaby's eye, like he relished in every drop that glimmered away, though he turned to jest with Lennox moments later."}, {"clueIndex": 3, "secretInfo": "I'd heard Lennox claim his pocket watch stopped every time someone lied to him—funny, considering it was held together by whimsy and optimism as much as gears."}, {"clueIndex": 4, "secretInfo": "Barnaby’s note seemed odd, but I’m no chemist. I do recall Lennox teasing him about concocting the perfect party tonic and promised him a starring role if ever he succeeded."}, {"clueIndex": 5, "secretInfo": "Orville muttered something about magnetic fields while fidgeting nervously near Lennox's chair, wary eyes darting as if someone might swipe or damage his masterpiece."}, {"clueIndex": 6, "secretInfo": "Magnolia's penchant for paint was no secret. She had been dabbing yellow swirls on the servants earlier, claiming it was an immersive art experience."}, {"clueIndex": 7, "secretInfo": "Leaving my magnifying glass behind was a classic amateur mistake—I imagine it was knocked over during one of Lennox's performative swoons—still, it marks where I rather dramatically proclaimed the hunt was afoot."}, {"clueIndex": 8, "secretInfo": "Thaddeus, ever the dreamy poet, seemed rather distracted by Lennox's tales of ‘spirals in the moonlight’ — I caught sight of a scribble where moon phases entangled with abstract, stolen longings."}, {"clueIndex": 9, "secretInfo": "Petunia’s diary sounded rich with exaggerations – she had a flair for turning dreary details into a saga, with entangled grievances as the latest chapter."}]	9	2026-03-17 18:27:40.254252+00	f

\.

COPY "votes" FROM stdin;
1	1773770817494	0mt510guwaz4iaa23v8nh444	Cypress Nettle	2026-03-17 19:07:10.651414+00

\.

COPY "auth_users" FROM stdin;
1	\N	admin@mysterygames.test	\N	\N	\N	f
2	\N	testuser123@example.com	\N	\N	\N	f
3	\N	newperson999@example.com	\N	\N	\N	f

\.

COPY "auth_accounts" FROM stdin;
1	1	credentials	credentials	1	\N	\N	\N	\N	\N	\N	\N	$argon2id$v=19$m=65536,t=3,p=4$Yucu06ERaoqm1qn3jUcl8A$VypAIXtwmAoSiQsT5wwpHq8vyBndi4c7vY9Cvvrk4iY
2	2	credentials	credentials	2	\N	\N	\N	\N	\N	\N	\N	$argon2id$v=19$m=65536,t=3,p=4$sTNAYGjaNT0mexLoEK/ltA$0NfcFqjqO/We6YkNUnqgOWwkzKHq4xJJThMJOTsHgEA
3	3	credentials	credentials	3	\N	\N	\N	\N	\N	\N	\N	$argon2id$v=19$m=65536,t=3,p=4$i0OZwOZGHyd+qsUNvNYlzw$ejk/jBBo5Fsgi3EuYAJtn6JKEED8rlgOCMANLU0ESk8

\.

COPY "coupons" FROM stdin;
1	TESTFREE	free_game	100	100	0	2026-03-17 22:35:33.961199+00	\N	t	2026-03-17 22:35:33.961199+00

\.
