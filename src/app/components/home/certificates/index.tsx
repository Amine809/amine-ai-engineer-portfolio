"use client";
import { Certificate, getStrapiMediaUrl } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

interface Props {
  certificates: Certificate[];
}

const Certificates = ({ certificates }: Props) => {
  if (!certificates || certificates.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-5 md:px-10 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Certificates</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Professional certifications and credentials I have earned
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Certificate Image */}
            {cert.image?.url && (
              <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <Image
                  src={getStrapiMediaUrl(cert.image.url)}
                  alt={cert.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* Certificate Info */}
            <div className="p-6">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                  {cert.title}
                </h3>
              </div>

              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                {cert.issuer}
              </p>

              {cert.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {cert.description}
                </p>
              )}

              {/* Link to Certificate */}
              {cert.certificateUrl && (
                <Link
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
                >
                  View Certificate
                  <FaExternalLinkAlt size={14} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
