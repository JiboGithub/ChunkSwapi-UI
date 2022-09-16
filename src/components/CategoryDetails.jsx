import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ButtonLoader from "./ButtonLoader";
import { textCase } from "../utils/formatter";
import Moment from "react-moment";
import { AiOutlineIdcard } from "react-icons/ai";
import { Image } from "react-bootstrap";

const CategoryDetails = () => {
  const { category } = useParams();
  console.log("category", category);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    console.log("use effect ran");
    const config = {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const url = `http://chuckswapi.somee.com/publish/jokes/random?category=${category}`;
    axios
      .get(url, config)
      .then((res) => {
        console.log("response", res);
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [category]);
  return (
    <div className="py-2 py-md-3">
      {loading && (
        <div
          className="text-center d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          {" "}
          <ButtonLoader />
        </div>
      )}
      <div>
        <span className="font24 font700 text-green">{textCase(category)}</span>
        <div className="my-2">
          <Image src={data?.icon_url} />
        </div>
        <div className="d-flex flex-column align-items-end font12 font700 text-ash2">
          <span> This category was created:</span>
          <Moment>
            <span className="font12 font700 text-ash2"> {data?.createdAt}</span>
          </Moment>
          <span className="mt-2">
            <AiOutlineIdcard className="font36 me-2" />
            <span className="text-black2">{data?.id}</span>
          </span>
        </div>
      </div>
      <div className="tet-center mt-2 mt-md-4">
        <span className="font28 font-600 text-danger">{data?.value}</span>
      </div>
      <div className="mt-2 mt-md-5 font16 font700">
        <a href={data?.url} target="_blank" rel="noreferrer">
          Click to View
        </a>
      </div>
    </div>
  );
};

export default CategoryDetails;
