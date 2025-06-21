import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";

const AnimatedTestimonialsDemo = () => {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const response = await Axios(SummaryApi.getTestimonials);
      if (response.data.success) {
        const formattedData = (response.data.data || [])
          .filter(
            (item) =>
              item?.name && item?.quote && item?.designation && item?.imageUrl
          )
          .map((item) => ({
            quote: item.quote,
            name: item.name,
            designation: item.designation,
            src: item.imageUrl,
          }));
        setTestimonials(formattedData);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return <AnimatedTestimonials testimonials={testimonials} />;
};

export default AnimatedTestimonialsDemo;
