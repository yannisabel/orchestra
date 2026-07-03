---
name: token-optimization
description: 'Reduce token usage in LLM interactions. Use when working with context limits, reducing costs, or optimizing prompt efficiency. Includes caching strategies, prompt engineering, context management, and workspace exploration techniques.'
argument-hint: "Describe your token optimization goal (e.g., 'reduce context bloat', 'cache frequently used code')"
user-invocable: true
---

# Token Optimization

## When to Use

- Working within strict context window limits
- Reducing API costs or billing
- Improving response latency
- Optimizing prompt efficiency
- Managing large codebases (monorepos, etc.)
- Caching repeated queries or context

## Core Strategies

### 1. Smart Context Collection

**Principle**: Only include context directly relevant to the task.

**Techniques**:

- Use targeted `grep_search` or `semantic_search` instead of reading entire files
- Search with specific patterns rather than broad glob matches
- Read only the lines you need with specific `startLine`/`endLine` ranges
- Parallelize independent read operations in one batch
- Use `vscode_listCodeUsages()` to find symbols without scanning the full file

**Example**:

```typescript
// ❌ Expensive: reads entire file (1000+ lines)
read_file("/path/to/large-file.ts", startLine: 1, endLine: 9999)

// ✅ Efficient: grep specific context (50 lines max)
grep_search("query": "MyClass|MyFunction", maxResults: 5)
```

### 2. Effective Prompting

**Principle**: Say what you need, not what you don't.

**Techniques**:

- Be direct and specific about the task (avoid "can you help me?")
- Include relevant constraints upfront (platform, version, naming conventions)
- Ask for specific output format to avoid clarification loops
- Use examples for complex requirements
- Batch related questions into one prompt (fewer round-trips)

**Example**:

```
❌ "Can you help me with this code?"
✅ "Fix the TypeScript compilation error on line 42 in src/button.ts where
   the return type doesn't match the interface. Keep the existing variable names."
```

### 3. Workspace Exploration

**Principle**: Let the agent discover facts rather than you documenting everything.

**Techniques**:

- Use `runSubagent("Explore", ...)` for read-only exploration (avoids context clutter)
- Let agents search for patterns instead of providing exhaustive file lists
- Point agents to specific directories rather than the full workspace
- Use workspace-relative paths; let tools resolve absolute paths
- Store discovered facts in `/memories/repo/` for reuse

**Example**:

```
Instead of: "I have a TypeScript project with components in src/,
utils in lib/utils/, and tests in __tests__. Can you find..."

Use agent: runSubagent("Explore", "Find all custom React hooks in lib/")
```

### 4. Caching & Reuse

**Principle**: Don't re-ask the same questions.

**Techniques**:

- Use `/memories/repo/` for codebase facts (build commands, file patterns, naming conventions)
- Store solutions to common problems in memory
- Reference memory notes in prompts to avoid re-explaining context
- Use session memory for in-progress task tracking
- Build a shared context library for team-wide knowledge

**Example Memory Entry**:

```markdown
# Build Commands

- Build core: `npm run build --workspace=@orchestra/core`
- Run tests: `npm run test -- packages/core`
- Dev server: `npm run dev`
```

Then reference it: "Building uses `npm run build --workspace=@orchestra/core` (see /memories/repo/build.md)"

### 5. Structured Responses

**Principle**: Get useful output in fewer tokens.

**Techniques**:

- Ask for bullet points, tables, or JSON instead of paragraphs
- Request "only the changed lines" rather than full file rewrites
- Use concise output formats (checklist, diff, summary)
- Ask agents to halt early with `maxResults` or `endLine` boundaries

**Example**:

```
❌ "Explain the full architecture of the component library"
✅ "List the 3 main component categories in bullet format"
```

### 6. Tool Efficiency

**Principle**: Use the right tool for the job.

**Techniques**:

| Task                    | Efficient Tool                     | Avoid                        |
| ----------------------- | ---------------------------------- | ---------------------------- |
| Find code patterns      | `grep_search` + `isRegexp: true`   | reading random files         |
| Search semantically     | `semantic_search` (limited corpus) | reading entire workspace     |
| List file structure     | `list_dir` with specific path      | `file_search` on broad globs |
| Quick symbol lookup     | `vscode_listCodeUsages`            | reading files manually       |
| Explore unfamiliar code | `runSubagent("Explore", ...)`      | chaining file reads          |

## Workflow: Token-Optimized Task

### Step 1: Define the Goal

State clearly what you're trying to accomplish in 1-2 sentences.

### Step 2: Gather Minimal Context

- Use targeted search (grep or semantic) on specific directories
- Read only relevant line ranges
- Parallelize independent reads
- Use subagents for exploration

### Step 3: Formulate Request

- Include constraints (TypeScript, naming, versions)
- Reference memory notes for context
- Ask for specific output format
- Batch related questions

### Step 4: Execute with Focus

- Point tools at specific files/directories
- Use `maxResults` to limit output
- Halt early when enough context is gathered
- Don't wait for complete results if partial info answers the question

### Step 5: Store Learnings

- Document patterns in `/memories/repo/`
- Note build commands, naming conventions, file locations
- Record solutions to common problems

## Quick Wins

### Reduce on every request

- 📌 Use `maxResults: 5` on searches by default
- 📌 Specify line ranges when reading (`startLine`, `endLine`)
- 📌 Describe the task in one sentence
- 📌 Ask for bullet points, not prose

### When working with large files

- 📌 Grep for the function/class first, then read only that range
- 📌 Use `vscode_listCodeUsages()` to find where symbols are used
- 📌 Split the file mentally into sections; target one section

### When exploring unfamiliar code

- 📌 Use `runSubagent("Explore", "description")` to avoid context sprawl
- 📌 Ask the agent for a summary instead of having it list all files
- 📌 Let tools discover patterns; don't document everything upfront

### When iterating on a task

- 📌 Store intermediate facts in `/memories/session/`
- 📌 Reference memory to avoid re-explaining context
- 📌 Build on previous discoveries; don't restart from scratch

## References

- [VS Code Language Server Protocol](https://microsoft.github.io/language-server-protocol/) — Use for symbol lookup, references, definitions
- [Prompt Engineering Best Practices](https://platform.openai.com/docs/guides/prompt-engineering) — General principles for clarity
- [Token Counting](https://github.com/openai/js-tiktoken) — Understand your budget
