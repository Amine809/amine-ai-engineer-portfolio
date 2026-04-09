import { NextResponse } from "next/server";

export async function GET() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "NOT SET";
  const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ? "SET ✓" : "NOT SET ✗";

  const results: Record<string, unknown> = {
    config: {
      NEXT_PUBLIC_STRAPI_URL: STRAPI_URL,
      STRAPI_API_TOKEN: STRAPI_TOKEN,
    },
    tests: {},
  };

  const endpoints = ["/api/abouts", "/api/contacts", "/api/experiences", "/api/skills", "/api/works"];

  for (const endpoint of endpoints) {
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (process.env.STRAPI_API_TOKEN) {
        headers["Authorization"] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
      }
      const res = await fetch(`${STRAPI_URL}${endpoint}`, { headers });
      const body = await res.json();
      results.tests[endpoint] = {
        status: res.status,
        ok: res.ok,
        dataCount: Array.isArray(body?.data) ? body.data.length : typeof body?.data,
        error: body?.error ?? null,
      };
    } catch (e: unknown) {
      results.tests[endpoint] = { error: e instanceof Error ? e.message : String(e) };
    }
  }

  return NextResponse.json(results, { status: 200 });
}
