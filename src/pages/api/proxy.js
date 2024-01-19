import axios from "axios";
export default async (req, res) => {
    const { url } = req.query;
    try {
        const response = await axios.get(decodeURIComponent(url));
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error("Error proxying request:", error);
        res.status(500).send("Error proxying request");
    }
};
