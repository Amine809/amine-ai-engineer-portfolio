"use client";
import { ContactData } from "@/lib/strapi";
import { getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaDribbble } from "react-icons/fa";

interface Props {
  contact: ContactData | null;
}

const Contact = ({ contact }: Props) => {
  const email = contact?.email ?? "";
  const phone = contact?.phone ?? "";
  const github = contact?.github ?? "";
  const githubLabel = contact?.githubLabel ?? "GitHub";
  const linkedin = contact?.linkedin ?? "";
  const dribbble = contact?.dribbble ?? "";
  const facebook = contact?.facebook ?? "";

  const socialLinks = [
    { platform: "Dribbble", icon: FaDribbble, link: dribbble },
    { platform: "LinkedIn", icon: FaLinkedin, link: linkedin },
    { platform: "Facebook", icon: FaFacebook, link: facebook },
    { platform: "GitHub",   icon: FaGithub,   link: github },
  ].filter((s) => s.link);

  const contactItems = [
    { label: email, link: `mailto:${email}` },
    { label: phone, link: `tel:${phone}` },
    { label: githubLabel, link: github },
  ].filter((c) => c.label);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", number: "", email: "", message: "" });

  const reset = () => setFormData({ name: "", number: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setSubmitted(true);
          reset();
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="no-print">
      <div className="container">
        <div className="pt-16 md:pt-32 pb-20">
          <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
            <h2>Contact Me</h2>
            <p className="text-xl text-orange-500">( 05 )</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-7 sm:gap-12">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="label">Name *</label>
                    <input required className="input" id="name" name="name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="number" className="label">Phone *</label>
                    <input required className="input" id="number" type="number" name="number" value={formData.number} onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="label">Email *</label>
                  <input required className="input" id="email" type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="message" className="label">Message *</label>
                  <textarea required className="input" name="message" id="message" value={formData.message} onChange={handleChange} rows={2} />
                </div>
                {submitted && (
                  <div className="flex items-center gap-2">
                    <Image src={getImgPath("/images/icon/success-icon.svg")} alt="success-icon" width={30} height={30} />
                    <p className="text-secondary">Great! Email sent successfully. We will get in touch asap.</p>
                  </div>
                )}
                {error && (
                  <p className="text-red-500 text-sm">
                    Something went wrong, email cannot be sent. Please contact directly at{" "}
                    <a href={`mailto:${email}`} className="underline hover:opacity-80">{email}</a>
                  </p>
                )}
                <button type="submit" disabled={loading} className="relative overflow-hidden cursor-pointer w-fit py-2 sm:py-3 md:py-5 px-4 sm:px-5 md:px-7 border border-primary rounded-full group disabled:opacity-60 disabled:cursor-not-allowed">
                  <span className="relative z-10 text-xl font-medium text-primary group-hover:text-white transition-colors duration-300">
                    {loading ? "Sending..." : "Send Now"}
                  </span>
                </button>
              </div>
            </form>
            <div className="flex flex-col sm:flex-row md:flex-col justify-between gap-5 md:gap-20 items-center md:items-end">
              <div className="flex flex-row md:flex-col items-start md:items-end gap-4 md:gap-5">
                {socialLinks.map((s, i) => (
                  <Link key={i} href={s.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                    title={s.platform}
                  >
                    <s.icon className="text-2xl" />
                    <span className="text-base sm:text-lg font-normal">{s.platform}</span>
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-5 lg:gap-11 items-end">
                {contactItems.map((c, i) => (
                  <div key={i}>
                    <Link href={c.link} target="_blank" rel="noopener noreferrer" className="text-base lg:text-lg text-black font-normal border-b border-black pb-3 hover:text-primary hover:border-primary">
                      {c.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
