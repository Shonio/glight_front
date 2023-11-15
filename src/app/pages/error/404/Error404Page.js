import {Link} from 'react-router-dom';

function Error404Page() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center p-16">
            <div className="w-full max-w-3xl text-center">
                <h1>The page you requested could not be found.</h1>
                <Link className="block font-normal mt-48" to="/">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}

export default Error404Page;
