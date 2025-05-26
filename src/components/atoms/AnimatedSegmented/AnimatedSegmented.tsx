import { motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./AnimatedSegmented.module.scss";

interface Option {
  value: string;
  label: string;
}

interface AnimatedSegmentedProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export const AnimatedSegmented: React.FC<AnimatedSegmentedProps> = ({
  options,
  value,
  onChange,
}) => {
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [optionWidth, setOptionWidth] = useState(0);
  const [optionLeft, setOptionLeft] = useState(0);

  const selectedIndex = options.findIndex((option) => option.value === value);

  const updatePosition = useCallback(() => {
    if (optionRefs.current[selectedIndex]) {
      const selectedOption = optionRefs.current[selectedIndex];
      setOptionWidth(selectedOption.offsetWidth);
      setOptionLeft(selectedOption.offsetLeft);
    }
  }, [selectedIndex]);

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [updatePosition]);

  useEffect(() => {
    if (optionWidth > 0) {
      updatePosition();
    }
  }, [selectedIndex, optionWidth, updatePosition]);

  return (
    <div className={styles.container}>
      <div className={styles.segmentedControl}>
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            ref={(el) => {
              optionRefs.current[index] = el;
            }}
            className={`${styles.option} ${
              value === option.value ? styles.selected : ""
            }`}
            onClick={() => onChange(option.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.label}
          </motion.button>
        ))}
        {optionWidth > 0 && (
          <motion.div
            className={styles.background}
            initial={false}
            animate={{
              x: optionLeft,
              width: optionWidth,
            }}
            transition={{
              type: "tween",
              duration: 0.3,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
    </div>
  );
};
