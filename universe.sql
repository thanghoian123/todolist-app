--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30) NOT NULL,
    active boolean,
    age numeric,
    vol integer,
    description text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    planet_id integer,
    name character varying(30),
    status boolean,
    date timestamp without time zone DEFAULT now(),
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    star_id integer,
    name character varying(30),
    status boolean,
    vol integer,
    peoples integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    galaxy_id integer,
    name character varying(30) NOT NULL,
    active boolean,
    age numeric,
    vol integer,
    description text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: temp; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.temp (
    temp_id integer NOT NULL,
    name character varying(30) NOT NULL,
    status boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.temp OWNER TO freecodecamp;

--
-- Name: temp_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.temp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.temp_id_seq OWNER TO freecodecamp;

--
-- Name: temp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.temp_id_seq OWNED BY public.temp.temp_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Name: temp temp_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.temp ALTER COLUMN temp_id SET DEFAULT nextval('public.temp_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'ga', false, 2, 2, 'des', '2023-01-07 05:30:52.522812', '2023-01-07 05:30:52.522812');
INSERT INTO public.galaxy VALUES (2, 'ga1', false, 2, 2, 'des', '2023-01-07 05:30:52.522812', '2023-01-07 05:30:52.522812');
INSERT INTO public.galaxy VALUES (3, 'ga2', false, 2, 2, 'des', '2023-01-07 05:30:52.522812', '2023-01-07 05:30:52.522812');
INSERT INTO public.galaxy VALUES (4, 'ga3', false, 2, 2, 'des', '2023-01-07 05:30:52.522812', '2023-01-07 05:30:52.522812');
INSERT INTO public.galaxy VALUES (5, 'ga4', false, 2, 2, 'des', '2023-01-07 05:30:52.522812', '2023-01-07 05:30:52.522812');
INSERT INTO public.galaxy VALUES (6, 'ga5', false, 2, 2, 'des', '2023-01-07 05:30:52.522812', '2023-01-07 05:30:52.522812');


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 1, 'star', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (2, 2, 'star1', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (3, 3, 'star2', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (4, 4, 'star3', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (5, 5, 'star4', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (6, 6, 'star5', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (7, 7, 'star', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (8, 8, 'star1', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (9, 9, 'star2', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (10, 10, 'star3', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (11, 11, 'star4', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (12, 12, 'star5', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (13, 1, 'star', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (14, 2, 'star1', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (15, 3, 'star2', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (16, 4, 'star3', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (17, 5, 'star4', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (18, 6, 'star5', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (19, 7, 'star', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (20, 8, 'star1', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (21, 9, 'star2', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (22, 10, 'star3', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (23, 11, 'star4', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');
INSERT INTO public.moon VALUES (24, 12, 'star5', false, '2023-01-07 05:08:48.563038', '2023-01-07 05:10:37.150371', '2023-01-07 05:10:37.150371');


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 1, 'star', false, NULL, NULL, '2023-01-07 05:31:18.651677', '2023-01-07 05:31:18.651677');
INSERT INTO public.planet VALUES (2, 2, 'star1', false, NULL, NULL, '2023-01-07 05:31:18.651677', '2023-01-07 05:31:18.651677');
INSERT INTO public.planet VALUES (3, 3, 'star2', false, NULL, NULL, '2023-01-07 05:31:18.651677', '2023-01-07 05:31:18.651677');
INSERT INTO public.planet VALUES (4, 4, 'star3', false, NULL, NULL, '2023-01-07 05:31:18.651677', '2023-01-07 05:31:18.651677');
INSERT INTO public.planet VALUES (5, 5, 'star4', false, NULL, NULL, '2023-01-07 05:31:18.651677', '2023-01-07 05:31:18.651677');
INSERT INTO public.planet VALUES (6, 6, 'star5', false, NULL, NULL, '2023-01-07 05:31:18.651677', '2023-01-07 05:31:18.651677');
INSERT INTO public.planet VALUES (7, 1, 'star', false, NULL, NULL, '2023-01-07 05:31:18.651677', '2023-01-07 05:31:18.651677');
INSERT INTO public.planet VALUES (8, 2, 'star1', false, NULL, NULL, '2023-01-07 05:31:18.651677', '2023-01-07 05:31:18.651677');
INSERT INTO public.planet VALUES (9, 3, 'star2', false, NULL, NULL, '2023-01-07 05:31:18.651677', '2023-01-07 05:31:18.651677');
INSERT INTO public.planet VALUES (10, 4, 'star3', false, NULL, NULL, '2023-01-07 05:31:18.651677', '2023-01-07 05:31:18.651677');
INSERT INTO public.planet VALUES (11, 5, 'star4', false, NULL, NULL, '2023-01-07 05:31:18.651677', '2023-01-07 05:31:18.651677');
INSERT INTO public.planet VALUES (12, 6, 'star5', false, NULL, NULL, '2023-01-07 05:31:18.651677', '2023-01-07 05:31:18.651677');


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 1, 'star', false, 2, 2, 'des', '2023-01-07 05:30:28.251674', '2023-01-07 05:30:28.251674');
INSERT INTO public.star VALUES (2, 1, 'star1', false, 2, 2, 'des', '2023-01-07 05:30:28.251674', '2023-01-07 05:30:28.251674');
INSERT INTO public.star VALUES (3, 1, 'star2', false, 2, 2, 'des', '2023-01-07 05:30:28.251674', '2023-01-07 05:30:28.251674');
INSERT INTO public.star VALUES (4, 1, 'star3', false, 2, 2, 'des', '2023-01-07 05:30:28.251674', '2023-01-07 05:30:28.251674');
INSERT INTO public.star VALUES (5, 1, 'star4', false, 2, 2, 'des', '2023-01-07 05:30:28.251674', '2023-01-07 05:30:28.251674');
INSERT INTO public.star VALUES (6, 1, 'star5', false, 2, 2, 'des', '2023-01-07 05:30:28.251674', '2023-01-07 05:30:28.251674');


--
-- Data for Name: temp; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.temp VALUES (1, 'ha', false, '2023-01-07 05:31:33.603338', '2023-01-07 05:31:33.603338');
INSERT INTO public.temp VALUES (2, 'ha1', false, '2023-01-07 05:31:33.603338', '2023-01-07 05:31:33.603338');
INSERT INTO public.temp VALUES (3, 'ha2', false, '2023-01-07 05:31:33.603338', '2023-01-07 05:31:33.603338');


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 24, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: temp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.temp_id_seq', 3, true);


--
-- Name: galaxy g_id; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT g_id UNIQUE (galaxy_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon m_id; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT m_id UNIQUE (moon_id);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet p_id; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT p_id UNIQUE (planet_id);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: temp temp_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.temp
    ADD CONSTRAINT temp_pkey PRIMARY KEY (temp_id);


--
-- Name: star u_id; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT u_id UNIQUE (star_id);


--
-- Name: temp u_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.temp
    ADD CONSTRAINT u_name UNIQUE (name);


--
-- Name: moon fk_planet; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT fk_planet FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet fk_star; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT fk_star FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star fk_star_galaxy; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT fk_star_galaxy FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--


