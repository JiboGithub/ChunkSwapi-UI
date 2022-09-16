import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PeopleDetails = () => {
  const { person } = useParams();
  console.log("person", person);

  const [loading, setLoading] = useState();
  const [data, setData] = useState({});

  useEffect(() => {
    console.log("use effect ran");
    const config = {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const url = `https://api.chucknorris.io/jokes/random?category=${person}`;
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
  }, []);
  return (
    <div>
      <h1>Category details page - {person}</h1>
    </div>
  );
};

export default PeopleDetails;
