---
layout: post
title: "I Built a Read-Only Finance Assistant, and My Own AI Agent Does the Thinking"
description: "A read-only tool that lets an AI agent explain your recurring charges, built with Claude Code, MCP and Plaid's Sandbox, and what I'd tell anyone trying the same."
date: 2026-10-16 12:00:00 -0400
---

*A read-only tool that lets an AI agent explain your recurring charges, built with Claude Code, MCP and Plaid's Sandbox, and what I'd tell anyone trying the same.*

## The idea

I wanted a tool that looks at my bank transactions and tells me things I can act on: which subscriptions I pay for, what changed in my spending, and what looks odd. It had to be safe enough that I would eventually point it at real accounts. So I set a few rules before writing any code.

- **Read-only.** It can look at data. It can never move money.
- **Keep as little as possible.** No stored transactions. Fetch on demand, analyze in memory, return a summary.
- **Let the user's own agent do the reasoning.** The server returns compact, structured summaries. Whatever AI agent you already use does the explaining and the follow-up questions, so I don't pay for model time on every question.

## What it looks like

![Linking a bank through Plaid Link in Sandbox mode](/assets/img/finance-assistant-demo.gif)

![An agent answering "What am I subscribed to?" from the tool's summary](/assets/img/finance-assistant-agent.gif)

The bank connection comes from Plaid, a service that lets apps read a person's bank data without handling their bank password: you log in to your bank in Plaid's own window, and the app receives only read access to the account's transactions. Plaid also offers a Sandbox with fake banks and test data, which is all this project uses.

You sign in, link a bank through Plaid, and connect your agent to the server over MCP, the standard way agents call outside tools. Then you ask in plain language. The tool returns recurring charges with their cadence and yearly cost, price increases, overlapping services, and a few possible renewals. Anything it can't be sure about comes back flagged, so the agent asks you instead of guessing.

## How it's built

It runs on AWS, all serverless, so it costs close to nothing while idle. A small set of functions sit behind an API gateway behind a firewall. A single DynamoDB table holds the user, the linked bank and short-lived summaries. Bank access tokens are encrypted with a dedicated key that only one function can use to decrypt. Infrastructure is defined as code, and every change reaches production through a pull request, tests, a beta stage and a manual promote step.

The web side is a small site for signing in, linking a bank and managing access keys. Sign-in goes through the cloud provider's hosted pages, and the site never sees a password.

## Three things that took more thought than expected

### 1. Finding recurring charges without trusting the data

Plaid can find recurring transactions for you. I wrote my own detector, checked it against Plaid's results on test data, and made it say when it isn't sure. It groups charges by merchant, handles price changes mid-stream, and drops cancelled subscriptions. Real data is messy. In my own test account, loan and credit card payments dominated the "subscription" total until I excluded them, which is the kind of thing a demo shows you and a unit test doesn't.

### 2. Letting agents sign in

MCP clients sign in with OAuth, and no two behave quite the same. One identifies itself with a published document (client ID metadata documents, the newer standard), another registers itself every time it connects (dynamic client registration), and some make an extra request the server has to answer politely. I ended up serving the sign-in metadata (the OAuth discovery documents) myself and adding a consent page, because the hosted sign-in has no step that asks "do you want this app to read your data?" Without it, any page could quietly get a code for a signed-in user. For clients that can't do OAuth, there are revocable keys, shown once and stored only as hashes.

### 3. Caching that quietly lies

Summaries are cached for a day to keep calls cheap. After I fixed the loan-payment problem, the live tool still returned the old answer, because the cache key covered the arguments and the date but not the code version. A deploy that changes the logic needs to invalidate the cache.

## Working with an AI agent

I built most of this with an AI coding agent, one small pull request at a time, and I reviewed and merged every one myself. Four things made that work.

**Set up the guardrails early.** Before the first feature I fixed the rules: read-only access, nothing stored, budget alerts, rate limits, and tests and review on every change. With those in place I could let the agent move fast without worrying about what a mistake could do, because the worst case was already small.

**Keep each task small.** A pull request I can read in one sitting is one I actually review. Each change came with a test for the behavior it added, so I could see what it did and what it didn't.

**Check its claims against the real system.** The agent is fluent and sometimes wrong. It predicted what a fix would do to my yearly recurring total and was off by several thousand dollars, and I only knew because I ran the real call and compared. It also described sign-up as invite-only when it was open. Anything that matters, such as a cost, a security setting or a number, gets checked before I believe it.

**Expect the data to surprise you.** The loan-payment problem and the stale cache both appeared only once the tool ran against realistic data, even test data. Tests prove what you thought of. Running the real thing shows what you didn't.

## What it doesn't do (yet)

- It runs on Plaid's Sandbox test data only. No real accounts are linked.
- Before real data, I'm adding multi-factor sign-in, account and data deletion, a consent step and written security and privacy policies.
- It's a personal project, not a product.

## What I'd do next

Two things, in this order.

- **A chat page for a small invited group.** Right now you need your own agent to use the tools. The chat page would let a few people I invite ask questions in a browser, with the model running on my account. Everyone else keeps using their own agent.
- **Cost controls before anyone else uses my model.** A cap on how long each answer can be, a daily spending ceiling that switches chat off when it's reached, a faster alarm than the monthly budget email, a limit on how many banks one person can link, and a switch I can flip without a deploy. The cache problem above gets fixed here too.
