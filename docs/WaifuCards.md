# Waifu Cards

Waifu cards are the primary character units. They use ATK and Affection (HP) and are driven by archetype and emotional mechanics (AP, Bonds, Mood).

## Waifu Card Rules (concise)

- ATK / Affection (AFF) stats: ATK uses double-digit values (10–99) and Affection uses single-digit values (1–9). Affection is the waifu's health pool — when it reaches 0 the waifu is discarded.
- Archetype abilities (passive and activated) and emotional mechanics (Affection Points / AP, Bonds, Mood).
- Waifus attack other waifus' Affection directly (no separate DEF stat).
- Limit 3 waifus on field at once.

If a player has zero waifus on their field at any time, they immediately lose the current round (see `docs/Gameplay.md`).

## Initial Waifu Archetypes (MVP)

1. Tsundere-chan (Common): 6 ATK / 15 AFF — Gains +3 ATK when her Affection is reduced (i.e., when she takes damage). AP gain when retaliating.
2. Yandere Yuki (Rare): 7 ATK / 18 AFF — When bonded, can destroy a bonded "love interest" target; gains AP when an ally is lost.
3. Kuudere Kira (Rare): 8 ATK / 16 AFF — Cannot be targeted by traps; AP generation when avoiding emotional debuffs.
4. Genki Girl Mika (Common): 4 ATK / 14 AFF — Draw 1 card when summoned; grants +1 AP to nearby allies on summon.
5. Childhood Friend Aiko (Common): 5 ATK / 12 AFF — +5 ATK for each other waifu you control; gives small AP to allies each turn.
6. Student Council President (Epic): 8 ATK / 22 AFF — All your waifus gain +2 ATK; faction leader bonuses when active.
7. Magical Girl Sakura (Epic): 8 ATK / 20 AFF — Once per turn, negate one attack against an ally; can spend AP to perform extra negations.
8. Shrine Maiden Rei (Rare): 6 ATK / 17 AFF — Heal 500 LP when summoned; restores AP to one ally.
9. Catgirl Neko (Common): 3 ATK / 13 AFF — Can attack twice per turn if alone; gains AP when attacking directly.
10. Imouto-chan (Rare): 5 ATK / 15 AFF — "Onii-chan!" — once per turn, prevent being discarded when falling to 0 Affection (cost: 2 AP)
11. Senpai Satori (Epic): 7 ATK / 21 AFF — Your support cards cost 0 this turn; grants AP to summoned waifus.
12. Rival Transfer Student (Epic): 6 ATK / 23 AFF — When summoned, deal direct Affection damage to one enemy waifu; gains AP on kill.
13. Ojou-sama Ayane (Legendary): 9 ATK / 28 AFF — Immune to traps, gains +5 ATK for each trap on field; demands tribute (sacrifice a waifu to buff).
14. Dark Magical Girl (Legendary): 8 ATK / 26 AFF — When discarded, summon 2 "Shadow Tokens" (15 ATK / 15 AFF) that inherit partial AP.
15. Ultimate Protagonist (Legendary): 9 ATK / 30 AFF — Cannot be discarded while you control other waifus; when it would be discarded, spend AP to survive.

## Emotional & Archetype Systems

Refer to `docs/Archetypes.md` for full design details on Dere archetypes, Affection Points (AP), Bond Cards, Mood Swings, and Emotional States.

### Affection and Special Abilities

- A waifu's `Affection` (HP) should be considered when designing and implementing special abilities.
- Common patterns:
	- Thresholds: abilities unlock or change behavior when `card.affection` crosses thresholds (e.g., low-Affection "Desperation").
	- Scaling: ability values scale with current `card.affection`.
	- Desperation: one-time or replacement effects when Affection is about to reach 0.

Examples:
-- "Tsun Rage": If Affection &lt;= 2, gain +4 ATK this turn.
-- "Protective Sacrifice": Spend 2 Affection to heal an ally for 5 Affection.

Implementation tip: track `card.affection` on `CardInstance` and evaluate Affection-based triggers during the damage resolution step.

Implementation tips:

- Store archetype, `card.affection`, `card.emotional.ap`, bond references, and mood state on `CardInstance` for runtime logic.
- Evaluate Affection-based triggers during the damage resolution step and resolve discard/desperation before post-damage effects.
- Use visual states to reflect Neutral/Dere/Extreme (alternate art, voicelines).
