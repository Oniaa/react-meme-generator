import './App.css';
import React from 'react';
import logoMeme from './LogoMeme.jpg';

export default function Header() {
  return (
    <header>
      <img className="memeLogo" src={logoMeme} alt="a smiley face" />
      <h1>Meme Generator</h1>
    </header>
  );
}
