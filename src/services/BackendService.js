import axios from "axios";

const baseUrl = "https://stage.api.sloovi.com";

export default function AuthService(email, password) {
    return axios
        .post(baseUrl + "/login", { email, password })
        .then((response) => {
            console.log(response, 'login')
            if (response.data.code === 200) {
                localStorage.setItem("data", JSON.stringify(response.data))

            }
        })
}