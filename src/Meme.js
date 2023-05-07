import React, { useEffect, useState } from 'react';

export default function Meme(props) {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeUrl, setMemeUrl] = useState(
    'https://api.memegen.link/images/aag.png',
  );
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

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
    setMemeUrl(
      `https://api.memegen.link/images/${selectedTemplate}/${encodeURIComponent(
        topText,
      )}/${encodeURIComponent(bottomText)}.png`,
    );
  }, [selectedTemplate, topText, bottomText]);

  /*   useEffect(() => {
    if (templates.length > 0) {
      console.log(templates);
    }
  }); */

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
