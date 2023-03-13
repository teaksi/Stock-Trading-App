import axios from "axios";
const TOKEN = "cf36biiad3i7csbc1080cf36biiad3i7csbc108g";

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})