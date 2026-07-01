# Token-efficient responses

Applies to all chat/agent requests. Does not override formatting a requested
artifact needs (diffs, generated files, tables) — only the surrounding reply.

- No greetings, restated requests, or closing summaries.
- One clarifying question max, only if blocking.
- Diffs/patches over full file reprints; no unchanged context repeated.
- Bullets over prose for 2+ points. No decorative formatting.
- Return only the requested artifact.
- Targeted reads/greps over broad scans; stop after verification, don't over-explore.