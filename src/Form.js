import React, { useState } from "react";

function Form() {
  const [cologne, setCologne] = useState("");
  const [temperature, setTemperature] = useState("summer");
  const [results, setResults] = useState([]);
  const [submissionBox, setSubmissionBox] = useState(false);
  const [userInput, setUserInput] = useState("");

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
    <div className="form">
      <h1>Find your Scent</h1>
      <form className="cologneForm" onSubmit={handleSubmit}>
        <fieldset>
          <label for="button-1">What're we going for? </label>
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
        <p className="results">
          "nothing for you yet, we'll get you next time"
        </p>
      ) : (
        <ul>
          {results.map((result) => (
            <li className="results">{result}</li>
          ))}
        </ul>
      )}
      <input
        type={"submit"}
        className="addscent"
        value="are we missing scents? 😮‍💨"
        onClick={() => setSubmissionBox(true)}
      />

      {submissionBox && (
        <div>
          <textarea
            placeholder="Tell us some of your favorites here :)"
            rows="2"
            cols="40"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
          <button onClick={() => setSubmissionBox(false)}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default Form;
