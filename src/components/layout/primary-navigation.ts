/**
 * Navegacao principal do header global (liquid glass). Sentence case, PT-BR.
 * Catalogo agrupa buques, flores avulsas, centros de mesa e chaveiros, por isso
 * aponta para a vitrine na home. Separado de site-navigation.ts (usado pelo
 * Footer para os links de colecao) de proposito.
 */
export type PrimaryNavItem = {
  label: string;
  href: string;
  /** Lado do isologo centralizado onde o item aparece. */
  side: 'left' | 'right';
};

export const primaryNavigation: readonly PrimaryNavItem[] = [
  { label: 'Início', href: '/#inicio', side: 'left' },
  { label: 'Catálogo', href: '/#buques', side: 'left' },
  { label: 'Personalizar', href: '/personalizar', side: 'left' },
  { label: 'Ateliê', href: '/#sobre', side: 'right' },
  { label: 'Journal', href: '/#journal', side: 'right' },
  { label: 'Contato', href: '/#contato', side: 'right' },
] as const;
