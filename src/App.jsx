import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [numberType, setNumberType] = useState('p');
  const [prevWindow, setPrevWindow] = useState([]);
  const [currWindow, setCurrWindow] = useState([]);
  const [fetchedNumbers, setFetchedNumbers] = useState([]);
  const [average, setAverage] = useState(0);

  const fetchNumbers = async (type) => {
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${type}`, {
        timeout: 500,
      });
      const data = response.data;

      console.log('Fetched Data:', data);

      if (data && data.windowPrevState && data.windowCurrState && data.numbers && data.avg !== undefined) {
        setPrevWindow(data.windowPrevState);
        setCurrWindow(data.windowCurrState);
        setFetchedNumbers(data.numbers);
        setAverage(data.avg);
      } else {
        console.error('Invalid response structure:', data);
      }
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  useEffect(() => {
    fetchNumbers(numberType);
  }, [numberType]);

  const handleTypeChange = (event) => {
    setNumberType(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator</h1>
        <div>
          <label>
            Select Number Type:
            <select value={numberType} onChange={handleTypeChange}>
              <option value="p">Prime</option>
              <option value="f">Fibonacci</option>
              <option value="e">Even</option>
              <option value="r">Random</option>
            </select>
          </label>
        </div>
        <div>
          <h2>Previous Window State:</h2>
          <pre>{JSON.stringify(prevWindow, null, 2)}</pre>
        </div>
        <div>
          <h2>Current Window State:</h2>
          <pre>{JSON.stringify(currWindow, null, 2)}</pre>
        </div>
        <div>
          <h2>Fetched Numbers:</h2>
          <pre>{JSON.stringify(fetchedNumbers, null, 2)}</pre>
        </div>
        <div>
          <h2>Average:</h2>
          <p>{average.toFixed(2)}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
