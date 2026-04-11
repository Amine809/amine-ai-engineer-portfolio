const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function strapiGet(path: string) {
  const headers: Record<string, string> = {};
  if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers,
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

export function getStrapiMediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${STRAPI_URL}${path}`;
}

// ─── Typed fetchers ──────────────────────────────────────────────────────────

export interface AboutData {
  name: string;
  jobTitle: string;
  heroTagline: string;
  bio: string;
  profileImage: { url: string } | null;
  aboutImage: { url: string } | null;
  yearsOfExperience: string;
  happyClients: string;
  projectsCompleted: string;
  languages: string[];
}

export interface ContactData {
  email: string;
  phone: string;
  github: string;
  githubLabel: string;
  linkedin: string;
  facebook: string;
  dribbble: string;
  website: string;
}

export interface Experience {
  id: number;
  year: string;
  title: string;
  company: string;
  type: string;
  description: string;
  order: number;
}

export interface Education {
  id: number;
  title: string;
  description: string;
  order: number;
}

export interface Skill {
  id: number;
  name: string;
  icon: string;
  rating: number;
  category: string;
  order: number;
}

export interface Work {
  id: number;
  title: string;
  client: string;
  image: { url: string } | null;
  slug: string;
  link: string;
  videoUrl: string;
  technologies: string;
  order: number;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  image: { url: string } | null;
  order: number;
}

export async function getAbout(): Promise<AboutData | null> {
  const data = await strapiGet('/about?populate=*');
  return data?.data ?? null;
}

export async function getContact(): Promise<ContactData | null> {
  const data = await strapiGet('/contact');
  return data?.data ?? null;
}

export async function getExperiences(): Promise<Experience[]> {
  const data = await strapiGet('/experiences?sort=order:asc&pagination[pageSize]=50');
  return data?.data ?? [];
}

export async function getEducations(): Promise<Education[]> {
  const data = await strapiGet('/educations?sort=order:asc&pagination[pageSize]=20');
  return data?.data ?? [];
}

export async function getSkills(): Promise<Skill[]> {
  const data = await strapiGet('/skills?sort=order:asc&pagination[pageSize]=50');
  return data?.data ?? [];
}

export async function getWorks(): Promise<Work[]> {
  const data = await strapiGet('/works?sort=order:asc&populate=*&pagination[pageSize]=20');
  return data?.data ?? [];
}

export async function getCertificates(): Promise<Certificate[]> {
  const data = await strapiGet('/certificates?sort=order:asc&populate=*&pagination[pageSize]=50');
  return data?.data ?? [];
}
