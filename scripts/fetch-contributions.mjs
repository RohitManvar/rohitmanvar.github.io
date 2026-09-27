/**
 * Fetches the GitHub contribution calendar at build time and writes it to
 * src/data/contributions.json, which the page imports statically.
 *
 * This exists because the site is a static export with no server: fetching
 * from the browser would require shipping a GitHub token to every visitor.
 * Here the token stays in CI and only the resulting data is published.
 *
 * Fails soft — if the token is missing or GitHub errors, it writes an empty
 * calendar so the build still succeeds and the section renders its fallback.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "src", "data", "contributions.json");

const USERNAME = process.env.GITHUB_USERNAME || "RohitManvar";
// Accept either name so it works with the existing CI secret wiring.
const TOKEN = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

async function fetchContributions() {
  const to = new Date();
  const from = new Date(to);
  from.setFullYear(from.getFullYear() - 1);

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
      "User-Agent": "portfolio-build",
    },
    body: JSON.stringify({
      query,
      variables: {
        login: USERNAME,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API returned ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    throw new Error(`No contribution calendar returned for "${USERNAME}"`);
  }

  const days = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      contributionCount: day.contributionCount,
    }))
  );

  return {
    username: USERNAME,
    totalContributions: calendar.totalContributions,
    fetchedAt: new Date().toISOString(),
    days,
  };
}

async function main() {
  let payload;

  if (!TOKEN) {
    console.warn(
      "[contributions] No GITHUB_TOKEN set — writing empty calendar. " +
        "The contribution graph will show its fallback."
    );
    payload = { username: USERNAME, totalContributions: 0, fetchedAt: null, days: [] };
  } else {
    try {
      payload = await fetchContributions();
      console.log(
        `[contributions] Fetched ${payload.days.length} days ` +
          `(${payload.totalContributions} contributions) for ${USERNAME}`
      );
    } catch (err) {
      // Never fail the build over this — the section degrades on its own.
      console.warn(`[contributions] Fetch failed: ${err.message}`);
      payload = { username: USERNAME, totalContributions: 0, fetchedAt: null, days: [] };
    }
  }

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(payload, null, 2) + "\n");
  console.log(`[contributions] Wrote ${OUT_PATH}`);
}

main();
