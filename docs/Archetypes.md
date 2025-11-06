# Personality-Based Archetypes

Core concept: each "dere" becomes a gameplay archetype that defines a card's behavior, strengths, and weaknesses — emotional affinities that shape playstyle and interactions.

## 1. Core Dere Archetypes (Gameplay Types)

| Type | Theme | Playstyle Concept | Sample Effect |
|------|-------|-------------------|---------------|
| Tsundere | Anger & denial | High damage when provoked, slow to start | Gains ATK when taking damage or insulted |
| Yandere | Obsession & devotion | Sacrifice HP or allies for huge power | Can destroy a bonded "love interest" card instantly once bonded |
| Deredere | Pure affection | Buffs allies, heals, builds morale | Heals nearby allies or restores Affection Points (AP) each turn |
| Dandere | Shy & quiet | Defensive / stealth-based | Starts hidden/untargetable and gains power when revealing |
| Kuudere | Calm & logical | Counters / negation | Immune to "Charm" or "Fluster" attacks; cancels emotional effects |
| Himedere | Proud & regal | Demands tribute / leader-focused | Gets stronger if treated as the "leader" of your field |
| Yangire | Unstable rage | Unpredictable high risk/high reward | 50% chance to attack self or double-damage the enemy |
| Kamidere | God complex | Field control / command power | Can issue "commands" to force others to obey actions |

> Note: genre-flavored identities (Genki, Childhood Friend, Magical Girl, Student Council President, etc.) are still valid labels and can map to the above dere playstyles for balance and identity.

---

## 2. Relationship Meter / Affection Points (AP)

- Affection Points (AP): numeric meter on waifu cards (and optionally on players) representing emotional bond strength.
- AP is earned from actions (summons, heals, bonded attacks, playing Bond Cards) and spent to activate skills (Confession, Meltdown) or create bonds.
- Compatibility Bonuses: archetype pairings grant passive bonuses; some pairings clash and can create penalties.

Example rules:
- Gain AP: +1 AP when a bonded ally deals damage; +2 AP when a Bond Card is played; +1 AP on heal.
- AP thresholds: 5 AP = Minor Skill, 10 AP = Major Skill/Confession, 15+ AP = Extreme State available.

Note on terminology: "Affection" is now used in two related ways across the design documents:

- Affection (card stat): the per-waifu Affection value acting as the unit's HP. When Affection reaches 0 the waifu is discarded.
- Affection Points (AP): a separate bond meter used for relationships, confessions, and mood-state triggers. AP is not the same as the per-card Affection stat.

Keep the distinction in implementation (e.g., `card.affection` vs `card.emotional.ap`).

---

## 3. Relationship Mechanics

- Bond Cards: Support cards that create a bond (love, rivalry, mentorship) between two waifus. Bonds unlock shared effects and let archetypes interact (e.g., Yandere marks a bond target).
- Mood Swings: Triggers (losing a bonded card, taking damage, rival appearance) cause mood/state changes (Neutral → Dere → Extreme), altering abilities and AI behavior.
- Confession Events: When two bonded characters reach AP thresholds, trigger a Confession Phase to grant large bonuses, unlock a one-time powerful effect, or progress story-like outcomes.

---

## 4. Deck-Building System by Archetype

Each dere type encourages specific deck identities and synergies:

- Tsundere: Reaction-based counterplay — "Gain +2 ATK when attacked or insulted." 
- Yandere: Aggro/sacrifice — "If this card destroys another, gain +3 AP."
- Deredere: Support/heal — "Heal an ally by 2 AP each turn."
- Kuudere: Control/negation — "Cancel one emotional attack per turn."
- Dandere: Stealth/defense — "Hidden until attacked; counter with 2× power."
- Himedere: Leader-synergy — "All allies gain +1 ATK while this is active."
- Yangire: High variance RNG burst decks.
- Kamidere: Command/control decks.

Suggested deck construction rules:
- Faction Bonus: Include 10+ cards of same dere to unlock a faction passive (e.g., +1 AP per turn).
- Bond Slots: Decks may include up to 3 Bond Cards enabling pair synergies when played.

---

## 5. Emotional States (Advanced Mechanic)

- States: Neutral → Dere → Extreme (e.g., Tsun Rage, Yandere Snap).
- Triggers: taking damage, AP thresholds, rival/bond events, Event cards.
- Effects: stat shifts, ability unlocks, art/voiceline changes, and one-time powerful effects (meltdowns).

Implementation notes:
- Model emotional state as a small finite-state machine on `CardInstance` in `BattleState`.
- Track `ap: number`, `bonds: string[]` (card instance ids), and `mood: 'neutral'|'dere'|'extreme'` on `CardInstance`.
- Resolve mood transitions deterministically in a fixed order (triggers → AP change → mood change → ability resolution) and log to `battleLog`.

---

## Example data additions (TypeScript)

```ts
interface EmotionalState {
  ap: number // Affection Points
  bonds: string[] // CardInstance ids
  mood: 'neutral' | 'dere' | 'extreme'
}

interface CardInstance {
  cardId: string
  instanceId: string
  ownerId: string
  inDeck?: string
  emotional?: EmotionalState
}

// Example mood transition helper
function applyAp(card: CardInstance, amount: number) {
  card.emotional = card.emotional || { ap: 0, bonds: [], mood: 'neutral' }
  card.emotional.ap += amount
  if (card.emotional.ap >= 15) card.emotional.mood = 'extreme'
  else if (card.emotional.ap >= 5) card.emotional.mood = 'dere'
}
```

---

These mechanics are intended to create emotional drama, strategic depth, and clear deck identities while remaining testable and deterministic.

## Affection (card HP) and Special Abilities

- Affection (the per-card HP stat) should directly influence certain special abilities. Design patterns:
  - Threshold abilities: abilities that unlock when a waifu's Affection is above or below a threshold (e.g., "When Affection &gt;= 1500, gain +200 ATK" or "When Affection &lt;= 500, enter Desperation: +400 ATK").
  - Scaling abilities: effects that scale with current Affection (e.g., deal damage equal to 10% of this card's current Affection).
  - Desperation/Last Stand: special one-time effects that trigger when Affection falls to a low value or would drop to 0 (can be a conditional replacement effect that prevents discard and instead performs an action).
  - Protective interactions: some abilities spend Affection (self-damage) to produce larger immediate effects (risk/reward).

- Affection (the per-card HP stat) should directly influence certain special abilities. With the new small-number scale use these design patterns:
  - Threshold abilities: abilities that unlock when a waifu's Affection crosses a small threshold (e.g., "When Affection >= 7, gain +2 ATK" or "When Affection <= 2, enter Desperation: +4 ATK").
  - Scaling abilities: effects that scale with current Affection (e.g., deal damage equal to 10% of this card's current Affection).
  - Desperation/Last Stand: special one-time effects that trigger when Affection falls to a low value or would drop to 0 (can be a conditional replacement effect that prevents discard and instead performs an action).
  - Protective interactions: some abilities spend Affection (self-damage) to produce larger immediate effects (risk/reward).

Implementation notes:
- Check and resolve Affection-based triggers before or as part of the damage resolution step so outcomes (discard, desperation) are deterministic.
- Keep Affection separate from Affection Points (AP). Use clear field names in code: `card.affection` (HP) vs `card.emotional.ap` (bond meter).
- When designing abilities that interact with both AP and Affection, define a clear priority (for example: damage → update `card.affection` → check discard/desperation → update AP/mood → resolve post-effects).

Example ability patterns (pseudocode):

- Threshold activation:
  - "If this card.affection &lt;= 2 then grant +4 ATK until end of turn"
- Scaling effect:
  - "Deal (this.affection * 0.2) direct Affection damage to target"
- Desperation/Replacement:
  - "When this card would be discarded due to 0 Affection, you may pay 3 AP to instead set this card to 1 Affection and trigger 'Final Stand' (deal 10 Affection damage to target)."

These patterns let designers craft emotional, dramatic moments that tie the mechanical health pool (Affection) to character personality and special effects.
