import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SectionHeading, ImageBlock } from "./shared";

const FLEET_KEYS = [
  "smallVan",
  "mediumTruck",
  "heavyTruck",
  "refrigeratedTruck",
  "containerTruck",
  "flatbedTruck",
];

const FLEET_IMAGES = {
  smallVan: "/minibanner4.jpg",
  mediumTruck: "/minibanner2.jpg",
  heavyTruck: "/minibanner5.jpg",
  refrigeratedTruck: "/minibanner6.jpg",
  containerTruck: "/minibanner3.jpg",
  flatbedTruck: "/minibanner1.jpg",
};

export default function TruckVehicleFleet() {
  const { t } = useTranslation("truckCargo");

  const fleet = useMemo(
    () =>
      FLEET_KEYS.map((key) => ({
        id: key,
        title: t(`vehicleFleet.vehicles.${key}.title`),
        description: t(`vehicleFleet.vehicles.${key}.description`),
        capacity: t(`vehicleFleet.vehicles.${key}.capacity`),
        image: FLEET_IMAGES[key],
      })),
    [t],
  );

  return (
    <section className="page-container min-w-0 py-12 sm:py-16 lg:py-20">
      <SectionHeading
        eyebrow={t("vehicleFleet.eyebrow")}
        title={t("vehicleFleet.title")}
        description={t("vehicleFleet.description")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {fleet.map((vehicle) => (
          <article
            key={vehicle.id}
            className="group flex flex-col rounded-2xl sm:rounded-3xl border border-gray-100 bg-white
              shadow-sm overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-200 min-w-0"
          >
            <ImageBlock
              src={vehicle.image}
              alt={vehicle.title}
              hint={t("shared.imageHint", { path: `public${vehicle.image}` })}
              className="h-40 sm:h-44 md:h-48 shrink-0 group-hover:scale-105 transition-transform duration-300"
            />

            <div className="flex flex-col flex-1 p-4 sm:p-5 lg:p-6 min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 uppercase mb-2">
                {vehicle.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-3 flex-1">
                {vehicle.description}
              </p>
              <p className="text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
                {vehicle.capacity}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
