import { Outlet, useOutlet } from "react-router-dom";
import ComicsList from "../comicsList/ComicsList";
import AppBaner from "../appBanner/AppBanner";

const ComicsPage = () => {
    const outLet = useOutlet();

    return (
        <>
            { outLet ? <><AppBaner/><Outlet/></> : <ComicsList/>}
        </>
    )
}

export default ComicsPage;