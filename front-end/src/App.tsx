import './style/App.css';
import {Components} from './components';

function App() {
  console.log(process.env.REACT_APP_UW_LIBRARY_RESERVATION_LINK);
  return (
    <div className="App">
      <Components />
    </div>
  );
}

export default App;
