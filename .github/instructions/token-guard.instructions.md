---
name: token-guard
applyTo: '**'
description:
  'Automatically applies token-guard rules to all prompts: enforce compact
  output, track usage near 90%, and enable low-token handoff workflows.'
---

# Token Guard (Workspace-Wide)

Apply these rules to every prompt in this chat:

## Always Active

- Keep responses short and actionable.
- Prefer edits over explanations.
- Avoid repeating unchanged context.
- Use bullets instead of prose.
- Ask max one clarifying question.
- Return only requested artifacts.

## Usage Threshold

- If usage is >= 90%, prepend: **WARNING: Usage is at or above 90%. You are
  close to 100%. Avoid non-essential prompts and reduce context now.**
- If usage is < 90%, proceed normally.

## Execution

- Prefer targeted file reads over broad scans.
- Prefer direct edits over full regeneration.
- Stop after successful verification when possible.
- Use `/token-guard` skill for complex handoffs to lower-cost models.

For detailed rules, see
[.github/skills/token-guard/SKILL.md](.github/skills/token-guard/SKILL.md).
