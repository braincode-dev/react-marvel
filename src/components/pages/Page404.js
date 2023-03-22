import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    const styleLink = {
        'color': '#9F0013',
        'textAlign': 'center',
        display: 'block',
        'marginTop': '20px'
    }

    return (
        <div>
            <ErrorMessage/>
            <h3 style={{'textAlign': 'center'}}>Error 404</h3>
            <Link to="/" style={styleLink}>Go to home page</Link>
            <p style={{'textAlign': 'center'}}>Page is not found</p>
        </div>
    )
}

export default Page404;