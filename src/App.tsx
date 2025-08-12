import { useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import {
  Beer,
  Music2,
  Disc3,
  UtensilsCrossed,
  Bandage,
  MapPin,
  Route,
  Landmark,
  ClipboardList,
  MailCheck,
  Info,
  Megaphone,
  Ticket,
  IdCard,
  FileText,
  UserCheck,
  Users,
  BadgeCheck,
  Shirt,
  WineOff,
  Instagram as InstaIcon,
} from "lucide-react";

/* =============================================================
  ESPAÇO FOLIA – SPA (React + styled-components)
  - Layout vibrante com tema carnaval (cores inspiradas na arte)
  - Header fixo, rolagem suave, seções com IDs
  - Animações leves on-scroll (IntersectionObserver)
  - Fonte Poppins | Ícones em SVG inline
============================================================== */

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  :root{
    /* Paleta inspirada na arte enviada */
    --azul: #167A9A;        /* fundo principal */
    --azul-escuro: #0A4F63; /* header */
    --laranja: #F38B2C;     /* CTAs */
    --laranja-escuro:#d67212;
    --vermelho: #E63946;    /* detalhes */
    --areia: #F2E5D5;       /* textos sobre fundo escuro */
    --turquesa:#2EC4B6;     /* acentos */
    --off:#0f2f3a;          /* sombras */
  }
  *{ box-sizing:border-box; }
  html{ scroll-behavior:smooth; }
  body{
    margin:0; font-family:'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; 
    color:#0e1c22; background: linear-gradient(180deg, var(--azul) 0%, #0E6C88 100%);
  }
  a{ color:inherit; text-decoration:none; }
  img{ max-width:100%; display:block; }
`;

/* ===== Utilities ===== */
const Container = styled.div`
  /* Gutter responsivo + centralização perfeita */
  --gutter: clamp(16px, 4vw, 48px);
  width: 100%;
  max-width: 1900px;
  margin-left: auto;
  margin-right: auto;
  padding-left: max(var(--gutter), env(safe-area-inset-left));
  padding-right: max(var(--gutter), env(safe-area-inset-right));
  min-width: 0;
`;

const Section = styled.section`
  padding: clamp(56px, 7vw, 96px) 0; /* espaçamento vertical responsivo */
  position: relative;
  scroll-margin-top: 96px; /* compensa header fixo ao navegar por âncora */
`;

const Title = styled.h2`
  font-size: clamp(28px, 5vw, 44px);
  line-height: 1.1;
  margin: 0 0 12px;
  color: #fff;
`;
const Sub = styled.p`
  margin: 0 0 28px;
  color: var(--areia);
  font-size: clamp(16px, 2.2vw, 18px);
`;

/* ===== Color sections & Dividers ===== */
const ColorSection = styled(Section)<{ $g: string }>`
  background: ${(p) => p.$g};
  position: relative;
  overflow: hidden;
`;

const Divider = styled.div<{ $src: string; $flip?: boolean }>`
  height: clamp(56px, 8vw, 140px);
  background-image: url(${(p) => p.$src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transform: ${(p) => (p.$flip ? "scaleY(-1)" : "none")};
  margin-top: -1px; /* evita linha entre as seções */
`;

/* ===== Animations & in-view helper ===== */
const floatUp = keyframes`
  from{ opacity:0; transform: translate3d(0,20px,0) scale(.98); }
  to  { opacity:1; transform: translate3d(0,0,0) scale(1); }
`;
const FadeIn = styled.div`
  opacity: 0;
  transform: translateY(18px);
  &.show {
    opacity: 1;
    transform: none;
    animation: ${floatUp} 0.8s ease forwards;
  }
`;

/* ===== Header ===== */
const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 30;
  backdrop-filter: blur(6px);
  background: linear-gradient(
    180deg,
    rgba(10, 79, 99, 0.96) 0%,
    rgba(10, 79, 99, 0.75) 100%
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
`;
const NavWrap = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
`;
const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  font-weight: 800;
  letter-spacing: 0.4px;
  font-size: 20px;
`;
const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 2l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 16.7 6.4 19.2l1.1-6.2L3 8.6l6.2-.9L12 2z"
      fill="var(--laranja)"
    />
  </svg>
);
const Menu = styled.nav`
  display: flex;
  gap: clamp(8px, 3vw, 24px);
  flex-wrap: wrap;
  a {
    color: #fff;
    font-weight: 600;
    opacity: 0.92;
    font-size: 15px;
    position: relative;
  }
  a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    height: 2px;
    width: 0;
    background: var(--laranja);
    transition: 0.3s;
  }
  a:hover::after {
    width: 100%;
  }
`;
const CTA = styled.a`
  background: var(--laranja);
  color: #101010;
  font-weight: 800;
  padding: 10px 16px;
  border-radius: 999px;
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.15),
    inset 0 -2px 0 rgba(0, 0, 0, 0.12);
  transition: transform 0.15s ease, background 0.2s ease;
  border: 2px solid transparent;
  &:hover {
    transform: translateY(-2px);
    background: var(--laranja-escuro);
  }
`;

/* ===== Hero ===== */
const Hero = styled(Section)`
  padding: clamp(120px, 14vw, 180px) 0 clamp(80px, 10vw, 120px);
  color: #fff;
  position: relative;
  isolation: isolate;
  overflow: hidden;

  /* Hero como IMAGEM de fundo com overlay para leitura */
  .bg {
    position: absolute;
    inset: 0;
    z-index: -2;
  }
  .bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.04);
    filter: saturate(1.08) contrast(1.05);
  }
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
  }
`;
const HeroGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: clamp(16px, 4vw, 40px);
  max-width: 1100px;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.35);
`;
const HeroTitle = styled.h1`
  font-size: clamp(34px, 6vw, 56px);
  line-height: 1.02;
  margin: 6px 0 12px;
  letter-spacing: 0.4px;
`;
const HeroSub = styled.p`
  font-size: clamp(16px, 2.2vw, 20px);
  color: var(--areia);
  margin: 0 0 26px;
`;
const HeroCard = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.04)
  );
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  color: #fff;
  border-radius: 20px;
  padding: clamp(18px, 3vw, 28px);
`;

/* ===== Sobre ===== */
const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(18px, 4vw, 36px);
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;
const Card = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: clamp(18px, 3.2vw, 28px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
`;
const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff10;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 12px;
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.4px;
  font-size: 12px;
`;

/* ===== Estrutura (feature cards) ===== */
const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-top: 18px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 680px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const FeatureCard = styled.div`
  background: linear-gradient(180deg, #0f627a 0%, #0a4f63 100%);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 18px;
  display: grid;
  gap: 10px;
  place-content: start;
  min-height: 150px;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
  }
`;

/* ===== List / bullets ===== */
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
  li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }
  svg {
    flex: 0 0 auto;
    margin-top: 2px;
    color: var(--laranja);
  }
`;

/* ===== Footer ===== */
const Footer = styled.footer`
  background: #062f3a;
  color: #cfe6ee;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 28px 0 40px;
  margin-top: 32px;
  a {
    color: #eaf9ff;
    opacity: 0.9;
  }
`;
const FooterGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 18px;
  align-items: center;
  @media (max-width: 840px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

/* ===== Back to top ===== */
const BackTop = styled.a`
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 20;
  opacity: 0.98;
  background: var(--laranja);
  color: #0d0d0d;
  border-radius: 999px;
  padding: 12px 14px;
  font-weight: 800;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.24);
  transition: transform 0.15s ease;
  border: 2px solid transparent;
  &:hover {
    transform: translateY(-3px);
  }
`;

/* ===== Helper: in-view animation ===== */
function useRevealOnScroll() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("show");
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function EspacoFoliaApp() {
  useRevealOnScroll();
  return (
    <>
      <GlobalStyle />

      {/* ===== NAV / HEADER ===== */}
      <Nav>
        <NavWrap>
          <Brand href="#top" aria-label="Espaço Folia">
            <Logo /> <span>ESPAÇO FOLIA</span>
          </Brand>
          <Menu aria-label="Navegação principal">
            <a href="#sobre">Sobre</a>
            <a href="#estrutura">Estrutura</a>
            <a href="#baile">Baile Infantil</a>
            <a href="#inscricoes">Inscrições</a>
            <a href="#sorteio">Sorteio</a>
            <a href="#retirada">Retirada</a>
            <a href="#regras">Regras</a>
            <CTA href="#inscricoes">Inscreva-se</CTA>
          </Menu>
        </NavWrap>
      </Nav>

      {/* ===== HERO ===== */}
      <Hero id="top">
        <div className="bg" aria-hidden>
          {/* Coloque sua imagem em public/hero-espaço-folia.jpg ou ajuste o caminho abaixo */}
          <img src="/hero-espaço-folia.jpg" alt="Camarote Espaço Folia" />
        </div>
        <HeroGrid>
          <FadeIn data-reveal>
            <Pill>RAÍZES DO SERTÃO • CARNAVAL 2025</Pill>
            <HeroTitle>ESPAÇO FOLIA – Carnaval de Salvador 2025</HeroTitle>
            <HeroSub>
              Estrutura, Segurança, Conforto e Diversão nos Circuitos Dodô e
              Osmar.
            </HeroSub>
            <CTA href="#inscricoes" aria-label="Ir para inscrições">
              Inscreva-se
            </CTA>

            <HeroCard style={{ marginTop: 18 }}>
              <strong>Circuitos:</strong>
              <List style={{ marginTop: 10 }}>
                <li>
                  <MapPin size={28} /> <span>Dodô (Barra/Ondina)</span>
                </li>
                <li>
                  <MapPin size={28} /> <span>Osmar (Campo Grande)</span>
                </li>
              </List>
            </HeroCard>
          </FadeIn>
        </HeroGrid>
      </Hero>

      {/* ===== SOBRE ===== */}
      <ColorSection
        id="sobre"
        $g="linear-gradient(180deg, #0A4F63 0%, #167A9A 100%)"
      >
        <Container>
          <FadeIn data-reveal>
            <Title>Sobre o Evento</Title>
            <Sub>
              O <strong>Camarote Espaço Folia</strong> é um projeto
              institucional da <strong>Polícia Militar da Bahia (PMBA)</strong>,
              celebrando a tradição e a grandiosidade do Carnaval de Salvador —
              seis dias de festa a céu aberto, ritmo e alegria nos tradicionais
              circuitos <em>Dodô</em> e <em>Osmar</em>. O camarote une{" "}
              <strong>segurança, conforto e cultura</strong>, aproximando a
              sociedade do trabalho da PMBA em seus <strong>200 anos</strong> de
              história.
            </Sub>
          </FadeIn>

          <TwoCol>
            <FadeIn data-reveal>
              <Card>
                <h3 style={{ marginTop: 0 }}>Presença nos Circuitos</h3>
                <List>
                  <li>
                    <Route size={28} />
                    <span>
                      <strong>Circuito Dodô (Barra/Ondina):</strong> vista
                      privilegiada...
                    </span>
                  </li>
                  <li>
                    <Landmark size={28} />
                    <span>
                      <strong>Circuito Osmar (Campo Grande):</strong>{" "}
                      tradição...
                    </span>
                  </li>
                </List>
              </Card>
            </FadeIn>

            <FadeIn data-reveal>
              <Card>
                <h3 style={{ marginTop: 0 }}>Missão</h3>
                <p>
                  Oferecer um ambiente seguro e inclusivo, valorizando as raízes
                  culturais do nosso povo e promovendo experiências memoráveis
                  com o apoio dos profissionais da PMBA.
                </p>
              </Card>
            </FadeIn>
          </TwoCol>
        </Container>
      </ColorSection>

      <Divider $src="/dividers/onda-xilo.svg" aria-hidden />

      {/* ===== ESTRUTURA ===== */}
      <ColorSection
        id="estrutura"
        $g="linear-gradient(180deg, #167A9A 0%, #2EC4B6 100%)"
      >
        <Container>
          <FadeIn data-reveal>
            <Title>Estrutura do Camarote</Title>
            <Sub>
              Serviços e facilidades para curtir o melhor do Carnaval com
              tranquilidade.
            </Sub>
          </FadeIn>
          <Features>
            <FadeIn data-reveal>
              <FeatureCard>
                <Beer size={28} />
                <h4>Open Bar</h4>
                <p style={{ opacity: 0.9 }}>
                  Bebidas selecionadas ao longo do evento.
                </p>
              </FeatureCard>

              <FeatureCard>
                <Music2 size={28} />
                <h4>Shows ao Vivo</h4>
                <p style={{ opacity: 0.9 }}>
                  Grandes atrações e artistas convidados.
                </p>
              </FeatureCard>

              <FeatureCard>
                <Disc3 size={28} />
                <h4>DJs</h4>
                <p style={{ opacity: 0.9 }}>Line-up animado entre os shows.</p>
              </FeatureCard>

              <FeatureCard>
                <UtensilsCrossed size={28} />
                <h4>Praça de Alimentação</h4>
                <p style={{ opacity: 0.9 }}>
                  Opções variadas para todos os gostos.
                </p>
              </FeatureCard>

              <FeatureCard>
                <Bandage size={28} />
                <h4>Posto Médico</h4>
                <p style={{ opacity: 0.9 }}>
                  Atendimento para emergências e cuidados básicos.
                </p>
              </FeatureCard>
            </FadeIn>
          </Features>
        </Container>
      </ColorSection>

      <Divider $src="/dividers/div-2.svg" aria-hidden />

      {/* ===== BAILE INFANTIL ===== */}
      <ColorSection
        id="baile"
        $g="linear-gradient(180deg, #F38B2C 0%, #E63946 100%)"
      >
        <Container>
          <FadeIn data-reveal>
            <Title>Baile Infantil à Fantasia</Title>
            <Sub>
              <strong>Data:</strong> 1º de março de 2025, das 13h às 17h, na{" "}
              <strong>Casa D’Itália</strong>.<br />
              <strong>Público:</strong> Crianças até 12 anos acompanhadas por
              até 2 adultos.
            </Sub>
          </FadeIn>
          <TwoCol>
            <FadeIn data-reveal>
              <Card>
                <h3 style={{ marginTop: 0 }}>Inscrição via sorteio</h3>
                <p>
                  As vagas do baile serão distribuídas por{" "}
                  <strong>sorteio</strong>. A participação requer cadastro
                  correto e atenção às regras de acesso.
                </p>
                <List>
                  <li>
                    <ClipboardList size={28} />{" "}
                    <span>Confirme dados do responsável e da criança.</span>
                  </li>
                  <li>
                    <IdCard size={28} />{" "}
                    <span>Leve documento com foto no dia do evento.</span>
                  </li>
                </List>
              </Card>
            </FadeIn>
            <FadeIn data-reveal>
              <Card>
                <h3 style={{ marginTop: 0 }}>Regras de Acesso</h3>
                <List>
                  <li>
                    <Users size={28} />{" "}
                    <span>
                      Crianças até 12 anos com até 2 adultos acompanhantes.
                    </span>
                  </li>
                  <li>
                    <BadgeCheck size={28} />{" "}
                    <span>
                      Obrigatório uso de pulseira/credencial do evento.
                    </span>
                  </li>
                </List>
              </Card>
            </FadeIn>
          </TwoCol>
        </Container>
      </ColorSection>

      <Divider $src="/dividers/div-3.svg" aria-hidden />

      {/* ===== INSCRIÇÕES ===== */}
      <ColorSection
        id="inscricoes"
        $g="linear-gradient(180deg, #2EC4B6 0%, #167A9A 100%)"
      >
        <Container>
          <FadeIn data-reveal>
            <Title>Inscrições</Title>
            <Sub>
              <strong>Período:</strong> 17/02 a 20/02/2025 •{" "}
              <strong>Local:</strong> Site oficial da PMBA.
            </Sub>
          </FadeIn>
          <TwoCol>
            <FadeIn data-reveal>
              <Card>
                <h3 style={{ marginTop: 0 }}>Como participar</h3>
                <List>
                  <li>
                    <ClipboardList size={28} />{" "}
                    <span>Preencha a matrícula no formato correto.</span>
                  </li>
                  <li>
                    <MailCheck size={28} />{" "}
                    <span>Informe e-mail e telefone válidos para contato.</span>
                  </li>
                  <li>
                    <Info size={28} />{" "}
                    <span>
                      Leia o regulamento antes de finalizar a inscrição.
                    </span>
                  </li>
                </List>

                <CTA
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Link real de inscrição: Site oficial da PMBA.");
                  }}
                >
                  Ir para o site da PMBA
                </CTA>
              </Card>
            </FadeIn>
            <FadeIn data-reveal>
              <Card>
                <h3 style={{ marginTop: 0 }}>Dicas</h3>
                <p>
                  Mantenha documentos em mãos e confira se os dados estão
                  corretos para validar sua participação.
                </p>
              </Card>
            </FadeIn>
          </TwoCol>
        </Container>
      </ColorSection>

      <Divider $src="/dividers/div-4.svg" aria-hidden />

      {/* ===== SORTEIO / DIVULGAÇÃO ===== */}
      <ColorSection
        id="sorteio"
        $g="linear-gradient(180deg, #167A9A 0%, #0A4F63 100%)"
      >
        <Container>
          <FadeIn data-reveal>
            <Title>Sorteio e Divulgação</Title>
            <Sub>
              <strong>Sorteio:</strong> 21/02/2025 às 10h •{" "}
              <strong>Divulgação:</strong> 21/02/2025 às 18h no Instagram{" "}
              <strong>@camaroteespacofolia</strong> e no site da PMBA.
            </Sub>
            <Card>
              <List>
                <li>
                  <Megaphone size={28} />{" "}
                  <span>Resultados oficiais publicados nos canais acima.</span>
                </li>
                <li>
                  <Ticket size={28} />{" "}
                  <span>Guarde seu protocolo de inscrição.</span>
                </li>
              </List>
            </Card>
          </FadeIn>
        </Container>
      </ColorSection>

      <Divider $src="/dividers/div-5.svg" aria-hidden />

      {/* ===== RETIRADA ===== */}
      <ColorSection
        id="retirada"
        $g="linear-gradient(180deg, #0A4F63 0%, #062f3a 100%)"
      >
        <Container>
          <FadeIn data-reveal>
            <Title>Retirada de Camisas</Title>
            <Sub>
              <strong>Local:</strong> Auditório da Ferreira Costa Paralela •{" "}
              <strong>Período:</strong> 23/02 a 28/02/2025 (com prazos por dia
              sorteado).
            </Sub>
          </FadeIn>
          <TwoCol>
            <FadeIn data-reveal>
              <Card>
                <h3 style={{ marginTop: 0 }}>Documentos necessários</h3>
                <List>
                  <li>
                    <IdCard size={28} />{" "}
                    <span>Documento oficial com foto.</span>
                  </li>
                  <li>
                    <FileText size={28} />{" "}
                    <span>Comprovante de inscrição / print do resultado.</span>
                  </li>
                  <li>
                    <UserCheck size={28} />{" "}
                    <span>Autorização (se retirada por terceiro)...</span>
                  </li>
                </List>
              </Card>
            </FadeIn>
            <FadeIn data-reveal>
              <Card>
                <h3 style={{ marginTop: 0 }}>Regras</h3>
                <p>
                  Respeite a janela correspondente ao seu dia sorteado para
                  agilizar o atendimento.
                </p>
              </Card>
            </FadeIn>
          </TwoCol>
        </Container>
      </ColorSection>

      <Divider $src="/dividers/div-6.svg" aria-hidden />

      {/* ===== REGRAS DE ACESSO ===== */}
      <ColorSection
        id="regras"
        $g="linear-gradient(180deg, #062f3a 0%, #041e24 100%)"
      >
        <Container>
          <FadeIn data-reveal>
            <Title>Regras de Acesso ao Camarote</Title>
            <Card>
              <List>
                <li>
                  <Shirt size={28} />{" "}
                  <span>Uso obrigatório de camisa do evento e convite.</span>
                </li>
                <li>
                  <WineOff size={28} />{" "}
                  <span>
                    Proibido consumo de álcool por menores de 18 anos.
                  </span>
                </li>
                <li>
                  <Users size={28} />{" "}
                  <span>Menores apenas acompanhados de responsável legal.</span>
                </li>
              </List>
            </Card>
          </FadeIn>
        </Container>
      </ColorSection>

      <Divider $src="/dividers/div-7.svg" aria-hidden />

      {/* ===== FOOTER ===== */}
      <Footer>
        <FooterGrid>
          <div>
            <Brand href="#top">
              <Logo /> <span>ESPAÇO FOLIA</span>
            </Brand>
            <p style={{ margin: "10px 0 0", opacity: 0.9 }}>
              Projeto institucional da PMBA – 200 anos.
            </p>
          </div>
          <div style={{ justifySelf: "end" }}>
            <Menu>
              <a href="#sobre">Sobre</a>
              <a href="#inscricoes">Inscrições</a>
              <a href="#regras">Regulamento</a>
              <a href="#top">Contato</a>
            </Menu>
            <div
              style={{
                marginTop: 10,
                display: "flex",
                gap: 12,
                justifyContent: "flex-end",
              }}
            >
              <a
                href="https://instagram.com/camaroteespacofolia"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <InstaIcon size={26} color="#fff" />
              </a>
            </div>
          </div>
        </FooterGrid>
      </Footer>

      <BackTop href="#top" aria-label="Voltar ao topo">
        ↑
      </BackTop>
    </>
  );
}
