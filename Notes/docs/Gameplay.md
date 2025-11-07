# Gameplay

This file contains core gameplay systems, battle flow, resources, progression, rarity system, AI behavior, and success metrics.

## Battle System

- **Functionality**: Turn-based card battles where players summon waifus (attack/defense stats), play support cards (buffs/healing), and set trap cards (reactive effects)
- **Purpose**: Core gameplay loop that provides strategic depth and satisfying anime-style combat
- **Trigger**: Click "Battle" from main menu, choose opponent
- **Progression**: Battle Start (draw 5 cards) → Player Turn (draw card → play cards → attack → end turn) → Enemy Turn (AI plays) → Repeat until one player's life points reach 0 → Victory/Defeat screen → Rewards (new cards)
- **Success criteria**: Battles resolve correctly with proper stat calculations, animations play smoothly, winner determined accurately

## Rounds, Matches, and Win Conditions

- Match Structure: Games are played as best-of-3 rounds (first player to win 2 rounds wins the match).
- Round Loss Condition: A player loses the current round immediately when either:
  - They have lost 3 of their waifus (3 waifus sent to the discard pile during the round), or
  - They have no waifus in play (i.e., they have zero waifus on their field). A zero-waifu field causes an immediate round loss.

When a round ends, perform end-of-round bookkeeping (reset per-round state, return non-persistent statuses, award round win, then start next round if needed).

### Waifu Guarantee Mulligan (starting draw)

- Purpose: Ensure players have at least one waifu to play in their opening hand to avoid non-interactive starts.
- Rule: During the initial draw stage of a round (the starting hand draw, e.g., draw 5), if a player's starting hand contains zero waifu cards, that player must shuffle their hand back into their deck, reshuffle the deck, and redraw a full starting hand. Repeat this process until the starting hand contains at least one waifu card.
- Notes:
  - This mulligan only applies to the initial starting-hand draw at the start of each round, not to normal draw phases later in the round.
  - Cards drawn during the mulligan that are non-waifu are placed into the new hand; the process repeats only if the hand contains zero waifus.
  - This ensures each player can make at least one meaningful play at the start of the round.

## Anime Trope Effects

- **Functionality**: Special card abilities that trigger anime tropes (Power of Friendship boost, Beach Episode healing, Tournament Arc damage multiplier, Tsundere cards that power up when "hurt")
- **Purpose**: Creates memorable moments and injects personality into gameplay
- **Trigger**: Activated when specific cards are played or conditions are met
- **Progression**: Card played → Check conditions → Trigger animation/voiceline → Apply effect → Update game state
- **Success criteria**: Trope effects feel impactful with proper visual/text feedback; effects are balanced and fun

## Starting Resources

- Starting LP: 4000 for each player
- Starting hand: 5 cards
- Draw phase: 1 card per turn
- Starting currency: 1000 gems
- Starter deck: 20 cards (10 waifus, 7 support, 3 traps)

## Progression

- Win battle: 300-500 gems (based on performance)
- Complete daily quest: 200 gems
- Pack costs: 
  - Basic Pack (5 cards, Common-Rare): 300 gems
  - Premium Pack (5 cards, Rare-Epic): 600 gems
  - Ultimate Pack (5 cards, Epic-Legendary): 1200 gems

## Rarity System Details

- **Pull Rates (Basic Pack)**: 
  - Common: 70% per card
  - Rare: 25% per card
  - Epic: 4.5% per card
  - Legendary: 0.5% per card
  
- **Pull Rates (Premium Pack)**:
  - Common: 30% per card
  - Rare: 50% per card
  - Epic: 18% per card
  - Legendary: 2% per card
  
- **Pull Rates (Ultimate Pack)**:
  - Rare: 40% per card
  - Epic: 45% per card
  - Legendary: 15% per card

- **Rarity Visual Indicators**:
  - Common: Gray/silver border, simple shimmer
  - Rare: Blue/sapphire border, gentle glow
  - Epic: Purple/amethyst border, pulsing glow with particles
  - Legendary: Gold/rainbow border, animated shimmer with star particles

- **Duplicate System**: Players can own multiple copies of the same card (useful for trading or building multiple decks)

- **Collection Progress**: Track % completion per rarity tier, display badges for completing full sets

## AI Opponent Difficulty

- **Easy**: Random card plays, 75% correct decisions
- **Normal**: Basic strategy (protect weak waifus, use traps wisely), 85% correct decisions
- **Hard**: Optimal plays, deck synergies, predicts player traps, 95% correct decisions
- **Legendary Boss**: Meta deck with legendary cards, perfect play, special abilities

## Success Metrics

- Players can complete a full battle from start to finish without errors
- Deck building saves and loads correctly
- Pack opening animations complete in <3 seconds
- All card effects trigger correctly with visible feedback
- Mobile layout is fully playable with touch controls
- Game state persists between sessions (collection, decks, currency)
- Players can create trade offers and see them in the trade hub
- Trade acceptance transfers cards correctly between players
- Trade history accurately logs all completed trades
- Rarity-based filtering works in collection and trade hub
- Cards in active decks cannot be traded away (validation works)

## Edge Case Handling

- **Empty Deck**: If player runs out of cards during battle, they take escalating damage each turn (deck-out condition)
- **Invalid Deck**: Deck builder prevents saving if card count is wrong or uses banned cards
- **First Time User**: Starts with a prebuilt starter deck and tutorial prompts
- **No Currency**: Shop displays "Not enough gems" message; offers to play battle for rewards
- **Card Limit**: Collection can hold unlimited cards; deck builder enforces format limits
- **Simultaneous KO**: If both players hit 0 LP simultaneously, player wins (protagonist privilege)
- **Trading Last Card**: Cannot trade away cards currently in active deck; must remove from deck first
- **Trade Conflicts**: If a card is traded away while in multiple offers, all other offers are automatically cancelled
- **Duplicate Trades**: Players cannot accept multiple trades for the same card simultaneously
- **Offline Trades**: Trade offers persist and can be accepted even when creator is offline
- **Trade Scams**: System validates both parties have the cards before allowing trade execution
