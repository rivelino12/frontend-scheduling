import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

const DataStudent = () => {
  const [students, setStudents] = useState([]);
  const limit = 10;
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStudents();
  }, [page, keyword]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/students?search_query=${keyword}&page=${page}&limit=${limit}`
      );
      setStudents(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between mb-4">
          <form onSubmit={searchData}>
            <div className="flex">
              <label
                htmlFor="search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Cari
              </label>

              <div className="relative w-full">
                <input
                  type="search"
                  onChange={(e) => setQuery(e.target.value)}
                  id="search"
                  className="block p-2.5 w-96 rounded-l-lg z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg  border-2 border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                  placeholder="Cari"
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-primary-700 rounded-r-lg border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <Link to="/student/add" className="btn btn-primary">
            Tambah
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Jenis Kelamin</th>
              <th>Orang Tua</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {students.map((data, index) => (
              <tr key={data.uuid}>
                <th>{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.gender === "MALE" ? "Laki-laki" : "Perempuan"}</td>
                <td>{data.user.name}</td>
                <td className="flex items-center space-x-4">
                  <Link to={`/student/edit/${data.uuid}`} className="btn">
                    Edit
                  </Link>
                  <button className="btn btn-error">Hapus</button>
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
              containerClassName={"flex items-center h-8 -space-x-px text-sm "}
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
    </DefaultLayout>
  );
};

export default DataStudent;
