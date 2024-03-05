import classes from "./Footer.module.css";

import mareLawLogo from "../../../public/marelaw-white.svg";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <Image src={mareLawLogo} alt='marelaw footer logo' />
        <div className={classes.rows}>
          <div className={classes.links}>
            <ul>
              <li>
                <Link href='/'>
                  <h4>About the project</h4>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <h4>Work packages</h4>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <h4>Project results</h4>
                </Link>
              </li>
            </ul>
          </div>
          <div className={classes.contact}>
            <p className={classes.title}>Contact</p>
            <p>Ruđera Boškovića 37, 21000 Split</p>

            <a href='mailto:marelaw@pfst.hr'>marelaw@pfst.hr</a>

            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
