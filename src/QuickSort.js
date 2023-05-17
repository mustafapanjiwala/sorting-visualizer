import React, { useEffect, useState } from 'react';

const QuickSort = () => {
  const [array, setArray] = useState([]);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [sortingIndex, setSortingIndex] = useState(-1);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < 20; i++) {
      newArray.push(randomIntFromInterval(5, 400));
    }
    setArray(newArray);
    setHighlightedIndices([]);
    setSortingIndex(-1);
  };

  const quickSort = async (arr, start, end) => {
    if (start >= end) return;

    const pivotIndex = await partition(arr, start, end);

    await Promise.all([
      quickSort(arr, start, pivotIndex - 1),
      quickSort(arr, pivotIndex + 1, end),
    ]);
  };

  const partition = async (arr, start, end) => {
    const pivotValue = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
      setHighlightedIndices([i, pivotIndex]);

      if (arr[i] < pivotValue) {
        await swap(arr, i, pivotIndex);
        pivotIndex++;
      }
    }
    setHighlightedIndices([pivotIndex, end]);

    await swap(arr, pivotIndex, end);
    setHighlightedIndices([]);
    return pivotIndex;
  };

  const swap = (arr, i, j) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        setArray([...arr]);
        resolve();
      }, 50);
    });
  };

  const handleNextStep = () => {
    if (sortingIndex == -1) {
      setSortingIndex(0);
    } else {
      if (sortingIndex < array.length) {
        const newIndex = sortingIndex + 1;
        setSortingIndex(newIndex);
        quickSortStepByStep(array, newIndex);
      }
    }
  };

  const quickSortStepByStep = async (arr, index) => {
    if (index > arr.length - 1) return;

    const pivotIndex = await partition(arr, 0, index);
    setSortingIndex(pivotIndex);
  };

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <div className='container'>
      <div className='leftContainer'>
        <h1 className='title'>About the Quick Sort</h1>
        <div className='content'>
          <div className='desc'>
            <p>
              Quick sort also uses a divide-and-conquer strategy. It selects a
              "pivot" element from the list and rearranges the other elements
              around the pivot, such that all elements smaller than the pivot
              are placed to its left and all elements greater than the pivot are
              placed to its right. This partitioning step is performed
              recursively on the sublists formed on both sides of the pivot
              until the entire list is sorted.
            </p>
          </div>
          <div className='performance'>
            <ul>
              <li>
                <b>Worst complexity:</b> n^2
              </li>
              <li>
                <b>Average complexity:</b> n*log(n)
              </li>
              <li>
                <b>Best complexity:</b> n*log(n)
              </li>
              <li>
                <b>Space complexity:</b> log(n)
              </li>
              <li>
                <b>Method:</b> Partitioning
              </li>
              <li>
                <b>Stable:</b> No
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='rightContainer'>
        <div className='array-container'>
          {array.map((value, idx) => (
            <div
              className={`array-bar ${
                highlightedIndices.includes(idx) ? 'highlighted' : ''
              } ${idx === sortingIndex ? 'sorting' : ''}`}
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <div className='controls'>
          <button onClick={generateArray}>Generate New Elements</button>
          <button onClick={() => quickSort(array, 0, array.length - 1)}>
            Sort Elements
          </button>
          <button onClick={handleNextStep}>
            {sortingIndex < 0 ? 'Start step by step sorting' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickSort;
