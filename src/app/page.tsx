import AboutMe from "./components/home/about-me";
import Contact from "./components/home/contact";
import EducationSkills from "./components/home/education-skills";
import ExperienceSec from "./components/home/experience-sec";
import HeroSection from "./components/home/hero-section";
import ContactBar from "./components/home/hero-section/contact-bar";
import LatestWork from "./components/home/latest-work";
import {
  getAbout,
  getContact,
  getExperiences,
  getEducations,
  getSkills,
  getWorks,
} from "@/lib/strapi";

export default async function Page() {
  const [about, contact, experiences, educations, skills, works] =
    await Promise.all([
      getAbout(),
      getContact(),
      getExperiences(),
      getEducations(),
      getSkills(),
      getWorks(),
    ]);

  return (
    <>
      <main>
        <HeroSection about={about} />
        <ContactBar contact={contact} />
        <AboutMe about={about} />
        <ExperienceSec experiences={experiences} />
        <EducationSkills educations={educations} skills={skills} />
        <LatestWork works={works} />
        <Contact contact={contact} />
      </main>
    </>
  );
}