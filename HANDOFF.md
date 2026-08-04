Objective
- Create or update `HANDOFF.md` at the repo root so a lower-cost model can continue the current workspace customization task without re-exploration.

Constraints
- Keep the file short and readable in under a minute.
- Include only the seven required sections in the specified order.
- Do not add unrelated files or sections.
- Touch only `HANDOFF.md`.
- Use exact expected output shape.

Done criteria
- `HANDOFF.md` exists at the repo root.
- It contains the seven sections in the requested order.
- The file is concise and directly actionable.

Minimal file list
- `HANDOFF.md`

Next actions
1. Read `.github/prompts/handoff.prompt.md` to confirm the required handoff format.
2. Create or update `HANDOFF.md` at the repo root.
3. Populate it with the seven required sections only.
4. Save the file.
5. Return a diff for `HANDOFF.md`.

Do-not-do list
- Do not touch files other than `HANDOFF.md`.
- Do not add extra sections, logs, or unrelated content.
- Do not rewrite the repository or add new dependencies.
- Do not include full terminal output or stack traces.

Output format expected from the delegate
- A diff for `HANDOFF.md` only.
