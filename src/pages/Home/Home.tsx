import { LetterForm } from "@/components/organisms";
import { useTranslation } from "react-i18next";
import s from "./Home.module.scss";

import imageRibbon from "@/shared/assets/images/ribbon.png";
import imageStar from "@/shared/assets/images/star.png";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div className={s.page}>
      <div className={s.page__content}>
        <h1 className={s.page__content__title}>{t("home.title")}</h1>
        <p className={s.page__content__description}>{t("home.desc")}</p>
      </div>

      <LetterForm />

      <div>
        <img src={imageRibbon} alt="Ribbon" className={s.page__ribbon_1} />
        <img src={imageRibbon} alt="Ribbon" className={s.page__ribbon_2} />
        <img src={imageStar} alt="Star" className={s.page__star_1} />
        <img src={imageStar} alt="Star" className={s.page__star_2} />
      </div>
    </div>
  );
};
