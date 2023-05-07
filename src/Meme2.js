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

/*   function putImageText(event) {
    setInputText((prevInputText) => {
      return {
        ...prevInputText,
        [event.currentTarget.name]: event.currentTarget.value,
      };
    });
  } */

/*  useEffect(() => {
    function generateRandomMeme() {
      if (templates.length > 0) {
        const randNum = Math.floor(Math.random() * templates.length);
        const randMeme = templates[randNum];
        setRandomMeme(randMeme);
        // console.log(randMeme);
      }
    }
    generateRandomMeme();
  }, [templates]);
 */
/*  function preventSubmit(event) {
    event.preventDefault();
  } */

/*   function handleSubmit(event) {
    setTopText({
      ...topText,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  } */

/*  import React, { useEffect, useState } from 'react';

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
      setTemplates(memeArray); */
// console.log(data[i].blank);
// console.log(memeArray);
//  }
/*     fetchData();
  }, []); */

/*   useEffect(() => {
    if (templates.length > 0) {
      console.log(templates);
    }
  }); */

/*   function generateRandomMeme() {
    if (templates.length > 0) {
      const randNum = Math.floor(Math.random() * templates.length);
      const randMeme = templates[randNum];
      setRandomMeme(randMeme);
      // console.log(randomMeme);
    }
  }
  useEffect(() => {
    if (templates.length > 0) {
      generateRandomMeme();
    }
  }, [templates]);

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
        <button onClick={generateRandomMeme}>Generate Meme</button>
      </form>
      {randomMeme && (
        <div>
          <img data-test-id="meme-image" src={memeUrl} alt="random meme" />
        </div>
      )}
    </div>
  );
}
 */
