"use client"

import React from 'react';
import './Pagination.css';
import { RightArrow } from '@/assets/LogoSvgs';

const PaginationLogic = (props) => {
  const { size, step, onClickHandler, currentPageNum } = props;

  const showingNumbers = step * 2 + 1;
  let startNumber = 2;
  let startArrayNumber = props.step;

  let needStartDots = false;
  let needEndDots = false;

  if (currentPageNum > step) {
    startArrayNumber = currentPageNum - step;

    needStartDots = currentPageNum > step + startNumber ? true : false;
  }

  if (size > showingNumbers) {
    needEndDots = size > currentPageNum + step + 1 ? true : false;

    if (size < currentPageNum + step + 1) {
      startArrayNumber = size - showingNumbers;
    }
  }

  let contentNumber;

  return (
    <ul className="pagination">
      {currentPageNum > 1 ? (
        <li className="page-item prev arrow-icon transform scale-x-[-1]" 
        onClick={() => onClickHandler(currentPageNum - 1)}>
          <RightArrow />
        </li>
      ) : (
        <li className="page-item prev arrow-icon disabled transform scale-x-[-1]">
          <RightArrow />
        </li>
      )}
      {size > showingNumbers + startNumber ? (
        <>
          <li
            onClick={(e) => onClickHandler(e.currentTarget.textContent)}
            className={`page-item ${currentPageNum === 1 && "active"}`}
          >
            1
          </li>

          {needStartDots && <span>...</span>}
          {[...Array(showingNumbers)].map((_, i) => {
            contentNumber = needStartDots ? startArrayNumber : startNumber;
            startNumber++;
            startArrayNumber++;
            return (
              <li
                key={i}
                className={`page-item ${currentPageNum === contentNumber && "active"}`}
                onClick={(e) => onClickHandler(e.currentTarget.textContent)}
              >
                {contentNumber}
              </li>
            );
          })}
          {needEndDots && <span>...</span>}
          <li
            className={`page-item ${currentPageNum === size && "active"}`}
            onClick={(e) => onClickHandler(e.currentTarget.textContent)}
          >
            {size}
          </li>
        </>
      ) : (
        (() => {
          startArrayNumber = 1;
          return [...Array(size)].map((_, i) => {
            startNumber++;
            return (
              <li
                key={i}
                className={`page-item ${currentPageNum === startArrayNumber && "active"}`}
                onClick={(e) => onClickHandler(e.currentTarget.textContent)}
              >
                {startArrayNumber++}
              </li>
            );
          });
        })()
      )}
      {currentPageNum < size ? (
        <li className="page-item next arrow-icon" onClick={() => onClickHandler(currentPageNum + 1)}>
          <RightArrow />
        </li>
      ) : (
        <li className="page-item next arrow-icon disabled">
          <RightArrow />
        </li>
      )}
    </ul>
  );
};



export default PaginationLogic;


  

  