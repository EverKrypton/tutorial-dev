# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router) + TypeScript, CSS written by hand, content in JSON and HTML files under `content/`, deployed on Vercel from GitHub (`EverKrypton/tutorial-dev`). Migrated from a static HTML site; the URLs `/curso/<slug>`, `/ejemplos`, `/diseno` and the PDF path are part of the product.

## Users

One primary user: a complete beginner who wants to build and publish a website and has never used a terminal, Git, or an AI coding agent. They arrive from a link sent by a friend who is a working developer. They read on a phone first, often late, in short sessions, and they need to know within seconds that this is a real course and not a blog post.

Secondary user: the friend who sent it, who scans the syllabus to judge whether the material is serious before recommending it further.

## Product Purpose

An open Spanish-language course that takes someone from "I don't know where to start" to a published URL, while explaining the why at each step. Success means the reader finishes with a public site, a repository, and the ability to use AI tooling without depending on it blindly.

## Positioning

It teaches the mechanism, not just the recipe. Every chapter pairs the concept with something the reader can see working, and the AI chapters explain the harness, the model, the permissions and the failure modes instead of selling prompts. The site itself is built the way it teaches: hand-written HTML and CSS, mobile first, no framework, open source.

## Constraints

- Spanish (neutral, tuteo). No invented credentials, testimonials, prices, or benchmarks.
- Static hosting: no server, no database, no build step.
- Mobile first is a hard requirement: 360 px is the design target, larger screens add.
- Accessibility: keyboard operable, visible focus, contrast, reduced motion respected.
- Content must stay readable without JavaScript.

## Evidence

The repository itself is the proof: the app, the content files, the print pipeline that generates the PDF from the same content, and a `skills/` folder with real design skills as reading material. The examples gallery is built with the same CSS as the site, so the patterns taught are the patterns used.
