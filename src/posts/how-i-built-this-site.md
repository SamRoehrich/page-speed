# How I built this site.

## A short history lesson

I have worked with Next.js and Vercel for _years_. Starting in 2018, or what I (and probably most) consider the Golden Age for React. `Context`
was new and cool and exciting. I was watching Kent C. Dodds React course and thought "there is nothing I can't build.
I have everything I could ever need." And to some degree that was true.

`getStaticProps` was the best we had for SSR in React.

No one _really_ used Next.js as a SSR framework. It was mainly a fancy routing library for client side apps. And that was fine.

Then, VC money... VC money changed it all. And while that may sound negative, and to some degree it is, it has really changed things.
Some for the better and some for the worse.

Some call it the "messy middle" or "a mid life crisis". I think those of us in the industry call it "Server Components". Server Components
did not receive a warm welcome. I'll never forget being at Reactathon in SF in 2023 when Tanner Linsley responded to Theo Browne's question
"How do we live in this new world?" and Tanner responded (if you allow me to paraphrase) "We should switch frameworks."

The room fell very silent.

Obviously, Tanner has a diferent tone and supports Server Components via Tanstack Start. So we did not all switch frameworks.

Thank god.

## TLDR

It is a Bun server server rendering React on a small EC2 instance.

## TL(did)R

I feel like I should not be able to do this, like I am in on some secret no one else knows.

This is my `package.json`

```json
{
  "name": "site",
  "type": "module",
  "module": "index.tsx",
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/bun": "1.2.5"
    "@types/react-dom": "^19.0.4",
    "bun-plugin-tailwind": "^0.0.15",
  },
  "peerDependencies": {
    "typescript": "^5.0.0"
  },
  "scripts": {
    "prestart": "bun build index.tsx --outdir ./dist --target bun",
    "start": "bun run ./dist/index.js",
    "dev": "bun run --watch index.tsx"
  }
}
```

There really is not much going on. And that is mostly because of Server Components.
