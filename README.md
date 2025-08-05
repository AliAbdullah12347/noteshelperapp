
# ✨ AI-Powered Full-Stack Notes App

A modern, full-stack note-taking application with AI summarization capabilities. Built using the latest technologies including Next.js 15, Supabase, Prisma, Tailwind CSS, shadcn/ui, and the OpenAI API. This project is a portfolio-ready showcase of full-stack development with a focus on performance, scalability, and user experience.

---

## 🚀 Features

### 📝 Notes Management
- Create, update, delete, and view notes in real-time
- Each note includes a title, body, and timestamp
- Optimistic UI updates for fast interactions

### 🧠 AI Summarization
- Ask AI to summarize your notes using the `/actions/notes.ts` logic
- Integrates OpenAI (or Google Gemini alternative) for natural language processing
- Easily extendable for tagging, querying, or context-aware AI responses

### 💾 Backend with Supabase
- Supabase PostgreSQL database to persist user notes
- Supabase authentication support (email/password or OAuth)
- Row-level security enabled

### ⚙️ Server Actions (Next.js App Router)
- Built with Next.js 15’s App Router and Server Actions API
- Secure and performant business logic running on the server
- Uses Supabase client for all database operations inside server actions

### 🖌️ UI with shadcn/ui + Tailwind CSS
- Accessible, modern components powered by Radix UI via shadcn/ui
- Fully responsive and clean interface
- Theming via Tailwind CSS with support for dark mode

### 🌐 Deployment Ready
- Easily deployable on platforms like Vercel
- Environment variable support for OpenAI API key, Supabase config, and more

---

## 🛠️ Technologies Used

| Tech           | Purpose                          |
|----------------|----------------------------------|
| Next.js 15     | Frontend & server-side rendering |
| Supabase       | Backend-as-a-Service (DB + Auth) |
| Prisma         | Type-safe ORM for PostgreSQL     |
| Tailwind CSS   | Utility-first CSS styling        |
| shadcn/ui      | Accessible UI components         |
| OpenAI API     | AI text generation / summarization |
| Google Gemini  | (Optional) Free AI alternative   |

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AliAbdullah12347/noteshelperapp
cd noteshelperapp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=your-supabase-postgres-url
OPEN_AI_API_KEY=your-openai-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

If you're using Google Gemini instead of OpenAI, you can adjust the logic in `src/actions/notes.ts` to use Gemini's REST API.

### 4. Run the Development Server

```bash
npm run dev
```

Go to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤖 Switching to Google Gemini (Free AI Alternative)

If you want to avoid OpenAI's billing, you can do what I did:

1. Set up a Google Cloud Project and enable the **Generative Language API**
2. Create an API key and restrict it as needed
3. Replace the OpenAI integration in `src/openai/index.ts` and `src/actions/notes.ts` with Gemini API calls
4. Use `fetch()` with your Gemini API key to get responses (see [Gemini Docs](https://ai.google.dev/gemini-api/docs))

---

## 📁 Project Structure

```bash
.
├── src/
│   ├── actions/        # Server actions (db + AI logic)
│   ├── components/     # Reusable UI components
│   ├── app/            # App router pages
│   ├── lib/            # Supabase + Prisma config
│   ├── openai/         # AI clients (OpenAI or Gemini)
│   └── styles/         # Global styles
├── .env.local          # Environment variables
├── README.md
└── package.json
```

---

## 🧪 TODO / Future Improvements

- Add AI-powered tagging and search
- Save summaries to the database
- Add user authentication and private notes
- Version history for notes
- Rich text editor support (e.g., TipTap or Lexical)

---

## 📜 License

This project is open-source and free to use under the MIT license.

---

## 🧠 Credits

Built by Ali Abdullah as a full-stack project to demonstrate AI-enhanced productivity tools.
