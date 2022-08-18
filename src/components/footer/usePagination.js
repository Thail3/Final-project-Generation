import { useMemo } from "react";

export const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalActivities,
  pageSize,
  siblingCount = 1,
  pageNumber,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalActivities / pageSize);
    console.log("paginationRange totalPageCount", totalPageCount);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const startPage = Math.max(1, pageNumber - siblingCount);
    const endPage = Math.min(totalPageCount, pageNumber + siblingCount);

    const shouldShowLeftDots = startPage > 2;
    const shouldShowRightDots = endPage < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalActivities, pageSize, siblingCount, pageNumber]);

  return paginationRange;
};
