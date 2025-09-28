/*
=======================================
📘 JavaScript & Web APIs Lab — SOLUTION
All tasks in one file (script.js)
=======================================
*/

// Small helper
const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  /*
  =======================================
  TODO1: Welcome Board
  ---------------------------------------
  When the page loads, display a welcome message 
  inside the <p> element with id="t1-msg".
  */
  const t1Msg = $("t1-msg");
  if (t1Msg) t1Msg.textContent = "Hello, World!";

  /*
  =======================================
  TODO2: Interaction Corner
  ---------------------------------------
  Button id="t2-btn" updates <p id="t2-status">
  */
  const t2Btn = $("t2-btn");
  const t2Status = $("t2-status");
  if (t2Btn && t2Status) {
    t2Btn.addEventListener("click", () => {
      t2Status.textContent = "You clicked the button!";
    });
  }

  /*
  =======================================
  TODO3: Inspiring Quote Board
  ---------------------------------------
  Fetch a random quote and show text & author.
  API: https://dummyjson.com/quotes/random
  (Sometimes examples show `content`; dummyjson uses `quote`.
  We'll support both to be safe.)
  */
  const t3Btn = $("t3-loadQuote");
  const t3Quote = $("t3-quote");
  const t3Author = $("t3-author");

  if (t3Btn && t3Quote && t3Author) {
    t3Btn.addEventListener("click", async () => {
      t3Btn.disabled = true;
      t3Btn.textContent = "Loading…";
      t3Quote.textContent = "";
      t3Author.textContent = "";

      try {
        const res = await fetch("https://dummyjson.com/quotes/random");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Support both shapes:
        // { content, author }  OR  { quote, author }
        const quoteText = data.content ?? data.quote ?? "No quote text found.";
        const authorText = data.author ?? "Unknown";

        t3Quote.textContent = quoteText;
        t3Author.textContent = `— ${authorText}`;
      } catch (err) {
        t3Quote.textContent = "Failed to load quote. Please try again.";
        t3Author.textContent = "";
        console.error("Quote fetch error:", err);
      } finally {
        t3Btn.disabled = false;
        t3Btn.textContent = "Load Quote";
      }
    });
  }

  /*
  =======================================
  TODO4: Dammam Weather Now
  ---------------------------------------
  Fetch current weather via OpenWeatherMap.
  Replace YOUR_API_KEY below.
  */
  const t4Btn = $("t4-loadWx");
  const t4Temp = $("t4-temp");
  const t4Hum = $("t4-hum");
  const t4Wind = $("t4-wind");

  if (t4Btn && t4Temp && t4Hum && t4Wind) {
    t4Btn.addEventListener("click", async () => {
        const API_KEY ="290ead170e7e4b029a176f486df1080d";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Dammam,SA&appid=${API_KEY}&units=metric`;

      t4Btn.disabled = true;
      const originalLabel = t4Btn.textContent;
      t4Btn.textContent = "Loading…";

      // Clear previous
      t4Temp.textContent = "";
      t4Hum.textContent = "";
      t4Wind.textContent = "";

      try {
        const res = await fetch(url);
        if (!res.ok) {
          // Common cause is invalid API key (401)
          throw new Error(`HTTP ${res.status} — check API key & URL`);
        }
        const data = await res.json();

        const temp = data?.main?.temp;
        const hum = data?.main?.humidity;
        const wind = data?.wind?.speed;

        t4Temp.textContent = (temp ?? "—") + (temp != null ? " °C" : "");
        t4Hum.textContent = (hum ?? "—") + (hum != null ? " %" : "");
        t4Wind.textContent = (wind ?? "—") + (wind != null ? " m/s" : "");
      } catch (err) {
        t4Temp.textContent = "Error";
        t4Hum.textContent = "Error";
        t4Wind.textContent = "Error";
        console.error("Weather fetch error:", err);
      } finally {
        t4Btn.disabled = false;
        t4Btn.textContent = originalLabel;
      }
    });
  }
});
