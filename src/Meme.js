import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

export default function Meme() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeUrl, setMemeUrl] = useState(
    'https://api.memegen.link/images/aag.png',
  );
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  // fetch data from website
  useEffect(() => {
    function fetchData() {
      fetch('https://api.memegen.link/templates')
        .then((response) => response.json())
        .then((data) => {
          // takes the first 100 templates and put them in templates with setTemplates
          setTemplates(data.slice(0, 100).map((template) => template.id));

          // The first Template is shown when selecting templates in the select option
          setSelectedTemplate(data[0].id);
        })
        .catch((error) => console.error(error));
    }
    fetchData();

    // Empty Array is put so the code is only executed once
  }, []);

  useEffect(() => {
    const encodedTopText = encodeURIComponent(topText);
    const encodedBottomText = encodeURIComponent(bottomText);
    // To combat the too many redirect error because of the empty strings
    // in toptext and bottom text
    /*  let encodedTopText = encodeURIComponent(' ');
    if (topText !== '') {
      encodedTopText = encodeURIComponent(topText);
    }

    let encodedBottomText = encodeURIComponent(' ');
    if (bottomText !== '') {
      encodedBottomText = encodeURIComponent(bottomText);
    } */
    // Puts toptext and bottomtext to the selected template
    // so it can be displayed and downloaded
    setMemeUrl(
      `https://api.memegen.link/images/${selectedTemplate}/${encodeURIComponent(
        encodedTopText,
      )}/${encodeURIComponent(encodedBottomText)}.png`,
    );
  }, [selectedTemplate, topText, bottomText]);

  // Clears search Meme when clicked
  function clearSearchMeme(event) {
    event.currentTarget.value = '';
  }

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
    let url = `https://api.memegen.link/images/${selectedTemplate}.jpg`;
    if (topText) {
      url = `https://api.memegen.link/images/${selectedTemplate}/${topText}.jpg`;
    }
    if (bottomText) {
      url = `https://api.memegen.link/images/${selectedTemplate}/_/${bottomText}.jpg`;
    }
    if (topText && bottomText) {
      url = `https://api.memegen.link/images/${selectedTemplate}/${topText}/${bottomText}.jpg`;
    }
    const fileName = `${selectedTemplate}/${topText}/${bottomText}.jpg`;
    saveAs(url, fileName);
  }

  return (
    <div className="memeContainer">
      <div className="Text">
        <h2>Create your own Meme</h2>
        <ol>
          <li>
            Choose a meme template:
            <br />
            Select a meme template from the drop-down list or use the search bar
            to find a specific template.
          </li>
          <li>
            Add your text:
            <br />
            Type in the top and bottom text fields to add your own captions to
            the meme.
          </li>
          <li>
            Download the meme:
            <br />
            If you're happy with your meme, click on the "Download" button to
            save it to your device.
          </li>
        </ol>
      </div>
      <div className="formWrapper">
        <form
          className="formContainer"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label htmlFor="selectedTemplate">
            Meme template
            <br />
            <select
              id="selectedTemplate"
              value={selectedTemplate}
              onChange={(event) =>
                setSelectedTemplate(event.currentTarget.value)
              }
            >
              {templates.map((template) => (
                <option key={`template-${template.id}`} value={template}>
                  {template}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Search Meme template
            <input
              name="searchMeme"
              onClick={clearSearchMeme}
              onKeyDown={handleKeyPress}
            />
          </label>
          <br />
          <label>
            Top text
            <br />
            <input
              name="topText"
              value={topText}
              onChange={(event) => setTopText(event.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            Bottom text
            <br />
            <input
              name="bottomText"
              value={bottomText}
              onChange={(event) => setBottomText(event.currentTarget.value)}
            />
          </label>
        </form>
        <div className="downloadbtn">
          <button onClick={downloadMeme}>Download</button>
        </div>
      </div>
      <div className="rightSide">
        <div className="meme">
          {!!memeUrl && (
            <img
              style={{ width: 350 }}
              data-test-id="meme-image"
              src={memeUrl}
              alt="Generated meme"
            />
          )}
        </div>
      </div>
    </div>
  );
}
