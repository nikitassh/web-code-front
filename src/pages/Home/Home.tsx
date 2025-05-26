import { Container } from "@/components/atoms";

import { LetterForm } from "@/components/organisms";
import { useTranslation } from "react-i18next";
import s from "./Home.module.scss";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <h1>{t("home.title")}</h1>
      <p className={s.page__orange}>{t("home.desc")}</p>
      <LetterForm />
    </Container>
  );
};
