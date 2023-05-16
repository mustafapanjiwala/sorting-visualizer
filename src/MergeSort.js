import React, { useState, useEffect } from 'react';

function MergeSort() {
  const [array, setArray] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [animations, setAnimations] = useState([]);
  const [stepByStep, setStepByStep] = useState(false);
  const [started, setStart] = useState(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < 20; i++) {
      newArray.push(getRandomInt(5, 400));
    }
    setArray(newArray);
    if (stepByStep) {
      setAnimations([]);
      setCurrentStep(0);
      setStart(false);
      setStepByStep(false);
    }
    for (let i = 0; i < array.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const barStyle = arrayBars[i].style;
      const colorClass = '#3498db';
      barStyle.backgroundColor = colorClass;
    }
  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const mergeSort = () => {
    const sortedArray = [...array];
    const animations = [];
    mergeSortHelper(sortedArray, 0, sortedArray.length - 1, animations);

    animateSort(animations);
  };

  function mergeSortHelper(array, startIdx, endIdx, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(array, startIdx, middleIdx, animations);
    mergeSortHelper(array, middleIdx + 1, endIdx, animations);
    merge(array, startIdx, middleIdx, endIdx, animations);
  }

  function merge(array, startIdx, middleIdx, endIdx, animations) {
    const leftArray = array.slice(startIdx, middleIdx + 1);
    const rightArray = array.slice(middleIdx + 1, endIdx + 1);
    let i = 0,
      j = 0,
      k = startIdx;
    while (i < leftArray.length && j < rightArray.length) {
      if (leftArray[i] <= rightArray[j]) {
        animations.push([k, leftArray[i], false]);
        array[k++] = leftArray[i++];
      } else {
        animations.push([k, rightArray[j], false]);
        array[k++] = rightArray[j++];
      }
    }
    while (i < leftArray.length) {
      animations.push([k, leftArray[i], false]);
      array[k++] = leftArray[i++];
    }
    while (j < rightArray.length) {
      animations.push([k, rightArray[j], false]);
      array[k++] = rightArray[j++];
    }
    for (let i = startIdx; i <= endIdx; i++) {
      animations.push([i, array[i], true]);
    }
  }

  function animateSort(animations) {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [idx, newHeight, isMerge] = animations[i];
      const barStyle = arrayBars[idx].style;
      const colorClass = isMerge ? 'green' : 'red';
      setTimeout(() => {
        barStyle.height = `${newHeight}px`;
        barStyle.backgroundColor = colorClass;
      }, i * 50);
    }
  }

  function animateSortSteByStep() {
    const [idx, newHeight, isMerge] = animations[currentStep];
    const arrayBars = document.getElementsByClassName('array-bar');
    const barStyle = arrayBars[idx].style;
    const colorClass = isMerge ? 'green' : 'red';
    barStyle.height = `${newHeight}px`;
    barStyle.backgroundColor = colorClass;
    setCurrentStep(currentStep + 1);
  }

  const handleNextClick = () => {
    if (started) {
      if (currentStep < animations.length) {
        animateSortSteByStep();
      }
    } else {
      setStart(true);
      setStepByStep(true);
      const sortedArray = [...array];
      const animations = [];
      mergeSortHelper(sortedArray, 0, sortedArray.length - 1, animations);
      setAnimations(animations);
      setCurrentStep(0);
    }
  };

  return (
    <div className='merge-sort'>
      <div className='array-container'>
        {array.map((value, idx) => (
          <div
            className='array-bar'
            key={idx}
            style={{ height: `${value}px`, backgroundColor: '#3498db' }}
          ></div>
        ))}
      </div>
      <div className='controls'>
        <button onClick={resetArray}>Generate New Elements</button>
        <button onClick={mergeSort}>Sort Elements</button>
        <button onClick={handleNextClick}>
          {started ? 'Next' : 'Start step by step sorting'}
        </button>
      </div>
    </div>
  );
}

export default MergeSort;
