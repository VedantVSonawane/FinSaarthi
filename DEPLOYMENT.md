# 🚀 How to Deploy FinSaarthi to the Web

Follow these simple steps to host your project on Vercel for free.

## **Step 1: Go to Vercel**
1. Go to **[vercel.com](https://vercel.com)**.
2. Sign up or Log in (use "Continue with GitHub").

## **Step 2: Import Project**
1. On your Vercel dashboard, click **"Add New..."** -> **"Project"**.
2. You should see your `FinSaarthi` repository in the list.
3. Click **"Import"** next to it.

## **Step 3: Configure Project**
You will see a "Configure Project" screen.
1. **Framework Preset**: Leave as `Next.js`.
2. **Root Directory**: Leave as `./`.
3. **Environment Variables** (Crucial Step!):
   Expand the "Environment Variables" section and add these one by one (copy from your local `.env` file):

   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | `postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres` |
   | `NEXTAUTH_URL` | `https://your-project-name.vercel.app` (Vercel will give you this URL, or just put `http://localhost:3000` for now and update later) |
   | `NEXTAUTH_SECRET` | `K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=` |
   | `GROQ_API_KEY` | `gsk_...` (Paste your actual key here) |

   *Note: For `NEXTAUTH_URL`, once deployed, Vercel will give you a domain like `finsaarthi.vercel.app`. You should update this variable in Vercel Settings later to match that domain.*

## **Step 4: Deploy**
1. Click **"Deploy"**.
2. Wait about 1-2 minutes. Vercel will build your app.
3. 🎉 **Success!** You will see a "Congratulations!" screen with a preview of your live app.

## **Step 5: Final Tweak (Important)**
1. Once deployed, copy your new website URL (e.g., `https://finsaarthi-vedant.vercel.app`).
2. Go to **Settings** -> **Environment Variables** in Vercel.
3. Edit `NEXTAUTH_URL` and paste your new URL.
4. Go to **Deployments** tab and click **"Redeploy"** (3 dots next to latest deployment) to apply the change.

---

**That's it! Your AI Financial Advisor is now live for the world!** 🌍
