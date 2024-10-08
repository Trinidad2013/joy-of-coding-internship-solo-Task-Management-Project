"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";

const DueDateFilter = () => {
  // State for storing the selected date
  const [filterDate, setFilterDate] = useState(""); // *** NEW ***
  const router = useRouter();

  // Handle the date change from the input
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(e.target.value); // *** NEW ***
  };

  //Apply the filter by updating the URL with the selected date
  const applyFilter = () => {
    if (filterDate) {
      router.push(`?filterDate=${filterDate}`); // *** NEW ***
    }
  };

  // Render the date picker and filter button
  return (
    <div className="flex space-x-4 mb-4">
      <input
        type="date"
        value={filterDate}
        onChange={handleDateChange}
        className="border p-2"
      />
      <Button onClick={applyFilter}>Filter by Due Date</Button>
    </div>
  );
};

// 8  Export component
export default DueDateFilter;
