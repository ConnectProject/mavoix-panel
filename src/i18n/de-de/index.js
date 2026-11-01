/* eslint-disable max-lines */
export default {
  appTitle: 'Ma Voix',
  logoutLabel: 'Abmelden',
  welcome: {
    title: 'Willkommen bei MaVoix',
    intro: 'Zum Einstieg hier die vier wichtigsten Aktionen:',
    stepDevice: 'Verbinden Sie ein Gerät mit der Schaltfläche Gerät verbinden (QR-Symbol) in der oberen Leiste.',
    stepTabs: 'Erstellen oder öffnen Sie Tabs unter Tabs oder mit dem + neben den Tabs.',
    stepSettings: 'Passen Sie Bildgröße, Sprachausgabe und mehr in den Globalen Einstellungen an (Zahnrad-Symbol).',
    stepConnect: 'Sie können auch Nutzungsdaten (Nutzungszeiten und gebildete Sätze) mit Connect teilen, einer offenen Plattform für den Datenaustausch. Das Teilen ist freiwillig: Aktivieren oder deaktivieren Sie es in den Globalen Einstellungen.',
    dontShowAgain: 'Nicht mehr anzeigen',
    ok: 'Verstanden'
  },
  connectLinked: {
    title: 'Datenaustausch mit Connect',
    success: 'Der Datenaustausch mit Connect ist aktiviert. Sie können ihn jederzeit in den Globalen Einstellungen ändern.',
    failure: 'Der Datenaustausch mit Connect konnte nicht aktiviert werden.'
  },
  stats: {
    title: 'Nutzungsstatistik',
    period: 'Zeitraum',
    lastDays: 'Letzte {n} Tage',
    sinceStart: 'Seit Beginn',
    loadError: 'Die Daten konnten nicht geladen werden.',
    empty: 'Keine Nutzungsdaten in diesem Zeitraum. Die Statistik erscheint, sobald die App mit einem mit diesem Konto verbundenen Gerät benutzt wurde.',
    weekdays: { 0: 'Montag', 1: 'Dienstag', 2: 'Mittwoch', 3: 'Donnerstag', 4: 'Freitag', 5: 'Samstag', 6: 'Sonntag' },
    overview: {
      title: 'Übersicht',
      sessions: 'Sitzungen',
      activeDays: 'Nutzungstage',
      time: 'Nutzungsdauer',
      phrases: 'Sätze',
      avgPhrase: 'Karten pro Satz',
      avgSession: 'Durchschnittliche Sitzungsdauer',
      night: 'Nachtsitzungen',
      nightHint: 'Vor 5:30 Uhr',
      of: 'von {n} Tag | von {n} Tagen'
    },
    when: {
      title: 'Wann',
      perDay: 'Sätze pro Tag (Wochenenden heller dargestellt)',
      perWeek: 'Sätze pro Woche',
      perMonth: 'Sätze pro Monat',
      heatmap: 'Sätze nach Wochentag und Uhrzeit',
      day: '{label}: {phrases} Sätze, {sessions} Sitzungen',
      week: 'Woche vom {label}: {phrases} Sätze, {sessions} Sitzungen, {days} Nutzungstage',
      month: '{label}: {phrases} Sätze, {sessions} Sitzungen, {days} Nutzungstage'
    },
    tabs: {
      title: 'Tabs',
      hint: 'Anzahl der angetippten Karten in jedem Tab. Nie benutzte Tabs stehen auf 0.',
      taps: '{n} Karten, {phrases} Sätze'
    },
    cards: {
      title: 'Karten',
      mostUsed: 'Am häufigsten benutzt',
      leastUsed: 'Am seltensten benutzt',
      leastUsedHint: 'Mindestens einmal benutzte Karten, von der seltensten zur häufigsten.',
      neverUsed: 'Nie benutzt ({n})',
      neverUsedHint: 'Diese Karten befinden sich in den Tabs, wurden im Zeitraum aber nicht benutzt.',
      detail: '{n}-mal, an {days} Tagen, zuletzt am {last}; Tabs: {tabs}'
    },
    phrases: {
      title: 'Sätze',
      frequent: 'Häufigste Sätze',
      frequentHint: 'Sätze mit mindestens 2 Karten, die mehrmals gebildet wurden.',
      pairs: 'Folgen von 2 Karten',
      triples: 'Folgen von 3 Karten',
      times: '{n}-mal',
      none: 'Kein Satz kommt oft genug vor.'
    },
    progress: {
      title: 'Fortschritt',
      distinctCards: 'Verschiedene benutzte Karten pro Woche',
      avgLength: 'Karten pro Satz, pro Woche (Durchschnitt)',
      week: 'Woche vom {day}'
    }
  },
  navDrawer: {
    home: 'Startseite',
    assetsManager: 'Bilder',
    tabs: 'Tabs',
    addTab: 'Tab hinzufügen',
    devices: 'Geräte',
    addDevice: 'Gerät hinzufügen',
    noDeviceYet: 'Noch kein Gerät',
    globalSettings: 'Globale Einstellungen',
    help: 'Hilfe',
    deviceQr: 'Gerät verbinden',
    stats: 'Statistik'
  },
  globalSettings: {
    title: 'Globale Einstellungen',
    imageSizeLabel: 'Bildgröße',
    sizeSmall: 'Klein',
    sizeMedium: 'Mittel',
    sizeLarge: 'Groß',
    ttsSpeedLabel: 'Sprechgeschwindigkeit',
    speedVerySlow: 'Sehr langsam',
    speedSlow: 'Langsam',
    speedNormal: 'Normal',
    speedFast: 'Schnell',
    ttsLanguageLabel: 'Sprache (Oberfläche und Sprachausgabe)',
    connectLabel: 'Datenaustausch mit Connect',
    connectOn: 'Teilen aktiviert',
    connectOff: 'Teilen deaktiviert',
    connectDescription: 'Connect ist eine offene Plattform für den Datenaustausch zwischen Apps zur unterstützten Kommunikation. Wenn Sie das Teilen aktivieren, sendet die MaVoix-App die Start- und Endzeiten der Nutzung sowie die gebildeten Sätze (Adressen der verwendeten Bilder und gesprochene Wörter). Diese Daten werden öffentlich. Sie werden zur Anmeldung zu Connect weitergeleitet.',
    configLabel: 'App-Konfiguration',
    exportConfig: 'Exportieren',
    importConfig: 'Importieren',
    exportError: 'Fehler beim Export: ',
    importError: 'Fehler beim Import: ',
    importDone: ' Tab(s) importiert'
  },
  dnd: {
    dropFiles: 'Dateien hier ablegen',
    filesSaved: ' Bilder gespeichert',
    fileSaved: ' Bild gespeichert'
  },
  camera: {
    snapPic: 'Foto aufnehmen',
    retake: 'Erneut aufnehmen',
    imageName: 'Bildname'
  },
  imageNameHint: {
    title: 'Tipp zur Benennung des Bildes',
    body: 'Geben Sie dem Bild einen aussagekräftigen Namen, denn er wird von der Sprachausgabe verwendet. Entfernen Sie die Endung .png, .jpg, .bmp oder .gif aus dem Namen Ihres Bildes.'
  },
  takePhoto: {
    capture: 'Foto aufnehmen',
    retake: 'Foto erneut aufnehmen',
    nameLabel: 'Name',
    categoryLabel: 'Thema',
    save: 'Speichern',
    noCamera: 'Kamera auf diesem Gerät nicht verfügbar.',
    waitCamera: 'Bitte warten, die Kamera startet…',
    defaultName: 'Foto',
    successTitle: 'Foto erfolgreich aufgenommen',
    successMessage: 'Sie finden Ihr Bild im Tab und in Ihrer persönlichen Bibliothek.',
    successOk: 'Verstanden'
  },
  uploadPhoto: {
    heading: 'Foto hochladen',
    successTitle: 'Hochladen erfolgreich',
    successMessage: 'Sie finden Ihr Bild im Tab und in Ihrer persönlichen Bibliothek.',
    successOk: 'Verstanden'
  },
  uploadError: {
    title: 'Bild konnte nicht gesendet werden',
    lead: 'Das Bild konnte nicht gesendet werden.',
    bulletExtension: 'Prüfen Sie die Dateiendung Ihres Bildes: Es werden nur die Formate .jpg, .jpeg und .png akzeptiert.',
    bulletRetry: 'Laden Sie ein neues Foto hoch oder nehmen Sie, falls möglich, ein Foto mit der Kamera auf.',
    ok: 'Verstanden'
  },
  addImagesModal: {
    title: 'Bilder hinzufügen',
    libraryArasaac: 'ARASAAC-Bibliothek',
    libraryPersonal: 'Persönliche Bibliothek',
    switchToPersonal: 'Persönliche Bibliothek',
    switchToArasaac: 'ARASAAC-Bibliothek',
    takePhoto: 'Foto aufnehmen',
    uploadPhoto: 'Foto hochladen',
    searchArasaac: 'ARASAAC-Piktogramm suchen',
    searchPersonal: 'Piktogramm suchen',
    themes: {
      needs: 'Bedürfnisse',
      food: 'Essen',
      drinks: 'Getränke',
      games: 'Spiele und Freizeit',
      people: 'Familie und Personen',
      routine: 'Tagesablauf',
      emotions: 'Gefühle',
      health: 'Körper und Gesundheit',
      clothes: 'Kleidung',
      animals: 'Tiere',
      places: 'Orte',
      transport: 'Verkehrsmittel',
      school: 'Schule',
      verbs: 'Verben'
    },
    pictogramCountOne: '{n} Piktogramm',
    pictogramCountOther: '{n} Piktogramme',
    cancel: 'Abbrechen',
    addToTab: 'Hinzufügen',
    assignCategoryTitle: 'Thema wählen',
    addTheme: 'Thema hinzufügen',
    selectImage: 'Bild auswählen',
    playImage: 'Namen des Bildes anhören',
    themeLabel: 'Thema:'
  },
  assetsManager: {
    assetNameLabel: 'Bildname',
    nameSave: 'Name gespeichert: ',
    search: 'Suchen',
    nameField: 'Name',
    uploadError: 'Fehler beim Senden des Bildes: '
  },
  assets: {
    select: 'Wählen Sie die hinzuzufügenden Bilder aus:',
    chooseImages: 'Wählen Sie die hinzuzufügenden Bilder aus'
  },
  tabEditor: {
    tabNameLabel: 'Name',
    tabColorLabel: 'Farbe',
    tabSpeed: 'Geschwindigkeit',
    tabLanguage: 'Sprache',
    addItemLabel: 'Bilder hinzufügen',
    editLanguage: 'Stimme ändern',
    itemDialog: {
      headingNew: 'Bild hinzufügen',
      headingEdit: 'Bild bearbeiten',
      nameLabel: 'Name',
      selectAssetLabel: 'Bild auswählen'
    }
  },
  deviceDialogs: {
    new: {
      heading: 'Wählen Sie einen Namen für Ihr neues Gerät'
    },
    alreadyUsedHeading: 'Sie können das Passwort nicht mehr einsehen. Klicken Sie auf die Schaltfläche unten, um einen neuen Einladungscode zu erzeugen. (Bereits mit diesem Konto verbundene Geräte werden getrennt)',
    resetPasswordLabel: 'Neu erzeugen',
    qrcodeHeading: 'Um das Gerät mit dem Konto zu verbinden, scannen Sie diesen QR-Code in der App:',
    codeHeading: 'Oder geben Sie diesen Code manuell in der App ein'
  },
  newTabDialog: {
    heading: 'Wählen Sie einen Namen für Ihren neuen Tab!'
  },
  tabSettings: {
    createTitle: 'Neuen Tab erstellen',
    editTitle: 'Tab-Einstellungen',
    tabName: 'Name des Tabs',
    backgroundColor: 'Hintergrundfarbe',
    selectedColor: 'Gewählte Farbe',
    currentColor: 'Aktuelle Farbe',
    icon: 'Symbol',
    otherIcons: {
      soup_kitchen: 'Mahlzeit',
      check_circle: 'Bestätigt',
      home: 'Haus',
      settings: 'Einstellungen',
      local_cafe: 'Café',
      build: 'Basteln',
      sports_bar: 'Bar',
      wine_bar: 'Glas',
      calculate: 'Rechnen',
      flag: 'Flagge',
      category: 'Kategorie',
      star: 'Stern'
    },
    nameRequired: 'Der Name ist erforderlich',
    backgroundColorRequired: 'Die Hintergrundfarbe ist erforderlich',
    createButton: 'Tab erstellen',
    deleteConfirmMessage: 'Möchten Sie diesen Tab wirklich löschen?',
    updateError: 'Fehler beim Aktualisieren des Tabs',
    defaultTabName: 'Aktivitäten',
    defaultItemName: 'Trinken'
  },
  generic: {
    close: 'Schließen',
    validate: 'Bestätigen',
    delete: 'Löschen',
    cancel: 'Abbrechen',
    save: 'Speichern',
    add: 'Hinzufügen',
    unavailable: 'Nicht verfügbar',
    invisible: 'Unsichtbar',
    undo: 'Rückgängig',
    redo: 'Wiederholen',
    loading: 'Wird geladen'
  },
  assetEditor: {
    rename: 'Bild umbenennen',
    delete: 'Bild löschen',
    deleteDialog: {
      title: 'Piktogramm löschen',
      message: 'Möchten Sie das Piktogramm wirklich aus diesem Tab löschen?',
      cancel: 'Nein',
      confirm: 'Ja',
      dontAskAgain: 'Nicht mehr fragen'
    }
  },
  auth: {
    login: 'Anmelden',
    signup: 'Registrieren',
    email: 'E-Mail',
    password: 'Passwort'
  },
  account: {
    title: 'Mein Konto',
    currentPassword: 'Aktuelles Passwort (für jede Änderung erforderlich)',
    updateEmail: 'E-Mail aktualisieren',
    newPassword: 'Neues Passwort',
    changePassword: 'Passwort ändern',
    deleteHeading: 'Konto löschen',
    deleteWarning: 'Dadurch werden Ihr Konto, Ihre Tabs, Bilder, verknüpften Geräte und Nutzungsstatistiken dauerhaft gelöscht. Das kann nicht rückgängig gemacht werden.',
    deleteButton: 'Mein Konto löschen',
    close: 'Schließen',
    emailUpdated: 'E-Mail aktualisiert',
    passwordUpdated: 'Passwort aktualisiert',
    accountDeleted: 'Konto gelöscht',
    errWrongPassword: 'Falsches Passwort',
    errInvalidEmail: 'Ungültige E-Mail',
    errEmailUsed: 'E-Mail bereits vergeben',
    errShortPassword: 'Neues Passwort zu kurz (mindestens 6 Zeichen)',
    errGeneric: 'Etwas ist schiefgelaufen'
  }
}
