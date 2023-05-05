/* import React, { useEffect, useState } from 'react';

export default function Meme() {
  const [inputText, setInputText] = useState({
    topText: '',
    bottomText: '',
  });

  const [randomImage, setRandomImage] = useState(
    'https://api.memegen.link/images/buzz/memes/memes_everywhere.gif',
  );

  function preventSubmit(event) {
    event.preventDefault();
  }

  function handleInputChange(event) {
    setInputText({
      ...inputText,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  const [randomMeme, setRandomMeme] = useState('');
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.memegen.link/templates');
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        setTemplates(data[i].blank);
      }
    }
    fetchData();
  }, []);

  console.log(templates);

  return (
    <div className="meme-container">
      <form onSubmit={preventSubmit}>
        <label htmlFor="topText">Top Text</label>
        <input
          id="topText"
          name="topText"
          value={inputText.topText}
          onChange={handleInputChange}
        />
        <label htmlFor="bottomText">Bottom Text</label>
        <input
          id="bottomText"
          name="bottomText"
          value={inputText.bottomText}
          onChange={handleInputChange}
        />
        <button>Generate Meme</button>
      </form>
      <div>
        <img data-test-id="meme-image" src={randomImage} alt="random meme" />
        <h2 className="top">{inputText.topText}</h2>
        <h2 className="bottom">{inputText.bottomText}</h2>
      </div>
    </div>
  );
} */
