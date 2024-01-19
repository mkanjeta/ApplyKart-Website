import PrivateRoute from "components/privateRoute";
import TimelineComponent from "components/timeline"
// import { useEffect } from "react";
// import { useState } from "react";


export default function Timeline(props) {
    // const [userId, setUserId] = useState('');

    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem('applyKart'));
    //     setUserId(user?.userId);
    // }, [])

    return <PrivateRoute> <TimelineComponent /></PrivateRoute>
}