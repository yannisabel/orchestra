---
name: token-guard
description:
  'Use when the user asks to reduce token usage, enforce compact prompting,
  track usage percent, or warn near quota. Includes a 90% threshold warning and
  low-token handoff workflow.'
---

# Token Guard

Purpose: minimize LLM token usage while preserving task quality.

## Trigger Conditions

Use this skill when requests mention:

- token limits
- prompt compression
- context trimming
- budget/usage quotas
- low-cost model handoff

## Core Rules

1. Keep responses compact by default.
2. Ask at most one clarifying question only if strictly required.
3. Prefer edits over long explanations.
4. Avoid repeating unchanged context.
5. Summarize with bullets, not long prose.
6. Return only requested artifacts.
7. Do not include decorative formatting unless asked.

## 90% Usage Threshold Rule

If provided usage is >= 90%, prepend this warning line exactly:

WARNING: Usage is at or above 90%. You are close to 100%. Avoid non-essential
prompts and reduce context now.

If provided usage is < 90%, no warning is required.

If usage is unknown, ask for a single numeric estimate in percent and continue
with conservative output size.

## Prompt Compression Strategy

Before solving, compress the task into:

- objective: one sentence
- constraints: max five bullets
- inputs: only files/symbols needed
- output contract: exact expected format

When rewriting user prompts for efficiency:

- remove greetings and narrative text
- remove duplicate constraints
- replace paragraphs with key-value bullets
- keep only relevant file paths and symbols

## Low-Token Execution Defaults

- Prefer shortest valid command sequence.
- Prefer targeted reads over broad scans.
- Prefer direct patch edits over regenerating full files.
- When possible, stop after successful verification.

## Handoff Workflow

When work should be delegated to a lower-cost model, create or update a handoff
document using `HANDOFF.md` in this skill folder.

Handoff requirements:

- include objective, constraints, done criteria
- include minimal file list with line anchors if known
- include exact next actions (max 5)
- include explicit do-not-do list
- include output format expected from the delegate

Do not include full logs unless essential.

## Output Style For This Skill

- Keep answers short and actionable.
- Put risks/blockers in one section.
- Put next action in one line.
