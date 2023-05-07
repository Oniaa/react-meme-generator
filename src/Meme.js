import React, { useEffect, useState } from 'react';

export default function Meme(props) {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeUrl, setMemeUrl] = useState(
    'https://api.memegen.link/images/aag.png',
  );
  const [templates, setTemplates] = useState([]);
  const [randomMeme, setRandomMeme] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.memegen.link/templates');
      const data = await response.json();
      const memeArray = [];
      for (let i = 0; i < data.length; i++) {
        memeArray.push(data[i]);
      }
      setTemplates(memeArray);
      // console.log(data[i].blank);
      // console.log(memeArray);
    }
    fetchData();
  }, []);

  /*   useEffect(() => {
    if (templates.length > 0) {
      console.log(templates);
    }
  }); */

  function handleSubmit(event) {
    event.preventDefault();
    const apiUrl = `https://api.memegen.link/images/${
      randomMeme.id
    }/${encodeURIComponent(topText)}/${encodeURIComponent(bottomText)}.png`;
    setMemeUrl(apiUrl);
  }

  return (
    <div className="meme-container">
      <form onSubmit={handleSubmit}>
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
        <button>Generate Meme</button>
      </form>
      {randomMeme && (
        <div>
          <img data-test-id="meme-image" src={memeUrl} alt="random meme" />
        </div>
      )}
    </div>
  );
}
