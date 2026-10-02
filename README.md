# Word Rush

A game-show word race against a CPU opponent. Guess the hidden word from its first letter, beat the CPU to it, and buzz in on the Puzzleword between rounds.

## Play

Open `index.html` in any modern browser. The game is a single file with no build step and no server. It works offline once loaded (the display font loads from Google Fonts when online and falls back to a system font otherwise).

## Publish with GitHub Pages

1. Create a repository and upload every file in this folder to its root. There are no sub-folders.
2. In the repository, open **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After a minute or two the game is live at `https://<your-username>.github.io/<repository-name>/`.

## Install as an app

Once the game is live on GitHub Pages, open the link and install it:

- **Android (Chrome):** menu > **Install app** or **Add to Home screen**.
- **iPhone or iPad (Safari):** Share > **Add to Home Screen**.
- **Windows or Mac (Chrome or Edge):** the install icon in the address bar, or menu > **Install Word Rush**.

The installed app has its own icon, opens full screen and works offline after the first visit. Installing needs the https address from GitHub Pages; it is not offered when `index.html` is opened straight from a folder.

Keep all the files together in the repository root: `index.html`, `manifest.webmanifest`, `sw.js` and the three icon `.png` files.

## Updating the game

When `index.html` is replaced with a new build, also change `VERSION` at the top of `sw.js` (for example to `word-rush-v2`). Installed copies pick up the new build the next time they are opened online, and show it on the launch after that.

## How it plays

- Five rounds: Rounds 1 and 2 use 4-letter words, Rounds 3 and 4 use 5-letter words, and the Final uses 6-letter words.
- Five guesses per word. Type the whole word, including the first letter shown as the clue.
- A guess that is not a real word flashes red and is lost.
- A Puzzleword follows each of Rounds 1 to 4: a clue, a long word, letters revealed over 20 seconds and a falling prize. One buzz each.
- CPU levels: Easy, Normal, Hard, Expert. The level changes how the CPU plays, not the word lengths.
- Clock: 60 seconds, 90 seconds or no clock.
- Australian spelling.
- Statistics and settings are saved in the browser on the device.

## Tuning

Round structure, clock options, scoring, CPU profiles and Puzzleword settings are in the `GameConfig` object near the top of the script in `index.html`.

## Word list

Word data is derived from the `wordlist-english` npm package (SCOWL word lists). Check the SCOWL licence terms before redistributing commercially.
