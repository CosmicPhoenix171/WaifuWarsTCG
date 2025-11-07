# Waifu Wars - Product Requirements Document

A strategic anime-themed card battler where players collect waifus, deploy support cards, and outsmart opponents with trap cards in epic battles filled with classic anime tropes.

## Split Sections (new)

To improve organization this document has been split into focused sections — see the detailed files in `/docs`:

- `docs/Gameplay.md` — Battle flow, resources, progression, rarity system, AI difficulty, edge cases and success metrics
- `docs/WaifuCards.md` — Waifu card rules, archetypes, and initial waifu pool
- `docs/SupportCards.md` — Support/effect cards and pack opening/gacha notes
- `docs/TrapCards.md` — Trap card rules and trap card pool

The remainder of this file retains the high-level design direction, components, technical architecture, and data models for easy reference.

**Experience Qualities:**
1. **Playful & Colorful** - Embrace the vibrant, over-the-top aesthetic of anime with bold colors, dramatic effects, and tongue-in-cheek humor
2. **Strategic & Engaging** - Deep tactical gameplay that rewards clever card combinations and mind games between players
3. **Nostalgic & Referential** - Easter eggs and tropes that anime fans will instantly recognize and appreciate

**Complexity Level**: Light Application (multiple features with basic state)
  - Multiple game systems (deck building, card battles, collection management) but streamlined for web play with a single-player experience against AI opponents

## Essential Features

### Card Collection & Deck Building
- **Functionality**: Players view their card collection and build decks of 20-30 cards (mix of Waifu, Support, and Trap cards)
- **Purpose**: Gives players agency in strategy and encourages replayability through different deck compositions
- **Trigger**: Accessed from main menu "Collection" button
- **Progression**: View Collection → Filter by card type → Select cards to add to deck → Confirm deck (validate min/max cards) → Save deck → Return to menu
- **Success criteria**: Players can successfully create and save valid decks; collection persists between sessions

### Battle System
- **Functionality**: Turn-based card battles where players summon waifus (attack/defense stats), play support cards (buffs/healing), and set trap cards (reactive effects)
- **Purpose**: Core gameplay loop that provides strategic depth and satisfying anime-style combat
- **Trigger**: Click "Battle" from main menu, choose opponent
- **Progression**: Battle Start (draw 5 cards) → Player Turn (draw card → play cards → attack → end turn) → Enemy Turn (AI plays) → Repeat until one player's life points reach 0 → Victory/Defeat screen → Rewards (new cards)
- **Success criteria**: Battles resolve correctly with proper stat calculations, animations play smoothly, winner determined accurately

### Anime Trope Effects
- **Functionality**: Special card abilities that trigger anime tropes (Power of Friendship boost, Beach Episode healing, Tournament Arc damage multiplier, Tsundere cards that power up when "hurt")
- **Purpose**: Creates memorable moments and injects personality into gameplay
- **Trigger**: Activated when specific cards are played or conditions are met
- **Progression**: Card played → Check conditions → Trigger animation/voiceline → Apply effect → Update game state
- **Success criteria**: Trope effects feel impactful with proper visual/text feedback; effects are balanced and fun

### Card Gacha/Pack Opening
- **Functionality**: Players earn currency from battles to open card packs with randomized cards (Common, Rare, Epic, Legendary rarities)
- **Purpose**: Progression system and dopamine-driven collection incentive
- **Trigger**: Click "Shop" from menu, spend currency to open pack
- **Progression**: Select pack type → Spend currency → Dramatic reveal animation (cards flip one by one) → Cards added to collection → Return to shop
- **Success criteria**: Pack opening feels exciting with proper pacing; rarities distributed according to odds; no duplicate legendaries initially

### Card Trading System
- **Functionality**: Players can create trade offers, browse available trades from other players, and exchange cards directly
- **Purpose**: Creates a player-driven economy, enables collection completion, and adds social/strategic depth to card acquisition
- **Trigger**: Click "Trade" from main menu to view trading hub
- **Progression**: View Trade Hub → Browse active offers (filter by rarity/card type) → Select offer → Review trade details → Confirm trade → Cards exchanged → Success notification → Updated collections
- **Success criteria**: Trades execute atomically (both players receive cards simultaneously), trade history is logged, fair trade validation prevents exploitation

### Trade Offer Creation
- **Functionality**: Players can list cards they want to trade away and specify cards they want in return
- **Purpose**: Enables players to seek specific cards they need for deck strategies
- **Trigger**: Click "Create Offer" in Trade Hub
- **Progression**: Select cards to offer (1-3 cards) → Specify desired cards or rarity → Set offer expiration (24h/3d/7d) → Confirm listing → Offer goes live → Notification when trade accepted
- **Success criteria**: Offers are clearly displayed with card previews, can be cancelled by creator, expire automatically

### Waifu Card Archetypes
- **Functionality**: Different waifu types with unique stats and abilities (Tsundere, Yandere, Kuudere, Genki Girl, Childhood Friend, Student Council President, Magical Girl, etc.)
- **Purpose**: Variety in gameplay and appeal to different player preferences
- **Trigger**: Cards drawn/played during battle
- **Progression**: Card played → Archetype ability conditions checked → Special effects applied → Stats displayed
- **Success criteria**: Each archetype feels mechanically distinct and flavorful
 
## Personality-Based Archetypes (moved)

The full Core Concept for personality-based archetypes has been moved to a dedicated document: `docs/Archetypes.md`.

Refer to `docs/Archetypes.md` for:

- Core dere archetype definitions and sample effects
- Relationship Meter / Bonds
- Relationship mechanics (Bond Cards, Mood Swings, Confessions)
- Deck-building guidance by archetype and emotional states

This keeps `GameInfo.md` focused and the archetype rules centrally maintained.

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

- **Round Loss (match rules)**: A player loses the current round when they either lose 3 waifus (3 waifus discarded) or have no waifus in play (zero waifus on their field). A zero-waifu field causes an immediate round loss. Matches are best-of-3 rounds (first to 2 rounds wins the match).
- **Starting-hand Mulligan (Waifu Guarantee)**: If a player's starting hand (initial draw at the start of a round) contains zero waifu cards, the player shuffles their hand back into their deck, reshuffles, and redraws the starting hand. Repeat until the starting hand contains at least one waifu.

## Design Direction
The design should feel playful, energetic, and unabashedly anime - vibrant gradients, sparkle effects, and dramatic typography evoke the excitement of opening rare cards and pulling off clutch plays. The interface should embrace maximalism with a rich, detailed aesthetic featuring card illustrations, particle effects, and dynamic backgrounds that shift based on game state. Think of the visual energy of gacha game menus mixed with the clarity of modern card battlers.

## Color Selection
**Triadic color scheme** - Using pink, cyan, and yellow-orange to create vibrant, energetic contrast that captures anime aesthetics. These colors will rotate based on card rarity and game phases (pink for romance/waifu themes, cyan for support/magic, yellow-orange for action/attacks).

- **Primary Color**: Deep vibrant pink (oklch(0.65 0.25 350)) - Represents the "waifu" theme and draws attention to important cards/buttons; communicates fun and anime romance tropes
- **Secondary Colors**: 
  - Electric cyan (oklch(0.75 0.18 210)) - Used for support cards, UI chrome, and magical effects
  - Energetic orange (oklch(0.70 0.20 50)) - Attack indicators, rare card borders, and CTAs
- **Accent Color**: Bright golden yellow (oklch(0.85 0.18 85)) - Legendary card glows, victory states, special effect highlights
- **Foreground/Background Pairings**:
  - Background (Deep Purple oklch(0.15 0.08 300)): White text (oklch(0.98 0 0)) - Ratio 14.2:1 ✓
  - Card (Soft White oklch(0.96 0.01 300)): Dark Purple text (oklch(0.20 0.05 300)) - Ratio 13.8:1 ✓
  - Primary (Deep Pink oklch(0.65 0.25 350)): White text (oklch(0.98 0 0)) - Ratio 5.2:1 ✓
  - Secondary (Electric Cyan oklch(0.75 0.18 210)): Dark Purple text (oklch(0.20 0.05 300)) - Ratio 10.1:1 ✓
  - Accent (Golden Yellow oklch(0.85 0.18 85)): Dark Purple text (oklch(0.20 0.05 300)) - Ratio 12.4:1 ✓
  - Muted (Dark Purple Muted oklch(0.25 0.05 300)): Light Gray text (oklch(0.75 0.02 300)) - Ratio 8.9:1 ✓

## Font Selection
Typography should balance readability with anime-inspired energy - clean sans-serif for UI clarity paired with a bold display font for card names and dramatic moments.

- **Typographic Hierarchy**:
  - H1 (Game Title/Screen Headers): Bangers Bold/48px/tight letter-spacing (-0.02em) - Energetic, comic-style impact
  - H2 (Card Names): Bangers Bold/24px/normal letter-spacing - Makes card names pop
  - H3 (Section Headers): Inter Bold/20px/normal letter-spacing - Clean hierarchy
  - Body (Card Text/Descriptions): Inter Regular/14px/relaxed line-height (1.6) - Maximum readability
  - Small (Stats/Numbers): Inter SemiBold/12px/tabular numbers - Clear stat reading
  - Flavor Text: Inter Italic/13px/relaxed line-height (1.5) - Distinguishes lore from mechanics

## Animations
Animations should be dramatic and satisfying - every card play, attack, and effect should feel like an anime moment with appropriate impact and flair while maintaining 60fps performance.

- **Purposeful Meaning**: Animations communicate game state changes and celebrate player victories/rare pulls with appropriate energy. Card summons should feel powerful, attacks should have impact, and rare card reveals should build anticipation.
- **Hierarchy of Movement**:
  - **Critical moments** (Legendary card pulls, winning attacks): 800-1000ms with dramatic scale/glow effects
  - **Important actions** (Card plays, attacks): 400-600ms with bounce/slide effects
  - **State changes** (Turn transitions, stat updates): 200-300ms with fade/number counter effects
  - **Micro-interactions** (Hover states, card flips): 150-200ms with subtle lift/tilt effects

## Component Selection

### Components
- **Card Component (Custom)**: 
  - 3D tilt effect on hover using framer-motion transforms
  - Rarity-based border gradients (Common: gray, Rare: blue, Epic: purple, Legendary: gold with animated shimmer)
  - Stat badges at bottom (ATK/DEF for waifus)
  - Type icon in corner (Waifu/Support/Trap)
  - Tailwind: `relative rounded-xl overflow-hidden shadow-2xl transition-all hover:scale-105`
  
- **Battle Field (Custom Grid)**: 
  - 3-column grid for player's waifus on field
  - Opponent field at top, player field at bottom
  - Center zone for card effects/animations
  - Tailwind: `grid grid-cols-3 gap-4 p-6`

- **Deck Builder**: 
  - Shadcn `Tabs` for filtering (All/Waifu/Support/Trap)
  - Shadcn `ScrollArea` for card list
  - Shadcn `Badge` for card count and deck validation
  - Custom card grid with selection state
  - Tailwind: `grid grid-cols-4 md:grid-cols-6 gap-3`

- **Battle UI**:
  - Shadcn `Progress` for HP bars with gradient fills
  - Shadcn `Button` for end turn, attack actions
  - Custom hand component (fan layout at bottom)
  - Shadcn `Alert` for game events ("Enemy draws a card!")
  - Tailwind: `fixed bottom-0 inset-x-0` for hand positioning

- **Pack Opening**:
  - Shadcn `Dialog` for pack selection
  - Custom card flip animation (3D CSS transform)
  - Shadcn `Button` with glow effect for opening action
  - Particle effects using framer-motion for legendary pulls

- **Main Menu**:
  - Shadcn `Card` for each menu option (Battle, Collection, Shop, Trade)
  - Large icon buttons with hover lift effects
  - Animated background gradient
  - Tailwind: `grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-8`

- **Trade Hub**:
  - Shadcn `Tabs` for filtering (All Offers, My Offers, Completed Trades)
  - Shadcn `Card` for each trade offer with offering/requesting card previews
  - Shadcn `Dialog` for trade confirmation with detailed view
  - Shadcn `Badge` for rarity indicators and trade status
  - Shadcn `Button` with "Create Offer" and "Accept Trade" actions
  - Shadcn `Select` for filtering by rarity and card type
  - Tailwind: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`

- **Trade Creation**:
  - Shadcn `Dialog` for offer creation flow
  - Multi-select card picker from collection (with deck-locked cards grayed out)
  - Shadcn `RadioGroup` for selecting desired card rarity or specific cards
  - Shadcn `Select` for offer expiration time
  - Preview pane showing what you're offering vs what you want
  - Tailwind: Split view with `grid grid-cols-2 gap-4` for offer/request sides

- **Collection View**:
  - Shadcn `Tabs` for filtering by rarity/type
  - Shadcn `Input` for search
  - Masonry-style grid for cards
  - Shadcn `Dialog` for card detail view

### Customizations
- **Custom Shimmer Border**: Animated gradient border for legendary cards using CSS keyframes
- **Custom Hand Fan Layout**: CSS transforms to position cards in arc at bottom of screen
- **Custom Number Counter**: Animated number changes for stats using framer-motion spring
- **Custom Particle System**: Small utility component for sparkles/impact effects

### States
- **Buttons**: Default (gradient background), Hover (lift + glow), Active (scale down), Disabled (grayscale + opacity 50%)
- **Cards**: Default, Hover (tilt + lift), Selected (border glow), Playing (slide animation), Disabled (grayscale)
- **Inputs**: Default (subtle border), Focus (cyan glow ring), Error (red border + shake), Success (green checkmark)

### Icon Selection
- **Menu**: House (home), Cards (collection), ShoppingCart (shop), Sword (battle), Swap (trade)
- **Cards**: Heart (HP), Lightning (attack), Shield (defense), Star (special ability)
- **Actions**: Play (card play), X (cancel), Check (confirm), ArrowClockwise (end turn)
- **Rarity**: Sparkle (common), Stars (rare), Crown (epic), Trophy (legendary)
- **Tropes**: SunHorizon (beach episode), Lightning (power up), Users (friendship), Fire (hot-blooded)
- **Trading**: ArrowsLeftRight (trade action), Clock (offer expiration), User (trader), CheckCircle (trade completed)

### Spacing
- Card padding: `p-4`
- Grid gaps: `gap-4` (16px) for battle field, `gap-3` (12px) for collection
- Section margins: `my-8` (32px) between major sections
- Button padding: `px-6 py-3` for primary actions, `px-4 py-2` for secondary
- Container max-width: `max-w-7xl mx-auto` for main content areas

### Mobile
- **Card Grid**: 2 columns on mobile (`grid-cols-2`), 4 on tablet (`md:grid-cols-4`), 6 on desktop (`lg:grid-cols-6`)
- **Battle Field**: Single column stack on mobile with player field always visible, scroll to opponent
- **Hand**: Reduce card scale on mobile (75%), allow horizontal scroll if >5 cards
- **Menu**: Single column on mobile (`grid-cols-1`), 2 columns on tablet (`md:grid-cols-2`), 4 on desktop (`lg:grid-cols-4`)
- **Trade Hub**: Single column on mobile, 2 on tablet, 3 on desktop for trade offer cards
- **Trade Creation**: Stack offer/request vertically on mobile instead of side-by-side
- **Dialog**: Full-screen on mobile using Shadcn `Drawer` instead of `Dialog`
- Touch targets: Minimum 48px height for all interactive elements
- Font sizes: Reduce by 2-4px on mobile for better fit

## Game Mechanics Details

### Card Types
1. **Waifu Cards**:
  - ATK/AFFECTION stats: ATK uses double-digit values (10–99) and Affection uses single-digit values (1–9). Affection functions as the waifu's "HP": when an opponent reduces a waifu's affection to 0 it is sent to the discard pile.
  - Archetype abilities (passive and activated)
  - Waifus attack other waifus' Affection; there is no separate DEF stat.
  - Limit 3 waifus on field at once

2. **Support Cards**:
   - Instant effects (stat boosts, healing, card draw)
   - Some grant ongoing effects for the turn
   - No field presence (go to discard after use)

3. **Trap Cards**:
   - Set face-down during player turn
   - Activate automatically when condition is met
   - Examples: "Mirror Force" (destroy attacking waifu), "Tsundere Reversal" (convert damage to healing)

### Anime Trope Effects
- **Power of Friendship**: When you control 3+ waifus, all gain +5 ATK
- **Beach Episode**: Heal 1000 LP, all waifus gain swimsuit variants
- **Tournament Arc**: Next attack deals double damage
- **Last Episode Power-Up**: When below 1000 LP, all waifus gain +10 ATK
- **Tsundere Reaction**: Takes damage but counterattacks with +50% ATK
- **Yandere Obsession**: Destroys any waifu that attacks "her" target
- **Childhood Friend Never Wins**: -5 ATK but draws 2 cards (card advantage)
- **Main Character Plot Armor**: Once per game, survive a lethal attack at 1 LP
- **Rival Appears**: Summon a powerful enemy that must be defeated
- **Training Montage**: Skip your turn, but next turn play 2 cards instead of 1

### Starting Resources
- Starting LP: 4000 for each player
- Starting hand: 5 cards
- Draw phase: 1 card per turn
- Starting currency: 1000 gems
- Starter deck: 20 cards (10 waifus, 7 support, 3 traps)

### Progression
- Win battle: 300-500 gems (based on performance)
- Complete daily quest: 200 gems
- Pack costs: 
  - Basic Pack (5 cards, Common-Rare): 300 gems
  - Premium Pack (5 cards, Rare-Epic): 600 gems
  - Ultimate Pack (5 cards, Epic-Legendary): 1200 gems

### Rarity System Details
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

### AI Opponent Difficulty
- **Easy**: Random card plays, 75% correct decisions
- **Normal**: Basic strategy (protect weak waifus, use traps wisely), 85% correct decisions
- **Hard**: Optimal plays, deck synergies, predicts player traps, 95% correct decisions
- **Legendary Boss**: Meta deck with legendary cards, perfect play, special abilities

## Initial Card Pool (MVP)

### Waifu Archetypes (15 unique waifus):
1. Tsundere-chan (Common): 15 ATK / 6 AFF - Gains +3 ATK when damaged
2. Yandere Yuki (Rare): 18 ATK / 7 AFF - Destroys waifus that attack "marked" target
3. Kuudere Kira (Rare): 16 ATK / 8 AFF - Cannot be targeted by traps
4. Genki Girl Mika (Common): 14 ATK / 4 AFF - Draw 1 card when summoned
5. Childhood Friend Aiko (Common): 12 ATK / 5 AFF - +5 ATK for each other waifu you control
6. Student Council President (Epic): 22 ATK / 8 AFF - All your waifus gain +2 ATK
7. Magical Girl Sakura (Epic): 20 ATK / 8 AFF - Once per turn, negate one attack
8. Shrine Maiden Rei (Rare): 17 ATK / 6 AFF - Heal 500 LP when summoned
9. Catgirl Neko (Common): 13 ATK / 3 AFF - Can attack twice per turn if alone
10. Imouto-chan (Rare): 15 ATK / 5 AFF - "Onii-chan!" - Prevent being discarded once per turn (cost: 2 bond points)
11. Senpai Satori (Epic): 21 ATK / 7 AFF - Your support cards cost 0 this turn
12. Rival Transfer Student (Epic): 23 ATK / 6 AFF - When summoned, destroy one enemy waifu (deal Affection damage)
13. Ojou-sama Ayane (Legendary): 28 ATK / 9 AFF - Immune to traps, gains +5 ATK for each trap on field
14. Dark Magical Girl (Legendary): 26 ATK / 8 AFF - When destroyed, summon 2 "Shadow Tokens" (15 ATK / 15 AFF)
15. Ultimate Protagonist (Legendary): 30 ATK / 9 AFF - Cannot be destroyed while you control other waifus

### Support Cards (10 types):
1. Power of Friendship (Common): All waifus gain +5 ATK this turn
2. Beach Episode (Rare): Heal 1000 LP, draw 1 card
3. Training Montage (Rare): Skip battle phase, draw 2 cards
4. Tournament Arc (Epic): Next attack deals double damage
5. Confession Scene (Common): Target waifu gains +8 ATK until end of turn
6. Bento Box (Common): Heal 800 LP
7. Lucky Pervert (Rare): Destroy 1 enemy support or trap card
8. Cultural Festival (Epic): Draw 3 cards, discard 1
9. Dramatic Entrance (Rare): Summon 1 waifu from hand with +5 ATK boost
10. Nakama Spirit (Legendary): All waifus become indestructible this turn

### Trap Cards (8 types):
1. Mirror Force (Rare): When opponent attacks, destroy all enemy waifus
2. Tsundere Reversal (Common): When you take damage, heal that amount instead
3. Yandere Rage (Epic): When your waifu is destroyed, destroy all enemy waifus
4. Plot Armor (Rare): Once per game, negate an attack that would reduce your LP to 0
5. Dramatic Flashback (Common): When life drops below 2000, draw 2 cards
6. Tournament Rules (Epic): No player can attack this turn
7. Embarrassing Situation (Common): Return 1 attacking waifu to opponent's hand
8. Final Form Awakening (Legendary): When activated, targeted waifu gains +15 ATK/AFF permanently

## Technical Architecture

### Data Models

```typescript
type CardType = 'waifu' | 'support' | 'trap'
type Rarity = 'common' | 'rare' | 'epic' | 'legendary'
type Archetype =
  | 'tsundere'
  | 'yandere'
  | 'deredere'
  | 'dandere'
  | 'kuudere'
  | 'himedere'
  | 'yangire'
  | 'kamidere'
  | 'genki'
  | 'childhood-friend'
  | 'other'
type TradeStatus = 'active' | 'completed' | 'cancelled' | 'expired'

interface Card {
  id: string
  name: string
  type: CardType
  rarity: Rarity
  description: string
  imageUrl?: string
  
  // Waifu specific
  attack?: number
  // Base/starting affection value for this card type (acts as HP)
  affection?: number
  archetype?: Archetype
  ability?: string
  
  // Support/Trap specific
  effect?: string
  activationCondition?: string
}

interface CardInstance {
  cardId: string // reference to Card definition
  instanceId: string // unique instance ID for trading
  ownerId: string // player who owns this instance
  inDeck?: string // deck ID if currently in a deck
  // Current runtime affection (may differ from Card.affection if damaged/healed)
  affection?: number
  // Emotional / bond state
  emotional?: {
    bondPoints: number
    bonds: string[]
    mood: 'neutral' | 'dere' | 'extreme'
  }
}

interface TradeOffer {
  id: string
  creatorId: string
  creatorName: string
  offeredCards: string[] // CardInstance instanceIds
  requestedType: 'specific' | 'rarity'
  requestedCards?: string[] // Card IDs if specific
  requestedRarity?: Rarity // if rarity-based trade
  requestedAmount: number // how many cards wanted
  status: TradeStatus
  createdAt: number
  expiresAt: number
}

interface CompletedTrade {
  id: string
  tradeOfferId: string
  participant1: string // creator
  participant2: string // acceptor
  participant1Cards: string[] // instanceIds traded away
  participant2Cards: string[] // instanceIds received
  completedAt: number
}

interface Deck {
  id: string
  name: string
  cards: string[] // card instance IDs
  isValid: boolean
}

interface BattleState {
  playerLP: number
  enemyLP: number
  turn: 'player' | 'enemy'
  phase: 'draw' | 'main' | 'battle' | 'end'
  playerField: (Card | null)[] // max 3 waifus
  enemyField: (Card | null)[]
  playerHand: Card[]
  enemyHand: Card[]
  playerDeck: Card[]
  enemyDeck: Card[]
  playerGraveyard: Card[]
  enemyGraveyard: Card[]
  setTraps: Card[] // face-down traps
  battleLog: string[]
}

interface PlayerData {
  gems: number
  collection: CardInstance[] // unique card instances
  decks: Deck[]
  activeDeckId: string
  stats: {
    wins: number
    losses: number
    cardsCollected: number
    tradesCompleted: number
  }
}
```

### State Management
- Use `useKV` for persistent data: player collection (card instances), decks, gems, stats, trade offers, trade history
- Use `useState` for temporary battle state, UI states, animations, trade creation form state
- Battle state resets each game (no persistence mid-battle)
- Trade offers are globally shared across all players (simulated with shared KV storage)

### Key Screens
1. **Main Menu**: Navigation hub with Battle/Collection/Shop/Trade
2. **Deck Builder**: Grid view of collection, drag-to-add deck building
3. **Battle Screen**: Split field view, hand at bottom, actions panel
4. **Pack Opening**: Animated card reveal screen
5. **Collection**: Filterable grid of all owned cards with rarity counts
6. **Card Detail**: Full card view with stats and lore
7. **Trade Hub**: Browse and manage trade offers
8. **Trade Creation**: Create new trade offers with card selection
9. **Trade Confirmation**: Review and accept/decline trades

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
