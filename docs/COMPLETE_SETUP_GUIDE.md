# Complete QuickBooks Integration Setup Guide

This guide walks you through setting up the complete QuickBooks integration with proper user isolation.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER FLOW                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. User signs up/logs in                                                    │
│         ↓                                                                    │
│  2. Goes to Data Sources → "Connect QuickBooks"                             │
│         ↓                                                                    │
│  3. QuickBooks OAuth flow → Tokens saved to Supabase (with user_id)         │
│         ↓                                                                    │
│  4. Webhook triggers Pipedream backfill workflow                            │
│         ↓                                                                    │
│  5. Pipedream fetches 24 months of P&L data from QBO                        │
│         ↓                                                                    │
│  6. Data inserted into Supabase (monthly_pl, accounts, raw_transactions)    │
│         ↓                                                                    │
│  7. User sees their data on dashboard (isolated by user_id via RLS)         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Step 1: Database Setup

### Run Migration in Supabase SQL Editor

Copy the contents of `supabase/migrations/002_user_isolation.sql` and run it in your Supabase SQL Editor.

This migration:
- Adds `user_id` column to `companies` and `qbo_connections` tables
- Creates Row Level Security (RLS) policies
- Creates `sync_status` table for tracking sync progress
- Ensures users can only see their own data

### Verify Migration

Run this query to verify:

```sql
-- Check user_id columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('companies', 'qbo_connections') 
AND column_name = 'user_id';

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('companies', 'qbo_connections', 'monthly_pl', 'accounts');

-- Check sync_status table exists
SELECT * FROM sync_status LIMIT 1;
```

## Step 2: Environment Variables

Add these to your Vercel project (Settings → Environment Variables):

```env
# Supabase (you should already have these)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... # Get from Supabase → Settings → API

# QuickBooks OAuth (from Intuit Developer Portal)
QBO_CLIENT_ID=AB...
QBO_CLIENT_SECRET=...

# Pipedream Webhook (optional - for auto-triggering backfill)
PIPEDREAM_BACKFILL_WEBHOOK=https://eo8tqs54xlmq3dx.m.pipedream.net
```

## Step 3: Update Pipedream Workflows

### Environment Variables in Pipedream

In each Pipedream workflow, add these environment variables:
1. Go to your workflow
2. Click "Settings" (gear icon)
3. Under "Environment", add:
   - `SUPABASE_URL` = your Supabase URL
   - `SUPABASE_SERVICE_ROLE_KEY` = your service role key

### Update Workflow Code

Replace your existing Pipedream workflow code with the updated versions:

1. **VIRGO-QBO Connection Handler**: Use `pipedream/qbo-connection-handler.js`
2. **VIRGO-QBO Backfill**: Use `pipedream/qbo-backfill.js`

### Daily Sync Trigger

Your Daily Sync workflow currently has no trigger. Add one:

1. Click "Add Trigger"
2. Select "Schedule"
3. Configure: Run every day at 2:00 AM (or your preferred time)

## Step 4: Update Existing Data (One-Time)

If you have existing data without `user_id`, you need to assign it to a user:

```sql
-- First, create or get your user's ID from auth.users
-- You can find this in Supabase → Authentication → Users

-- Example: Assign all Hustle Gear data to a specific user
UPDATE companies 
SET user_id = 'YOUR_USER_UUID_HERE'
WHERE realm_id = '9130350084563956'; -- Hustle Gear realm_id

UPDATE qbo_connections 
SET user_id = 'YOUR_USER_UUID_HERE'
WHERE realm_id = '9130350084563956';
```

## Step 5: Test the Integration

### Test 1: Check RLS is Working

1. Sign in as a user
2. Go to Data Sources - should only see YOUR connections
3. Go to Dashboard - should only see YOUR data

### Test 2: Connect New QuickBooks

1. Sign in
2. Go to Data Sources → "Connect QuickBooks"
3. Complete OAuth flow
4. Check `qbo_connections` table - should have your `user_id`
5. Check `sync_status` table - should show "pending" record
6. Trigger Pipedream backfill (or wait if auto-triggered)
7. Check Dashboard - data should appear

### Test 3: Verify Data Isolation

With two different users:
1. User A connects Company A
2. User B connects Company B
3. User A should NOT see Company B's data
4. User B should NOT see Company A's data

## Troubleshooting

### "No data showing on dashboard"

1. Check if QBO connection exists:
```sql
SELECT * FROM qbo_connections WHERE user_id = 'YOUR_USER_ID';
```

2. Check if data exists for the company:
```sql
SELECT * FROM monthly_pl WHERE company_id = 'YOUR_COMPANY_ID';
```

3. Check sync_status:
```sql
SELECT * FROM sync_status ORDER BY created_at DESC LIMIT 5;
```

### "Data shows for wrong user"

RLS might not be working. Check:
```sql
-- Verify RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Verify policies exist
SELECT * FROM pg_policies WHERE tablename = 'monthly_pl';
```

### "Pipedream workflow fails"

1. Check environment variables are set
2. Check Supabase service role key is correct
3. Look at Pipedream execution logs for specific error

## Database Schema Reference

### companies
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | Company name |
| realm_id | VARCHAR | QuickBooks company ID |
| user_id | UUID | Owner user ID (**NEW**) |
| created_at | TIMESTAMP | Creation time |

### qbo_connections
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company_id | UUID | FK to companies |
| user_id | UUID | Owner user ID (**NEW**) |
| access_token | TEXT | QBO OAuth token |
| refresh_token | TEXT | QBO refresh token |
| realm_id | VARCHAR | QBO company ID |
| expires_at | TIMESTAMP | Token expiry |
| last_sync_at | TIMESTAMP | Last successful sync |

### monthly_pl
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company_id | UUID | FK to companies |
| month | DATE | First day of month |
| revenue | NUMERIC | Total revenue |
| cogs | NUMERIC | Cost of goods sold |
| expenses | NUMERIC | Operating expenses |
| net_profit | NUMERIC | Revenue - COGS - Expenses |

### sync_status (**NEW**)
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| connection_id | UUID | FK to qbo_connections |
| company_id | UUID | FK to companies |
| sync_type | VARCHAR | 'initial', 'incremental', 'full' |
| status | VARCHAR | 'pending', 'in_progress', 'completed', 'failed' |
| started_at | TIMESTAMP | When sync started |
| completed_at | TIMESTAMP | When sync finished |
| records_synced | INTEGER | Number of records synced |
| error_message | TEXT | Error details if failed |

## Security Checklist

- [ ] `user_id` added to companies table
- [ ] `user_id` added to qbo_connections table
- [ ] RLS enabled on all tables
- [ ] RLS policies created for all tables
- [ ] Service role key only in server-side code/Pipedream
- [ ] Access tokens stored encrypted (Supabase handles this)
- [ ] Tested with multiple users to verify isolation

## Next Steps

1. **Add error notifications**: Configure Pipedream to send Slack/email on sync failures
2. **Add manual sync button**: Let users trigger a sync from the dashboard
3. **Add sync history page**: Show users their sync status and history
4. **Add data deletion**: Let users disconnect and delete their data

