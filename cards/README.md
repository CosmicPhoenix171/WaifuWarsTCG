# Card Data Directory

Modular, searchable card files. Each card is a single JSON document kept in a taxonomy path:

```
cards/
  waifus/<archetype>/...        Waifu card JSON; store art files beside it
  supports/<category>/...       Support card JSON; store art files beside it
  traps/<category>/...          Trap card JSON; store art files beside it
  schema/                       JSON Schemas for validation
  index/                        Auto-generated indexes (by id, tag, archetype)
  tools/                        Helper scripts (index builder, validator)
```

## File Naming Conventions
- Use `kebab-case.json` (e.g. `fiery-tsundere.json`).
- Prefix variants with the base id + `--alt` (e.g. `fiery-tsundere--extreme-art.json`).
- Keep one card per file; never batch.

## Card JSON Shape
See `schema/card.schema.json` for full validation. Condensed view:
```jsonc
{
  "id": "fiery-tsundere",
  "type": "waifu" | "support" | "trap",
  "archetype": "Tsundere",              // waifu only
  "affection": 8,                        // waifu only (HP)
  "bonds": { "start": 0, "max": 12 },  // waifu only
  "mood": { "thresholds": { "dere": 5, "extreme": 10 } },
  "rarity": "common|uncommon|rare|mythic",
  "cost": 2,                             // supports/traps may use cost
  "tags": ["control", "burst"],
  "text": "Rules text with {BOND} placeholders",
  "effects": [                           // structured effect steps
    {
      "when": "onSummon|onAttack|activated|trapTrigger",
      "cost": { "bonds": 1 },          // optional cost payment
      "do": [ { "type": "damage", "target": "opponentWaifu", "amount": 2 } ]
    }
  ],
  "flavor": "Optional flavor string.",
  "art": { "default": "cards/waifus/tsundere/fiery-tsundere-default.png" },
  "version": 1
}
```

## Searching & Editing
- Grep by `"id":` to jump straight to a card.
- Filter by `"archetype":` or `"tags":` using search tools.
- Index builder produces `index/all.json`, `index/by-archetype/<archetype>.json`, `index/by-tag/<tag>.json`.
- Keep art files next to the JSON (e.g., `cards/waifus/tsundere/fiery-tsundere-default.png`).

## Adding a Card
1. Copy a template from `tools/templates/{type}.json`.
2. Choose unique `id` (lowercase letters, dashes only).
3. Run the validator script (todo) to ensure schema compliance.
4. Run index builder to regenerate indexes.

## Placeholder Tokens
- `{BOND}` dynamic value replaced by current bond points.
- `{MOOD}` replaced by current mood state.
- `{AFFECTION}` replaced by current affection HP.

## Versioning
- Increment `version` when any functional change (stats, effects) occurs.
- Optional: maintain a `changelog/fiery-tsundere.md` for major redesigns.

## Art Workflow
- Drop final renders alongside the card JSON using descriptive filenames (`<card-id>-default.png`, `<card-id>-extreme.png`, etc.).
- Reference those files through the card's `art` map (e.g., `"default": "cards/waifus/tsundere/fiery-tsundere-default.png"`).
- Consider Git LFS for large binaries; keep low-res placeholders otherwise.

---
Maintain consistency; small, isolated files keep merges clean and reviews fast.
