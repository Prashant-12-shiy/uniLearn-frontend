import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";


const Counter = ({ endValue, suffix = "", duration = 5 }) => {
  const controls = useAnimation();
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      let start = 0;
      const incrementTime = (duration / endValue) * 500;

      const counter = setInterval(() => {
        start += Math.ceil(endValue / 100); // Increment in steps
        if (start >= endValue) {
          clearInterval(counter);
          setCount(endValue); // Set the final count to the exact end value
        } else {
          setCount(start);
        }
      }, incrementTime);
    }
  }, [inView, controls, endValue, duration]);

  return (
    <motion.span
      ref={ref}
      className="text-3xl font-semibold"
      animate={controls}
      initial={{ opacity: 0 }}
      variants={{
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }}
    >
      {count.toLocaleString()}
      {suffix}
    </motion.span>
  );
};

export default Counter;
