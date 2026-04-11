import { Certificate, getStrapiMediaUrl } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaAward } from "react-icons/fa";

interface Props {
  certificates: Certificate[];
}

const Certificates = ({ certificates }: Props) => {
  if (!certificates.length) return null;

  return (
    <section>
      <div className="py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
            <h2>Certificates</h2>
            <p className="text-xl text-primary">( 05 )</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {certificates.map((cert) => {
              const imgSrc = cert.image ? getStrapiMediaUrl(cert.image.url) : null;

              return (
                <div
                  key={cert.id}
                  className="flex flex-col rounded-xl border border-softGray overflow-hidden group hover:border-primary transition-colors duration-300"
                >
                  {/* Image or fallback */}
                  <div className="relative h-44 bg-softGray flex items-center justify-center overflow-hidden">
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={cert.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <FaAward className="text-6xl text-primary/40" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 p-5 flex-1">
                    <h5 className="font-semibold text-black leading-snug">{cert.title}</h5>
                    <p className="text-sm text-gray-500">{cert.issuer}</p>
                    {cert.date && (
                      <p className="text-xs text-gray-400">{cert.date}</p>
                    )}

                    {cert.credentialUrl && (
                      <div className="mt-auto pt-4">
                        <Link
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
                        >
                          View Credential
                          <FaExternalLinkAlt className="text-xs" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
