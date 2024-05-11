import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import Filter from "../components/Filter";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import ExpSlider from "../components/ExpSlider";

const Page = ({ filters }) => {
  const [jdLists, setJdLists] = useState([]);
  const [filteredJdLists, setFilteredJdLists] = useState([]);
  const [selectedExp, setSelectedExp] = useState(0);
  const [activeFilters, setActiveFilters] = useState([
    { type: "jobRole", options: [] },
    { type: "location", options: [] },
  ]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page, activeFilters, selectedExp]);

  const fetchData = () => {
    if (loading) return;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: page * 10,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    setLoading(true);
    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const data = result.jdList;
        setJdLists((jdLists) => [...jdLists, ...data]);
        applyFilters([...jdLists, ...data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleChangeExp = (e) => {
    setSelectedExp(parseInt(e.target.value, 10));
  };

  const applyFilters = (data) => {
    let filteredData = data;

    if (selectedExp > 0) {
      filteredData = filteredData.filter((jdList) => jdList.maxExp >= selectedExp);
    }

    if (activeFilters[0].options.length > 0) {
      filteredData = filteredData.filter((jdList) => activeFilters[0].options.includes(jdList.jobRole.toLowerCase()));
    }

    if (activeFilters[1].options.length > 0) {
      filteredData = filteredData.filter((jdList) => activeFilters[1].options.includes(jdList.location.toLowerCase()));
    }

    setFilteredJdLists(filteredData);
  };

  const onUpdateFilter = () => {
    setPage(0);
    setJdLists([]);
    setFilteredJdLists([]);
    fetchData();
  };

  const reset = () => {
    setSelectedExp(0);
    setActiveFilters([
      { type: "jobRole", options: [] },
      { type: "location", options: [] },
    ]);
    setJdLists([]);
    setFilteredJdLists([]);
    setPage(0);
    fetchData();
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        p={2}
      >
        <Button variant="outlined" onClick={reset}>
          Reset Filter
        </Button>

        <ExpSlider selectedExp={selectedExp} changeExp={handleChangeExp} />

        {filters.map((sec, secIndex) => (
          <Filter
            key={sec.id}
            sec={sec}
            secIndex={secIndex}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            activeFilterOptions={
              activeFilters.find((af) => af.type === sec.id).options
            }
            onUpdateFilter={onUpdateFilter}
          />
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        alignItems="center"
        gap={4}
      >
        {filteredJdLists.length > 0 &&
          filteredJdLists.map((jdList) => (
            <Cards key={jdList.jdUid} jdList={jdList} />
          ))}
        {loading && <p>Loading...</p>}
      </Box>
    </div>
  );
};

export default Page;
