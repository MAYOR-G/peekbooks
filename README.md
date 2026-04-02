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
PAYSTACK_CURRENCY=USD
NEXT_PUBLIC_SITE_CURRENCY=USD
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=PeekBooks <submissions@yourdomain.com>
EDITOR_NOTIFICATION_EMAIL=editor@yourdomain.com
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
- If your Paystack account is not enabled for `USD`, change `PAYSTACK_CURRENCY` and `NEXT_PUBLIC_SITE_CURRENCY` together.

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

Submitted manuscripts and submission records are stored on the server filesystem under `storage/` by default. For self-hosted Node deployments this is fine. For serverless deployments, point `SUBMISSION_STORAGE_DIR` to persistent storage or replace the storage adapter with object storage.
