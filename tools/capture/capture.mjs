#!/usr/bin/env node
// Automated screenshot rig for the LadderOps marketing site.
// Logs into LadderOps staging as a demo tenant_admin, waits for real data to
// render, and captures desktop + mobile PNGs of the live product UI into
// screenshots-v2/ at the repo root.
//
// Usage: node capture.mjs

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../../screenshots-v2");

const BASE_URL = process.env.CAPTURE_BASE_URL || "https://staging.ladderops.tech";
const USERNAME = process.env.CAPTURE_USERNAME || "shots";
const PASSWORD = process.env.CAPTURE_PASSWORD || "Capture2026!shots";
const TENANT = process.env.CAPTURE_TENANT || "ridgeview";

const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const MOBILE_VIEWPORT = { width: 390, height: 844 };
const MIN_FILE_BYTES = 30 * 1024;

fs.mkdirSync(OUT_DIR, { recursive: true });

const results = []; // { name, ok, bytes, note }
const skips = []; // { page, reason }

function log(msg) {
  console.log(`[capture] ${msg}`);
}

/** Fill the login form and land on the authenticated dashboard. */
async function login(page) {
  await page.goto(BASE_URL, { waitUntil: "load" });
  await page.locator("#username").waitFor({ state: "visible", timeout: 30000 });
  // The login form hydrates a beat after DOM paint; filling before React
  // attaches its handlers silently no-ops the fill (fields read back empty
  // on submit). A short settle avoids that race.
  await page.waitForTimeout(1000);

  await page.locator("#username").click();
  await page.locator("#username").fill(USERNAME);
  await page.locator("#password").click();
  await page.locator("#password").fill(PASSWORD);
  await page.locator("#tenant").click();
  await page.locator("#tenant").fill(TENANT);

  const values = {
    username: await page.locator("#username").inputValue(),
    password: await page.locator("#password").inputValue(),
    tenant: await page.locator("#tenant").inputValue(),
  };
  if (!values.username || !values.password || !values.tenant) {
    throw new Error(`Login form did not accept fill(): ${JSON.stringify(values)}`);
  }

  await page.locator('button[type="submit"]').click();
  await page.getByText("Good morning").waitFor({ timeout: 30000 });
  await page.waitForTimeout(1500);
}

/** Flip the app from its default dark theme to light for marketing captures. */
async function switchToLightTheme(page) {
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await page.waitForTimeout(400);
  const htmlClass = await page.locator("html").getAttribute("class");
  if (!htmlClass || !htmlClass.includes("light")) {
    throw new Error(`Theme toggle did not switch to light (html class="${htmlClass}")`);
  }
}

/** Hard-fail a capture if we somehow ended up back on the login page. */
async function assertNotLoginPage(page, label) {
  const hasPasswordField = await page.locator("#password").isVisible().catch(() => false);
  if (hasPasswordField) {
    throw new Error(`${label}: still on login page (password field visible)`);
  }
}

async function shoot(page, name, opts = {}) {
  await assertNotLoginPage(page, name);
  const filePath = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: filePath, fullPage: false, ...opts });
  const stat = fs.statSync(filePath);
  const ok = stat.size >= MIN_FILE_BYTES;
  results.push({ name, ok, bytes: stat.size });
  log(`${ok ? "OK" : "TOO SMALL"} ${name}.png (${(stat.size / 1024).toFixed(1)} KB)`);
  if (!ok) {
    throw new Error(`${name}.png is only ${stat.size} bytes (< ${MIN_FILE_BYTES})`);
  }
  return filePath;
}

async function waitForRows(page, selector, minCount = 1, timeout = 20000) {
  await page.waitForFunction(
    ({ sel, min }) => document.querySelectorAll(sel).length >= min,
    { sel: selector, min: minCount },
    { timeout }
  );
}

async function safeStep(label, fn) {
  try {
    await fn();
  } catch (err) {
    log(`SKIP ${label}: ${err.message.split("\n")[0]}`);
    skips.push({ page: label, reason: err.message.split("\n")[0] });
  }
}

// ---------------------------------------------------------------------------
// Desktop captures
// ---------------------------------------------------------------------------

async function captureDesktop(browser) {
  const context = await browser.newContext({
    viewport: DESKTOP_VIEWPORT,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  log("Desktop: logging in...");
  await login(page);
  await switchToLightTheme(page);

  await safeStep("dashboard", async () => {
    await page.goto(BASE_URL + "/", { waitUntil: "domcontentloaded" });
    await waitForRows(page, "table tbody tr", 1);
    await page.waitForTimeout(500);
    await shoot(page, "dashboard");
  });

  await safeStep("incidents-list", async () => {
    await page.goto(BASE_URL + "/incidents", { waitUntil: "domcontentloaded" });
    await waitForRows(page, "table tbody tr", 5);
    await page.waitForTimeout(500);
    await shoot(page, "incidents-list");
  });

  await safeStep("incident-edit", async () => {
    // RFD-2026-094: FIRE, 60% complete, has real address/date/type data filled
    // in - representative of a working NERIS report rather than a blank shell.
    await page.goto(BASE_URL + "/incidents", { waitUntil: "domcontentloaded" });
    await waitForRows(page, "table tbody tr", 1);
    await page.locator('input[placeholder*="Search"]').fill("RFD-2026-094");
    await page.waitForTimeout(1200);
    await waitForRows(page, "table tbody tr", 1);
    await page.locator("table tbody tr", { hasText: "RFD-2026-094" }).first().locator("td").nth(1).click();
    await page.waitForTimeout(2000);
    // Direct navigation to /edit hangs indefinitely (client-only route state);
    // clicking through from the detail page is the reliable path.
    await page.getByRole("button", { name: "Edit Incident" }).click();
    await page.getByText("Loading incident").waitFor({ state: "hidden", timeout: 20000 }).catch(() => {});
    await page.getByText("Incident Overview", { exact: false }).first().waitFor({ timeout: 15000 });
    await page.waitForTimeout(500);
    // Expand section 1 so the screenshot shows real filled-in fields, not just
    // the collapsed accordion.
    await page.getByText("1. Incident Overview").click();
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await shoot(page, "incident-edit");
  });

  await safeStep("status-board", async () => {
    await page.goto(BASE_URL + "/status", { waitUntil: "domcontentloaded" });
    await page.getByText("Full roster & units").waitFor({ timeout: 15000 });
    // The "Full roster & units" chrome renders before the personnel/unit
    // counts hydrate (briefly shows PERSONNEL 0 / UNITS 0 + a skeleton).
    // Wait for a real breakdown badge to confirm counts have loaded.
    await page.getByText("Off Duty", { exact: false }).first().waitFor({ timeout: 15000 });
    await page.waitForTimeout(500);
    await shoot(page, "status-board");
  });

  await safeStep("personnel", async () => {
    await page.goto(BASE_URL + "/personnel", { waitUntil: "domcontentloaded" });
    await waitForRows(page, "table tbody tr", 5);
    await page.waitForTimeout(500);
    await shoot(page, "personnel");
  });

  await safeStep("apparatus", async () => {
    await page.goto(BASE_URL + "/apparatus", { waitUntil: "domcontentloaded" });
    await waitForRows(page, "table tbody tr", 5);
    await page.waitForTimeout(500);
    await shoot(page, "apparatus");
  });

  await safeStep("water-supply", async () => {
    await page.goto(BASE_URL + "/water-sources", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Map" }).waitFor({ timeout: 15000 });
    await page.getByRole("button", { name: "Map" }).click();
    await page.waitForSelector("canvas", { timeout: 15000 });
    await page.waitForTimeout(2500); // map tiles + marker clustering settle
    // Default view packs markers into a tight cluster at a multi-state
    // extent. Tried zooming in via the map's "+" control (pans the cluster
    // off-screen, since it zooms on map center) and clicking a marker
    // (navigates straight to that source's detail page instead of
    // zooming) - both worse than the plain default view, reverted to it.
    await shoot(page, "water-supply");
  });

  await safeStep("pre-plans", async () => {
    await page.goto(BASE_URL + "/pre-plans", { waitUntil: "domcontentloaded" });
    await page.getByText("Pre-Plans", { exact: true }).waitFor({ timeout: 15000 });
    await waitForRows(page, "table tbody tr", 1);
    await page.waitForTimeout(500);
    await shoot(page, "pre-plans");
  });

  await safeStep("occupancies", async () => {
    await page.goto(BASE_URL + "/occupancies", { waitUntil: "domcontentloaded" });
    await waitForRows(page, "table tbody tr", 5);
    await page.waitForTimeout(500);
    await shoot(page, "occupancies");
  });

  await safeStep("inspections", async () => {
    // Map view is richer than the current week's (empty) calendar and shows
    // the geographic clustering feature.
    await page.goto(BASE_URL + "/modules/inspections", { waitUntil: "domcontentloaded" });
    await page.getByText("Schedule", { exact: true }).waitFor({ timeout: 15000 });
    await page.getByText("Schedule", { exact: true }).click();
    await page.waitForTimeout(800);
    await page.getByRole("button", { name: "Map", exact: true }).click();
    await page.waitForSelector("canvas", { timeout: 15000 });
    await page.waitForTimeout(2500);
    await shoot(page, "inspections");
  });

  await safeStep("billing", async () => {
    await page.goto(BASE_URL + "/billing", { waitUntil: "domcontentloaded" });
    await waitForRows(page, "table tbody tr", 1);
    // Filter to "Sent" invoices: default listing includes throwaway draft
    // rows with test/personal names that don't belong on a marketing page.
    await page.getByRole("combobox").click();
    await page.waitForTimeout(300);
    await page.getByRole("option", { name: "Sent", exact: true }).click();
    await page.waitForTimeout(1000);
    await waitForRows(page, "table tbody tr", 1);
    await shoot(page, "billing");
  });

  await safeStep("reports", async () => {
    await page.goto(BASE_URL + "/reports", { waitUntil: "domcontentloaded" });
    await page.locator('button:has-text("Last 30 Days")').waitFor({ timeout: 15000 });
    // Widen the date range so the charts have enough data to look like a
    // real reporting dashboard instead of a near-empty 30-day window.
    await page.locator('button:has-text("Last 30 Days")').click();
    await page.waitForTimeout(300);
    await page.getByRole("option", { name: "Last 90 Days", exact: true }).click();
    await page.waitForTimeout(1500);
    // Recharts continuously re-renders <path> nodes during its draw-in
    // animation, which makes waitForSelector("svg path") flaky (state
    // toggles between attached/visible mid-poll). A plain svg presence
    // check plus a fixed settle is more reliable.
    await page.waitForSelector("svg", { state: "attached", timeout: 15000 });
    await page.waitForTimeout(2500);
    await shoot(page, "reports");
  });

  await safeStep("messages", async () => {
    await page.goto(BASE_URL + "/messages", { waitUntil: "domcontentloaded" });
    await page.getByText("Internal messaging and broadcasts").waitFor({ timeout: 15000 });
    await page.waitForTimeout(1000);
    // Demo account's inbox is genuinely empty (not a bug/spinner) - captured
    // as-is; noted in the run report.
    await shoot(page, "messages");
  });

  await context.close();
}

// ---------------------------------------------------------------------------
// Mobile captures
// ---------------------------------------------------------------------------

async function captureMobile(browser) {
  const context = await browser.newContext({
    viewport: MOBILE_VIEWPORT,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 " +
      "(KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });
  const page = await context.newPage();

  log("Mobile: logging in...");
  await login(page);
  await switchToLightTheme(page);

  await safeStep("dashboard-mobile", async () => {
    await page.goto(BASE_URL + "/", { waitUntil: "domcontentloaded" });
    await waitForRows(page, "table tbody tr", 1);
    await page.waitForTimeout(500);
    await shoot(page, "dashboard-mobile");
  });

  await safeStep("incidents-list-mobile", async () => {
    await page.goto(BASE_URL + "/incidents", { waitUntil: "domcontentloaded" });
    await page.locator('input[placeholder*="Search incident"]').waitFor({ timeout: 15000 });
    await page.waitForTimeout(1500);
    await shoot(page, "incidents-list-mobile");
  });

  await safeStep("status-board-mobile", async () => {
    await page.goto(BASE_URL + "/status", { waitUntil: "domcontentloaded" });
    await page.getByText("Full roster & units").waitFor({ timeout: 15000 });
    await page.getByText("Off Duty", { exact: false }).first().waitFor({ timeout: 15000 });
    await page.waitForTimeout(500);
    await shoot(page, "status-board-mobile");
  });

  await safeStep("incident-mobile", async () => {
    // Same RFD-2026-094 incident used on desktop - real filled-in data
    // rather than the mostly-N/A default row.
    await page.goto(BASE_URL + "/incidents", { waitUntil: "domcontentloaded" });
    await page.locator('input[placeholder*="Search incident"]').waitFor({ timeout: 15000 });
    await page.locator('input[placeholder*="Search incident"]').fill("RFD-2026-094");
    await page.waitForTimeout(1200);
    await page.getByText("RFD-2026-094", { exact: true }).first().click();
    await page.waitForTimeout(2000);
    await page.getByRole("button", { name: "Edit Incident" }).click();
    await page.getByText("Loading incident").waitFor({ state: "hidden", timeout: 20000 }).catch(() => {});
    await page.getByText("Incident Overview", { exact: false }).first().waitFor({ timeout: 15000 });
    await page.waitForTimeout(800);
    await shoot(page, "incident-mobile");
  });

  await context.close();
}

// ---------------------------------------------------------------------------

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    await captureDesktop(browser);
    await captureMobile(browser);
  } finally {
    await browser.close();
  }

  console.log("\n=== Capture summary ===");
  for (const r of results) {
    console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}.png  ${(r.bytes / 1024).toFixed(1)} KB`);
  }
  if (skips.length) {
    console.log("\n=== Skipped pages ===");
    for (const s of skips) {
      console.log(`SKIP  ${s.page}: ${s.reason}`);
    }
  }

  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.error(`\n${failed.length} capture(s) failed the size check.`);
    process.exitCode = 1;
  } else {
    console.log(`\n${results.length} screenshot(s) captured successfully into ${OUT_DIR}`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exitCode = 1;
});
