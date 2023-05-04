import React, { useState } from 'react';

export default function Meme() {
  const [inputText, setInputText] = useState({
    topText: '',
    bottomText: '',
  });
  const [randomImage, setRandomImage] = useState(
    'https://api.memegen.link/images/buzz/memes/memes_everywhere.gif',
  );
  return (
    <div className="meme-container">
      <form>
        <input name="topText" />
        <input name="bottomText" />
      </form>
    </div>
  );
}
