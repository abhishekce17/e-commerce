"use client"
import { usePathname, useRouter } from "next/navigation";
import styles from "@/Styles/Authentication.module.css";
import Link from "next/link";

const Page = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRouteChange = (route) => {
    router.push("/authentication/" + route);
  };

  return (
    <div className={styles.App}>
      <div className={styles.appAside} />
      <div className={styles.appForm}>
        <div className={styles.formTitle}>
          {pathname.includes("sign-in") ? (
            <span className={styles.formTitleLinkActive}>Sign In</span>
          ) : (
            <Link href={"/authentication/sign-in"} className={styles.formTitleLink}>
              Sign In
            </Link>
          )}
          {" or "}
          {pathname.includes("sign-up") ? (
            <span className={styles.formTitleLinkActive}>Sign Up</span>
          ) : (
            <Link href={"/authentication/sign-up"} className={styles.formTitleLink}>
              Sign Up
            </Link>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Page;
