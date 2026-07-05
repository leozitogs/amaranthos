'use client';

import { useEffect, useRef, useState } from 'react';
import { useLenis } from '@/components/providers/LenisProvider';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { PARALLAX, SCENE_IMAGES } from './hero-data';
import { layerTransform } from './parallax-style';
import { usePointerParallax } from './usePointerParallax';
import { usePreloadImages } from './usePreloadImages';
import { useHeroScrollCamera } from './useHeroScrollCamera';
import { useHeroPhaseGate } from './useHeroPhaseGate';
import { useForestPointerParallax } from './useForestPointerParallax';
import { HeroPortal } from './HeroPortal';
import { HeroFrames } from './HeroFrames';
import { HeroCopy } from './HeroCopy';
import { HeroCopyForest } from './HeroCopyForest';
import { HeroShowcase } from './HeroShowcase';
import { HeroScrollScene } from './HeroScrollScene';
import { HeroScrollHint } from './HeroScrollHint';
import type { HeroScrollSceneHandle } from './HeroScrollScene';

/**
 * Hero | Portal de Chenille (Fases 1-4).
 *
 * Fase 1 (preloader): os frames cobrem o viewport ate os assets carregarem.
 * Fase 2 (pos-load): frames recuam, portal e conteudo revelados com parallax
 *   de cursor. HeroScrollHint aparece na base com pulse suave.
 * Fase 3 (zoom): scroll-storyteller pina a secao, anima zoom do portal e
 *   cross-fade com o video da floresta. Estrutura preparada via HeroScrollScene.
 * Fase 4 (repouso): buque 3D aparece sobre a floresta. Canvas do 3d-engineer.
 *   Parallax de cursor da floresta ativo (video, bokeh, buque).
 *
 * Estrutura de altura: o container externo tem PIN_HEIGHT_VH (130vh) para dar
 * espaco ao scroll virtual pinado. O conteudo cinematografico da Fase 2 usa
 * sticky/h-screen para permanecer visivel durante o scroll das Fases 3-4.
 *
 * scroll-storyteller pina e scruba o container externo via data-hero-scroll-root.
 * Nao implemente ScrollTrigger aqui (exceto o gate de fase leve sem scrub).
 *
 * Hooks de animacao em tempo real (disparados por gatilho, fora do scrub):
 *   usePointerParallax    -> parallax de cursor Fases 1-2 (--mx/--my no root).
 *   useHeroPhaseGate      -> seta data-hero-phase="forest" ao cruzar p=0.55.
 *   useForestPointerParallax -> parallax de cursor Fase 4 (--f4x/--f4y).
 *   HeroScrollHint           -> botao estatico "entre por aqui", dispara scroll.
 */
export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const ready = usePreloadImages(SCENE_IMAGES);
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HeroScrollSceneHandle>({
    root: null,
    video: null,
  });
  const { stop, start } = useLenis();

  const [revealed, setRevealed] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  /**
   * Controla o pulse do scroll-hint.
   * true  -> Fase 2 antes do scroll (p==0): pulse ativo.
   * false -> scroll comecou (p>0) ou hero nao revelado: pulse inativo.
   * Detectado via evento 'hero-phase-scrolled' disparado pelo useHeroPhaseGate
   * quando qualquer scroll e detectado (p deixa de ser zero).
   */
  const [pulsing, setPulsing] = useState(false);

  // reduced-motion entra direto no estado aberto; senao espera o preload.
  const opened = reduced || ready;

  // Sem cursor (touch): parallax desligado.
  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none), (pointer: coarse)').matches);
  }, []);

  // Trava o scroll durante o load. Reduced-motion nao trava e ja assenta.
  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      start();
      return;
    }
    stop();
  }, [reduced, stop, start]);

  // Sinaliza a revelacao e libera o scroll APOS a animacao inicial completa.
  // Sequencia: paineis se acomodam (ease-out) -> revealed -> entram header,
  // texto e cards. O scroll fica travado durante toda essa entrada para o
  // usuario sentir a animacao inicial, e so entao e liberado.
  useEffect(() => {
    if (!revealed) return;

    if (typeof window !== 'undefined') {
      (window as unknown as { __heroRevealed?: boolean }).__heroRevealed = true;
      // Dispara a entrada do header, do texto e dos cards (gated nesta revelacao).
      window.dispatchEvent(new CustomEvent('hero-revealed'));
    }

    // reduced-motion: nada anima nem trava, libera de imediato.
    if (reduced) {
      start();
      return;
    }

    setPulsing(true);

    // Mantem o scroll travado ate a entrada de texto, cards e header concluir.
    // INTRO_RELEASE_MS cobre o stagger das colunas apos a revelacao; depois
    // disso o usuario assume o scroll e entra nas Fases 3-4.
    const INTRO_RELEASE_MS = 1200;
    const release = window.setTimeout(start, INTRO_RELEASE_MS);
    return () => window.clearTimeout(release);
  }, [revealed, reduced, start]);

  // Suspende o pulse quando o scroll comeca (qualquer deslocamento do usuario).
  // Usa o evento 'scroll' nativo do window, que o Lenis propaga.
  useEffect(() => {
    if (!pulsing) return;
    const onScroll = () => {
      if (window.scrollY > 2) {
        setPulsing(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pulsing]);

  const parallaxOn = revealed && !reduced && !isTouch;
  usePointerParallax(rootRef, parallaxOn);

  // Gate de fase (sem scrub): seta data-hero-phase="forest" ao cruzar p=0.55.
  useHeroPhaseGate(rootRef, reduced);

  // Parallax de cursor da Fase 4: variaveis CSS --f4x/--f4y.
  useForestPointerParallax(
    { section: rootRef },
    parallaxOn
  );

  // Fases 3-4: pin scrubado da camera (scroll-storyteller).
  // Recebe a section raiz e o handle da cena (video).
  // Monta o ScrollTrigger so apos hero-revealed (contrato com transitions-engineer).
  useHeroScrollCamera({ section: rootRef, scene: sceneRef }, reduced);

  return (
    /*
      Container externo: altura PIN_HEIGHT_VH (130vh) para a zona de scroll
      virtual pinada. O scroll-storyteller referencia data-hero-scroll-root.
      overflow-hidden garante que o conteudo sticky nao vaze.
    */
    <section
      id="inicio"
      ref={rootRef}
      className="bg-creme relative w-full overflow-hidden"
      style={{
        /*
          A section ocupa exatamente uma tela (100svh) nos dois caminhos.
          Caminho normal: o ScrollTrigger do useHeroScrollCamera pina a section
          (position fixed) e cria o espaco de scroll virtual das Fases 3-4 via
          pinSpacing true (PIN_HEIGHT_VH de distancia). A section nao declara mais
          a propria altura de scroll para nao competir com o pin do GSAP.
          Reduced-motion: sem pin, sem scroll virtual, a tela fica estatica no
          estado final sem zona morta de scroll.
        */
        height: '100svh',
      }}
      data-hero-scroll-root
    >
      {/*
        Conteudo principal sticky (100svh): permanece visivel durante o scroll
        virtual das Fases 3-4. Contem todas as camadas da cena.
      */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/*
          Fases 3-4: floresta (video + bokeh) e buque 3D.
          Ficam abaixo do portal (z < 20) e sao controlados pelo scroll-storyteller.
          scroll-storyteller pina e scruba aqui via sceneRef.
          bouquetParallax ref e exposto para o useForestPointerParallax.
        */}
        <HeroScrollScene sceneRef={sceneRef} />

        {/* Portal: moldura + flores desfocadas + ancora de zoom (z-10, z-20) */}
        <HeroPortal>
          {/*
            Coluna esquerda: texto da marca inicial (z-25).
            ATRAS dos paineis (z-30).
            data-hero-layer="ui-left" para o scroll-storyteller animar saida (Fase 3).
          */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[25] flex w-[32.1875vw] items-center pl-[12.5vw]"
            data-hero-layer="ui-left"
          >
            <div
              className="-mt-28.5 w-full pointer-events-auto"
              style={{ transform: layerTransform(PARALLAX.contentLeft) }}
            >
              <HeroCopy revealed={revealed} reduced={reduced} />
            </div>
          </div>

          {/*
            Coluna direita: vitrine de cards (z-25).
            ATRAS dos paineis (z-30). Zona segura: comeca em 71.125vw.
            data-hero-layer="ui-right" para o scroll-storyteller animar saida (Fase 3).
          */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 left-[71.125vw] z-[25] flex items-center"
            data-hero-layer="ui-right"
          >
            <div
              className="pointer-events-auto -mt-45 w-full"
              style={{ transform: layerTransform(PARALLAX.contentRight) }}
            >
              <HeroShowcase revealed={revealed} reduced={reduced} />
            </div>
          </div>

          {/*
            Indicador de scroll (z-28, base centro). Aparece apos a revelacao.
            pulsing: true na Fase 2 antes do scroll, false quando scroll comeca.
          */}
          {revealed && <HeroScrollHint pulsing={pulsing} />}
        </HeroPortal>

        {/* Paineis de chenille (z-30): Fase 1 fechados, Fase 2 abertos lateralmente */}
        <HeroFrames opened={opened} animate={!reduced} onOpened={() => setRevealed(true)} />

        {/*
          Copy e CTAs overlay pós-scroll (z-25).
          Aparece na floresta após a câmera fazer o zoom do portal (Fase 4).
          data-hero-layer="forest-ui" para o scroll-storyteller revelar na entrada.
        */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] px-12 pb-16 opacity-0"
          data-hero-layer="forest-ui"
          style={{ transform: 'translateY(40px)' }}
        >
          <div
            className="w-full pointer-events-auto"
            style={{ transform: layerTransform(PARALLAX.contentLeft) }}
          >
            <HeroCopyForest revealed={revealed} reduced={reduced} />
          </div>
        </div>
      </div>
    </section>
  );
}
