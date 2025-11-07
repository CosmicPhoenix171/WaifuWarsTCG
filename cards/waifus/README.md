# Waifu Card Archetypes

Each archetype folder stores the card JSON files directly. Keep matching art files in the same directory (e.g., `flame-tsundere-default.png`).

- `tsundere/` – Spiky attackers that grow stronger after taking hits.
- `yandere/` – Obsessive burst damage dealers with mark mechanics.
- `deredere/` – Party buffers, healers, and bond engines.
- `dandere/` – Defensive, evasive waifus that reward patience.
- `kuudere/` – Control specialists focused on counters and denial.
- `himedere/` – Leadership auras and tribute-style payoffs.
- `yangire/` – High-variance damage gamblers with self-risk.
- `kamidere/` – Command-based controllers that dictate the flow of battle.

Add new waifu cards by duplicating an existing JSON file (or using the template), updating the content, dropping art files beside it, and re-running `node cards/tools/index-builder.js`.
