import { Container } from "@/components/atoms";
import { useVideoList } from "@/shared/api/hooks";

import { ExampleItem } from "@/components/molecules";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";
import s from "./Examples.module.scss";

export const Examples = () => {
  const { t } = useTranslation();
  const videoListQuery = useVideoList();

  return (
    <Container className={s.page}>
      <h1 className={s.page__title}>{t("examples")}</h1>

      {videoListQuery.isLoading && <Spin size="large" />}

      {videoListQuery.isSuccess && videoListQuery.data && (
        <div className={s.page__list}>
          {videoListQuery.data.map((item) => (
            <ExampleItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </Container>
  );
};
