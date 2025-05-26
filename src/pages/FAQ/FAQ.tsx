import { Container } from "@/components/atoms";
import { Collapse } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./FAQ.module.scss";

const { Panel } = Collapse;

export const FAQ: React.FC = () => {
  const { t } = useTranslation();

  const FAQ_ITEMS = [
    {
      question: t("faq.items.what.question"),
      answer: t("faq.items.what.answer"),
    },
    {
      question: t("faq.items.how.question"),
      answer: t("faq.items.how.answer"),
    },
    {
      question: t("faq.items.features.question"),
      answer: t("faq.items.features.answer"),
    },
    {
      question: t("faq.items.pricing.question"),
      answer: t("faq.items.pricing.answer"),
    },
    {
      question: t("faq.items.support.question"),
      answer: t("faq.items.support.answer"),
    },
  ];

  return (
    <Container>
      <div className={styles.faqContainer}>
        <div className={styles.header}>
          <h1>{t("faq.title")}</h1>
          <h3>{t("faq.subtitle")}</h3>
        </div>

        <Collapse className={styles.collapse}>
          {FAQ_ITEMS.map((item) => (
            <Panel header={item.question} key={item.question}>
              {item.answer}
            </Panel>
          ))}
        </Collapse>
      </div>
    </Container>
  );
};
