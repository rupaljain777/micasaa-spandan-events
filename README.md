# MiCasaa Ganesh Utsav 2026 — Cloudflare Pages + Supabase

This is a mobile-first registration website for MiCasaa residents. It is designed for free static hosting on Cloudflare Pages and uses Supabase for registration storage.

## What this version adds

- Supabase database backend (no Google Sheet required)
- Server-side duplicate prevention
- Existing registration lookup
- Existing registration can be loaded and edited
- A stable Registration ID for every participant
- Direct table access blocked; the browser only calls two narrowly scoped Supabase RPC functions
- Mobile-first design for WhatsApp sharing

## How duplicate detection works

A participant is treated as the same registration when these four fields match:

1. Participant name
2. Wing
3. Flat number
4. Mobile number

This lets two children in the same flat use the same parent's mobile number because their participant names are different.

If the combination already exists, the site loads that registration and switches to **Edit mode**. On submit, Supabase updates the same row instead of adding another one.

The database also has a UNIQUE participant key, so even near-simultaneous submissions cannot create two rows for the same participant.

---

# Step 1 — Create the free Supabase project

1. Go to Supabase and create a new project.
2. Choose a project name such as `micasaa-ganesh-utsav-2026`.
3. Wait for the project to finish provisioning.

# Step 2 — Create the registration database

1. In Supabase Dashboard open **SQL Editor**.
2. Open the file `supabase-setup.sql` from this package.
3. Copy the whole file into SQL Editor.
4. Click **Run**.

This creates:

- `registrations` table
- duplicate-safe participant key
- `find_registration(...)` function
- `upsert_registration(...)` function
- permissions needed by the public registration website

You do not need to manually create any table columns.

# Step 3 — Copy the Supabase connection details

In Supabase open **Project Settings -> API** (or the current API Keys page in the dashboard) and copy:

- Project URL
- `anon` / publishable public key

The public/anon key is intended for browser applications. **Do not put a service-role/secret key in this website.**

Open `config.js` and replace:

```js
window.MICASAA_CONFIG = {
  supabaseUrl: "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE",
  supabaseAnonKey: "PASTE_YOUR_SUPABASE_ANON_KEY_HERE"
};
```

with your real values.

# Step 4 — Test locally

Open `index.html` in a browser.

Test this sequence:

1. Register a participant.
2. Check Supabase -> Table Editor -> `registrations` and confirm one row exists.
3. On the website enter the same participant name, flat, wing and mobile.
4. Click **Check Existing Registration**.
5. The existing data should load and the submit button should change to **Update Registration**.
6. Change an event and submit.
7. Check Supabase again: the original row should be updated; there should still be only one row for the participant.

# Step 5 — Deploy free on Cloudflare Pages

Easy approach using GitHub:

1. Create a GitHub repository.
2. Upload all files from this folder to the repository root.
3. In Cloudflare Dashboard open **Workers & Pages -> Create -> Pages -> Connect to Git**.
4. Select the repository.
5. This is a plain static site, so no build framework is required. Use the repository root as the output directory when Cloudflare asks for it.
6. Deploy.
7. Cloudflare will give you a public HTTPS URL such as `your-project.pages.dev`.

After changing `config.js`, commit/push the update and Cloudflare Pages will redeploy it automatically.

## Registration data

Open Supabase -> Table Editor -> `registrations` to view entries.

Important columns include:

- Registration ID
- Participant name
- Flat / Wing
- Age / Age group
- Mobile
- Selected events
- Event-specific details
- Created / updated timestamps

Supabase also allows CSV export from the table view for committee use.

## Security note

The website uses the Supabase public/anon key, which is normal for a browser application. Direct `SELECT`, `INSERT`, `UPDATE` and `DELETE` permissions on the registration table are revoked. The website can only call the exact-match lookup and duplicate-safe save/update functions created by `supabase-setup.sql`.

The lookup uses participant name + wing + flat + mobile. This is suitable for a society event registration workflow, but it is not OTP-based identity verification. Do not store sensitive information in this registration database.

## Files

- `index.html` — website
- `style.css` — festive responsive styling
- `script.js` — timeline, form, duplicate lookup, edit mode and submission
- `config.js` — your Supabase Project URL and anon key
- `supabase-setup.sql` — one-time database setup
- `assets/micasaa-logo.png` — MiCasaa logo

---

# Admin Dashboard

This package now includes `admin.html`, an authenticated committee dashboard.

## What the dashboard includes

- Secure Supabase email/password login
- Admin allow-list (only committee emails you approve)
- Total participant / event-entry / flat counts
- Event-wise registration counts
- Search by name, flat, mobile, registration ID
- Filter by Wing, event and age group
- Edit an existing participant registration
- Duplicate protection remains active when an admin edits identity details
- Export the currently filtered list to CSV / Excel

## One-time admin setup

### 1. Create an admin user in Supabase Authentication

Supabase Dashboard -> Authentication -> Users -> Add user.

Create a user with the email/password you want to use for the committee dashboard.

### 2. Edit `admin-dashboard-setup.sql`

Find this line:

`CHANGE_ME_TO_YOUR_ADMIN_EMAIL@example.com`

Replace it with the exact email you created in Authentication.

### 3. Run the SQL

Supabase Dashboard -> SQL Editor -> New query -> paste all of `admin-dashboard-setup.sql` -> Run.

To add another committee admin later:

```sql
insert into public.micasaa_admins(email, display_name)
values ('second.admin@example.com', 'Second Admin')
on conflict (email) do update set display_name = excluded.display_name;
```

The email must also exist as a user under Supabase Authentication.

### 4. Keep your existing `config.js`

If your live registration site already has the real Supabase Project URL and anon key, copy those same two values into this package's `config.js` before deploying.

Do NOT put the Supabase service-role key in the website.

### 5. Deploy to Cloudflare Pages

Upload all files in this folder to the same Cloudflare Pages project (or deploy through Git). `admin.html` will become available at:

`https://YOUR-SITE.pages.dev/admin.html`

Use the Supabase Authentication email/password to sign in.

## Security design

The registrations table stays unavailable to anonymous visitors. The public registration page continues to use the narrowly scoped public registration RPCs. Admin list/edit functions require an authenticated Supabase user AND that user's email must be present in `public.micasaa_admins`.


## Food Stall registration
Food Stall registration is included for 17 Sept. Residents can provide stall name, category, and planned items. The form also clearly notes that participants must arrange their own table and any power/electrical requirements. The admin dashboard can filter and count Food Stall registrations.

## Event-wise Printable Reports
The Admin Dashboard now includes **Event-wise Printable Report**.

1. Sign in to `admin.html`.
2. Under **Event-wise Printable Report**, choose an event.
3. Click **Generate Printable Report**.
4. The report automatically includes participant details plus event-specific fields:
   - Ganesh Shlok / Poem / Speech: presentation type and duration
   - MiCasaa Got Talent: category, solo/duo/group, act name, duration, group members and special requirements
   - Sports: team / partner details
   - Food Stall: stall name, food category and items to sell / serve
   - Other competitions: participant details and notes
5. Click **Print / Save PDF** for a paper-ready landscape report, or **Export this event CSV** for Excel.

The admin Edit Registration screen also exposes these event-specific fields, so committee members can correct them when required.

No additional Supabase SQL change is required for this report feature; it uses the existing admin registration RPC.

## September 2026 resident-experience update
- Wings available in registration and admin: **C1, C2, D, E, F, G**.
- **Shriram-Janaki Mahila Bhajni Mandal** is scheduled for 16 Sept.
- MiCasaa Got Talent schedule is now **Seniors on 18 Sept** and **Juniors on 19 Sept**.
- The numbered 1/2/3 step indicator has been removed from the registration form.
- Resident page supports **English, हिन्दी and मराठी** from the language selector in the header. The selection is remembered on that device.
- Form controls, checkboxes and buttons have larger tap targets and text for easier use, including by senior citizens.


## Age groups

The registration and admin pages use these age groups:
- Junior Kids: 3–6 years
- Senior Kids: 7–12 years
- Teens: 13–19 years
- Adults: 20–59 years
- Senior Citizens: 60+ years

On the resident registration page, the age group is automatically selected from the entered age to reduce errors.


## v7 — Tentative event timings
The resident timeline now shows tentative timings for every festival event, plus daily Morning Aarti at 8:30 AM and Evening Aarti at 8:00 PM. A clear note explains that timings may be updated one day before each event. Registration cards and admin printable reports also show the relevant event timings.


## v8 display updates
- Removed the hero microcopy “One form · Multiple events · Mobile friendly”.
- Venue is now MiCasaa Club House.
- Updates note says tentative timings are shown and final updates may be shared 1 day before on the society WhatsApp group.
- Morning Aarti remains 8:30 AM.
- Evening Aarti is 8:00 PM on weekdays and 7:30 PM on weekends.

## v11 hero refinement
- Right-side Ganpati artwork now uses a mirrored crop of the supplied devotional reference image.
- The rotating golden aura remains animated around the artwork.
- The blessing panel is now a centered maroon-and-gold ceremonial plaque with Devanagari display typography.
- No Supabase/database changes are required for this visual update.
