# Recipes App (Frontend)

A web interface built with **React** and **Next.js** to interact with the
[RecipesAPI](https://github.com/Joao-sl/RecipesAPI), allowing users to browse, create, edit, and
share recipes in a responsive, modern site.

## 🚀 Main Features

- **Recipe Listing** Display public recipes in a grid or list view with lazy-loading.

- **Recipe CRUD** Create, update, and delete recipes via forms with real-time validation.

- **Authentication & Protected Routes** User login/registration via JWT; protected pages for
  creating/editing.

- **Search & Filters** Search by title or category.

- **Image Upload** Preview cover images before upload using `next/image` + API.

## 🛠️ Tech Stack

- **Framework**: Next.js (React 18+)
- **Styling**: Tailwind CSS
- **Auth**: JWT
- **State Management**: React Query for data caching
- **Forms**: Zod for validation

## 💻 Local Development

### Prerequisites

- Node.js 16+
- npm or yarn
- [RecipesAPI](https://github.com/Joao-sl/RecipesAPI) backend running at `http://localhost:8000`

### Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/Joao-sl/Recipes-Frontend.git
   cd recipes-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Create `.env.local` file:

   ```
   Follow the instructions in .env-example to populate .env.local
   ```

4. Start dev server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open http://localhost:3000 in your browser.

## 📦 Useful Scripts

```bash
npm run build  # Create production build
npm run start  # Serve production build
npm run lint   # Run ESLint
npm run format # Run Prettier
```

## 📄 Documentation

- **API Swagger**: `http://localhost:8000/api/schema/swagger-ui/`

## 📄 License

This project is licensed under the [MIT License](LICENSE).
