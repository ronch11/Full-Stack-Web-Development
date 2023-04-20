import logo from './logo.svg';
import './App.css';

import {Game} from './components/game';

function App() {
  return (
    <div className="flex flex-col space-y-8 h-screen w-screen antialiased bg-slate-100 p-4 prose">
      <header className="text-2xl">
        <h1 className="text-4xl text-slate-800 text-center lg:text-6xl">Get to 100</h1>
      </header>
      <main className="bg-slate-200 border-2 border-slate-800 p-4 rounded-xl flex-grow">
        <Game />
      </main>
    </div>
  );
}

export default App;
