import Image from "next/image";
import classes from "./Header.module.css";
import mareLawLogo from "../../../public/marelaw.svg";
import Link from "next/link";

const Header = () => {
  return (
    <div className={classes.container}>
      <Link href='/'>
        <div className={classes.logo}>
          <Image src={mareLawLogo} alt='MareLaw main logo' priority />
        </div>
      </Link>
      <ul className={classes.menu}>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/'>About the project</Link>
        </li>
        <li>
          <Link href='/'>Work packages</Link>
        </li>
        <li>
          <Link href='/'>Project results</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
