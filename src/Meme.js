import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

export default function Meme(props) {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeUrl, setMemeUrl] = useState(
    'https://api.memegen.link/images/aag.png',
  );
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  // fechtes data from website use async and await to wait
  // for the promise(successfully fetched or rejected)
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.memegen.link/templates');
      const data = await response.json();

      // takes the first 100 templates and put them in templates with setTemplates
      setTemplates(data.slice(0, 100).map((template) => template.id));

      // The first Template is shown when selecting templates in the select option
      setSelectedTemplate(data[0].id);
    }

    fetchData();

    // Empty Array is put so the code is only executed once
  }, []);

  useEffect(() => {
    // To combat the too many redirect error because of the empty strings
    // in toptext and bottom text
    let encodedTopText = encodeURIComponent(' ');
    if (topText !== '') {
      encodedTopText = encodeURIComponent(topText);
    }

    let encodedBottomText = encodeURIComponent(' ');
    if (bottomText !== '') {
      encodedBottomText = encodeURIComponent(bottomText);
    }
    // Puts toptext and bottomtext to the selected template
    // so it can be displayed and downloaded
    setMemeUrl(
      `https://api.memegen.link/images/${selectedTemplate}/${encodeURIComponent(
        encodedTopText,
      )}/${encodeURIComponent(encodedBottomText)}.png`,
    );
  }, [selectedTemplate, topText, bottomText]);

  // When a name is typed in the searchbar + press enter it looks
  // for the matching template, If there is one, selectedTemplate is updated
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      const memeName = event.target.value;
      const matchingTemplate = templates.find((template) =>
        template.includes(memeName),
      );
      setSelectedTemplate(matchingTemplate);
    }
  }

  // Download created Meme and saves it on local computer
  function downloadMeme() {
    const fileName = `${selectedTemplate}/${topText}/${bottomText}.jpg`;
    const url = `https://api.memegen.link/images/${selectedTemplate}/${encodeURIComponent(
      topText,
    )}/${encodeURIComponent(bottomText)}.jpg`;
    saveAs(url, fileName);
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
        <label htmlFor="searchMeme">Search Meme Template</label>
        <input id="searchMeme" name="searchMeme" onKeyDown={handleKeyPress} />
      </form>
      <div>
        {!!memeUrl && (
          <img data-test-id="meme-image" src={memeUrl} alt="Generated meme" />
        )}
      </div>
      <div>
        <button onClick={downloadMeme}>Download</button>
      </div>
    </div>
  );
}
