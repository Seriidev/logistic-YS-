import { useState } from "react";
import { LuPlay, LuVideo } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { SectionHeading, ImageBlock } from "./shared";

export default function TruckVideoSection() {
  const { t } = useTranslation("truckCargo");
  const [playing, setPlaying] = useState(false);

  return (
    <section className="page-container min-w-0 py-12 sm:py-16 lg:py-20">
      <SectionHeading
        eyebrow={t("video.eyebrow")}
        title={t("video.title")}
        description={t("video.description")}
      />

      <div className="max-w-4xl mx-auto min-w-0">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-900 aspect-video group">
          {!playing ? (
            <>
              <ImageBlock
                src="/minibanner2.jpg"
                alt={t("video.thumbnailAlt")}
                hint={t("shared.imageHint", { path: "public/minibanner2.jpg" })}
                className="absolute inset-0 w-full h-full opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={t("video.playAria")}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4
                  bg-transparent border-none cursor-pointer font-[inherit] group"
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center
                    shadow-xl group-hover:scale-110 group-hover:bg-white transition-all duration-200"
                >
                  <LuPlay className="w-7 h-7 sm:w-9 sm:h-9 ml-1 text-blue-500 fill-blue-500" aria-hidden />
                </div>
                <span className="text-white text-sm sm:text-base font-semibold drop-shadow-lg">
                  {t("video.playLabel")}
                </span>
              </button>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-6">
              <LuVideo className="w-16 h-16 mb-4 opacity-50" strokeWidth={1.5} aria-hidden />
              <p className="text-sm sm:text-base font-medium text-center mb-2">
                {t("video.placeholderTitle")}
              </p>
              <p className="text-xs sm:text-sm text-gray-400 text-center max-w-sm">
                {t("video.placeholderDescription")}
              </p>
              <button
                type="button"
                onClick={() => setPlaying(false)}
                className="mt-6 px-5 py-2 rounded-full bg-white/10 text-white text-xs font-semibold
                  border border-white/30 cursor-pointer hover:bg-white/20 transition-colors font-[inherit]"
              >
                {t("video.close")}
              </button>
            </div>
          )}
        </div>

        <p className="text-sm sm:text-base text-gray-500 text-center mt-5 sm:mt-6 leading-relaxed max-w-2xl mx-auto">
          {t("video.footer")}
        </p>
      </div>
    </section>
  );
}
