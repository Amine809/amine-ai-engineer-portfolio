import { getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href="/">
        <Image
          src={getImgPath("/images/logo/Group 14.svg")}
          alt="logo"
          width={150}
          height={150}
        />
      </Link>
    </>
  );
};

export default Logo;
