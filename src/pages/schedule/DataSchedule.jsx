import DefaultLayout from "../../layout/DefaultLayout";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

const DataSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const limit = 1;
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/schedules?search_query=${keyword}&page=${page}&limit=${limit}`
      );
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      setSchedules(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [page, keyword]);

  const changePage = ({ selected }) => {
    setPage(selected);
    setMessage(
      selected === 9
        ? "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
        : ""
    );
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMessage("");
    setKeyword(query);
  };

  return (
    <DefaultLayout>
      <div>
        <Link to="/schedule/add" className="btn btn-primary">
          Tambah
        </Link>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((item, index) => (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <td>{item.student.name}</td>
                  <td>{item.class}</td>
                  <td>
                    <Link to={`/schedule/detail/${item.uuid}`} className="btn">
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4 rounded-sm">
            <nav
              className=""
              key={rows}
              role="navigation"
              aria-label="pagination"
            >
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={Math.min(10, pages)}
                onPageChange={changePage}
                containerClassName={
                  "flex items-center h-8 -space-x-px text-sm "
                }
                pageLinkClassName={
                  "flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                }
                previousLinkClassName={
                  "flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                }
                nextLinkClassName={
                  "flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                }
                activeLinkClassName={
                  "z-10 flex items-center justify-center h-8 px-3 leading-tight border text-primary-600 border-primary-300 bg-primary-50 hover:bg-primary-100 hover:text-primary-700 "
                }
                disabledLinkClassName={"pagination-link is-disabled"}
              />
            </nav>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DataSchedule;
