import './App.css';
import AppTask from './components/Task';

function App() {
  return (
    <div
      className="App"
      style={{
        width: '35vw',
        backgroundColor: 'white',
        padding: '30px 40px',
        borderRadius: '8px',
        boxShadow: '0px 0px 16px -4px rgba(0, 0, 0, 0.8)',
      }}
    >
      <AppTask />
    </div>
  );
}

export default App;
