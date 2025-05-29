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
    }, 1200); // Примерно 2 минуты на полную загрузку

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
    }, 30000); // Смена этапа каждые 30 секунд

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
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
        className={s.loader__progress}
      />

      <Flex vertical align="center" gap={8}>
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: currentStep === index ? 1 : 0.5,
              y: currentStep === index ? 0 : 20,
            }}
            transition={{ duration: 0.5 }}
          >
            <Text
              className={s.loader__step}
              style={{
                color: currentStep === index ? "#1890ff" : "inherit",
                fontWeight: currentStep === index ? "bold" : "normal",
              }}
            >
              {t(step)}
            </Text>
          </motion.div>
        ))}
      </Flex>
    </Flex>
  );
};
