import { useLanguage } from "@/shared/hooks/useLanguage";
import { LANGUAGES } from "@/shared/i18n/config";
import { Select } from "antd";

export const SelectLanguage = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <Select
      value={currentLanguage}
      onChange={setLanguage}
      options={LANGUAGES}
    />
  );
};
