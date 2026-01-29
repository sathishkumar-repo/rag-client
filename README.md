This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



🔒 Corporate Proxy Setup (Zscaler)
If you are developing on a corporate machine behind a Zscaler proxy, you will likely encounter SSL/Certificate errors (UNABLE_TO_GET_ISSUER_CERT_LOCALLY) when running npm or supabase.

Step 1: Generate the Certificate
  Run the following command in PowerShell (as Administrator) from the root of this project. This will "grab" your company's Zscaler certificate and save it as zscaler.pem:

  Powershell
    $cert = Get-ChildItem Cert:\CurrentUser\Root | Where-Object { $_.Subject -like "*Zscaler*" } | Select-Object -First 1
    if ($cert) {
        $base64 = [System.Convert]::ToBase64String($cert.RawData, "InsertLineBreaks")
        "-----BEGIN CERTIFICATE-----`n$base64`n-----END CERTIFICATE-----" | Out-File "zscaler.pem" -Encoding ascii
        Write-Host "✅ zscaler.pem created successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Zscaler certificate not found in your system store." -ForegroundColor Red
    }

Step 2: Configure Environment
To ensure Node.js and Supabase trust this certificate, you must set the following environment variables in your terminal session before starting the app:
  Powershell
    $env:NODE_EXTRA_CA_CERTS="zscaler.pem"
    $env:SSL_CERT_FILE="zscaler.pem"
    $env:DENO_CERT="zscaler.pem"

  Cmd
    set NODE_EXTRA_CA_CERTS=zscaler.pem
    set SSL_CERT_FILE=zscaler.pem
    set DENO_CERT=zscaler.pem

Step 3: Run the Application

  npm run dev
  npx supabase start

Note: The zscaler.pem file is ignored by git and will not be uploaded to the repository. Each developer behind a proxy must generate their own local copy.