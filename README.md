<div align="center">

# Book of Judges Jeopardy

A host-run Jeopardy quiz on the Book of Judges, made for the big screen.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=plastic&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=plastic&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=plastic&logo=javascript&logoColor=black)
![Questions](https://img.shields.io/badge/questions-30%20%2B%20bonus-839b66?style=plastic)
![Responsive](https://img.shields.io/badge/responsive-yes-6f8754?style=plastic)
![Offline](https://img.shields.io/badge/works%20offline-yes-6f8754?style=plastic)

</div>

## Setup

### Option 1: Play online (GitHub Pages)

1. Open this repo on GitHub and go to **Settings > Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose the `main` branch and the `/ (root)` folder, then click **Save**.
4. Wait a minute or two, then refresh the page. Your link appears at the top, for example
   `https://<your-username>.github.io/<repo-name>/`.
5. Open that link on the computer connected to the screen or projector.

### Option 2: Play offline

1. On the repo page, click **Code > Download ZIP**.
2. Unzip the folder.
3. Double click `index.html` to open it in your browser. No internet needed.

### Before you present

- Use a laptop or tablet connected to the screen, in Chrome, Edge, Safari or Firefox.
- Press `F` (or the **Fullscreen** button) to hide the browser bars.
- Open the game once beforehand to check it loads.

## How to play

1. **Title screen:** click **Let’s Play**.
2. **Choose a mode:**
   - **Questions only**: shows the questions exactly as the slides. The host judges answers.
   - **With answers**: adds a **Reveal answer** button with the answer and Bible reference.
3. **Who’s playing?**
   - Type each player or team name and click **Add**, then **Show scores on screen**.
   - Or click **Keep score off-line** to play without on-screen scores.
4. **How to Play:** read the rules to the room, then click **GOOD LUCK**.
5. **The board:** the audience picks a category and point value (1, 2, 3, 5 or 10).
   The host clicks that tile to open the question.
6. **The question:**
   - Click the timer to start a 20 second countdown (optional). It chimes at zero.
   - In **With answers** mode, click **Reveal answer** when ready.
   - If scoring on screen, tap the player or team that got it right to add the points.
     Tap again to undo.
   - Click **Back to board**. The tile is crossed out so you know it has been played.
7. **Scores:** use the **+** and **−** buttons on the scoreboard to correct any score.
8. **Bonus question:** click **Bonus** on the board at any time. It pulses once every tile is played.
   Give one point per correct answer using the **+** buttons.
9. **Finish:** click **Final scores** to show the winner.

### Rules (from the slides)

- You will compete individually.
- Choose a category and point value.
- Each team has 20 seconds to answer.
- Correct answer? Add the points to your score.
- Wrong answer? Another team gets a chance to steal.
- Keep playing until the board is complete.
- The team with the most points wins!

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `F` | Fullscreen |
| `T` | Start or reset timer |
| `A` | Reveal answer |
| `Esc` | Back to board |

### Good to know

- Progress is saved in the browser. If the page is refreshed, click **Resume saved game**.
- **New game** (top right) clears the board and scores.
- Works on laptops, tablets and phones, and works without internet once loaded.

## Editing the questions

All questions, answers and Bible references are in `js/questions.js`.
Open it in any text editor, change the text between the quotes and save.
