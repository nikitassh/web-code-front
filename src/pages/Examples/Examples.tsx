import { Container } from "@/components/atoms";
import { useVideoList } from "@/shared/api/hooks";
import { Flex, Spin } from "antd";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import s from "./Examples.module.scss";

export const Examples = () => {
  const { t } = useTranslation();
  const videoListQuery = useVideoList();

  return (
    <Container>
      <h1>{t("examples")}</h1>

      <div>
        {videoListQuery.isLoading && <Spin size="large" />}

        {videoListQuery.isSuccess && videoListQuery.data && (
          <Flex wrap justify="space-between" align="center">
            {videoListQuery.data.map((i) => (
              <Link key={i.id} to={`/video/${i.uuid}`}>
                <img src={i.imageUrl1} alt="" className={s.page__image} />
              </Link>
            ))}
          </Flex>
        )}
      </div>
    </Container>
  );
};
