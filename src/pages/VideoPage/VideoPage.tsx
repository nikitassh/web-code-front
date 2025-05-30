import { AnimatedSegmented, Container } from "@/components/atoms";
import { Loader, Video } from "@/components/molecules";
import React from "react";

import { API_URL } from "@/shared/api/config";
import { useVideoDetail } from "@/shared/api/hooks";
import { Flex, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import s from "./VideoPage.module.scss";

type Tab = "video" | "original" | "scenario" | "images" | "audio";

export const VideoPage = () => {
  const { t } = useTranslation();
  const [tab, setTab] = React.useState<Tab>("video");
  const [isPending, setIsPending] = React.useState(false);
  const { uuid } = useParams();
  const videoQuery = useVideoDetail(uuid);

  React.useEffect(() => {
    if (videoQuery.data?.status === "in_progress") {
      setIsPending(true);
    } else {
      setIsPending(false);
    }
  }, [videoQuery.data?.status]);

  if (isPending) {
    return (
      <div className={s.page__pending}>
        <Loader />
      </div>
    );
  }

  return (
    <Container>
      <AnimatedSegmented
        options={[
          { value: "video", label: t("video.tabs.video") },
          { value: "original", label: t("video.tabs.original") },
          { value: "scenario", label: t("video.tabs.script") },
          { value: "images", label: t("video.tabs.images") },
          { value: "audio", label: t("video.tabs.audio") },
        ]}
        value={tab}
        onChange={(value: string) => setTab(value as Tab)}
      />

      <div className={s.page}>
        {videoQuery.isLoading && <Spin size="large" />}

        {videoQuery.isSuccess && videoQuery.data && !isPending && (
          <>
            {tab === "video" && (
              <Video
                url={API_URL + videoQuery.data.finalVideo}
                image={videoQuery.data.imageUrl1}
              />
            )}
            {tab === "original" && <h3>{videoQuery.data.processedText}</h3>}
            {tab === "scenario" && (
              <Flex vertical gap={12}>
                <p>
                  <strong>{t("form.imagePrompts.first")}</strong>:{" "}
                  {videoQuery.data.imagePrompt1}
                </p>
                <p>
                  <strong>{t("form.imagePrompts.second")}</strong>:{" "}
                  {videoQuery.data.imagePrompt2}
                </p>
                <p>
                  <strong>{t("form.imagePrompts.third")}</strong>:{" "}
                  {videoQuery.data.imagePrompt3}
                </p>
                <p>
                  <strong>{t("form.videoPrompts.first")}</strong>:{" "}
                  {videoQuery.data.videoPrompt1}
                </p>
                <p>
                  <strong>{t("form.videoPrompts.second")}</strong>:{" "}
                  {videoQuery.data.videoPrompt2}
                </p>
                <p>
                  <strong>{t("form.videoPrompts.third")}</strong>:{" "}
                  {videoQuery.data.videoPrompt3}
                </p>
                <p>
                  <strong>{t("form.audioText")}</strong>:{" "}
                  {videoQuery.data.processedText}
                </p>
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
            {tab === "audio" && (
              <audio src={videoQuery.data.audioUrlBrowser} controls />
            )}
          </>
        )}
      </div>
    </Container>
  );
};
