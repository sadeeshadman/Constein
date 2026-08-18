# Production Foundation

This project is intended to run with Vercel for the Next.js frontend, Render for the Express backend, and MongoDB Atlas for the database.

## Environments

Maintain two independent environments:

- **Staging**: Vercel preview deployment, Render staging service, and a separate Atlas staging database.
- **Production**: Vercel production project, Render production service, and a separate Atlas production database.

Never point staging at the production database. Do not copy production credentials into local files or commit `.env` files.

## Deployment order

1. Create the MongoDB Atlas staging or production cluster and database user.
2. Configure the backend service in Render with the environment variables listed below.
3. Set the Render health check to `/api/health/live`.
4. Deploy the backend and verify `/api/health/ready`.
5. Configure Vercel with `BACKEND_URL` pointing to the Render API URL and `AUTH_SECRET`.
6. Add the custom domains after both services work on their provider URLs.
7. Run the smoke-test checklist before accepting public traffic.

## Backend environment variables

Required:

```text
MONGODB_URI=<Atlas connection string for this environment>
PORT=4000
NODE_ENV=production
```

Required for authentication and feature use:

```text
AUTH_SECRET=<long random value, frontend only>
CLOUDINARY_CLOUD_NAME=<value>
CLOUDINARY_API_KEY=<value>
CLOUDINARY_API_SECRET=<value>
```

Required for quote notifications:

```text
QUOTE_INBOX_EMAIL=<business inbox>
SMTP_HOST=<provider host>
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=<provider user>
SMTP_PASS=<provider app password>
SMTP_FROM_EMAIL=<verified sender>
```

Configure secrets in Render and Vercel, not in Git. Rotate them if they are ever exposed.

## Frontend environment variables

```text
BACKEND_URL=https://api.consteingroup.ca
NEXT_PUBLIC_API_URL=https://api.consteingroup.ca
AUTH_SECRET=<same environment-specific secret used by NextAuth>
MONGODB_URI=<Atlas URI used by the frontend auth repository>
MONGODB_DB_NAME=constein
```

## Domains and DNS

DNS is managed wherever the domain was purchased. Ask the registrar for access to the domain's DNS management page; never share the account password here.

Recommended records:

- `www.consteingroup.ca`: Vercel domain instructions.
- `consteingroup.ca`: redirect to `www.consteingroup.ca` through Vercel.
- `api.consteingroup.ca`: Render custom-domain instructions.

Use the exact CNAME or A records shown by Vercel and Render. Both providers issue HTTPS certificates after DNS verification.

## Backups and restore

MongoDB Atlas production must have automated backups enabled before launch. At minimum:

1. Enable continuous or scheduled backups and confirm the retention period.
2. Create a staging restore test before launch.
3. Record the restore procedure and the person responsible for approving a restore.
4. Before schema changes, export or snapshot production and test the change against a restored copy.
5. Never test restore procedures by deleting the production database.

The application currently has no destructive schema migrations. Additive MongoDB fields are generally backward compatible; renames and removals require a migration plan.

## Rollback

- **Frontend**: use Vercel's deployment history to promote the last known-good deployment.
- **Backend**: redeploy the previous Render deployment or previous Git commit.
- **Database**: restore only after confirming the application version and data-loss impact.

Keep frontend and backend changes backward compatible so either service can be rolled back independently.

## Monitoring

Configure:

- Sentry for frontend and backend exceptions.
- UptimeRobot or equivalent checks for `https://api.consteingroup.ca/api/health/live` and the public website.
- Alerts for repeated readiness failures, elevated 5xx responses, failed quote emails, and failed image/PDF operations.
- Render and Vercel log retention sufficient to investigate a customer issue.

Do not include request bodies, passwords, SMTP credentials, database URIs, or uploaded image contents in logs or monitoring events.

## Launch smoke test

Run this against staging first and production immediately before launch:

- Open `/`, every service page, `/coring`, and the report-generator sign-in page.
- Confirm old service URLs and the new `/coring` URL resolve correctly.
- Submit a quote and confirm the MongoDB record and notification email.
- Sign in with one `employee` account and one `admin` account; verify role restrictions.
- Create and save a draft inspection.
- Upload a finding image and verify the Cloudinary URL.
- Finalize an inspection and download its PDF.
- Check `/api/health/live` and `/api/health/ready`.
- Verify HTTPS, custom-domain redirects, and mobile layout.

## CI and release gate

Every pull request must pass formatting, frontend checks, backend checks, and integration tests before merging to `main`. Production deployment should trigger only from reviewed changes merged to `main`; staging deployment should run from the development branch or pull request preview.

In GitHub repository settings, protect `main` and require the `frontend-checks`, `backend-checks`, and `integration-tests` status checks before merge. Disable direct pushes and require a pull request with at least one review. This setting cannot be represented by a source file alone.

## Test users

Create two test users in the environment-specific `Users` collection before staging verification:

- One `employee` user for the normal inspector workflow.
- One `admin` user for administrator access verification.

Use the existing application's password-hash format and a one-time secure provisioning script or database console. Do not put plaintext passwords in Git, deployment logs, tickets, or this document. Store the credentials in the team's password manager and rotate them before public launch.
