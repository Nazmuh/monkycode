# MonkyCode Instagram Automation

This project gives you a starter automation flow for posting content to Instagram using the Meta Graph API.

## What is included

- A Node.js app scaffold for social posting automation
- A ready-to-use script for publishing a post to Instagram
- Environment-based configuration
- A roadmap for turning this into a full content automation workflow

## Prerequisites

- Node.js 18+
- A Meta Developer App with Instagram Graph API access
- An Instagram Business account connected to your Facebook Page
- A valid access token with permission to publish content

## Setup

1. Copy `.env.example` to `.env`
2. Fill in your credentials:
   - `INSTAGRAM_ACCESS_TOKEN`
   - `INSTAGRAM_BUSINESS_ACCOUNT_ID`
   - `APP_ID`
   - `APP_SECRET`
   - `IMAGE_URL`
   - `DEFAULT_CAPTION`
3. Install dependencies:

```bash
npm install dotenv
```

If you choose to use the fetch-based implementation in this repo, Node 18+ already includes fetch support, so no extra runtime dependency is required.

## Publish a post

```bash
node src/index.js --caption "Launching our new workflow for creators" --image-url "https://example.com/content.jpg"
```

Or with environment defaults:

```bash
node src/index.js
```

## Notes

This is intentionally a safe starter configuration and does not hardcode credentials. It is designed to be extended with:

- a scheduler
- content approval workflows
- a media library
- AI-generated captions
- cross-posting to other networks

## Security

Never commit your real `.env` file. Keep secret values in GitHub Actions secrets or a secure environment manager when deploying.
