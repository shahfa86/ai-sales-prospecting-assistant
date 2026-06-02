# AI Sales Prospecting Assistant

A simple beginner-friendly Next.js TypeScript app that generates a mock AI-style sales prospecting brief from form inputs.

## What version 1 does

Version 1 keeps everything local in the browser. It does **not** call external APIs, AI services, databases, or backend routes. The generated prospecting brief is mock AI-style output created from simple TypeScript template logic based only on the values entered in the form.

## Setup instructions

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local app URL in your browser:

```text
http://localhost:3000
```

## Available scripts

- `npm run dev` starts the local Next.js development server.
- `npm run build` creates a production build.
- `npm run start` starts the production server after a build.

## Project structure

```text
app/
  globals.css    Global styles for the landing page and form
  layout.tsx     Root layout and metadata
  page.tsx       Landing page, form state, submit handler, and mock output generation
AGENTS.md        Future coding instructions for contributors and agents
README.md        Setup notes and project overview
```
