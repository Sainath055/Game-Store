import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getPosts } from '../../actions/posts'
import PaginationLogic from "./PaginationLogic.js";



const Pagination = ({ page }) => {

    const {numberOfPages} = useSelector((state) => state.posts);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) {
          dispatch(getPosts(page));
        }
      }, [dispatch, page]);
      

    const activeHandler = (clickedActive) => {
      const clickedPageNo = parseInt(clickedActive)
      history.push(`/posts?page=${clickedPageNo}`)
    };

    const currentPageNum = Number(page)

  return (
    <>
    <div className='w-full h-max flex py-4 px-2
    items-center justify-center bg-[#efeded]'>
      <PaginationLogic
          currentPageNum={currentPageNum}
          size={numberOfPages}
          step={3}
          onClickHandler={activeHandler}
        />
    </div>
    </> 
  )
}

export default Pagination