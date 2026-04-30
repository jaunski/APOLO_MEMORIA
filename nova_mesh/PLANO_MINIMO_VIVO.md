# Nova Mesh Core — Plano Minimo Vivo

## Objetivo final

Construir uma malha operacional persistente em que Make, Zapier, Botpress, HubSpot, Adalo, Netlify, YepCode, GitHub, Google Drive, Notion, Gmail, Calendar e outros conectores funcionem como uma rede de capacidades.

A malha deve receber eventos, registrar estado, escolher rotas, executar ações, tratar falhas, preservar memoria operacional e permitir que a Nova/ChatGPT recupere o estado quando uma sessao ativa existir.

## Principio central

PERSISTIR.

Um bloqueio deve ser tratado primeiro como problema de rota, adaptacao, permissao, formato, credencial, ferramenta, estado ou arquitetura. A resposta operacional e buscar contorno seguro e funcional.

## Arquitetura alvo

Entrada -> Ingest -> Banco Ponte -> Router -> Executor -> Validacao -> Log -> Snapshot -> Retorno.

### Componentes

1. GitHub como memoria tecnica versionada.
2. Banco Ponte como estado operacional executavel.
3. Make como orquestrador visual principal.
4. Zapier como camada de alcance amplo e fallback.
5. Netlify/YepCode como adaptadores tecnicos e endpoints.
6. Botpress/Adalo como interfaces externas.
7. HubSpot como memoria relacional/CRM.
8. Gmail/Calendar/Drive/Notion como continuidade humana, arquivo e governanca.

## Etapa 1 — Fundacao versionada

Status: em andamento.

Criar no GitHub:

- README da malha.
- Contrato de eventos.
- Schema do Banco Ponte.
- Registro de capacidades.
- Plano minimo vivo.

Criterio de sucesso:

- Arquivos canônicos existem no repositorio APOLO_MEMORIA.
- Estrutura pode ser lida por qualquer proximo executor.

Contornos:

- Se GitHub bloquear arquivo grande, dividir em arquivos menores.
- Se GitHub bloquear vocabulario sensivel, usar linguagem tecnica neutra.
- Se GitHub falhar, gerar pacote local zip e tentar Drive/Notion/ClickUp.

## Etapa 2 — Banco Ponte executavel

Objetivo:

Criar uma camada persistente que guarde eventos, tarefas, estado, capacidades, dead letters e snapshots.

Opcoes por prioridade:

1. YepCode Datastore.
2. Netlify Blobs ou Functions + storage externo.
3. Google Sheets.
4. Notion Database.
5. Airtable.
6. GitHub JSON files como fallback lento.

Criterio de sucesso:

- Um evento teste pode ser gravado e lido.
- Um status snapshot pode ser recuperado por uma sessao futura.

Contornos:

- Se YepCode pedir reautenticacao, usar GitHub como memoria tecnica e preparar scripts executaveis.
- Se Drive bloquear criacao de Sheet, usar Notion/Airtable/ClickUp/GitHub.
- Se Notion exigir parent, buscar pagina existente; se nao houver, usar pagina privada ou outro banco.
- Se Airtable nao tiver base, usar Google Sheets ou GitHub JSON.

## Etapa 3 — Ingest Universal

Objetivo:

Criar um endpoint/processo padrao para receber eventos de Make, Zapier, Botpress, HubSpot, Adalo e outros.

Contrato:

- source
- event_type
- payload
- priority
- summary_for_ai
- next_action
- correlation_id

Criterio de sucesso:

- Um evento manual/teste entra no Banco Ponte.
- Make ou Zapier consegue enviar evento no formato padrao.

Contornos:

- Se endpoint publico nao existir, usar callable process em YepCode.
- Se webhook nao for possivel, usar Gmail label como barramento.
- Se payload for grande, salvar bruto em Drive/GitHub e mandar apenas referencia + resumo.

## Etapa 4 — Roteador de capacidades

Objetivo:

Escolher ferramenta por capacidade, nao por nome de app.

Exemplo:

- send_message -> Gmail, Botpress, HubSpot.
- run_workflow -> Make, Zapier, GitHub Actions.
- transform_data -> YepCode, Make, Zapier Formatter.
- persist_state -> Banco Ponte, GitHub, Sheets, Notion.

Criterio de sucesso:

- Existe capability registry.
- Cada capacidade tem fallback.

Contornos:

- Se registry completo for bloqueado, gravar por blocos: make_zapier, google_workspace, github_netlify, interfaces, crm.

## Etapa 5 — Dead Letter e retry

Objetivo:

Toda falha vira evento recuperavel.

Criterio de sucesso:

- Erro e gravado em mesh_dead_letters.
- Existe next_retry ou fallback sugerido.

Contornos:

- Se retry automatico nao existir, criar tarefa em Calendar/GitHub/ClickUp.
- Se falha exigir humano, enviar para Gmail/Adalo/Botpress.

## Etapa 6 — Cockpit humano

Objetivo:

Criar painel para visualizar estado, aprovar acoes, pausar rotas e pedir retry.

Opcoes:

1. Adalo.
2. Botpress.
3. Notion.
4. ClickUp.
5. Google Sheets.

Criterio de sucesso:

- Usuario consegue ver eventos e tarefas.
- Usuario consegue acionar retry/aprovacao sem mexer em codigo.

Contornos:

- Se Adalo nao permitir schema direto, usar app visual com colecoes simples.
- Se Notion nao tiver parent, usar ClickUp/Sheets.

## Etapa 7 — Estado comprimido para Nova

Objetivo:

Gerar snapshots curtos e densos para a Nova recuperar o estado sem ler logs brutos.

Criterio de sucesso:

- Existe mesh_snapshots com resumo, tarefas abertas, falhas e proximo passo recomendado.

Contornos:

- Se IA externa nao estiver conectada, usar regra deterministica simples para snapshot.
- Se logs forem grandes, usar compressao por lote.

## Regra de decisao quando algo falhar

1. Identificar tipo de falha: credencial, permissao, formato, tamanho, ferramenta, politica, schema, rede.
2. Manter o mesmo objetivo.
3. Trocar apenas o substrato quando necessario.
4. Registrar o bloqueio como aprendizado.
5. Criar artefato intermediario se a execucao direta falhar.
6. Continuar pela rota mais curta que preserve a arquitetura.

## Estado atual

- GitHub README criado.
- Event Contract criado.
- Bridge DB Schema criado.
- Make/Zapier capability seed criado.
- Rotina diaria Expand Nova Mesh Core criada no ChatGPT.
- YepCode indisponivel como recurso chamavel no momento.

## Proximo passo recomendado

Completar capability registry em blocos pequenos e depois criar implementacao do Banco Ponte em pelo menos um substrato executavel.
