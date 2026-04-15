"use client";
import { getStrapiMediaUrl, Work } from "@/lib/strapi";
import { getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPlay, FaTimes, FaExternalLinkAlt } from "react-icons/fa";

interface Props {
  works: Work[];
}

function getEmbedUrl(url: string): string {
  // YouTube: youtu.be/ID or youtube.com/watch?v=ID
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;

  // Google Drive: /file/d/FILE_ID/view  or  open?id=FILE_ID
  const driveMatch = url.match(/\/file\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/);
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;

  // Fallback — return as-is (direct mp4 etc.)
  return url;
}

function needsIframe(url: string): boolean {
  return /youtube\.com|youtu\.be|drive\.google\.com/.test(url);
}

interface Props {
  works: Work[];
}

const LatestWork = ({ works }: Props) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  return (
    <section>
      {/* Video Modal */}
      {videoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setVideoUrl(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoUrl(null)}
              className="absolute top-3 right-3 z-10 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>
            {needsIframe(videoUrl) ? (
              <iframe
                src={getEmbedUrl(videoUrl)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <video src={videoUrl} controls autoPlay className="w-full h-full" />
            )}
          </div>
        </div>
      )}

      <div className="bg-softGray">
        <div className="container">
          <div className="py-16 xl:py-32">
            <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
              <h2>Latest Works</h2>
              <p className="text-xl text-orange-500">( 04 )</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 xl:gap-y-12">
              {works.map((work) => {
                const imgSrc = work.image
                  ? getStrapiMediaUrl(work.image.url)
                  : getImgPath("/images/work/work-img-1.jpg");
                const hasVideo = !!work.videoUrl;
                const hasLink = work.link && work.link !== "#";

                return (
                  <div key={work.id} className="group flex flex-col gap-3 xl:gap-6">
                    {/* Image with video play overlay */}
                    <div className="relative cursor-pointer h-64 sm:h-72 xl:h-80" onClick={() => hasVideo && setVideoUrl(work.videoUrl)}>
                      <Image
                        src={imgSrc}
                        alt={work.title}
                        fill
                        className="rounded-lg object-cover"
                      />
                      {hasVideo && (
                        <div className="absolute inset-0 backdrop-blur-xs bg-primary/15 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity flex items-center justify-center">
                          <span className="bg-primary rounded-full p-5 flex items-center justify-center">
                            <FaPlay className="text-white text-2xl ml-1" />
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Title + buttons */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h5>{work.title}</h5>
                        <Image
                          src={getImgPath("/images/icon/right-arrow-icon.svg")}
                          alt="right-arrow-icon"
                          width={30}
                          height={30}
                        />
                      </div>
                      {work.client && <p className="text-secondary">Client: {work.client}</p>}

                      {/* Technologies */}
                      {work.technologies && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {work.technologies.split(",").map((tech) => (
                            <span
                              key={tech.trim()}
                              className="text-xs font-medium bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action buttons */}
                      {(hasVideo || hasLink) && (
                        <div className="flex items-center gap-3 pt-1">
                          {hasVideo && (
                            <button
                              onClick={() => setVideoUrl(work.videoUrl)}
                              className="flex items-center gap-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-full transition-colors"
                            >
                              <FaPlay className="text-xs" />
                              Watch Video
                            </button>
                          )}
                          {hasLink && (
                            <Link
                              href={work.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm font-medium text-primary border border-primary hover:bg-primary hover:text-white px-4 py-2 rounded-full transition-colors"
                            >
                              <FaExternalLinkAlt className="text-xs" />
                              Visit Project
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestWork;
