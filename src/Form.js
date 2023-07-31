import React, { useState } from "react";

function Form() {
  const [cologne, setCologne] = useState("");
  const [temperature, setTemperature] = useState("summer");
  const [results, setResults] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("https://my-app.scentopedia.workers.dev/api/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: cologne,
        seasons: temperature,
      }),
    });

    const data = await res.json();
    setResults(data.results);
  }

  return (
    <>
      <h1>Find your Scent</h1>
      <form className="cologneForm" onSubmit={handleSubmit}>
        <fieldset>
          <label for="button-1">How we tryin to smell? </label>
          <input
            id="button-1"
            type={"text"}
            name="button-1"
            value={cologne}
            onChange={(e) => setCologne(e.target.value)}
            required
          />
        </fieldset>
        <br />
        <fieldset>
          <label for="season-button">What season are we in? </label>
          <select
            id="button-2"
            type={""}
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="What season is it?"
            required
          >
            <option value="summer">Summertime</option>
            <option value="winter">Wintertime</option>
            <option value="fall">Falltime</option>
            <option value="spring">Springtime</option>
          </select>
        </fieldset>
        <input type={"submit"} value="and your scent is 👀" />
      </form>

      {results.length === 0 ? (
        "nothing for you yet, we got you next time"
      ) : (
        <ul>
          {results.map((result) => (
            <li>{result}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Form;
