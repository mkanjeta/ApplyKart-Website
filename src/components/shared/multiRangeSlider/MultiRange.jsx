import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { priceFormat, indianPriceFormat } from "CommonHelper";

function valuetext(value) {
    return `${value}°C`;
}

export default function MultiRange({ range, setRange, min, max, countryCode }) {
    // const [value, setValue] = useState([0, 40000]);

    // console.log("value ==>>", range)

    const handleChange = (event, range) => {
        // console.log("range ==>>", range)
        setRange(range);
    };

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Slider
                    value={range}
                    onChange={handleChange}
                    // valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={min}
                    max={max}
                />
                <div className='d-flex justify-content-between w-100'>
                    <div className="text-black">{countryCode == 61 ? priceFormat(range[0]) : indianPriceFormat(range[0])}</div>
                    <div className="text-black">{countryCode == 61 ? priceFormat(range[1]) : indianPriceFormat(range[1])}</div>
                </div>
            </Box>

        </>
    );
}