<div align="center">
<img alt="Sloan, the sloth mascot" width="120px" src="https://thefullstack.network/assets/icons/thefullstack-circle.webp">
  <br>
  <h1>The Full Stack</h1>
</div>
<br>

The Full Stack platform consists of a React (NextJS) webapp that connects
to many different microservices, such as a projects service, profile service,
search service, connections service etc. to name a few. There are also
integrations with third parties such as Firebase (for auth), Firestore, Knock
(notifications) and many cloud functions. Currently, we have made the webapp
open source. We are in the process of creating The Full Stack API platform
for developers to build their own apps on top of The Full Stack API.

The Full Stack is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Get running locally

1. Clone this repo

2. Rename the .env.sample to .env

3. Update configurations in .env _(Note: we are working on sandbox env VARS to run a local env)_

4. Install the dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see
the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are
treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead
of React pages. When deployed to Vercel, these are run as Serverless functions.

## Production Deployment

This app is deployed to the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) via GitHub.

## Removing bloat

Run the following command to scan the repo for unused componenets, routes, etc.
and output resulting files that can be removed. Whilst its relatively safe,
review the outputted list is worth a quick double check.

```bash
node scripts/detect-unused.js
```

## How can I contribute?

There are many ways to contribute to The Full Stack and we really encourage it.
You can contribute by:

- Sharing an idea
- Refactoring
- Reporting a bug
- Creating a PR
- Improving docs
- Joining the discussion

For more, check out our [Contributing Guide](CONTRIBUTING.md). If you need help,
feel free to reach out to anyone on the [core team](#core-team).

Any questions, please reach out to the core team.

<br>

<p align="center">
  <br>
  <strong>Happy Coding</strong> ❤️
</p>
