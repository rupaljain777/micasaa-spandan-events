# Cloudflare admin email setup (one time)

This feature sends a silent registration notification to the committee/admin inbox after Supabase has successfully saved or updated a registration.

The resident page does not display email status.

## Requirements

- The website is deployed from GitHub to Cloudflare Pages.
- You have a domain using Cloudflare DNS for the sender address.
- The admin inbox is added and verified under Cloudflare Email Routing destination addresses.

## 1. Verify the admin destination

Cloudflare Dashboard -> Compute / Email Service -> Email Routing -> Destination Addresses.

Add the committee/admin Gmail address and click the verification link received in that inbox.

## 2. Onboard a sender domain

Use a domain already on Cloudflare DNS and configure/onboard it in Email Service. Choose a sender address such as:

`registrations@your-domain.com`

The sender address does not need to be displayed on the resident website.

## 3. Create Cloudflare API token

Create an API token with **Email Sending: Edit** permission for the relevant Cloudflare account. Copy the token once and keep it secret.

## 4. Add Pages variables / secrets

Cloudflare Dashboard -> Workers & Pages -> your Pages project -> Settings -> Variables and Secrets.

Add these Production values:

```text
SUPABASE_URL                 = your Supabase project URL
SUPABASE_SERVICE_ROLE_KEY    = your Supabase sb_secret_... key (or legacy service_role key)
CLOUDFLARE_ACCOUNT_ID        = your Cloudflare account ID
CLOUDFLARE_EMAIL_API_TOKEN   = your Email Sending API token
EMAIL_FROM                   = registrations@your-domain.com
ADMIN_EMAIL                  = your verified committee/admin Gmail address
```

Treat `SUPABASE_SERVICE_ROLE_KEY` and `CLOUDFLARE_EMAIL_API_TOKEN` as secrets. Never put them in `config.js`, `script.js`, or GitHub source.

## 5. Redeploy

Commit/push the `functions/` folder with the website and redeploy after adding the environment values.

The route `/api/admin-email` is generated automatically from `functions/api/admin-email.js` by Cloudflare Pages Functions.

## 6. Test

Submit one test registration. Then verify:

1. The Supabase row is saved.
2. The resident sees only the mandatory committee WhatsApp step.
3. The admin inbox receives a registration email containing the participant and event details.

If email is missing, check Cloudflare Pages Function logs. Email failure is intentionally not shown to residents and does not undo a successful Supabase registration.
