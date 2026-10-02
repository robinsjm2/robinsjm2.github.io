---
layout: page
title: Projects
permalink: /projects/
---

## Job search harness

An operating model for running a job search as two-week sprints with an AI agent, using MCP to connect Gmail, Indeed, and Tyme. Personal data stays in a private directory; the public repos hold only process and skills. Includes a fictional demo profile and mock services so it can run without real data.

[jobsearch-harness on GitHub](https://github.com/robinsjm2/jobsearch-harness) · [Read the write-up]({% post_url 2026-10-02-building-a-job-search-harness %})

![job-search-sweep demo](https://raw.githubusercontent.com/robinsjm2/jobsearch-harness/main/docs/media/job-search-sweep.gif)

## Agent skills

Reusable skills for AI agents: reviewing job alerts and application replies in Gmail, searching and verifying new postings, and tailoring a resume to a posting using only a verified fact bank.

[agent-skills on GitHub](https://github.com/robinsjm2/agent-skills)

![application status demo](https://raw.githubusercontent.com/robinsjm2/jobsearch-harness/main/docs/media/application-status.gif)

## Earlier work: The Sanford Guide digital platform

From 2011 to 2021 at Antimicrobial Therapy, Inc., I took *The Sanford Guide to Antimicrobial Therapy*, a print clinical reference used by physicians, and built the platform that delivered it digitally. I shipped regular content updates for about ten years, to roughly 150,000 regular users by app telemetry alone.

- **Platform:** extended the Plone CMS (Python) with editorial review workflows, cross-platform content packaging, tunable search, and translator workflows; wrote the iOS and Android apps, which pulled regular content updates from the delivery system.
- **Integrations and licensing:** built the licensing and subscription APIs, served as the point of contact for about 100 institutional licenses with hospitals, universities, and government bodies, and integrated with hospital systems through a simplified HL7 Infobutton.
- **Partners:** reused the platform for further titles and for medical societies that sought it out, including the European AIDS Clinical Society and the Infectious Diseases Society of America, working with clinicians to turn on-page formulas and algorithms into interactive tools.
- **Team:** as the work grew, I led the team, helped hire, and mentored the iOS, Android, and PHP developers through modernizing the apps and the subscription platform. I also moved hosting from colocated servers to AWS.

