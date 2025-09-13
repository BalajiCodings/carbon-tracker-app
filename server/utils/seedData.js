// utils/seedData.js
import Awareness from "../models/Awareness.js";

export const seedAwarenessResources = async () => {
  try {
    const existingResources = await Awareness.countDocuments();
    if (existingResources > 0) {
      console.log("Awareness resources already exist");
      return;
    }

    const resources = [
      {
        title: "Understanding Carbon Footprint",
        type: "video",
        url: "https://www.youtube.com/watch?v=8q7_aV8eLUE",
        category: "Education",
        description: "Learn about what carbon footprint means and how it affects our environment",
      },
      {
        title: "10 Ways to Reduce Energy Consumption at Home",
        type: "article",
        url: "https://www.energy.gov/energysaver/save-electricity-and-fuel",
        category: "Energy Saving",
        description: "Practical tips to reduce your household energy consumption",
      },
      {
        title: "Climate Change: The Facts",
        type: "document",
        url: "https://www.ipcc.ch/reports/",
        category: "Climate Science",
        description: "Official IPCC reports on climate change and its impacts",
      },
      {
        title: "Renewable Energy Explained",
        type: "video",
        url: "https://www.youtube.com/watch?v=1kUE0BZtTRc",
        category: "Renewable Energy",
        description: "Understanding different types of renewable energy sources",
      },
      {
        title: "Carbon Neutral Living Guide",
        type: "article",
        url: "https://www.epa.gov/ghgemissions/household-carbon-footprint-calculator",
        category: "Lifestyle",
        description: "EPA guide to calculating and reducing your carbon footprint",
      },
      {
        title: "Energy Efficient Appliances Guide",
        type: "document",
        url: "https://www.energystar.gov/products",
        category: "Energy Saving",
        description: "Guide to choosing energy-efficient appliances for your home",
      },
    ];

    await Awareness.insertMany(resources);
    console.log("Awareness resources seeded successfully");
  } catch (error) {
    console.error("Error seeding awareness resources:", error);
  }
};
