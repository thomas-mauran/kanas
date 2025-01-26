import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch"; // Now using import instead of require

const app = express();
const PORT = process.env.PORT || 80;
const KANAS_BACKEND_SERVICE_HOST = process.env.KANAS_BACKEND_SERVICE_HOST;

// Streak variables
let streak = 0; // Initialize streak counter
let previousAnswerCorrect = false; // Track the previous answer correctness

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Routes
app.get("/", async (req, res) => {
  try {
    console.log("Fetching Kana...", `http://${KANAS_BACKEND_SERVICE_HOST}/kana`);
    const response = await fetch(`http://${KANAS_BACKEND_SERVICE_HOST}/kana`);
    const data = await response.json();
    res.render("index", { 
      currentKana: data.kana, 
      resultMessage: "", 
      userAnswer: "", 
      streak: streak 
    });
  } catch (error) {
    console.error("Error fetching Kana:", error);
    res.render("index", { 
      currentKana: "Error fetching Kana", 
      resultMessage: "", 
      userAnswer: "", 
      streak: streak 
    });
  }
});

app.post("/", async (req, res) => {
  const { currentKana, userAnswer } = req.body;
  let resultMessage = "Incorrect, try again.";
  
  try {
    // Check if the answer is correct
    const response = await fetch(`${KANAS_BACKEND_SERVICE_HOST}/kana/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kana: currentKana, romaji: userAnswer }),
    });
    const data = await response.json();

    if (data.correct) {
      resultMessage = "Correct! Here's another one:";

      // Update streak if the answer is correct
      if (previousAnswerCorrect) {
        streak++;
      } else {
        streak = 1; // Reset streak to 1 for the first correct answer
      }
      previousAnswerCorrect = true;
    } else {
      // Reset streak on incorrect answer
      previousAnswerCorrect = false;
      streak = 0;
    }

    // Fetch new Kana after each attempt
    const newKanaResponse = await fetch(`${KANAS_BACKEND_SERVICE_HOST}/kana`);
    const newKanaData = await newKanaResponse.json();

    res.render("index", { 
      currentKana: newKanaData.kana, 
      resultMessage: resultMessage, 
      userAnswer: "", 
      streak: streak // Pass the streak to the view
    });

  } catch (error) {
    console.error("Error checking answer:", error);
    res.render("index", { 
      currentKana, 
      resultMessage: "Error checking answer.", 
      userAnswer, 
      streak: streak 
    });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
