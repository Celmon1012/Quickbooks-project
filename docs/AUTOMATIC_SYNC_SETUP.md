# Automatic QBO Sync Setup Guide

This guide explains how to set up **fully automatic** data syncing:

```
User connects QBO → Data automatically syncs → Dashboard shows data
```

No manual intervention required!

---

## How It Works

1. **User connects QBO** in the dashboard (Data Sources page)
2. **Dashboard OAuth callback** exchanges code for tokens and stores them in Supabase
3. **Webhook triggers Pipedream** with the tokens
4. **Pipedream fetches P&L data** from QuickBooks using those tokens
5. **Data is stored in Supabase** `monthly_pl` table
6. **Dashboard displays the data**

---

## Step 1: Create the Pipedream Workflow

### 1.1 Create New Workflow
1. Go to [Pipedream](https://pipedream.com)
2. Click **New Workflow**
3. Name it: `VIRGO - QBO Auto Backfill`

### 1.2 Add HTTP Trigger
1. Select **HTTP / Webhook** as the trigger
2. Choose **HTTP API Requests**
3. Copy the webhook URL (you'll need this later)
   - Example: `https://eo8tqs54xlmq3dx.m.pipedream.net`

### 1.3 Add Code Step
1. Click **+** to add a step
2. Choose **Run Node.js code**
3. Replace the code with the contents of `pipedream/qbo-auto-backfill.js`

### 1.4 Configure Props
In the code step, you'll see two fields to fill:
- **Supabase URL**: `https://amvshhoizeujspkgypke.supabase.co`
- **Supabase Service Role Key**: (get from Supabase → Settings → API → service_role key)

### 1.5 Deploy
Click **Deploy** to activate the workflow.

---

## Step 2: Add Webhook URL to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings → Environment Variables**
4. Add:
   ```
   PIPEDREAM_BACKFILL_WEBHOOK=https://YOUR_PIPEDREAM_WEBHOOK_URL
   ```
5. Click **Save**
6. **Redeploy** the project (or push a commit)

---

## Step 3: Run Database Migration

Run this SQL in Supabase SQL Editor:

```sql
-- Create sync_status table if not exists
CREATE TABLE IF NOT EXISTS sync_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    connection_id UUID REFERENCES qbo_connections(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    sync_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    records_synced INTEGER DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE sync_status ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own sync_status" ON sync_status;
DROP POLICY IF EXISTS "Service role full access sync_status" ON sync_status;

-- Create RLS policies
CREATE POLICY "Users can view own sync_status" ON sync_status
FOR SELECT USING (
    connection_id IN (
        SELECT id FROM qbo_connections WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Service role full access sync_status" ON sync_status
FOR ALL USING (auth.role() = 'service_role');

-- Grant permissions
GRANT SELECT ON sync_status TO authenticated;
GRANT ALL ON sync_status TO service_role;

-- Add unique constraint for monthly_pl upserts
ALTER TABLE monthly_pl 
ADD CONSTRAINT monthly_pl_company_month_unique 
UNIQUE (company_id, month);
```

---

## Step 4: Test the Flow

1. **Log in** to your dashboard
2. Go to **Data Sources**
3. Click **Connect QuickBooks**
4. Authorize your QuickBooks account
5. You should see:
   - Redirect back to Data Sources with "Connected" status
   - Dashboard shows "Syncing Your Data..." message
   - After 1-5 minutes (depending on data volume), dashboard shows your data

---

## Troubleshooting

### Data not appearing after connect?

1. **Check Pipedream logs**
   - Go to your workflow in Pipedream
   - Click on the latest event
   - Check for errors in the code step

2. **Check environment variable**
   - Verify `PIPEDREAM_BACKFILL_WEBHOOK` is set in Vercel
   - Make sure you redeployed after adding it

3. **Check sync_status table**
   ```sql
   SELECT * FROM sync_status ORDER BY created_at DESC LIMIT 10;
   ```

4. **Check monthly_pl table**
   ```sql
   SELECT * FROM monthly_pl WHERE company_id = 'YOUR_COMPANY_ID' ORDER BY month DESC;
   ```

### "Token expired" error in Pipedream?

The tokens passed from the dashboard are fresh (just obtained during OAuth). If you see token errors:
1. Have the user disconnect and reconnect QBO
2. Check that the OAuth callback is sending tokens correctly

### Rate limiting?

QuickBooks allows ~500 requests/minute. The code has built-in delays (200ms between requests) to stay within limits.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL (Next.js App)                          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │ Data Sources │───▶│ /api/qbo/    │───▶│ OAuth        │       │
│  │    Page      │    │   connect    │    │ Redirect     │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│                                                 │                │
│                                                 ▼                │
│                           ┌──────────────────────────────────┐  │
│                           │ /api/qbo/callback                 │  │
│                           │ • Exchange code for tokens        │  │
│                           │ • Store in Supabase               │  │
│                           │ • POST to Pipedream webhook       │  │
│                           └──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┴───────────────────┐
          ▼                                       ▼
┌─────────────────────┐               ┌─────────────────────┐
│     SUPABASE        │               │     PIPEDREAM       │
│  ┌───────────────┐  │               │  ┌───────────────┐  │
│  │ qbo_connections│  │               │  │ Receive       │  │
│  │ (tokens)      │  │               │  │ webhook       │  │
│  └───────────────┘  │               │  └───────────────┘  │
│  ┌───────────────┐  │               │         │          │
│  │ sync_status   │◀─┼───────────────┼─────────┤          │
│  └───────────────┘  │               │         ▼          │
│  ┌───────────────┐  │               │  ┌───────────────┐  │
│  │ monthly_pl    │◀─┼───────────────┼──│ Fetch P&L     │  │
│  │ (P&L data)    │  │               │  │ from QBO      │  │
│  └───────────────┘  │               │  └───────────────┘  │
└─────────────────────┘               └─────────────────────┘
                                                │
                                                ▼
                                      ┌─────────────────────┐
                                      │   QUICKBOOKS API    │
                                      │   (P&L Reports)     │
                                      └─────────────────────┘
```

---

## Daily Sync (Optional)

For automatic daily updates, create a separate workflow:

1. **Trigger**: Schedule (e.g., every day at 6 AM)
2. **Step 1**: Query Supabase for all `qbo_connections`
3. **Step 2**: For each connection, refresh tokens if needed
4. **Step 3**: Fetch latest month's data
5. **Step 4**: Upsert to `monthly_pl`

This keeps data fresh without user intervention.

