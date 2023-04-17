import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const token = useRouteLoaderData('root');
  let userName = '';
  let admin = ' ';

  if (token) {
    const userDecode = jwt_decode(token);
    userName = userDecode.name;
    admin = userDecode.role;
  }

  return (
    <header className={classes.header}>
      <nav>
        {token && <h1>Welcome, {userName}</h1>}
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.active : undefined)}
              end
            >
              Home
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                to="/vote"
                className={({ isActive }) => (isActive ? classes.active : undefined)}
              >
                Vote
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/voted-proposals"
              className={({ isActive }) => (isActive ? classes.active : undefined)}
            >
              Voted Proposals
            </NavLink>
          </li>
          {token && admin === 'admin' && (
            <li>
              <NavLink
                to="/create-vote"
                className={({ isActive }) => (isActive ? classes.active : undefined)}
              >
                Create Vote
              </NavLink>
            </li>
          )}
          {!token && (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? classes.active : undefined)}
              >
                Authentication
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
