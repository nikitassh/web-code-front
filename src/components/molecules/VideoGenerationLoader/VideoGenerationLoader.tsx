import { OpenAIFilled } from "@ant-design/icons";
import { Flex, Progress, Typography } from "antd";
import { motion } from "framer-motion";
import * as React from "react";
import { useTranslation } from "react-i18next";

import s from "./VideoGenerationLoader.module.scss";

const { Text } = Typography;

const steps = [
  "loader.steps.analyzing",
  "loader.steps.generatingImages",
  "loader.steps.creatingVideo",
  "loader.steps.finalizing",
];

export const Loader: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 30000);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <Flex vertical align="center" gap={24} className={s.loader}>
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <OpenAIFilled className={s.loader__icon} />
      </motion.div>

      <Progress
        percent={progress}
        showInfo={false}
        strokeColor={{
          "0%": "#ffa39e",
          "100%": "#ff4d4f",
        }}
        className={s.loader__progress}
      />

      <Flex vertical align="center" gap={8}>
        {steps.map(
          (step, index) =>
            index >= currentStep && (
              <div key={step}>
                <Text
                  className={s.loader__step}
                  style={{
                    color: currentStep === index ? "#cf001c" : "inherit",
                    fontWeight: currentStep === index ? "bold" : "normal",
                  }}
                >
                  {t(step)}
                </Text>
              </div>
            )
        )}
      </Flex>
    </Flex>
  );
};
