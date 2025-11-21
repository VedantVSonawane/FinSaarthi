# 🚨 Quick Fix: Prisma Database Error

## The Problem
You're seeing this error because the `DATABASE_URL` environment variable is not properly configured.

## The Solution (Choose One)

### Option 1: Use Supabase (Recommended - Free & Easy)

1. **Create a Supabase account**:
   - Go to [supabase.com](https://supabase.com)
   - Click "Start your project"
   - Create a new project

2. **Get your database URL**:
   - In your Supabase project, go to **Settings** → **Database**
   - Scroll to **Connection String** → **URI**
   - Copy the connection string (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`)

3. **Create `.env` file**:
   ```bash
   # In the project root, create a file named .env (not .env.example)
   ```

4. **Add this to your `.env` file**:
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres"
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_generated_secret_here
   OPENAI_API_KEY=your_openai_key_here
   ```

5. **Generate NEXTAUTH_SECRET**:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and paste it as `NEXTAUTH_SECRET` in `.env`

6. **Run Prisma commands**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### Option 2: Use Local PostgreSQL

1. **Install PostgreSQL** or use Docker:
   ```bash
   docker run --name finsaarthi-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
   ```

2. **Create `.env` file** with:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/finsaarthi?schema=public"
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_generated_secret_here
   OPENAI_API_KEY=your_openai_key_here
   ```

3. **Generate secret** (same as above):
   ```bash
   openssl rand -base64 32
   ```

4. **Run Prisma commands**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Verify It Works

After setting up your `.env` file, run:
```bash
npx prisma validate
```

You should see: ✅ "The schema is valid"

Then start the dev server:
```bash
npm run dev
```

Visit `http://localhost:3000` and you should see the landing page!

## Need Help?

- **Supabase Setup Guide**: https://supabase.com/docs/guides/database
- **OpenAI API Keys**: https://platform.openai.com/api-keys
- **Prisma Docs**: https://www.prisma.io/docs/getting-started

---

**Next Steps After Setup**:
1. Test the landing page at `http://localhost:3000`
2. Try signing up at `http://localhost:3000/auth/signup`
3. Explore the dashboard at `http://localhost:3000/dashboard`
