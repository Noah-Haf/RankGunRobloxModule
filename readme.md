# Rankgun Module

[![Super-Linter](https://github.com/Noah-Haf/RankGunRobloxModule/actions/workflows/eslint.yml/badge.svg)](https://github.com/marketplace/actions/super-linter)

This is the rankgun module designed to work with Roblox made using [rojo](https://rojo.space/) and [roblox-ts](https://roblox-ts.com/docs/quick-start).

## Usage

Read more on the [Rankgun docs](https://docs.rankgun.works/).

## Contributions

Feel free to open a pull-request, we're happy to expand and improve! 💖


## Development

1. Make sure ESLint is installed.
2. Make suer prettier is installed.
3. Ensure rojo and roblox-ts are installed.
4. Run watch mode: ``npx rbxtsc -w``
5. Create ``exports`` folder.

### Manual Export

6. Output the model: ``rojo build build.project.json --output exports/model.rbxmx``

### Rojo Live Syncing

6. Ensure rojo plugin is installed to Roblox Studio:  ``rojo plugin install``
7. Serve: ``rojo serve serve.project.json``
8. Connect via plugin in roblox studio.