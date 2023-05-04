import React, { useState } from 'react';

export default function Meme() {
  const [inputText, setInputText] = useState({
    topText: '',
    bottomText: '',
  });
  const [randomImage, setRandomImage] = useState(
    'https://api.memegen.link/images/buzz/memes/memes_everywhere.gif',
  );
  const preventSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setInputText({
      ...inputText,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <div className="meme-container">
      <form onSubmit={preventSubmit}>
        <label htmlFor="topText">Top Text</label>
        <input
          id="topText"
          name="topText"
          value={inputText.topText}
          onChange={handleChange}
        />
        <label htmlFor="bottomText">Bottom Text</label>
        <input
          id="bottomText"
          name="bottomText"
          value={inputText.bottomText}
          onChange={handleChange}
        />
        <button>Generate Meme</button>
      </form>
    </div>
  );
}
