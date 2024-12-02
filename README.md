# Meeeeeet

A temporary online meeting web application built with Next.js and LiveKit. Simple, fast, and no registration required.

## What's Cool?

- 6-digit room code, because who needs long URLs
- Video? Check
- Audio? Yep
- Screen sharing? You bet
- Dark mode? Of course (we care about your eyes)

## Development

### Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [LiveKit](https://livekit.io/) - WebRTC SDK
- [Shadcn/ui](https://ui.shadcn.com/) - UI library

### Prerequisites

- [Bun](https://bun.sh/)

    > or you can just use [Node.js](https://nodejs.org/).

- [LiveKit Cloud](https://cloud.livekit.io/)

    sign up for a free account and create a new project to get your API key and secret.

    > you can also use your own LiveKit server.

### Getting Started

1. Clone the repository

    ```bash
    git clone https://github.com/zyx1121/meet.git
    cd meet
    ```

2. Install dependencies

    ```bash
    bun install
    ```

3. Create `.env.local` file

    ```bash
    touch .env.local
    ```

4. Add your LiveKit API key and secret to `.env.local`

    ```env
    LIVEKIT_API_KEY=
    LIVEKIT_API_SECRET=
    NEXT_PUBLIC_LIVEKIT_URL=
    ```

5. Run the development server

    ```bash
    bun run dev
    ```
