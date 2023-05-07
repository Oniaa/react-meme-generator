import React, { useEffect, useState } from 'react';

export default function Meme(props) {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeUrl, setMemeUrl] = useState(
    'https://api.memegen.link/images/aag.png',
  );
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.memegen.link/templates');
      const data = await response.json();
      setTemplates(data.slice(0, 100).map((template) => template.id));
      setSelectedTemplate(data[0].id);
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log(selectedTemplate);
  });

  useEffect(() => {
    setMemeUrl(
      `https://api.memegen.link/images/${selectedTemplate}/${encodeURIComponent(
        topText,
      )}/${encodeURIComponent(bottomText)}.png`,
    );
  }, [selectedTemplate, topText, bottomText]);

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      const memeName = event.target.value;
      const matchingTemplate = templates.find((template) =>
        template.includes(memeName),
      );
      setSelectedTemplate(matchingTemplate);
    }
  }

  return (
    <div className="meme-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label htmlFor="topText">Top Text</label>
        <input
          id="topText"
          name="topText"
          value={topText}
          onChange={(event) => setTopText(event.currentTarget.value)}
        />
        <label htmlFor="bottomText">Bottom Text</label>
        <input
          id="bottomText"
          name="bottomText"
          value={bottomText}
          onChange={(event) => setBottomText(event.currentTarget.value)}
        />
        <label htmlFor="selectedTemplate">Meme Template</label>
        <select
          id="selectedTemplate"
          value={selectedTemplate}
          onChange={(event) => setSelectedTemplate(event.currentTarget.value)}
        >
          {templates.map((template) => (
            <option key={template} value={template}>
              {template}
            </option>
          ))}
        </select>
        <label htmlFor="searchMeme">Search Meme</label>
        <input id="searchMeme" name="searchMeme" onKeyDown={handleKeyPress} />
      </form>
      <div>
        {!!memeUrl && (
          <img data-test-id="meme-image" src={memeUrl} alt="Generated meme" />
        )}
      </div>
      <div>
        <button>Download</button>
      </div>
    </div>
  );
}
