# Waifu Cards

Waifu cards are the primary character units. They use ATK and Affection (HP) and are driven by archetype and emotional mechanics (Bonds, mood states).

## Repository File Layout

All waifu card assets now live together so each card can carry its own data, visuals, audio, and lore. Use the tag ordering `archetype / species / strategy / card-id` under `cards/waifus/`:

```plaintext
cards/
	waifus/
		dandere/
			human/
				shield-barrier/
					whisper-dandere/
						card.json        ← universal metadata + art references
						art/             ← default/extreme renders (default.png, extreme.png, etc.)
						audio/           ← voice lines, SFX
						lore.md          ← optional written backstory
```

When creating or relocating a waifu:

- Keep identifiers lowercased with dashes (e.g. `whisper-dandere`).
- Update the `art` stanza inside `card.json` to point at files within the same folder tree.
- Add supplementary material (profiles, scripts, alt art) next to the card under the same directory so other pages can load them by walking the hierarchy.
- After editing any `card.json`, regenerate indexes with `node cards/tools/index-builder.js` so site loaders resolve the new paths.

## Waifu Card Rules (concise)

- ATK / Affection (AFF) stats: ATK uses double-digit values (10–99) and Affection uses single-digit values (1–9). Affection is the waifu's health pool — when it reaches 0 the waifu is discarded.
- Archetype abilities (passive and activated) and emotional mechanics (bond points, Bonds, mood states).
- Waifus attack other waifus' Affection directly (no separate DEF stat).
- Limit 3 waifus on field at once.

If a player has zero waifus on their field at any time, they immediately lose the current round (see `docs/Gameplay.md`).

## Initial Waifu Archetypes (MVP)

1. Arisa Takane – The Fiery Tsundere

Archetype: Tsundere
ATK: 6 AFF: 15
Effect: Gains +3 ATK when she takes damage (Affection loss).
Bond Effect: Generates +1 Bond Point when retaliating.
Flavor: “I-It’s not like I did that for you or anything!”

➡️ Fiery, emotional, proud — the textbook tsundere.

2. Mika Hanabira – The Endless Optimist

Archetype: Deredere
ATK: 4 AFF: 14
Effect: On summon, draw 1 card and grant +1 Bond Point to all allies.
Bond Effect: When she leaves the field, allies gain +2 ATK until end of turn.
Flavor: “Let’s keep going! Smiles beat sadness any day!”

➡️ Joyful momentum engine; spreads energy to allies.

3. Aiko Minase – The Childhood Promise

Archetype: Deredere
ATK: 5 AFF: 12
Effect: Gains +5 ATK for each other waifu you control.
Bond Effect: Each turn, restore 1 Bond Point to all allies.
Flavor: “We’ve always been together… right?”

➡️ Support unit who strengthens with time and loyalty.

4. Neko-chan Kuroha – The Mischievous Stray

Archetype: Deredere
ATK: 3 AFF: 13
Effect: Can attack twice per turn if she’s the only waifu you control.
Bond Effect: Gains +1 Bond Point after each direct attack.
Flavor: “Catch me if you can, nya~!”

➡️ Solo-attacker archetype; unpredictable and playful.

💙 Rare Tier
5. Yuki Amagawa – The Devoted Yandere

Archetype: Yandere
ATK: 7 AFF: 18
Effect: When bonded, may destroy a bonded “Love Interest” on the field.
Bond Effect: Gains +2 Bond Points when an ally is destroyed.
Flavor: “If I can’t have you… no one will.”

➡️ Dark control unit with emotional overdrive.

6. Kira Hayashida – The Silent Kuudere

Archetype: Kuudere
ATK: 8 AFF: 16
Effect: Cannot be targeted by traps.
Bond Effect: Generates +1 Bond Point whenever she resists a debuff.
Flavor: “Calm mind. Unshaken heart.”

➡️ Ice-cold counter-control specialist.

7. Rei Hoshizora – The Shrine of Serenity

Archetype: Deredere
ATK: 6 AFF: 17
Effect: On summon, heal 500 LP and restore 2 Bond Points to one ally.
Bond Effect: When bonded, heal affection damage equal to her ATK.
Flavor: “The spirits will cleanse your sorrow.”

➡️ Healer archetype; anchors sustain decks.

8. Emi Kisaragi – The Loyal Little Sister

Archetype: Deredere
ATK: 5 AFF: 15
Effect: Once per turn, when she would be discarded, spend 2 Bond Points to prevent it.
Bond Effect: If saved this way, gain +2 ATK permanently.
Flavor: “Onii-chan! You promised you’d never leave!”

➡️ Protective and stubborn; embodies emotional resilience.

💜 Epic Tier
9. Aria Kanzaki – The Council President

Archetype: Himedere
ATK: 8 AFF: 22
Effect: All your waifus gain +2 ATK.
Bond Effect: If fully bonded, all allies also gain +2 AFF per turn.
Faction Bonus: Support cards cost 1 less while she’s active.
Flavor: “As your president, I expect nothing short of perfection.”

➡️ Field commander and strategy enabler.

10. Sakura Amane – The Miracle Maiden

Archetype: Kuudere
ATK: 8 AFF: 20
Effect: Once per turn, negate one attack on an ally.
Bond Effect: Spend 2 Bond Points to negate another attack.
Flavor: “In the name of love and light—begone, despair!”

➡️ Protective barrier archetype; turns bonds into shields.

11. Satori Ichinose – The Guiding Senpai

Archetype: Kamidere
ATK: 7 AFF: 21
Effect: Once per turn, your Support cards cost 0 to play.
Bond Effect: When an ally is summoned, grant them +1 Bond Point.
Flavor: “Every smile you protect becomes your strength.”

➡️ Combo archetype; promotes teamwork.

12. Miko Tachibana – The Rival Transfer Student

Archetype: Tsundere
ATK: 6 AFF: 23
Effect: On summon, deal affection damage equal to her ATK to one enemy waifu.
Bond Effect: Gains +3 Bond Points after defeating an opponent.
Flavor: “Try to keep up, I don’t hold back for anyone.”

➡️ Aggressive duelist archetype; thrives in 1-on-1 battles.

💛 Legendary Tier
13. Ayane Himura – The Elegant Ojou-sama

Archetype: Himedere
ATK: 9 AFF: 28
Effect: Immune to traps; gains +5 ATK per trap on the field.
Bond Effect: Sacrifice one ally to grant her +10 AFF and +3 Bond Points.
Flavor: “Your devotion shall not go unrewarded.”

➡️ Dominance archetype; embodies wealth and control.

14. Noire Tsukino – The Fallen Magical Girl

Archetype: Yangire
ATK: 8 AFF: 26
Effect: When discarded, summon 2 Shadow Tokens (15 ATK / 15 AFF).
Bond Effect: Tokens inherit half this card’s Bond Points.
Flavor: “Even in darkness, my love burns bright.”

➡️ Dark summoner archetype; powerful death-synergy card.

15. Ren Akihara – The Ultimate Protagonist

Archetype: Kamidere
ATK: 9 AFF: 30
Effect: Cannot be discarded while you control another waifu.
Bond Effect: When he would be discarded, spend 3 Bond Points to survive at 1 AFF.
Flavor: “No matter how many times I fall, I’ll rise again… for them.”

➡️ Central hero archetype; the emotional and mechanical heart of the game.

## Emotional & Archetype Systems

Refer to `docs/Archetypes.md` for full design details on Dere archetypes, bond points, Bond Cards, Mood Swings, and Emotional States.

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

- Store archetype, `card.affection`, `card.emotional.bondPoints`, bond references, and mood state on `CardInstance` for runtime logic.
- Evaluate Affection-based triggers during the damage resolution step and resolve discard/desperation before post-damage effects.
- Use visual states to reflect Neutral/Dere/Extreme (alternate art, voicelines).
