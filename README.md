# MiCasaa Ganesh Utsav 2026 — Cloudflare Pages + Supabase

This is a mobile-first registration website for MiCasaa residents. It is designed for Cloudflare Pages and uses Supabase for registration storage. This version also includes a small Cloudflare Pages Function for a silent admin email notification after registration.

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
5. No build framework is required. Keep the `functions/` folder at the repository root so Cloudflare Pages deploys the admin-email endpoint along with the static site.
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
- `functions/api/admin-email.js` — server-side admin email notification (Cloudflare Pages Function)

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


## Mandatory WhatsApp confirmation after registration
After every successful new registration or update, the confirmation screen shows the full registration summary and one required final action:

- **Mandatory: Send to Committee on WhatsApp** - opens WhatsApp with a pre-filled message addressed to committee number **+91 9518960537**. The participant must tap **Send** in WhatsApp.

The previous **Send to My WhatsApp** and **Copy registration details** actions have been removed. The success dialog cannot be dismissed from the website until the committee WhatsApp button has been opened. After opening WhatsApp, the **Done** button is enabled.

Important: a normal website cannot technically verify that the person pressed the final **Send** button inside WhatsApp. It can only require that the committee WhatsApp flow is opened before the website allows the success dialog to close.

This uses WhatsApp Click-to-Chat only, so there is no paid WhatsApp API. No Supabase SQL change is required.


## v13 multi-select update
- MiCasaa Got Talent performance categories and participation types now use checkboxes, so a participant can select multiple performances (for example Dance + Singing, with Solo + Group if needed).
- Ganesh Shlok / Poem / Short Speech presentation types now use checkboxes.
- Food Stall categories now use checkboxes.
- Sports event selection was already multi-select and remains checkbox-based.
- Truly single-choice fields such as Wing and Age Group remain dropdowns. No radio buttons are used for multi-select questions.
- Existing registrations remain compatible; multi-select values are stored as comma-separated text inside the existing details JSON, so no Supabase SQL migration is required.


## v14 — Silent admin email notification

The website now contains a server-side Cloudflare Pages Function at:

`functions/api/admin-email.js`

After Supabase successfully creates or updates a registration, the browser silently calls `/api/admin-email` with only the Registration ID. The server-side function then reads the authoritative registration record from Supabase and emails the full registration details to the configured admin address. Nothing on the resident website says that an email was sent.

The email includes:
- Registration ID
- Participant name
- Wing / flat
- Age / age group
- WhatsApp/mobile
- Parent/guardian when provided
- All selected events with dates and tentative timings
- Shlok/Poem/Speech selections and duration
- Got Talent performance categories, solo/duo/group, act names, duration, group members and requirements
- Sports team/partner details
- Food Stall name, categories and food items
- Committee notes
- Venue, Aarti timings and timing-update note
- Photo/video consent and created/updated timestamps

### Why this email can stay free
Cloudflare Email Service allows sends to a **verified destination address** for free, even on the free plan. Because this project sends only to one fixed committee/admin inbox, configure that inbox as a verified destination address in your Cloudflare account. Cloudflare Pages Functions use the Workers free quota.

You still need a domain already using Cloudflare DNS because Cloudflare requires the sender address to belong to one of your routing/sending domains. If you do not already own a domain, obtaining a domain itself is not free.

### One-time Cloudflare email setup

1. In Cloudflare Dashboard open **Compute / Email Service -> Email Routing -> Destination Addresses**.
2. Add the committee/admin Gmail address you want to receive registration notifications and complete the verification email Cloudflare sends to it.
3. Make sure you have a domain on Cloudflare DNS. Enable/onboard that domain for Cloudflare Email Service. Choose a sender such as `registrations@your-domain.com`.
4. Create a Cloudflare API token with **Email Sending: Edit** permission. Keep the token secret.
5. In **Workers & Pages -> your Pages project -> Settings -> Variables and Secrets**, add these Production variables/secrets:

```text
SUPABASE_URL                 = your Supabase Project URL
SUPABASE_SERVICE_ROLE_KEY    = your Supabase sb_secret_... key (or legacy service_role key)
CLOUDFLARE_ACCOUNT_ID        = your Cloudflare Account ID
CLOUDFLARE_EMAIL_API_TOKEN   = the Email Sending API token
EMAIL_FROM                   = registrations@your-domain.com
ADMIN_EMAIL                  = the verified committee/admin email address
```

6. Store `SUPABASE_SERVICE_ROLE_KEY` and `CLOUDFLARE_EMAIL_API_TOKEN` as **secrets**, not plain values where possible.
7. **Never** put either of those secrets in `config.js`, `script.js`, GitHub source, or any browser-visible file.
8. Redeploy the Pages project after adding/changing the environment variables.

The resident registration still succeeds if the email notification endpoint is temporarily unavailable; email delivery is intentionally not shown to the resident. For troubleshooting, use **Cloudflare Pages Function logs** rather than adding an email-status message to the website.


## v15 age-group and Got Talent eligibility update

- Participant **Age Group is now locked and automatically derived from Age**.
  - Junior Kids: 3–6
  - Senior Kids: 7–12
  - Teens: 13–19
  - Adults: 20–59
  - Senior Citizens: 60+
- If a saved/draft age group conflicts with the entered age, the website corrects it automatically.
- MiCasaa Got Talent labels now show eligibility:
  - **Seniors (Age 11 & above)**
  - **Juniors (Age 3 to 10)**
- The admin edit form uses the same locked age-derived rule.
- No Supabase schema change is required.
