import React from "react";

const FeaturedEthicalBrands = () => {
  const brands = [
    {
      name: "EcoTech",
      description: "Sustainable electronics with fair labor practices.",
      image: "https://i.postimg.cc/CMs4h7mS/Ecotech.png",
    },
    {
      name: "GreenLife Foods",
      description: "Organic products with transparent sourcing.",
      image: "https://i.postimg.cc/fyVWrBbm/GREENLIFE.png",
    },
    {
      name: "PureWear",
      description: "Ethical clothing made from recycled materials.",
      image: "https://i.postimg.cc/YSFsbgk0/images-1.jpg",
    },
  ];

  return (
    <section className="bg-[#E9F5F4] dark:bg-[#1e293b] py-16 px-4 md:px-10 noto-serif-Regular">
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
          data-aos="fade-up"
        >
          Featured Ethical Brands
        </h2>
        <p
          className="text-lg text-gray-600 dark:text-gray-300 mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Discover brands making a difference through sustainability and ethics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:scale-105 transition-transform"
              data-aos="fade-up"
              data-aos-delay={200 + index * 100}
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="rounded-lg w-full h-40 object-cover mb-4"
              />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {brand.name}
              </h4>
              <p className="text-gray-700 dark:text-gray-200 text-sm">
                {brand.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEthicalBrands;
