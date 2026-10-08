---
layout: post
title: "Vibe Coding on Your Own Dime: How to Be Economical with Tokens"
description: "What burned tokens on a new side project, and the settings that fixed it."
date: 2026-10-08 12:00:00 -0400
---

*What burned tokens on a new side project, and the settings that fixed it.*

**TL;DR**

- **Choose the model on purpose.** Use the biggest one for hard problems only, and pick it at the start of a session: switching mid-session throws away the cache.
- **Default to medium effort.** Save high effort for real design and debugging questions.
- **Don't pay to see diffs twice.** Tell the agent not to reprint diffs and summaries; review changes in your IDE.
- **Keep your instruction files short.** Files like `CLAUDE.md` are sent to the model with every message, not read once. Put a one-line pointer to reference docs instead of pasting them in.
- **One task per session.** Long sessions get more expensive with every turn; `/clear` between tasks and keep big tool output out.
- **Do this even when your company pays.** The bill is real, lean turns are faster, and habits travel.

---

Quick question: do you know what your last AI coding session cost?

If an enterprise license pays for your AI coding tools, you probably don't, and you've never had a reason to. Once you vibe code on your own budget, the math changes: every turn has a price, and habits that felt free at work start showing up on the bill. And here's the part which deserves real consideration, even if you never pay a cent yourself: those habits weren't free at work either. Someone was paying for them.

I ran into this firsthand this week, building my next side project with Claude Code on my own account. (I'll show it next week, when it's finished.) What surprised me wasn't one big mistake. It was a few defaults I brought with me and never questioned, each one quietly multiplying the cost of every turn.

## 1. I was using the biggest model for everything

I normally work with Opus 4.8. This week I was on Opus 5.5 without really choosing it, and used it for everything: architecture discussions, but also renaming a stack, fixing a lint error, and writing commit messages. A bigger model is worth it when the problem is hard. Most of a build session is small, well-defined edits where a smaller model gives the same answer for less.

**What I changed:** my default is back to the model I'd normally use, and I bump up deliberately when a task needs it, rather than paying the top rate for routine work by accident.

## 2. Effort was set to high when medium was enough

**Effort** controls how much the agent reasons before answering. High effort means more thinking on every turn, including the turns where there's nothing to think about. For most of this work, medium gave me the same result.

**What I changed:** medium by default; high only when I'm about to ask a genuinely hard question.

## 3. The agent was showing me diffs I could already see

After every change, the agent printed the diff in the terminal and followed it with a long summary. But my IDE's **source control pane already shows every change**, highlighted, for free. Output is the most expensive part of a turn, and it was being spent on duplication.

**What I changed:** I added standing instructions: rules the agent receives at the start of every session without my having to repeat them, such as profile preferences in claude.ai or a `CLAUDE.md` file in Claude Code. Mine say: no diffs or code blocks longer than three lines unless I ask, explain changes in plain English with file and line references, and skip the greetings and wrap-up summaries. The agent still edits files directly; the instructions only cut what gets echoed back to me, and I review every change in the tool built for reviewing changes.

## 4. Instructions aren't free either

One detail I had to look up: the model has no memory between turns, so every message carries the whole context with it: the system prompt, your instructions, the conversation so far, and your new message. Your instructions are input tokens on *every* turn. Prompt caching bills the unchanging start of that context at a fraction of the normal rate, so a few lines that stop reprinted diffs pay for themselves. But **shorter is better**, so I distilled my first, longer version down to four bullets in my global `CLAUDE.md`.

Three related lessons:

- **Pick your model at the start of a session.** The cache is tied to the model, so switching mid-session means the next turn rereads the whole conversation at full price. Editing `CLAUDE.md` or adding an MCP server mid-session does the same.
- **Index, don't inline.** Rather than pasting reference material into your instructions, keep a one-line pointer that says what's there and when it matters, and let the agent read the file only when the task calls for it. Note that an `@` import in `CLAUDE.md` isn't a pointer: it pulls the whole file into every session.
- **A skill isn't cheaper for an always-on rule.** A skill loads only when invoked, but then it rides along on every turn just like `CLAUDE.md`, and it's off whenever you forget to run it. Skills suit long instructions you only need sometimes.

## 5. Long sessions cost more than you think

If every turn resends the whole conversation, turn 50 pays for turns 1 through 49 again, so a session's total grows much faster than its length. Your own messages are rarely the problem. **Tool output is:** every file read, test log, and command result stays in the context and gets resent on every turn after it.

Compacting earlier helps less than you'd think: it reads the whole context to write a summary and starts the cache over. Three habits do more:

- **One task per session.** Start fresh with `/clear` when you move to unrelated work. I keep one task per pull request, so a session can end when its pull request does.
- **Compact by hand at natural breaks**, and say what to keep: "keep the decisions and open issues; drop the debugging."
- **Keep big output out of the conversation.** Ask for the relevant lines, not whole files or full logs.

## Should you be this frugal when the company pays?

I think so:

- **The bill is real; it's just not yours.** As usage grows, someone will eventually ask what it's buying.
- **Lean turns are faster turns.** A bigger model at high effort is slower, and a reprinted diff is one more thing to scroll past.
- **Habits travel.** The defaults you build on a company license come with you to your side projects, your next job, or your own startup. Mine did.

None of this means rationing the agent. Use the big model and high effort when the problem calls for it. Just make it a choice instead of a default.

## What's next

Next week I'll show what I've been building, and what it was like to build most of it through conversation with an agent, on a much leaner token budget than this week's.

In the meantime, here's the question I'd leave you with, whoever's paying: **how else can I guard my token usage?** I've shared mine. I'd like to hear yours: settings, instructions, or habits that cut your spend without slowing you down.
