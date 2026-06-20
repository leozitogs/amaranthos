# Módulo 7: Operacional

Este documento detalha o ambiente operacional, a estratégia de implantação (deploy), as variáveis de ambiente e as práticas de manutenção do projeto **AmaranthosWeb**.

---

## 1. Infraestrutura de Hospedagem e Distribuição (Vercel)

A aplicação **AmaranthosWeb** é hospedada na plataforma de nuvem **Vercel**, que fornece infraestrutura otimizada para o Next.js:

- **Global CDN (Edge Network)**: Os arquivos estáticos gerados pela compilação (páginas, fontes, imagens) são armazenados em cache e distribuídos globalmente nos servidores de borda (edge servers) mais próximos do usuário final, garantindo latência de resposta próxima de zero.
- **Serverless Functions**: Rotas dinâmicas ou endpoints de API (se adicionados no futuro) rodam em ambiente computacional sem servidor de início rápido, que escala sob demanda conforme o volume de acessos.
- **Certificação SSL Automatizada**: A Vercel emite e renova automaticamente os certificados Let's Encrypt de segurança para os domínios oficiais configurados.

---

## 2. Pipeline de Deploy Contínuo (CI/CD)

O deploy ocorre de forma contínua conectado ao repositório oficial do GitHub:

1. **Ambiente de Homologação (Previews)**: Cada abertura de Pull Request no repositório gera automaticamente um deploy temporário isolado da Vercel. A URL gerada permite que o Product Owner (Gisele) e a equipe de QA testem as novas mudanças visualmente antes de incorporá-las ao projeto principal.
2. **Ambiente de Produção (Live)**: O merge de novos códigos na ramificação principal (`main`) dispara de forma automatizada o build de produção final. Se todas as validações do Next.js passarem, a versão em produção do site é atualizada sem interrupção de serviço.

---

## 3. Configurações Operacionais e Variáveis de Ambiente

As configurações de parâmetros externos à aplicação são mapeadas por variáveis de ambiente injetadas nos ambientes da Vercel:

### Variáveis Públicas (com o prefixo `NEXT_PUBLIC_`)

Estas variáveis ficam disponíveis no código do lado do cliente (navegador):

- **`NEXT_PUBLIC_WHATSAPP_NUMBER`**: O número de telefone celular comercial oficial do ateliê, com código de país e DDD (exemplo: `5511999999999`), para onde os cliques do configurador redirecionarão as mensagens de pedido.
- **`NEXT_PUBLIC_WHATSAPP_MESSAGE_PREFIX`**: O cabeçalho textual padrão que inicia cada pedido enviado por WhatsApp (exemplo: `Olá! Montei meu buquê personalizado pelo site e gostaria de fazer o pedido:`).
- **`NEXT_PUBLIC_SITE_URL`**: A URL base oficial do site (exemplo: `https://www.amaranthos.com.br`) usada para gerar metadados absolutos de SEO e compartilhar links.
