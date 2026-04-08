import { ContactData } from "@/lib/strapi";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook, FaDribbble } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

interface Props {
  contact: ContactData | null;
}

const ContactBar = ({ contact }: Props) => {
  const email = contact?.email ?? "aminkarmous2000@gmail.com";
  const phone = contact?.phone ?? "+974 33863134";
  const github = contact?.github ?? "https://github.com/Amine809";
  const githubLabel = contact?.githubLabel ?? "GitHub";
  const linkedin = contact?.linkedin ?? "https://linkedin.com";
  const dribbble = contact?.dribbble ?? "https://dribbble.com";
  const facebook = contact?.facebook ?? "https://facebook.com";

  return (
    <section>
      <div className="border-t border-softGray">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 md:py-7">
            {/* Contact Items */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 md:gap-5 lg:gap-11">
              <Link
                href={`mailto:${email}`}
                className="flex items-center gap-2 lg:gap-4 text-sm md:text-base hover:text-primary"
              >
                <MdEmail className="text-lg md:text-xl flex-shrink-0" />
                <h6 className="text-sm md:text-base xl:text-xl">{email}</h6>
              </Link>
              <Link
                href={`tel:${phone}`}
                className="flex items-center gap-2 lg:gap-4 text-sm md:text-base hover:text-primary"
              >
                <MdPhone className="text-lg md:text-xl flex-shrink-0" />
                <h6 className="text-sm md:text-base xl:text-xl">{phone}</h6>
              </Link>
              <Link
                href={github}
                target="_blank"
                className="flex items-center gap-2 lg:gap-4 text-sm md:text-base hover:text-primary"
              >
                <FaGithub className="text-lg md:text-xl flex-shrink-0" />
                <h6 className="text-sm md:text-base xl:text-xl">{githubLabel}</h6>
              </Link>
            </div>

            {/* Social Items */}
            <div className="flex items-center justify-center md:justify-end gap-4 md:gap-2.5">
  
              <Link href={linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:text-primary transition-colors">
                <FaLinkedin className="text-2xl" />
              </Link>
              <Link href={facebook} target="_blank" rel="noopener noreferrer" title="Facebook" className="hover:text-primary transition-colors">
                <FaFacebook className="text-2xl" />
              </Link>
              <Link href={github} target="_blank" rel="noopener noreferrer" title="GitHub" className="hover:text-primary transition-colors">
                <FaGithub className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBar;
