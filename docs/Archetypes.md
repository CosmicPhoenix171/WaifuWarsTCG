# Personality-Based Archetypes

Core concept: each "dere" becomes a gameplay archetype that defines a card's behavior, strengths, and weaknesses — emotional affinities that shape playstyle and interactions.

## 1. Core Dere Archetypes (Gameplay Types)

| Type | Theme | Playstyle Concept | Sample Effect |
|------|-------|-------------------|---------------|
| Tsundere | Anger & denial | High damage when provoked, slow to start | Gains ATK when taking damage or insulted |
| Yandere | Obsession & devotion | Sacrifice HP or allies for huge power | Can destroy a bonded "love interest" card instantly once bonded |
| Deredere | Pure affection | Buffs allies, heals, builds morale | Heals nearby allies or restores bond points each turn |
| Dandere | Shy & quiet | Defensive / stealth-based | Starts hidden/untargetable and gains power when revealing |
| Kuudere | Calm & logical | Counters / negation | Immune to "Charm" or "Fluster" attacks; cancels emotional effects |
| Himedere | Proud & regal | Demands tribute / leader-focused | Gets stronger if treated as the "leader" of your field |
| Yangire | Unstable rage | Unpredictable high risk/high reward | 50% chance to attack self or double-damage the enemy |
| Kamidere | God complex | Field control / command power | Can issue "commands" to force others to obey actions |

> Note: genre-flavored identities (Genki, Childhood Friend, Magical Girl, Student Council President, etc.) are still valid labels and can map to the above dere playstyles for balance and identity.

---

## 2. Relationship Meter / Bonds

- Bonds (bond points): numeric meter on waifu cards (and optionally on players) representing emotional connection strength.
- Bond points are earned from actions (summons, heals, bonded attacks, playing Bond Cards) and spent to activate skills (Confession, Meltdown) or create new bonds.
- Compatibility Bonuses: archetype pairings grant passive bonuses; some pairings clash and can create penalties.

Example rules:
- Gain bonds: +1 bond point when a bonded ally deals damage; +2 bond points when a Bond Card is played; +1 bond point on heal.
- Bond thresholds: 5 bond points = Minor Skill, 10 bond points = Major Skill/Confession, 15+ bond points = Extreme State available.

Note on terminology: "Affection" is now used in two related ways across the design documents:

- Affection (card stat): the per-waifu Affection value acting as the unit's HP. When Affection reaches 0 the waifu is discarded.
- Bonds (bond points): the separate relationship meter used for confessions and mood-state triggers. Bond points are not the same as the per-card Affection stat.

Keep the distinction in implementation (e.g., `card.affection` vs `card.emotional.bondPoints`).

---

## 3. Relationship Mechanics

- Bond Cards: Support cards that create a bond (love, rivalry, mentorship) between two waifus. Bonds unlock shared effects and let archetypes interact (e.g., Yandere marks a bond target).
- Mood Swings: Triggers (losing a bonded card, taking damage, rival appearance) cause mood/state changes (Neutral → Dere → Extreme), altering abilities and AI behavior.
- Confession Events: When two bonded characters reach bond thresholds, trigger a Confession Phase to grant large bonuses, unlock a one-time powerful effect, or progress story-like outcomes.

---

## 4. Deck-Building System by Archetype

Each dere type encourages specific deck identities and synergies:

- Tsundere: Reaction-based counterplay — "Gain +2 ATK when attacked or insulted." 
- Yandere: Aggro/sacrifice — "If this card destroys another, gain +3 bond points."
- Deredere: Support/heal — "Heal an ally by 2 bond points each turn."
- Kuudere: Control/negation — "Cancel one emotional attack per turn."
- Dandere: Stealth/defense — "Hidden until attacked; counter with 2× power."
- Himedere: Leader-synergy — "All allies gain +1 ATK while this is active."
- Yangire: High variance RNG burst decks.
- Kamidere: Command/control decks.

Suggested deck construction rules:
- Faction Bonus: Include 10+ cards of same dere to unlock a faction passive (e.g., +1 bond point per turn).
- Bond Slots: Decks may include up to 3 Bond Cards enabling pair synergies when played.

### Optional Rock-Paper-Scissors Layer

- Goal: provide quick-read matchup expectations without hard-locking archetypes out of viability.
- Approach: group the eight dere archetypes into three macro-families and give soft +/-1 modifiers to relevant stats (ATK, defense rolls, bond generation) when facing their prey/predator families.

| Macro Family | Includes | Favored Against | Vulnerable To |
|--------------|----------|-----------------|---------------|
| Passion Surge | Tsundere, Yandere, Yangire | Stoic Control | Heart Guard |
| Stoic Control | Kuudere, Dandere, Kamidere | Heart Guard | Passion Surge |
| Heart Guard | Deredere, Himedere (plus flex archetypes like Support Mage) | Passion Surge | Stoic Control |

- Tuning guidance:
  - Keep bonuses in the 10-15% range (e.g., Passion Surge units gain +1 ATK when attacking Stoic Control) so deckbuilding and play decisions still matter.
  - Let support cards and Bond effects offer tech answers (e.g., Charm or Shield cards that temporarily flip type advantage) to prevent auto-losses.
  - Use matchup tags (`card.matchupFamily = 'passion' | 'stoic' | 'heart'`) rather than binding to archetype names so hybrid waifus can opt into different families.
- Balance callout: treat the triangle as a seasoning layer. The core stats, bond economy, and Bond synergies should remain the primary balancing levers; the triangle just nudges flavor and narrative expectations.

---

## 5. Emotional States (Advanced Mechanic)

- States: Neutral → Dere → Extreme (e.g., Tsun Rage, Yandere Snap).
- Triggers: taking damage, bond thresholds, rival/bond events, Event cards.
- Effects: stat shifts, ability unlocks, art/voiceline changes, and one-time powerful effects (meltdowns).

Implementation notes:
- Model emotional state as a small finite-state machine on `CardInstance` in `BattleState`.
- Track `bondPoints: number`, `bonds: string[]` (card instance ids), and `mood: 'neutral'|'dere'|'extreme'` on `CardInstance`.
- Resolve mood transitions deterministically in a fixed order (triggers → bond change → mood change → ability resolution) and log to `battleLog`.

---

## Example data additions (TypeScript)

```ts
interface EmotionalState {
  bondPoints: number // relationship meter
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
function applyBondPoints(card: CardInstance, amount: number) {
  card.emotional = card.emotional || { bondPoints: 0, bonds: [], mood: 'neutral' }
  card.emotional.bondPoints += amount
  if (card.emotional.bondPoints >= 15) card.emotional.mood = 'extreme'
  else if (card.emotional.bondPoints >= 5) card.emotional.mood = 'dere'
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
- Keep Affection separate from Bonds (bond points). Use clear field names in code: `card.affection` (HP) vs `card.emotional.bondPoints` (relationship meter).
- When designing abilities that interact with both bond points and Affection, define a clear priority (for example: damage → update `card.affection` → check discard/desperation → update bond points/mood → resolve post-effects).

Example ability patterns (pseudocode):

- Threshold activation:
  - "If this card.affection &lt;= 2 then grant +4 ATK until end of turn"
- Scaling effect:
  - "Deal (this.affection * 0.2) direct Affection damage to target"
- Desperation/Replacement:
  - "When this card would be discarded due to 0 Affection, you may pay 3 bond points to instead set this card to 1 Affection and trigger 'Final Stand' (deal 10 Affection damage to target)."

These patterns let designers craft emotional, dramatic moments that tie the mechanical health pool (Affection) to character personality and special effects.
