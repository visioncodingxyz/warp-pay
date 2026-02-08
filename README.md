# WarpPay

A next-generation cryptocurrency payment platform built on the Solana blockchain. WarpPay bridges the gap between digital assets and traditional payment systems by enabling users to create virtual payment cards powered by their crypto holdings.

## 🚀 Features

- **Solana Wallet Integration**: Seamlessly connect with Phantom, Solflare, and other popular Solana wallets
- **Virtual Payment Cards**: Generate virtual debit cards linked to your crypto balance
- **Real-time Transactions**: Fast and secure payment processing on the Solana blockchain
- **User Dashboard**: Comprehensive interface to manage your cards, view transactions, and control settings
- **Profile Management**: Customizable user profiles with avatar uploads
- **Transaction History**: Detailed records of all your payment activities
- **Responsive Design**: Beautiful UI built with shadcn/ui components and Tailwind CSS
- **Dark Mode**: Built-in theme support for optimal viewing experience

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.9 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4.1.9
- **Components**: Radix UI primitives + shadcn/ui
- **Icons**: Lucide React

### Blockchain
- **Network**: Solana
- **Wallet Adapters**: 
  - @solana/wallet-adapter-react
  - @solana/wallet-adapter-phantom
  - @solana/wallet-adapter-solflare
- **Web3 SDK**: @solana/web3.js

### Backend & Database
- **Database**: Neon (PostgreSQL)
- **File Storage**: Vercel Blob
- **Analytics**: Vercel Analytics

### Development
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Type Checking**: TypeScript 5

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- A Solana wallet (Phantom, Solflare, etc.)
- Neon database account
- Vercel account (for deployment)

## 🏗️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd warp-pay
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://..."
   
   # Vercel Blob (for file uploads)
   BLOB_READ_WRITE_TOKEN="..."
   
   # Optional: Analytics
   NEXT_PUBLIC_VERCEL_ANALYTICS_ID="..."
   ```

4. **Initialize the database**
   
   Run the SQL scripts in the `scripts/` directory in order:
   ```bash
   # Connect to your Neon database and run:
   # 1. scripts/001_create_users_table.sql
   # 2. scripts/002_add_email_column.sql
   # 3. scripts/003_add_order_date.sql
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
warp-pay/
├── app/                        # Next.js App Router pages
│   ├── api/                    # API routes
│   │   ├── broadcast-transaction/
│   │   ├── process-payment/
│   │   ├── upload-avatar/
│   │   └── users/             # User management endpoints
│   ├── dashboard/             # Dashboard pages
│   │   ├── card/              # Virtual card management
│   │   ├── settings/          # User settings
│   │   └── transactions/      # Transaction history
│   ├── docs/                  # Documentation
│   ├── privacy/               # Privacy policy
│   ├── security/              # Security information
│   ├── terms/                 # Terms of service
│   ├── whitepaper/            # Project whitepaper
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   ├── dashboard/             # Dashboard components
│   ├── docs/                  # Documentation components
│   ├── landing/               # Landing page components
│   ├── legal/                 # Legal pages components
│   ├── modals/                # Modal dialogs
│   ├── providers/             # Context providers
│   ├── ui/                    # Reusable UI components (shadcn/ui)
│   └── whitepaper/            # Whitepaper components
├── hooks/                     # Custom React hooks
├── lib/                       # Utility functions
├── public/                    # Static assets
│   └── images/                # Image files
├── scripts/                   # Database migration scripts
├── styles/                    # Global styles
├── components.json            # shadcn/ui configuration
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies
├── postcss.config.mjs         # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🔌 API Endpoints

### User Management
- `GET /api/users` - Retrieve user by wallet address
- `POST /api/users` - Create new user
- `PUT /api/users/update` - Update user profile
- `DELETE /api/users/delete` - Delete user account
- `GET /api/users/check-username` - Check username availability

### Transactions
- `POST /api/broadcast-transaction` - Broadcast Solana transaction
- `POST /api/process-payment` - Process payment transaction

### Media
- `POST /api/upload-avatar` - Upload user avatar

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components including:

- Accordion, Alert Dialog, Avatar, Badge
- Button, Calendar, Card, Carousel
- Checkbox, Collapsible, Command, Dialog
- Dropdown Menu, Form, Input, Label
- Navigation Menu, Popover, Progress
- Radio Group, Select, Separator, Sheet
- Sidebar, Skeleton, Slider, Switch
- Table, Tabs, Toast, Tooltip
- And many more...

## 🔐 Security Features

- Wallet-based authentication
- Secure transaction signing
- Environment variable protection
- SQL injection prevention
- XSS protection
- CSRF protection via Next.js

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

```bash
pnpm build
```

The application will be built and optimized for production.

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token | Yes |
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | Vercel Analytics ID | No |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 🔗 Contract Address

```
wARPySVJg8c5db7mwDt79BjzkNxXJuV9Jg3TfGrLZM5
```

## 📞 Support

For support, please visit the documentation page or contact the development team.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Powered by [Solana](https://solana.com/)
- Database by [Neon](https://neon.tech/)
- Deployed on [Vercel](https://vercel.com/)

---

**⚡ WarpPay** - Bridging Crypto and Commerce
