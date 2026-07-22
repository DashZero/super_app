# ALL Super App Wireframe

A deliberately low-fidelity, clickable React prototype for validating the ALL Super App navigation model and its category-specific mini-app webviews.

## Run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Use the milestone controls above the phone and the floating variant switcher below it.

## Prototype controls

- `Month 3`, `Month 5`, and `Month 7` filter the roadmap functions.
- `Show future features` reveals disabled future entries with milestone badges.
- `?variant=A`, `?variant=B`, and `?variant=C` switch between three structurally different Home layouts.
- Category tiles open simulated mini-app webviews with task-specific bottom navigation.
- Internal Back stays within the mini-app; `×` exits to the originating core screen.

This is throwaway prototype code. Once a layout wins, remove the losing variants and promote the selected design into production-quality components.

## GitHub Pages

The included workflow builds and deploys the wireframe without requiring Node.js on the viewer's laptop.

1. Push this repository to GitHub.
2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Open the **Actions** tab and run **Deploy wireframe to GitHub Pages**, or push to `main`.

The published URL appears in the workflow's deployment summary.
