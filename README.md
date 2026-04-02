# PeekBooks

Premium editorial website built with Next.js.

## Local development

```bash
npm install
npm run dev
```

## Manuscript submission flow

The `Submit Manuscript` experience now supports:

- real file upload handling
- automatic server-side word count detection for `DOCX` and `TXT`
- dynamic pricing based on detected word count, selected service, and turnaround
- Paystack payment initialization and verification
- Paystack webhook handling
- Resend emails for the customer and editor after successful payment

## Required environment variables

Create `.env.local` from `.env.example` and fill in:

```bash
SITE_URL=http://localhost:3000
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
PAYSTACK_CURRENCY=NGN
NEXT_PUBLIC_SITE_CURRENCY=NGN
USD_TO_NGN_RATE=1500
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=PeekBooks <submissions@yourdomain.com>
EDITOR_NOTIFICATION_EMAIL=editor@yourdomain.com
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_your_blob_token
```

Optional:

```bash
SUBMISSION_STORAGE_DIR=/absolute/path/to/persistent/storage
```

## Paystack setup

Set your Paystack webhook URL to:

```text
https://your-domain.com/api/paystack/webhook
```

Notes:

- This implementation uses the Paystack secret key on the server only.
- There is no separate Paystack webhook secret in this setup. The webhook signature is validated with `PAYSTACK_SECRET_KEY`.
- Pricing is authored in USD. If you are charging in `NGN`, set both `PAYSTACK_CURRENCY` and `NEXT_PUBLIC_SITE_CURRENCY` to `NGN`, then set `USD_TO_NGN_RATE` to your preferred conversion rate such as `1500`.
- If you later enable USD on Paystack, switch both `PAYSTACK_CURRENCY` and `NEXT_PUBLIC_SITE_CURRENCY` to `USD`. No pricing code change is needed.

## Resend setup

You need:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `EDITOR_NOTIFICATION_EMAIL`

Resend sends:

- customer submission confirmation
- customer payment receipt email
- editor notification email with manuscript attachment and metadata

## Supported upload formats

- `DOCX`
- `TXT`

Legacy `.doc` files should be resaved as `.docx` before submission. This is intentional so word-count detection remains dependable.

## Storage note

Submitted manuscripts and submission records now support two storage modes:

- `BLOB_READ_WRITE_TOKEN` set: manuscripts and submission records are stored in Vercel Blob with private access. This is the recommended production setup for Vercel/serverless deployments.
- `BLOB_READ_WRITE_TOKEN` not set: the app falls back to the local server filesystem under `storage/`. This is suitable for local development or self-hosted Node deployments with persistent disk.

If you deploy on Vercel or another serverless platform, configure `BLOB_READ_WRITE_TOKEN` and do not rely on `/tmp` or local disk for manuscript storage.
