---
agent: agent
description: 'Generate or update HANDOFF.md so remaining work can be delegated to a lower-cost model.'
---
Create or update `HANDOFF.md` at the repo root so the current task can be
picked up by a cheaper/lower-context model with no re-exploration.

Include, in this order, and nothing else:
1. **Objective** — one sentence.
2. **Constraints** — max 5 bullets.
3. **Done criteria** — how the delegate knows it's finished.
4. **Minimal file list** — only files that must be touched, with line
  anchors if known (`path:line`).
5. **Next actions** — max 5, in exact execution order.
6. **Do-not-do list** — explicit anti-goals (e.g. "do not touch auth.ts",
  "do not add new dependencies").
7. **Output format expected from the delegate** — exact shape of what they
  should return (diff, PR description, test output, etc.).

Do not include full logs, stack traces, or terminal output unless a specific
line is essential to a next action — summarize instead. Keep the whole file
short enough to read in under a minute.