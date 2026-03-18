# MMStudio Database Dumps

This repository stores PostgreSQL schema/data exports for the MMStudio application database.

## Files

- `development.sql`: Development database dump.
- `production.sql`: Production database dump.

Both dumps were generated with `pg_dump` from PostgreSQL 17.8.

## Main Tables

The dumps include the following primary tables:

- `auth_accounts`
- `auth_sessions`
- `auth_users`
- `auth_verification_token`
- `character_assignments`
- `coupons`
- `email_logs`
- `mysteries`
- `purchases`
- `votes`

## Restore

Create a database, then restore a dump with `psql`:

```bash
createdb mmstudio
psql -d mmstudio -f development.sql
```

Use `production.sql` instead if you need the production export.
