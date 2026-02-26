const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let randomNumber = Math.floor(Math.random() * 100) + 1;

app.get("/", (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Number Guessing Game</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          color: white;
          text-align: center;
          padding-top: 80px;
        }
        .card {
          background: rgba(255,255,255,0.1);
          padding: 40px;
          border-radius: 15px;
          width: 350px;
          margin: auto;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        input {
          padding: 10px;
          font-size: 16px;
          margin-top: 10px;
        }
        button {
          padding: 10px 20px;
          margin-top: 10px;
          font-size: 16px;
          cursor: pointer;
        }
        #result {
          margin-top: 15px;
          font-size: 18px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h2>⚙️ Game (by DevOps Pipeline)</h2>
        <h1>🎮 Guess the Number</h1>
        <p>Guess a number between 1 and 100</p>

        <input type="number" id="guessInput" required />
        <br/>
        <button onclick="sendGuess()">Guess</button>

        <div id="result"></div>
      </div>

      <script>
        async function sendGuess() {
          const guess = document.getElementById("guessInput").value;

          const res = await fetch("/guess", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ guess })
          });

          const data = await res.json();
          document.getElementById("result").innerText = data.message;
        }
      </script>
    </body>
    </html>
  `);
});

app.post("/guess", (req, res) => {
  const guess = parseInt(req.body.guess);
  let message = "";

  if (guess > randomNumber) {
    message = "📉 Lower!";
  } else if (guess < randomNumber) {
    message = "📈 Higher!";
  } else {
    message = "🎉 Correct! New number generated.";
    randomNumber = Math.floor(Math.random() * 100) + 1;
  }

  res.json({ message });
});

app.listen(3000, "0.0.0.0", () =>
  console.log("Server running on port 3000")
);