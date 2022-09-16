import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { textCase } from "../utils/formatter";
import ButtonLoader from "./ButtonLoader";
import { BiSearch, BiErrorCircle } from "react-icons/bi";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("Jokes");
  const [loading, setLoading] = useState(true);
  const [loadingPeople, setLoadingPeople] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allPeople, setAllPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [errorPeople, setErrorPeople] = useState(false);
  const [run, setRun] = useState(false);

  const inputRef = useRef();

  const config = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const fetchData = () => {
    const url = "http://chuckswapi.somee.com/publish/chuck/categories";
    const urlPeople = "http://chuckswapi.somee.com/publish/swapi/people";
    axios
      .get(url, config)
      .then((res) => {
        setError(false);
        setLoading(false);
        setAllCategories(res.data);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
    axios
      .get(urlPeople, config)
      .then((res) => {
        setErrorPeople(false);
        setLoadingPeople(false);
        setAllPeople(res.data.results);
      })
      .catch((err) => {
        setErrorPeople(true);
        setLoadingPeople(false);
      });
  };

  const handleSearch = async (term) => {
    setSearchLoading(true);
    setSearchTerm(term);
    if (term.trim()) {
      const searchEndPoint = `http://chuckswapi.somee.com/publish/search?query=${term.trim()}`;
      await axios
        .get(searchEndPoint, config)
        .then((res) => {
          console.log("response data", res);
          setAllPeople(res?.data[0].data?.results);
          setSearchLoading(false);
        })
        .catch((err) => {
          setSearchLoading(false);
        });
      const filterArray = allCategories?.filter((cat) =>
        cat.includes(term.trim())
      );
      setAllCategories(filterArray);
    }
    if (!term.trim()) {
      fetchData();
      setSearchLoading(false);
      setRun(true);
    }
  };

  const handleFilter = (text) => {
    setActiveTab(text);
  };

  useEffect(() => {
    fetchData();
  }, [run]);

  return (
    <div>
      <Container className="my-3">
        <div>
          <p className="font36 font700 fst-italic text-green">ChunkSwapi</p>
        </div>
        <div className="font-16 font-700 navigation-tabs">
          <div className="d-flex border-bottom visitors-table-options">
            <div
              className={
                activeTab === "Jokes"
                  ? "visitors-tabs active-tab"
                  : "visitors-tabs"
              }
              onClick={() => handleFilter("Jokes")}
            >
              <span className="font-700 font-16">Jokes</span>
            </div>
            <div
              className={
                activeTab === "People"
                  ? "visitors-tabs active-tab"
                  : "visitors-tabs"
              }
              onClick={() => handleFilter("People")}
            >
              <span className="font-700 font-16">People</span>
            </div>
          </div>
        </div>
        <div className="my-2 text-end">
          <Row>
            <Col
              xs={12}
              md={3}
              className="py-2 ps-1 bg-white border-4 d-flex align-items-center"
            >
              <BiSearch
                className="font-22 text-ash font-700 pointer ms-2"
                onClick={() => inputRef.current.focus()}
              />
              <input
                type="search"
                ref={inputRef}
                value={searchTerm}
                style={{ border: "1px solid #FFF" }}
                onChange={(e) => handleSearch(e.target.value)}
                className="ms-2 bg-white visitors-search-input w-100"
                placeholder="Search"
              />
            </Col>
          </Row>
        </div>

        {searchLoading && (
          <div
            className="text-center d-flex justify-content-center align-items-center"
            style={{ height: "60vh" }}
          >
            {" "}
            <ButtonLoader />
          </div>
        )}

        {activeTab === "Jokes" && (
          <Row>
            {loading && (
              <div
                className="text-center d-flex justify-content-center align-items-center"
                style={{ height: "60vh" }}
              >
                {" "}
                <ButtonLoader />
              </div>
            )}
            {error && (
              <div
                className="text-center d-flex justify-content-center align-items-center"
                style={{ height: "60vh" }}
              >
                <BiErrorCircle
                  className="text-danger"
                  style={{ fontSize: "60px" }}
                />
                <div>Error loading your data</div>
              </div>
            )}
            {allCategories &&
              allCategories.length > 0 &&
              !searchLoading &&
              allCategories.map((cat, index) => (
                <Col xs={12} md={4} className="categories-card " key={index}>
                  <Link to={`/categories/${cat}`}>
                    <div className="p-2 p-md-3 shadow rounded my-2 pointer bg-white">
                      {" "}
                      <span className="font18 font600 text-black">
                        {" "}
                        {textCase(cat)}
                      </span>
                    </div>
                  </Link>
                </Col>
              ))}
          </Row>
        )}
        {activeTab === "People" && (
          <Row>
            {loadingPeople && (
              <div
                className="text-center d-flex justify-content-center align-items-center"
                style={{ height: "60vh" }}
              >
                {" "}
                <ButtonLoader />
              </div>
            )}
            {errorPeople && (
              <div
                className="text-center d-flex justify-content-center align-items-center"
                style={{ height: "60vh" }}
              >
                <BiErrorCircle
                  className="text-danger"
                  style={{ fontSize: "60px" }}
                />
                <div>Error loading your data</div>
              </div>
            )}
            {allPeople &&
              allPeople.length > 0 &&
              !searchLoading &&
              allPeople.map((person, index) => (
                <Col xs={12} md={4} className="categories-card " key={index}>
                  <div className="p-2 p-md-3 shadow rounded my-2 pointer bg-white d-flex flex-column">
                    {" "}
                    <span className="font14 font600 text-ash2">
                      {" "}
                      {person.name}
                    </span>
                    <span className="font16 font400 text-black2">
                      {" "}
                      {textCase(person.gender)}
                    </span>
                    <div className="mt-2">
                      <span className="text-danger font700 font16">Films</span>
                      {person?.films?.map((link, index) => (
                        <div key={index}>
                          <a href={link} target="_blank" rel="noreferrer">
                            Film - {index + 1}
                          </a>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2">
                      {person?.starships?.length > 0 ? (
                        <span className="text-danger font700 font16">
                          Star Ships
                        </span>
                      ) : (
                        <span className="text-danger font700 font16">
                          You have no ships
                        </span>
                      )}
                      {person?.starships?.map((link, index) => (
                        <div key={index}>
                          <a href={link} target="_blank" rel="noreferrer">
                            Ship - {index + 1}
                          </a>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2">
                      {person?.vehicles?.length > 0 ? (
                        <span className="text-danger font700 font16">
                          Vehicles
                        </span>
                      ) : (
                        <span className="text-danger font700 font16">
                          You have no vehicles
                        </span>
                      )}
                      {person?.vehicles?.map((link, index) => (
                        <div key={index}>
                          <a href={link} target="_blank" rel="noreferrer">
                            Vehicle - {index + 1}
                          </a>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-end">
                      <a
                        href={person?.homeworld}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Go to Home World
                      </a>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default LandingPage;
