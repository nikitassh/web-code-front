import { Container } from "@/components/atoms";
import { Logo } from "@/components/molecules";
import { Navbar, SelectLanguage } from "@/components/organisms";
import s from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={s.header}>
      <Container className={s.header__container}>
        <div className={s.header__logo}>
          <Logo />
        </div>

        <Navbar />

        <SelectLanguage />
      </Container>
    </header>
  );
};
