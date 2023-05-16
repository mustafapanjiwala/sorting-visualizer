import React, { useState } from 'react';
import './App.css';
import MergeSort from './MergeSort';
import QuickSort from './QuickSort';

const App = () => {
  const [isMergeSelected, setIsMergeSelected] = useState(true);

  return (
    <div>
      <div className='header'>
        <h2
          className={isMergeSelected && 'selected'}
          onClick={() => setIsMergeSelected(true)}
        >
          Merge Sort
        </h2>
        <h2
          className={!isMergeSelected && 'selected'}
          onClick={() => setIsMergeSelected(false)}
        >
          Quick Sort
        </h2>
      </div>
      {isMergeSelected ? <MergeSort /> : <QuickSort />}
    </div>
  );
};

export default App;
