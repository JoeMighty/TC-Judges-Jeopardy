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

## How to use

- **Online:** turn on GitHub Pages for this repo (Settings > Pages > Deploy from branch > `main`, root folder) and open the link it gives you.
- **Offline:** download the repo as a ZIP, unzip it and open `index.html` in a browser.

## Host notes

- Two modes, chosen after "Let's Play":
  - **Questions only**: board and questions exactly as the slides.
  - **With answers**: adds a reveal answer button on each question.
- Add teams to show scores on screen, or pick "Keep score off-line".
- Click a point value to open the question. Used tiles are crossed out.
- Bonus question sits under the legend on the board.
- Optional 20 second timer on every question.
- Progress is saved in the browser, so a refresh can resume the game.

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `F` | Fullscreen |
| `T` | Start or reset timer |
| `A` | Reveal answer |
| `Esc` | Back to board |

## Editing the questions

All questions, answers and Bible references are in `js/questions.js`.
