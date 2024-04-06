import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <div className="navbar"> 
            <div className="navbar-links">
                <Link to="/">LogOut</Link>
            </div>
        </div>
    )
}

export default Navbar;
