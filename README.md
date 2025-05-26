# HR Dashboard

HR dashboard application built with Next.js, featuring employee management, authentication, and responsive design.

## Features

- **Employee Management**: View, filter, and paginate through employee data
- **Individual Employee Profiles**: Click on any employee to view detailed information
- **Authentication**: Secure login with GitHub and Google OAuth
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Data Fetching**: Custom hooks for efficient data management
- **Pagination**: Browse through employee data with 10 entries per page
- **Search & Filter**: Filter employees by email and other criteria

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: NextAuth.js with GitHub and Google providers
- **Data Source**: DummyJSON API for employee data
- **TypeScript**: Full type safety throughout the application
- **State Management**: React hooks and custom data fetching hooks

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Git](https://git-scm.com/)
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/hr-dashboard.git
   cd hr-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add your authentication providers:

   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret

   # GitHub OAuth
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret

   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### Setting up OAuth Providers

#### GitHub OAuth

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
3. Copy the Client ID and Client Secret to your `.env.local` file

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client IDs
5. Set the authorized redirect URI to: `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env.local` file

## Project Structure

```
hr-dashboard/
├── app/                    # Next.js App Router
│   ├── auth.ts            # NextAuth configuration
│   ├── dashboard/         # Main dashboard page
│   ├── Employee/[id]/     # Dynamic employee detail pages
│   ├── sign-in/           # Authentication pages
│   └── api/auth/          # Authentication API routes
├── components/            # Reusable UI components
│   ├── employeeCard.tsx   # Employee table component
│   ├── navbar.tsx         # Navigation component
│   └── ui/                # shadcn/ui components
├── Hooks/                 # Custom React hooks
│   └── useEmployee.ts     # Employee data fetching hook
└── lib/                   # Utility functions
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## Usage

1. **Sign In**: Use the "Sign In" button to authenticate with GitHub or Google
2. **Dashboard**: View all employees in a paginated table format
3. **Employee Details**: Click on any employee row to view detailed information
4. **Navigation**: Use the navbar to navigate between different sections
5. **Filtering**: Use the email filter to search for specific employees

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [NextAuth.js Documentation](https://next-auth.js.org/) - authentication for Next.js
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - utility-first CSS framework
- [shadcn/ui Documentation](https://ui.shadcn.com/) - re-usable components built with Radix UI

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Don't forget to add your environment variables to the Vercel dashboard before deploying.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
