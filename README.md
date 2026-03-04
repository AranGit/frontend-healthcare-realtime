## Real-Time Healthcare Registration System

A high-performance, real-time synchronization system connecting Patient Registration Forms with a Staff Monitoring Dashboard. Built with Next.js 16+, TypeScript, and Pusher, this project demonstrates advanced form handling, live state synchronization, and strict type safety.

## Key Features

Real-Time Synchronization
Live Data Feed: Every keystroke is synchronized from the Patient form to the Staff dashboard using Pusher Channels.
Granular Status Tracking:

- Active/Typing: Shows exactly which field the patient is currently focusing on (e.g. display pencil icon on the field is editing with typing badge).
- Idle: Triggered when the user hasn't interacted for a set period.
- Inactive: Detected via the Visibility API when the user switches browser tabs.
- Submitted: Final state once the form passes validation and is sent.

## Advanced Form Logic

Automated UI Indicators: Red asterisks (\*) and (Optional) labels are generated dynamically by inspecting the Zod Schema. No manual labeling required.
Smart Validation: Powered by React Hook Form and Zod, featuring complex nested object validation.

## Optimized Data Flow with Debounce

To ensure high performance and minimize Pusher API usage, I've implemented Debounce logic for data synchronization. Unlike a standard setTimeout, debounce strategy:
Groups updates: It cancels previous pending sync requests if a new keystroke occurs within xxx ms.
Reduces Network Latency: Only sends the final state of the input field after the user pauses typing.
Enhances Staff Experience: Prevents the dashboard UI from flickering due to rapid, incremental data updates.

## Tech Stack

Framework: Next.js 16+ (App Router)
Language: TypeScript
Real-Time: Pusher
Form Management: React Hook Form
Schema Validation: Zod
Styling: Tailwind CSS

## Environment Configuration

# Pusher Client (Public)

NEXT_PUBLIC_PUSHER_KEY="your_key"
NEXT_PUBLIC_PUSHER_CLUSTER="your_cluster"

# Pusher Server (Private)

PUSHER_APP_ID="your_app_id"
PUSHER_SECRET="your_secret"

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the portal menus.

# Patient Portal:

[http://localhost:3000/patient](http://localhost:3000/patient)

# Staff Dashboard:

[http://localhost:3000/staff](http://localhost:3000/staff)
