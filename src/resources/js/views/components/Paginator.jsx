import ReactPaginate from 'react-paginate'
import React from 'react'

const Pagination = (props) => {
  const { dataCounts, setStartNumber, pageItems, currentPage } = props;
  const totalPageCount = Math.ceil(dataCounts / pageItems);

  // ページクリック時のイベント
  const handlePaginate = (selectedPage) => {
    // selectedPage.selectedには、ページ番号 - 1が入る
    const page = selectedPage.selected * pageItems;
    setStartNumber(page);
    history.pushState({}, '', `?page=${selectedPage.selected + 1}`);
  }

  return (
    <div className='py-3 px-2 my-5 glass-white rounded-[50px]'>
      <ReactPaginate
        forcePage={currentPage} // 現在のページをreactのstateで管理したい場合等
        pageCount={totalPageCount}
        onPageChange={handlePaginate}
        marginPagesDisplayed={1} // 先頭と末尾に表示するページ数
        pageRangeDisplayed={0} // 現在のページの前後をいくつ表示させるか
        containerClassName="flex items-center gap-y-5 gap-x-1 justify-center" // ul(pagination本体)
        pageClassName="inline-flex items-center mx-1 rounded-full justify-center glass-white font-bold text-base h-10 w-10" // li
        pageLinkClassName="inline-flex items-center rounded-full justify-center font-bold text-base h-10 w-10" // a
        activeClassName="glass-teal" // active.li
        activeLinkClassName="" // active.li < a

        // 戻る・進む関連
        previousClassName="rounded-3xl glass-white h-10 w-20 flex justify-center items-center font-bold" // li
        nextClassName="rounded-3xl glass-white h-10 w-20 flex justify-center items-center font-bold" // li
        previousLabel={'BACK'} // a
        previousLinkClassName="previous-link"
        nextLabel={'NEXT'} // a
        nextLinkClassName="next-link"

        // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
        disabledClassName="disabled-button hidden"

        // 中間ページの省略表記関連
        breakLabel="..."
        breakClassName="font-bold"
        breakLinkClassName="page-link"
      />
    </div>
  )
}

export default Pagination
