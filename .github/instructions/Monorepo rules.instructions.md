---
description: "Copilot guide: tcp-v3 monorepo"
applyTo: '**'
---

A quick reference for working inside this pnpm monorepo with Copilot/agents.

## Layout
- Root workspace managed by pnpm, see `pnpm-workspace.yaml`.
- Packages live in:
  - `apps/*` — runnable apps (admin, platform)
  - `packages/*` — shared libraries (backend, etc.)

## Package management
- Always use `pnpm` for package management
- Versions are centralized via pnpm “catalog” in `pnpm-workspace.yaml`.
  - Prefer declaring deps as "catalog:" in each package’s `package.json`.
  - Only put deps in the root if truly shared tooling for the whole repo.
- Add or run in a specific package using filters:
  - Add: `pnpm --filter <pkg> add [-D] <dep>`
  - Run: `pnpm --filter <pkg> run <script>` or `pnpm --filter <pkg> exec <bin>`
- Internal packages use `workspace:*` ranges when referenced.

## Adding a dependency
1) If it should be version-controlled via catalog, add/ensure its exact version is pinned in `pnpm-workspace.yaml` under `catalog:`.
2) Add it to the target package’s `package.json` as "catalog:" (or normal semver if not catalog-managed).
3) Install: `pnpm -w install` or `pnpm --filter <pkg> install`.

## Conventions
- File naming: always prefer strictly `kebab-case` for filenames, unless the files require a certain format to work (ex. tests will be `*.spec.*`)

## Do/Don’t
- Do localize tooling deps (like Playwright) to the package that uses them.
- Do use `catalog:` across packages for consistent versions.
- Don’t add app-specific deps to the root.
- Don’t bypass `--filter`; always operate in the intended package.
