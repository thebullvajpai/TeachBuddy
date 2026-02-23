const container = document.getElementById("practiceContainer");

// Check if Level 1 completed
// const level1Completed = localStorage.getItem("level1_completed");
const level1Completed = true;

if (!level1Completed) {
  container.innerHTML = `
    <div class="card locked">
      <h3>🔒 Level 2 Locked</h3>
      <p>Complete Level 1 first.</p>
    </div>
  `;
} else {
  container.innerHTML = `
    <div class="card">
      <h3>Rearrange Sentences</h3>
      <p>Practice arranging words in correct order.</p>
      <button onclick="location.href='sentence_rearrange.html'">
        Start Practice
      </button>
    </div>

    <div class="card">
      <h3>Translate Sentences</h3>
      <p>Translate Hindi sentences into English.</p>
      <button onclick="location.href='sentence_translation.html'">
        Start Practice
      </button>
    </div>
    <div class="card">
      <h3>Error Correction</h3>
      <p>Find the error and write the correct sentence</p>
      <button onclick="location.href='error_correction.html'">
        Start Practice
      </button>
    </div>
  `;
}
