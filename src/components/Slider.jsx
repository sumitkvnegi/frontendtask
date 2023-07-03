import React, { useState } from "react";

const Slider = ({ filterApply }) => {
  const [value, setValue] = useState(-1);

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
    if (event.target.value == -1) {
        filterApply(0, "clean");
    } else {
        filterApply(event.target.value);
    }
  };

  const getColor = () => {
    const percentage = (value / 4) * 100; // Assuming range is from 0 to 3
    return `hsl(${120 - percentage * 1.2}, 100%, 50%)`;
  };

  return (
    <div className="absolute top-6 -right-10">
      <input
        type="range"
        min="-1"
        max="3"
        value={value}
        onChange={handleChange}
        className={`${(value==-1)?"white":(value==0)?"bg-green-400":(value==1)?"bg-yellow-400":(value==2)?"bg-orange-400":"bg-red-400"} w-14 h-1 rotate-90 appearance-none outline-none rounded-full`}
      />
    </div>
  );
};

export default Slider;
