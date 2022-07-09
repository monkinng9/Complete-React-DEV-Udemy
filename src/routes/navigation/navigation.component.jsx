import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assests/crown.svg';
import { UserContext } from '../../contexts/user.context';
import './navigation.styles.scss';
import { signOutUser } from './../../utils/firebase/firebase.utils';

const Navigation = () => {

  const { currentUser } = useContext(UserContext);

  const signOutHandler = async() => {
    const res = await signOutUser();
    // await signOutUser();
    console.log(res);
  };

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <div>
            <CrwnLogo className='logo' />
          </div></Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {
            currentUser ? (
              <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
            ) : (<Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>)
          }

        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;