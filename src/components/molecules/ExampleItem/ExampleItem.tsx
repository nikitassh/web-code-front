import * as React from "react";

import type { VideoEntity } from "@/shared/api/entities";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import s from "./ExampleItem.module.scss";

type ExampleItemProps = {
  item: VideoEntity;
};

export const ExampleItem: React.FC<ExampleItemProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/video/${item.uuid}`)} className={s.item}>
      <img src={item.imageUrl1} alt="" />

      <div className={s.item__content}>
        <p className={s.item__content__title}>{item.processedText}</p>
        <p className={s.item__content__date}>
          {dayjs(item.createdAt).format("DD.MM.YYYY")}
        </p>
      </div>
    </div>
  );
};
