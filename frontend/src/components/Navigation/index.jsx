import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import './index.scss';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const auth = useSelector(state => state.auth);

  
  return (
    <div>
      <div className="navbar">
        <h4 className="navbar-brand">React x Express</h4>
        <ul className="link-wrapper">
          <li className="link">
            <NavLink to="/home">Home</NavLink>
          </li>
          <li className="link">
            <NavLink to="/tambah">Tambah</NavLink>
          </li>
        </ul>
        <Nav>
        <LinkContainer to={auth.user ? '/account' : '/login'}>
              <Nav.Link title="Profil">
                {/* <FontAwesomeIcon icon={solid('user')} /> */}
                <i className="fa fa-fw fa-user" aria-hidden="true"></i>
              </Nav.Link>
            </LinkContainer>
          </Nav>
      </div>
    </div>
  )
}

export default Navigation;