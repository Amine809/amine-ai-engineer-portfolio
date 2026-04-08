#!/usr/bin/env node

/**
 * Initialization script to setup the admin user in Supabase
 * Run this once after setting up your Supabase project
 *
 * Usage: npx ts-node scripts/init-db.ts
 */

import { createAdminUser } from "@/lib/auth";

async function initializeDatabase() {
  console.log("🚀 Initializing database...\n");

  const adminEmail = process.env.ADMIN_EMAIL || "aminkarmous2000@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Amine123456789*";

  try {
    console.log(`📝 Creating admin user: ${adminEmail}`);
    const result = await createAdminUser(adminEmail, adminPassword);

    if (result.success) {
      console.log("✅ Admin user created successfully!");
      console.log(`\n📧 Email: ${adminEmail}`);
      console.log(`🔐 Password: ${adminPassword}`);
      console.log("\n✨ You can now login at /admin/login");
    } else {
      console.error("❌ Error creating admin user:", result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Initialization failed:", error);
    process.exit(1);
  }
}

initializeDatabase();
