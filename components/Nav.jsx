import Link from 'next/link';
import React from 'react';
import styles from '../styles/Nav.module.css';
const Nav = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}><Link href="/">MOVIE APP</Link></div>
      <div className={styles.navbar__items}>
          <Link href="/search">Search</Link>
        {/* <input type='text' placeholder='search for your favourite movies!'/> */}
      </div>
    </nav>
  );
};

export default Nav;
