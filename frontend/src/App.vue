<template>
  <div id="app">
    <h1>Kana Quiz</h1>
    <div id="quiz">
      <p>What is the romaji for: <span id="kana">{{ currentKana }}</span>?</p>
      <input
        type="text"
        id="answer"
        v-model="userAnswer"
        placeholder="Type the romaji here"
        @keyup.enter="checkAnswer"
      />
      <button @click="checkAnswer">Submit</button>
      <p id="result">{{ resultMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backendUrl: import.meta.env.VITE_BACKEND_URL, // Use the VITE_BACKEND_URL environment variable
      currentKana: '',
      userAnswer: '',
      resultMessage: '',
    };
  },
  created() {
    console.log('Backend URL:', this.backendUrl);

    // Fetch the first kana
    this.fetchKana();
  },
  methods: {
    async fetchKana() {
      try {
        const response = await fetch(`${this.backendUrl}/kana`);
        const data = await response.json();
        this.currentKana = data.kana;
        this.resultMessage = '';
        this.userAnswer = '';
      } catch (error) {
        console.error('Error fetching Kana:', error);
        this.resultMessage = 'Error fetching Kana.';
      }
    },
    async checkAnswer() {
      try {
        const response = await fetch(`${this.backendUrl}/kana/check`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ kana: this.currentKana, romaji: this.userAnswer }),
        });
        const data = await response.json();
        this.resultMessage = data.correct ? 'Correct!' : 'Incorrect, try again.';
        if (data.correct) {
          this.fetchKana(); // Fetch a new kana after correct answer
        }
      } catch (error) {
        console.error('Error checking answer:', error);
        this.resultMessage = 'Error checking answer.';
      }
    },
  },
};
</script>
<style>
body {
  font-family: 'Roboto', Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f4f4f4;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #007BFF;
}

#quiz {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

#kana {
  font-size: 40px;
  font-weight: bold;
  color: #444;
  margin: 20px 0;
}

#answer {
  width: 100%;
  padding: 15px;
  margin-top: 15px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}

#answer:focus {
  border-color: #007BFF;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

button {
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
}

#result {
  margin-top: 20px;
  font-size: 18px;
  color: #444;
  font-weight: 500;
}

#result.correct {
  color: #28a745; /* Green for correct answers */
}

#result.incorrect {
  color: #dc3545; /* Red for incorrect answers */
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.5rem;
  }

  #kana {
    font-size: 32px;
  }

  button {
    font-size: 14px;
  }
}
</style>
