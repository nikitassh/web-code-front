import { AnimatedSegmented, Container } from "@/components/atoms";
import { Video } from "@/components/molecules";
import React from "react";

import { API_URL } from "@/shared/api/config";
import { useVideoDetail } from "@/shared/api/hooks";
import { Flex, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import s from "./VideoPage.module.scss";

type Tab = "video" | "original" | "scenario" | "images";

export const VideoPage = () => {
  const { t } = useTranslation();

  const [tab, setTab] = React.useState<Tab>("video");

  const { uuid } = useParams();

  const videoQuery = useVideoDetail(uuid);

  return (
    <Container>
      <AnimatedSegmented
        options={[
          { value: "video", label: t("video.tabs.video") },
          { value: "original", label: t("video.tabs.original") },
          { value: "scenario", label: t("video.tabs.script") },
          { value: "images", label: t("video.tabs.images") },
        ]}
        value={tab}
        onChange={(value: string) => setTab(value as Tab)}
      />

      <div className={s.page}>
        {videoQuery.isLoading && <Spin size="large" />}

        {videoQuery.isSuccess && videoQuery.data && (
          <>
            {tab === "video" && (
              <Video
                url={API_URL + videoQuery.data.finalVideo}
                image={videoQuery.data.imageUrl1}
              />
            )}
            {tab === "original" && <h3>{videoQuery.data.originalText}</h3>}
            {tab === "scenario" && (
              <Flex vertical gap={8}>
                <p>Image 1: {videoQuery.data.imagePrompt1}</p>
                <p>Image 2: {videoQuery.data.imagePrompt2}</p>
                <p>Image 3: {videoQuery.data.imagePrompt3}</p>
                <p>Video 1: {videoQuery.data.videoPrompt1}</p>
                <p>Video 2: {videoQuery.data.videoPrompt2}</p>
                <p>Video 3: {videoQuery.data.videoPrompt3}</p>
              </Flex>
            )}
            {tab === "images" && (
              <Flex gap={16} align="center">
                <img
                  src={videoQuery.data.imageUrl1}
                  alt=""
                  className={s.page__image}
                />
                <img
                  src={videoQuery.data.imageUrl2}
                  alt=""
                  className={s.page__image}
                />
                <img
                  src={videoQuery.data.imageUrl3}
                  alt=""
                  className={s.page__image}
                />
              </Flex>
            )}
          </>
        )}
      </div>
    </Container>
  );
};
