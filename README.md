# Trench.dev Analytics Dashboard Demo

This React + Next.js demo showcases how to build a user-facing analytics dashboard using
[Trench](https://github.com/FrigadeHQ/trench). 

## Demo

You can see a live demo at: [https://demo.trench.dev](https://demo.trench.dev)

## Getting started

1. Copy `.env.example` to `.env.local` in the root directory of your project and add your Trench server URL, public API key, and private API key.

2. Install the dependencies:

```bash
pnpm install
```

3. Then, start the development server:

```bash
pnpm run dev
```

4. Visit [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

## Working with the code

The most important files are:

- `src/data/trench.ts` - Wrapper around the `trench-js` client.
- `src/app/page.tsx` - The main page of the dashboard.
- `src/app/_components/VisitorsChart.tsx` - The chart on the main page.

**Note:** This example uses React Server Components to allow fetching data from the Trench API on the server. If copying code to a non-RSC React project, you should make sure never to expose your private API key in the client bundle.

## Learn more

For a deeper understanding of the technologies used in this template, check out
the resources listed below:

- [Trench](https://trench.dev) - Trench.dev documentation and website
- [Tremor Raw](https://raw.tremor.so) - Tremor Raw documentation
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework
- [Next.js](https://nextjs.org/docs) - Next.js documentation
- [Radix UI](https://www.radix-ui.com) - Radix UI Website
- [Recharts](https://recharts.org) - Recharts documentation and website
