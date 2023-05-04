import './App.css';
import Header from './Header';
import Meme from './Meme';

export default function App() {
  return (
    <>
      <div className="app-container">
        <Header />
      </div>
      <div>
        <Meme />
      </div>
    </>
  );
}
