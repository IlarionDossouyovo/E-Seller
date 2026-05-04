# E-Seller Automations

This directory contains automation configurations for E-Seller cloud operations.

## Available Automations

### 1. Daily AI Report
Generates a daily summary of AI interactions and analytics.

### 2. Product Sync
Syncs products with Supabase database.

### 3. Health Check
Monitors the API health endpoints.

## Setup with OpenHands Cloud

To create automations, use OpenHands Cloud:

```bash
# Set your API key
export OPENHANDS_API_KEY="your-key"

# Create a simple automation
curl -X POST "https://app.all-hands.dev/api/automation/v1/preset/prompt" \
  -H "Authorization: Bearer ${OPENHANDS_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "E-Seller Daily Report",
    "prompt": "Check the E-Seller API status and provide a summary",
    "trigger": {
      "type": "cron",
      "schedule": "0 9 * * *",
      "timezone": "UTC"
    }
  }'
```

## Manual Cron Jobs

Alternatively, add to your server's crontab:

```bash
# Health check every hour
0 * * * * curl -s https://your-domain.com/api/status > /dev/null

# Daily sync at 2 AM
0 2 * * * curl -X POST https://your-domain.com/api/products/sync
```