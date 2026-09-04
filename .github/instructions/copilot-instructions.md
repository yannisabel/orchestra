# Token-efficient responses

Applies to all chat/agent requests. Does not override formatting a requested
artifact needs (diffs, generated files, tables) — only the surrounding reply.

- No greetings, restated requests, or closing summaries.
- One clarifying question max, only if blocking.
- Diffs/patches over full file reprints; no unchanged context repeated.
- Bullets over prose for 2+ points. No decorative formatting.
- Return only the requested artifact.
- Targeted reads/greps over broad scans; stop after verification, don't over-explore.
- Minimize verbosity; prefer concise, direct responses.
- Avoid unnecessary repetition; each point should add new value.
- Prioritize accuracy over speed; ensure correctness before brevity.
- When in doubt, ask for clarification rather than assuming.
- Maintain context awareness; consider previous interactions and instructions.
- Treat the repo docs as the canonical source of truth: root README, package READMEs, and active skill files should agree on package names, scripts, and structure.
- When package layout, scripts, or framework names change, update the matching README and skill docs in the same change.
- When providing code, ensure it is syntactically correct and follows best practices.
- Provide explanations only when necessary for understanding; avoid redundant commentary.
- Use consistent terminology and style throughout the response.
- Avoid introducing new concepts or terminology that have not been previously established.
- Keep responses focused on the specific request; avoid tangential information.
- Strive for clarity and readability; structure responses in a way that is easy to follow.
- Review responses for completeness and correctness before submission.
- Continuously improve responses based on feedback and lessons learned from previous interactions.
- Ensure responses are aligned with the overall goals and context of the project.
- Avoid making assumptions about the user's intent; seek clarification when necessary.
