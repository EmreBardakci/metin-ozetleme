import { useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const [text, setText] = useState("");
  const [summarizedtext, setsummarizedtext] = useState("");
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  const HandleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(text),
        temperature: 0.6,
        max_tokens: 1000,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setsummarizedtext(res?.data?.choices[0]?.text);
        }
      })
      .catch((err) => {
        console.log(err, "Bir Hata Oluştu..");
      });
  };

  function generatePrompt(text) {
    return `Summarize this ${text}. and break them into seperate line`;
  }

  return (
    <div className="App_">
      <div className="header">
        <h1 className="header_text">
          <span className="text_active">Metin Özetleyici</span>
        </h1>
        <h2 className="header_summary">
          {" "}
          Metninizi saha kısa bir uzunlukla özetleyin
        </h2>
      </div>
      <div className="container">
        <div className="text_form">
          <form>
            <label>Metninizi buraya yazın/yapıştırın</label>
            <textarea
              cols={80}
              rows={14}
              placeholder="Metninizi buraya yazın"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </form>
        </div>
        <div>
          <button type="button" onClick={HandleSubmit}>
            {loading ? "yükleniyor.." : "Özetle"}
          </button>
        </div>
        <div className="summarized_text">
          <label>Özetlenmiş Metin</label>
          <textarea
            placeholder="Özetlenmiş metin"
            value={summarizedtext}
            onChange={(e) => setText(e.target.value)}
            cols={80}
            rows={14}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
