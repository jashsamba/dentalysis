# Dentalysis - Dental Practice Management System

## Overview

Dentalysis is a comprehensive dental practice management solution designed to streamline patient management, appointment scheduling, treatment planning, and secure patient records. This web application provides a modern, responsive interface with both light and dark mode support to accommodate users working at different times of the day.

## Concept

The core concept of Dentalysis is to provide dental practices with an all-in-one solution that simplifies their daily operations. The system aims to:

- **Improve Patient Management**: Easily store, retrieve, and manage patient information
- **Streamline Scheduling**: Efficiently manage appointments and reduce no-shows
- **Enhance Treatment Planning**: Create and track comprehensive treatment plans
- **Secure Data**: Maintain patient records with industry-standard security measures
- **Optimize User Experience**: Provide an intuitive interface that works across all devices

## Features

- **Authentication System**:
  - Email/password sign-in and registration
  - Social authentication options
  - Secure authentication flow using Supabase
- **Responsive Design**:
  - Mobile-first approach
  - Works seamlessly on phones, tablets, and desktops
- **Theme Support**:
  - Light and dark mode toggle
  - System preference detection
- **Modern UI**:
  - Clean, professional interface
  - Blue-based color scheme appropriate for dental practices
  - Accessible components

## Technology Stack

- **Frontend**:
  - Next.js 14 (App Router)
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
- **Backend**:
  - Next.js Server Actions
  - Supabase for authentication and database
- **Deployment**:
  - Vercel

## Folder Structure

\`\`\`
dentalysis/
├── app/ # Next.js App Router
│ ├── auth/ # Authentication routes
│ │ ├── actions.ts # Server actions for auth
│ │ └── page.tsx # Sign-in/Sign-up page
│ ├── dashboard/ # Dashboard (to be implemented)
│ ├── globals.css # Global styles
│ └── layout.tsx # Root layout with theme provider
├── components/ # Reusable components
│ ├── ui/ # shadcn/ui components
│ └── theme-toggle.tsx # Dark/light mode toggle
├── lib/ # Utility functions
│ └── utils.ts # Helper functions
├── public/ # Static assets
├── .env.local # Environment variables (not in repo)
├── next.config.mjs # Next.js configuration
├── package.json # Dependencies
├── README.md # Project documentation
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json # TypeScript configuration
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/dentalysis.git
   cd dentalysis
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install

   # or

   yarn install
   \`\`\`

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev

   # or

   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Authentication Flow

The authentication system uses Supabase Auth and includes:

1. **Sign Up**:

   - User enters their information (name, email, password)
   - Server validates the information
   - Supabase creates a new user account
   - Verification email is sent to the user

2. **Sign In**:

   - User enters email and password
   - Server authenticates with Supabase
   - On success, user is redirected to the dashboard

3. **Theme Preferences**:
   - User can toggle between light and dark mode
   - Preference is saved to local storage

## Future Enhancements

- Patient management system
- Appointment scheduling
- Treatment planning tools
- Billing and invoicing
- Reporting and analytics
- Mobile application

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
