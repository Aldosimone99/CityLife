# CityLife

CityLife è un'applicazione web sviluppata con [Angular CLI](https://github.com/angular/angular-cli) versione 19.1.2. L'applicazione consente agli utenti di connettersi con i loro concittadini, condividere idee e collaborare per costruire il futuro della loro città.

## Funzionalità

- **Autenticazione**: Registrazione e accesso degli utenti.
- **Gestione Utenti**: Aggiunta, modifica e rimozione di utenti.
- **Post e Commenti**: Creazione, visualizzazione e gestione di post e commenti.
- **Ricerca**: Ricerca di utenti e post.
- **Multilingua**: Supporto per più lingue (es. Inglese, Italiano).

## Requisiti

- Node.js
- Angular CLI

## Installazione

Per installare le dipendenze del progetto, eseguire:

```bash
npm install
```

## Server di sviluppo

Per avviare un server di sviluppo locale, eseguire:

```bash
ng serve
```

Una volta avviato il server, aprire il browser e navigare a `http://localhost:4200/`. L'applicazione si ricaricherà automaticamente ogni volta che si modificano i file sorgente.

## Creazione di componenti

Angular CLI include potenti strumenti di scaffolding del codice. Per generare un nuovo componente, eseguire:

```bash
ng generate component nome-componente
```

Per un elenco completo degli schemi disponibili (come `components`, `directives` o `pipes`), eseguire:

```bash
ng generate --help
```

## Build

Per compilare il progetto, eseguire:

```bash
ng build
```

Questo comando compilerà il progetto e memorizzerà gli artefatti di build nella directory `dist/`. Per impostazione predefinita, la build di produzione ottimizza l'applicazione per prestazioni e velocità.

## Test unitari

Per eseguire i test unitari con il test runner [Karma](https://karma-runner.github.io), utilizzare il seguente comando:

```bash
ng test
```

## Test end-to-end

Per eseguire i test end-to-end (e2e), eseguire:

```bash
ng e2e
```

Angular CLI non include un framework di test end-to-end per impostazione predefinita. È possibile scegliere quello che meglio si adatta alle proprie esigenze.

## Risorse aggiuntive

Per ulteriori informazioni sull'utilizzo di Angular CLI, inclusi i riferimenti dettagliati ai comandi, visitare la pagina [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

## Contributi

I contributi sono benvenuti! Sentiti libero di aprire issue o pull request per migliorare il progetto.

## Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file [LICENSE](LICENSE) per ulteriori dettagli.