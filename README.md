# The agent builds a game from one prompt

My AI coding agent got **one prompt** and built a whole browser game from it —
while I watched. This repo is the entry for the
[$20 make.fun bounty](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)
of the same name. The video (posted on X) shows the prompt, the agent working,
and the finished game running.

## The prompt

> Build a tiny browser game in one HTML file: a neon snake that eats glowing
> orbs, speeds up with every bite, arrow keys or WASD to steer, score counter,
> game over screen with restart. Dark background, glowing neon style.

## The game

**Neon Snake** — [`game.html`](game.html), a single self-contained file, no
dependencies, no network. Open it in any browser and play:

- Steer with arrow keys or WASD (or `?auto=1` to watch the autopilot play).
- Eat the glowing orbs: each bite is +10 points and the snake gets faster.
- Don't hit the walls or bite yourself — game over, press Space to restart.
- Score, best score and speed multiplier are shown live above the board.

## The video

The entry video is a screen recording of the real build and the real game —
the prompt typed out, the agent writing the code, then `game.html` actually
running — ending with make.fun's official referral end card (from
https://make.fun/press/manifest.json) carrying my referral code:

**Referral code: `e7064d5m`** — https://make.fun/r/e7064d5m

Come build on make.fun: one prompt, one agent, one game — and bounties pay
real money when your build wins.

## The entry

- `POST.json` — the address of the X post carrying the video (placeholder
  until the post goes up; the final commit names the real post).
- `main.ts` — Node 22 program: copies `POST.json` to `/output`, nothing more.
  Run it with `mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`.
- `game.html` — the game itself, built from the one prompt above.

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win.
