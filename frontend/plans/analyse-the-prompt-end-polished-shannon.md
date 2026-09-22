# KaushalSetu — Phase 4: Assessment Focus, Nav Cleanup, Passport Gap Filter

## Context

Three focused changes to reduce noise and keep the official view tightly action-oriented:

1. **Assessment page** currently shows all 16 competencies across category tabs — overwhelming for users who just need to know what to validate. Requirement: show only CRITICAL gaps (the ones that actually block role readiness).
2. **Resources nav item** links to the AI Quiz Generator which is an admin/trainer tool, not relevant to working officials. Remove it from the official sidebar.
3. **Capability Passport — Gaps tab** shows all four severity buckets (CRITICAL, HIGH, MEDIUM, LOW). Requirement: show only CRITICAL and MEDIUM; remove HIGH and LOW gap cards.

---

## Change 1 — `src/pages/official/AssessmentHome.tsx`

**What to do:**

- Remove the filter tab bar entirely (All / Gaps / Statistical / Technical / Digital Governance / Behavioural tabs are gone)
- Change the data source: instead of `official.competencyScores` filtered by tab, filter to only competencies that have a CRITICAL gap:
  ```ts
  const criticalGaps = getGapsFor(currentOfficialId, 'CRITICAL');
  const criticalIds = new Set(criticalGaps.map(g => g.competencyId));
  const criticalScores = official.competencyScores.filter(s => criticalIds.has(s.competencyId));
  ```
- Remove the 3-stat summary strip (no longer needed — just show the count inline in the header subtitle or as a plain sentence)
- Update the AI nudge copy to reflect CRITICAL focus: *"These are the competencies most critical to your role. Validating them will have the highest impact on your readiness."*
- Keep the competency card grid (1→2→3 columns) but it now only renders CRITICAL gap cards
- Each card: competency name, category, level bar (current → required), confidence %, evidence count, "Validate & Close Gap" button → `/app/assessment/:compId`
- Empty state: if no CRITICAL gaps, show a success message: *"No critical gaps — your role readiness is strong."* with a button to view the Capability Passport

**Remove:** `useState` for tab, the `FilterTab` type, the `TABS` constant, the tab bar JSX, the summary stat-card strip, `gapCount`/`totalAssessable`/`lowConf` variables, `ProgressBar` import (unused after strip removal), the category filter logic.

**Keep:** `getGapsFor`, `getOfficialById`, `Badge`, `PageHeader`, the card grid layout, the navigate-to-assessment CTA.

---

## Change 2 — `src/layouts/AppLayout.tsx`

**What to do:**

Remove the single `Resources` entry from `OFFICIAL_NAV`:

```ts
// Remove this line:
{ label: 'Resources', labelHi: 'संसाधन', href: '/app/ai-quiz', icon: '📚' },
```

The `/app/ai-quiz` route stays in `App.tsx` (it may be linked from admin or other flows); only the nav entry is removed.

---

## Change 3 — `src/pages/official/CapabilityPassport.tsx`

**What to do:**

The Gaps tab uses a `SEVERITIES` constant to build `gapsByTab`. Change it from all four severities to only CRITICAL and MEDIUM:

```ts
// Before:
const SEVERITIES: GapSeverity[] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

// After:
const SEVERITIES: GapSeverity[] = ['CRITICAL', 'MEDIUM'];
```

The `SEV_CFG` object already has entries for all four severities — no change needed there; the unused HIGH and LOW entries are simply never accessed.

`gapsByTab` already filters out empty buckets (`.filter(g => g.gaps.length > 0)`), so if an official has no CRITICAL or no MEDIUM gaps those sections simply don't render. No other logic changes needed.

---

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/official/AssessmentHome.tsx` | Remove tabs + summary strip; filter to CRITICAL gaps only |
| `src/layouts/AppLayout.tsx` | Remove Resources nav entry (1 line deleted) |
| `src/pages/official/CapabilityPassport.tsx` | Change `SEVERITIES` to `['CRITICAL', 'MEDIUM']` |

**Unchanged:** all data files, routes, context, GapCard, CompetencyRow, Shell, Admin pages.

---

## Verification

1. `/app/assessment` — no tabs visible; only CRITICAL-gap competencies are shown; each card has "Validate & Close Gap" CTA. If official has no critical gaps, success state renders.
2. Official sidebar — no "Resources" link; nav has: Home, Capability Passport, Assessments, Learning Path, Evidence, Role Readiness.
3. `/app/passport` → Gaps tab — only CRITICAL and MEDIUM severity sections render; HIGH and LOW gap cards are gone.
