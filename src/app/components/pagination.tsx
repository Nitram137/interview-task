"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  hasPrevious,
  hasNext,
}: {
  hasPrevious: boolean;
  hasNext: boolean;
}) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePagination = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="join">
      <button
        className="join-item btn"
        disabled={!hasPrevious}
        onClick={() => handlePagination(currentPage - 1)}
      >
        {"<"}
      </button>
      <button className="join-item btn">{"Page " + currentPage}</button>
      <button
        className="join-item btn"
        disabled={!hasNext}
        onClick={() => handlePagination(currentPage + 1)}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
