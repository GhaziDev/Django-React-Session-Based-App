import Cookies from "js-cookie";

const CSRFToken = () => {
    let csrftoken = Cookies.get('csrftoken')
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};
export default CSRFToken;