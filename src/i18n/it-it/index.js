/* eslint-disable max-lines */
export default {
  appTitle: 'Ma Voix',
  logoutLabel: 'Esci',
  welcome: {
    title: 'Benvenuto in MaVoix',
    intro: 'Per iniziare, ecco le quattro azioni principali:',
    stepDevice: 'Collega un dispositivo con il pulsante Collega un dispositivo (icona QR) nella barra in alto.',
    stepTabs: 'Crea o apri le schede da Schede, oppure con il + accanto alle schede.',
    stepSettings: 'Regola la dimensione delle immagini, la sintesi vocale e altro nelle Impostazioni globali (icona a ingranaggio).',
    stepConnect: 'Puoi anche condividere i dati di utilizzo (orari di utilizzo e frasi costruite) con Connect, una piattaforma aperta per la condivisione dei dati. La condivisione è facoltativa: attivala o disattivala nelle Impostazioni globali.',
    dontShowAgain: 'Non mostrare più',
    ok: 'Ho capito'
  },
  connectLinked: {
    title: 'Condivisione dei dati con Connect',
    success: 'La condivisione dei dati con Connect è attiva. Puoi modificarla in qualsiasi momento nelle Impostazioni globali.',
    failure: 'Non è stato possibile attivare la condivisione dei dati con Connect.'
  },
  stats: {
    title: 'Statistiche di utilizzo',
    period: 'Periodo',
    lastDays: 'Ultimi {n} giorni',
    sinceStart: 'Dall\'inizio',
    loadError: 'Impossibile caricare i dati.',
    empty: 'Nessun dato di utilizzo in questo periodo. Le statistiche compaiono non appena l\'app viene usata con un dispositivo collegato a questo account.',
    weekdays: { 0: 'Lunedì', 1: 'Martedì', 2: 'Mercoledì', 3: 'Giovedì', 4: 'Venerdì', 5: 'Sabato', 6: 'Domenica' },
    overview: {
      title: 'Panoramica',
      sessions: 'Sessioni',
      activeDays: 'Giorni di utilizzo',
      time: 'Tempo di utilizzo',
      phrases: 'Frasi',
      avgPhrase: 'Carte per frase',
      avgSession: 'Durata media di una sessione',
      night: 'Sessioni notturne',
      nightHint: 'Prima delle 5:30',
      of: 'su {n} giorno | su {n} giorni'
    },
    when: {
      title: 'Quando',
      perDay: 'Frasi al giorno (i fine settimana sono più chiari)',
      perWeek: 'Frasi a settimana',
      perMonth: 'Frasi al mese',
      heatmap: 'Frasi per giorno della settimana e per ora',
      day: '{label}: {phrases} frasi, {sessions} sessioni',
      week: 'Settimana del {label}: {phrases} frasi, {sessions} sessioni, {days} giorni di utilizzo',
      month: '{label}: {phrases} frasi, {sessions} sessioni, {days} giorni di utilizzo'
    },
    tabs: {
      title: 'Schede',
      hint: 'Numero di carte toccate in ogni scheda. Le schede mai usate sono a 0.',
      taps: '{n} carte, {phrases} frasi'
    },
    cards: {
      title: 'Carte',
      mostUsed: 'Le più usate',
      leastUsed: 'Le meno usate',
      leastUsedHint: 'Carte usate almeno una volta, dalla più rara alla più frequente.',
      neverUsed: 'Mai usate ({n})',
      neverUsedHint: 'Queste carte sono nelle schede ma non sono state usate nel periodo.',
      detail: '{n} volte, in {days} giorni, ultima volta il {last}; schede: {tabs}'
    },
    phrases: {
      title: 'Frasi',
      frequent: 'Frasi più frequenti',
      frequentHint: 'Frasi di almeno 2 carte costruite più volte.',
      pairs: 'Sequenze di 2 carte',
      triples: 'Sequenze di 3 carte',
      times: '{n} volte',
      none: 'Nessuna frase ricorre abbastanza spesso.'
    },
    progress: {
      title: 'Progressi',
      distinctCards: 'Carte diverse usate a settimana',
      avgLength: 'Carte per frase, a settimana (media)',
      week: 'Settimana del {day}'
    }
  },
  navDrawer: {
    home: 'Home',
    assetsManager: 'Immagini',
    tabs: 'Schede',
    addTab: 'Aggiungi una scheda',
    devices: 'Dispositivi',
    addDevice: 'Aggiungi un dispositivo',
    noDeviceYet: 'Nessun dispositivo per ora',
    globalSettings: 'Impostazioni globali',
    help: 'Aiuto',
    deviceQr: 'Collega un dispositivo',
    stats: 'Statistiche'
  },
  globalSettings: {
    title: 'Impostazioni globali',
    imageSizeLabel: 'Dimensione delle immagini',
    sizeSmall: 'Piccola',
    sizeMedium: 'Media',
    sizeLarge: 'Grande',
    ttsSpeedLabel: 'Velocità della sintesi vocale',
    speedVerySlow: 'Molto lenta',
    speedSlow: 'Lenta',
    speedNormal: 'Normale',
    speedFast: 'Veloce',
    ttsLanguageLabel: 'Lingua della sintesi vocale',
    connectLabel: 'Condivisione dei dati con Connect',
    connectOn: 'Condivisione attiva',
    connectOff: 'Condivisione disattivata',
    connectDescription: 'Connect è una piattaforma aperta per la condivisione di dati tra app di comunicazione aumentativa. Se attivi la condivisione, l\'app MaVoix vi invia gli orari di inizio e fine utilizzo e le frasi costruite (indirizzo delle immagini usate e parole pronunciate). Questi dati diventano pubblici. Sarai reindirizzato a Connect per identificarti.',
    configLabel: 'Configurazione dell\'app',
    exportConfig: 'Esporta',
    importConfig: 'Importa',
    exportError: 'Errore durante l\'esportazione: ',
    importError: 'Errore durante l\'importazione: ',
    importDone: ' scheda/e importata/e'
  },
  dnd: {
    dropFiles: 'Trascina qui i tuoi file',
    filesSaved: ' immagini salvate',
    fileSaved: ' immagine salvata'
  },
  camera: {
    snapPic: 'scatta una foto',
    retake: 'riprova',
    imageName: 'Nome dell\'immagine'
  },
  imageNameHint: {
    title: 'Consiglio per dare un buon nome all\'immagine',
    body: 'Dai un significato al nome dell\'immagine, perché sarà usato dalla sintesi vocale. Rimuovi il suffisso .png, .jpg, .bmp o .gif dal nome della tua immagine.'
  },
  takePhoto: {
    capture: 'Scatta la foto',
    retake: 'Scatta di nuovo',
    nameLabel: 'Nome',
    categoryLabel: 'Tema',
    save: 'Salva',
    noCamera: 'Fotocamera non disponibile su questo dispositivo.',
    waitCamera: 'Attendi, la fotocamera si sta avviando…',
    defaultName: 'Foto',
    successTitle: 'Foto scattata con successo',
    successMessage: 'Troverai la tua immagine nella scheda e nella tua libreria personale.',
    successOk: 'Ho capito'
  },
  uploadPhoto: {
    heading: 'Carica una foto',
    successTitle: 'Caricamento riuscito',
    successMessage: 'Troverai la tua immagine nella scheda e nella tua libreria personale.',
    successOk: 'Ho capito'
  },
  uploadError: {
    title: 'Invio dell\'immagine non riuscito',
    lead: 'Non è stato possibile inviare l\'immagine.',
    bulletExtension: 'Controlla l\'estensione dell\'immagine: sono accettati solo i formati .jpg, .jpeg e .png.',
    bulletRetry: 'Carica una nuova foto o, se possibile, scatta una foto con la fotocamera.',
    ok: 'Ho capito'
  },
  addImagesModal: {
    title: 'Aggiungi immagini',
    libraryArasaac: 'Libreria ARASAAC',
    libraryPersonal: 'Libreria personale',
    switchToPersonal: 'Libreria personale',
    switchToArasaac: 'Libreria ARASAAC',
    takePhoto: 'Scatta una foto',
    uploadPhoto: 'Carica una foto',
    searchArasaac: 'Cerca un pittogramma ARASAAC',
    searchPersonal: 'Cerca un pittogramma',
    themes: {
      needs: 'Bisogni',
      food: 'Cibo',
      drinks: 'Bevande',
      games: 'Giochi e tempo libero',
      people: 'Famiglia e persone',
      routine: 'Routine quotidiana',
      emotions: 'Emozioni',
      health: 'Corpo e salute',
      clothes: 'Vestiti',
      animals: 'Animali',
      places: 'Luoghi',
      transport: 'Trasporti',
      school: 'Scuola',
      verbs: 'Verbi'
    },
    pictogramCountOne: '{n} pittogramma',
    pictogramCountOther: '{n} pittogrammi',
    cancel: 'Annulla',
    addToTab: 'Aggiungi',
    assignCategoryTitle: 'Scegli un tema',
    addTheme: 'Aggiungi un tema',
    selectImage: 'Seleziona l\'immagine',
    playImage: 'Ascolta il nome dell\'immagine',
    themeLabel: 'Tema:'
  },
  assetsManager: {
    assetNameLabel: 'Nome dell\'immagine',
    nameSave: 'Nome salvato: ',
    search: 'Cerca',
    nameField: 'Nome',
    uploadError: 'Errore durante l\'invio dell\'immagine: '
  },
  assets: {
    select: 'Seleziona le immagini da aggiungere:',
    chooseImages: 'Scegli le immagini da aggiungere'
  },
  tabEditor: {
    tabNameLabel: 'Nome',
    tabColorLabel: 'Colore',
    tabSpeed: 'Velocità',
    tabLanguage: 'Lingua',
    addItemLabel: 'Aggiungi immagini',
    editLanguage: 'Modifica voce',
    itemDialog: {
      headingNew: 'Aggiunta di un\'immagine',
      headingEdit: 'Modifica di un\'immagine',
      nameLabel: 'Nome',
      selectAssetLabel: 'Seleziona un\'immagine'
    }
  },
  deviceDialogs: {
    new: {
      heading: 'Scegli un nome per il tuo nuovo dispositivo'
    },
    alreadyUsedHeading: 'Non puoi più accedere alla password. Clicca sul pulsante qui sotto per rigenerare un codice di invito. (I dispositivi già collegati a questo account verranno scollegati)',
    resetPasswordLabel: 'Rigenera',
    qrcodeHeading: 'Per collegare il dispositivo all\'account, scansiona questo codice QR dall\'app:',
    codeHeading: 'Oppure inserisci manualmente questo codice nell\'app'
  },
  newTabDialog: {
    heading: 'Scegli un nome per la tua nuova scheda!'
  },
  tabSettings: {
    createTitle: 'Creazione di una nuova scheda',
    editTitle: 'Impostazioni della scheda',
    tabName: 'Nome della scheda',
    backgroundColor: 'Colore di sfondo',
    selectedColor: 'Colore scelto',
    currentColor: 'Colore attuale',
    icon: 'Icona',
    otherIcons: {
      soup_kitchen: 'Pasto',
      check_circle: 'Convalidato',
      home: 'Casa',
      settings: 'Impostazioni',
      local_cafe: 'Caffè',
      build: 'Fai da te',
      sports_bar: 'Bar',
      wine_bar: 'Bicchiere',
      calculate: 'Calcolo',
      flag: 'Bandiera',
      category: 'Categoria',
      star: 'Stella'
    },
    nameRequired: 'Il nome è obbligatorio',
    backgroundColorRequired: 'Il colore di sfondo è obbligatorio',
    createButton: 'Crea la scheda',
    deleteConfirmMessage: 'Vuoi davvero eliminare questa scheda?',
    updateError: 'Errore durante l\'aggiornamento della scheda',
    defaultTabName: 'Attività',
    defaultItemName: 'Bere'
  },
  generic: {
    close: 'Chiudi',
    validate: 'Convalida',
    delete: 'Elimina',
    cancel: 'Annulla',
    save: 'Salva',
    add: 'Aggiungi',
    unavailable: 'Non disponibile',
    invisible: 'Invisibile',
    undo: 'Annulla',
    redo: 'Ripeti',
    loading: 'Caricamento'
  },
  assetEditor: {
    rename: 'Rinomina l\'immagine',
    delete: 'Elimina l\'immagine',
    deleteDialog: {
      title: 'Elimina il pittogramma',
      message: 'Vuoi davvero eliminare il pittogramma da questa scheda?',
      cancel: 'No',
      confirm: 'Sì',
      dontAskAgain: 'Non chiedermelo più'
    }
  },
  auth: {
    login: 'Accedi',
    signup: 'Registrati',
    email: 'Email',
    password: 'Password'
  },
  account: {
    title: 'Il mio account',
    currentPassword: 'Password attuale (richiesta per ogni modifica)',
    updateEmail: 'Aggiorna email',
    newPassword: 'Nuova password',
    changePassword: 'Cambia password',
    deleteHeading: 'Elimina account',
    deleteWarning: 'Questo elimina definitivamente il tuo account, le schede, le immagini, i dispositivi collegati e le statistiche d\'uso. Non può essere annullato.',
    deleteButton: 'Elimina il mio account',
    close: 'Chiudi',
    emailUpdated: 'Email aggiornata',
    passwordUpdated: 'Password aggiornata',
    accountDeleted: 'Account eliminato',
    errWrongPassword: 'Password errata',
    errInvalidEmail: 'Email non valida',
    errEmailUsed: 'Email già in uso',
    errShortPassword: 'Nuova password troppo corta (minimo 6 caratteri)',
    errGeneric: 'Qualcosa è andato storto'
  }
}
