/* eslint-disable max-lines */
export default {
  appTitle: 'Ma Voix',
  logoutLabel: 'Uitloggen',
  welcome: {
    title: 'Welkom bij MaVoix',
    intro: 'Om te beginnen, hier zijn de vier belangrijkste acties:',
    stepDevice: 'Koppel een apparaat met de knop Apparaat koppelen (QR-pictogram) in de bovenbalk.',
    stepTabs: 'Maak of open tabbladen via Tabbladen, of met de + naast de tabbladen.',
    stepSettings: 'Pas de afbeeldingsgrootte, de spraaksynthese en meer aan in Algemene instellingen (tandwielpictogram).',
    stepConnect: 'U kunt ook gebruiksgegevens (gebruikstijden en gemaakte zinnen) delen met Connect, een open platform voor het delen van gegevens. Delen is optioneel: schakel het in of uit in Algemene instellingen.',
    dontShowAgain: 'Niet meer tonen',
    ok: 'Begrepen'
  },
  connectLinked: {
    title: 'Gegevens delen met Connect',
    success: 'Het delen van gegevens met Connect is ingeschakeld. U kunt dit op elk moment wijzigen in Algemene instellingen.',
    failure: 'Het delen van gegevens met Connect kon niet worden ingeschakeld.'
  },
  stats: {
    title: 'Gebruiksstatistieken',
    period: 'Periode',
    lastDays: 'Laatste {n} dagen',
    sinceStart: 'Sinds het begin',
    loadError: 'De gegevens konden niet worden geladen.',
    empty: 'Geen gebruiksgegevens in deze periode. De statistieken verschijnen zodra de app is gebruikt met een apparaat dat aan dit account is gekoppeld.',
    weekdays: { 0: 'Maandag', 1: 'Dinsdag', 2: 'Woensdag', 3: 'Donderdag', 4: 'Vrijdag', 5: 'Zaterdag', 6: 'Zondag' },
    overview: {
      title: 'Overzicht',
      sessions: 'Sessies',
      activeDays: 'Gebruiksdagen',
      time: 'Gebruikstijd',
      phrases: 'Zinnen',
      avgPhrase: 'Kaarten per zin',
      avgSession: 'Gemiddelde duur van een sessie',
      night: 'Nachtelijke sessies',
      nightHint: 'Voor 5:30 uur',
      of: 'van {n} dag | van {n} dagen'
    },
    when: {
      title: 'Wanneer',
      perDay: 'Zinnen per dag (weekenden zijn lichter)',
      perWeek: 'Zinnen per week',
      perMonth: 'Zinnen per maand',
      heatmap: 'Zinnen per weekdag en per uur',
      day: '{label}: {phrases} zinnen, {sessions} sessies',
      week: 'Week van {label}: {phrases} zinnen, {sessions} sessies, {days} gebruiksdagen',
      month: '{label}: {phrases} zinnen, {sessions} sessies, {days} gebruiksdagen'
    },
    tabs: {
      title: 'Tabbladen',
      hint: 'Aantal aangetikte kaarten in elk tabblad. Nooit gebruikte tabbladen staan op 0.',
      taps: '{n} kaarten, {phrases} zinnen'
    },
    cards: {
      title: 'Kaarten',
      mostUsed: 'Meest gebruikt',
      leastUsed: 'Minst gebruikt',
      leastUsedHint: 'Kaarten die minstens één keer zijn gebruikt, van de zeldzaamste tot de vaakst gebruikte.',
      neverUsed: 'Nooit gebruikt ({n})',
      neverUsedHint: 'Deze kaarten staan in de tabbladen maar zijn in de periode niet gebruikt.',
      detail: '{n} keer, op {days} dagen, laatst op {last}; tabbladen: {tabs}'
    },
    phrases: {
      title: 'Zinnen',
      frequent: 'Meest voorkomende zinnen',
      frequentHint: 'Zinnen van minstens 2 kaarten die meerdere keren zijn gemaakt.',
      pairs: 'Reeksen van 2 kaarten',
      triples: 'Reeksen van 3 kaarten',
      times: '{n} keer',
      none: 'Geen enkele zin komt vaak genoeg voor.'
    },
    progress: {
      title: 'Voortgang',
      distinctCards: 'Verschillende gebruikte kaarten per week',
      avgLength: 'Kaarten per zin, per week (gemiddelde)',
      week: 'Week van {day}'
    }
  },
  navDrawer: {
    home: 'Home',
    assetsManager: 'Afbeeldingen',
    tabs: 'Tabbladen',
    addTab: 'Tabblad toevoegen',
    devices: 'Apparaten',
    addDevice: 'Apparaat toevoegen',
    noDeviceYet: 'Nog geen apparaat',
    globalSettings: 'Algemene instellingen',
    help: 'Help',
    deviceQr: 'Apparaat koppelen',
    stats: 'Statistieken'
  },
  globalSettings: {
    title: 'Algemene instellingen',
    imageSizeLabel: 'Afbeeldingsgrootte',
    sizeSmall: 'Klein',
    sizeMedium: 'Gemiddeld',
    sizeLarge: 'Groot',
    ttsSpeedLabel: 'Snelheid van de spraaksynthese',
    speedVerySlow: 'Zeer langzaam',
    speedSlow: 'Langzaam',
    speedNormal: 'Normaal',
    speedFast: 'Snel',
    ttsLanguageLabel: 'Taal van de spraaksynthese',
    connectLabel: 'Gegevens delen met Connect',
    connectOn: 'Delen ingeschakeld',
    connectOff: 'Delen uitgeschakeld',
    connectDescription: 'Connect is een open platform voor het delen van gegevens tussen communicatie-apps. Als u delen inschakelt, stuurt de MaVoix-app de begin- en eindtijden van het gebruik en de gemaakte zinnen (adres van de gebruikte afbeeldingen en uitgesproken woorden) naar Connect. Deze gegevens worden openbaar. U wordt doorgestuurd naar Connect om u te identificeren.',
    configLabel: 'Configuratie van de app',
    exportConfig: 'Exporteren',
    importConfig: 'Importeren',
    exportError: 'Fout bij het exporteren: ',
    importError: 'Fout bij het importeren: ',
    importDone: ' tabblad(en) geïmporteerd'
  },
  dnd: {
    dropFiles: 'Sleep uw bestanden hierheen',
    filesSaved: ' afbeeldingen opgeslagen',
    fileSaved: ' afbeelding opgeslagen'
  },
  camera: {
    snapPic: 'foto maken',
    retake: 'opnieuw',
    imageName: 'Naam van de afbeelding'
  },
  imageNameHint: {
    title: 'Tip voor een goede naam voor de afbeelding',
    body: 'Geef de afbeelding een betekenisvolle naam, want deze wordt door de spraaksynthese gebruikt. Verwijder de extensie .png, .jpg, .bmp of .gif uit de naam van uw afbeelding.'
  },
  takePhoto: {
    capture: 'Foto maken',
    retake: 'Foto opnieuw maken',
    nameLabel: 'Naam',
    categoryLabel: 'Thema',
    save: 'Opslaan',
    noCamera: 'Camera niet beschikbaar op dit apparaat.',
    waitCamera: 'Even geduld, de camera start…',
    defaultName: 'Foto',
    successTitle: 'Foto succesvol gemaakt',
    successMessage: 'U vindt uw afbeelding in het tabblad en in uw persoonlijke bibliotheek.',
    successOk: 'Begrepen'
  },
  uploadPhoto: {
    heading: 'Foto uploaden',
    successTitle: 'Uploaden gelukt',
    successMessage: 'U vindt uw afbeelding in het tabblad en in uw persoonlijke bibliotheek.',
    successOk: 'Begrepen'
  },
  uploadError: {
    title: 'Afbeelding verzenden mislukt',
    lead: 'De afbeelding kon niet worden verzonden.',
    bulletExtension: 'Controleer de extensie van uw afbeelding: alleen de indelingen .jpg, .jpeg en .png worden geaccepteerd.',
    bulletRetry: 'Upload een nieuwe foto of maak, indien mogelijk, een foto met de camera.',
    ok: 'Begrepen'
  },
  addImagesModal: {
    title: 'Afbeeldingen toevoegen',
    libraryArasaac: 'ARASAAC-bibliotheek',
    libraryPersonal: 'Persoonlijke bibliotheek',
    switchToPersonal: 'Persoonlijke bibliotheek',
    switchToArasaac: 'ARASAAC-bibliotheek',
    takePhoto: 'Foto maken',
    uploadPhoto: 'Foto uploaden',
    searchArasaac: 'Een ARASAAC-pictogram zoeken',
    searchPersonal: 'Een pictogram zoeken',
    themes: {
      needs: 'Behoeften',
      food: 'Eten',
      drinks: 'Drinken',
      games: 'Spelen en vrije tijd',
      people: 'Familie en personen',
      routine: 'Dagelijkse routine',
      emotions: 'Emoties',
      health: 'Lichaam en gezondheid',
      clothes: 'Kleding',
      animals: 'Dieren',
      places: 'Plaatsen',
      transport: 'Vervoer',
      school: 'School',
      verbs: 'Werkwoorden'
    },
    pictogramCountOne: '{n} pictogram',
    pictogramCountOther: '{n} pictogrammen',
    cancel: 'Annuleren',
    addToTab: 'Toevoegen',
    assignCategoryTitle: 'Kies een thema',
    addTheme: 'Thema toevoegen',
    selectImage: 'Afbeelding selecteren',
    playImage: 'De naam van de afbeelding beluisteren',
    themeLabel: 'Thema:'
  },
  assetsManager: {
    assetNameLabel: 'Naam van de afbeelding',
    nameSave: 'Naam opgeslagen: ',
    search: 'Zoeken',
    nameField: 'Naam',
    uploadError: 'Fout bij het verzenden van de afbeelding: '
  },
  assets: {
    select: 'Selecteer de afbeeldingen die u wilt toevoegen:',
    chooseImages: 'Kies de afbeeldingen die u wilt toevoegen'
  },
  tabEditor: {
    tabNameLabel: 'Naam',
    tabColorLabel: 'Kleur',
    tabSpeed: 'Snelheid',
    tabLanguage: 'Taal',
    addItemLabel: 'Afbeeldingen toevoegen',
    editLanguage: 'Stem wijzigen',
    itemDialog: {
      headingNew: 'Een afbeelding toevoegen',
      headingEdit: 'Een afbeelding bewerken',
      nameLabel: 'Naam',
      selectAssetLabel: 'Een afbeelding selecteren'
    }
  },
  deviceDialogs: {
    new: {
      heading: 'Kies een naam voor uw nieuwe apparaat'
    },
    alreadyUsedHeading: 'U heeft geen toegang meer tot het wachtwoord. Klik op de knop hieronder om een nieuwe uitnodigingscode te genereren. (Apparaten die al aan dit account zijn gekoppeld, worden losgekoppeld)',
    resetPasswordLabel: 'Opnieuw genereren',
    qrcodeHeading: 'Om het apparaat aan het account te koppelen, scant u deze QR-code vanuit de app:',
    codeHeading: 'Of voer deze code handmatig in de app in'
  },
  newTabDialog: {
    heading: 'Kies een naam voor uw nieuwe tabblad!'
  },
  tabSettings: {
    createTitle: 'Een nieuw tabblad maken',
    editTitle: 'Instellingen van het tabblad',
    tabName: 'Naam van het tabblad',
    backgroundColor: 'Achtergrondkleur',
    selectedColor: 'Gekozen kleur',
    currentColor: 'Huidige kleur',
    icon: 'Pictogram',
    otherIcons: {
      soup_kitchen: 'Maaltijd',
      check_circle: 'Goedgekeurd',
      home: 'Huis',
      settings: 'Instellingen',
      local_cafe: 'Koffie',
      build: 'Knutselen',
      sports_bar: 'Bar',
      wine_bar: 'Glas',
      calculate: 'Rekenen',
      flag: 'Vlag',
      category: 'Categorie',
      star: 'Ster'
    },
    nameRequired: 'De naam is verplicht',
    backgroundColorRequired: 'De achtergrondkleur is verplicht',
    createButton: 'Tabblad maken',
    deleteConfirmMessage: 'Weet u zeker dat u dit tabblad wilt verwijderen?',
    updateError: 'Fout bij het bijwerken van het tabblad',
    defaultTabName: 'Activiteiten',
    defaultItemName: 'Drinken'
  },
  generic: {
    close: 'Sluiten',
    validate: 'Bevestigen',
    delete: 'Verwijderen',
    cancel: 'Annuleren',
    save: 'Opslaan',
    add: 'Toevoegen',
    unavailable: 'Niet beschikbaar',
    invisible: 'Onzichtbaar',
    undo: 'Ongedaan maken',
    redo: 'Opnieuw',
    loading: 'Laden'
  },
  assetEditor: {
    rename: 'Afbeelding hernoemen',
    delete: 'Afbeelding verwijderen',
    deleteDialog: {
      title: 'Pictogram verwijderen',
      message: 'Weet u zeker dat u het pictogram uit dit tabblad wilt verwijderen?',
      cancel: 'Nee',
      confirm: 'Ja',
      dontAskAgain: 'Niet meer vragen'
    }
  },
  auth: {
    login: 'Inloggen',
    signup: 'Registreren',
    email: 'E-mail',
    password: 'Wachtwoord'
  },
  account: {
    title: 'Mijn account',
    currentPassword: 'Huidig wachtwoord (vereist voor elke wijziging)',
    updateEmail: 'E-mail bijwerken',
    newPassword: 'Nieuw wachtwoord',
    changePassword: 'Wachtwoord wijzigen',
    deleteHeading: 'Account verwijderen',
    deleteWarning: 'Dit verwijdert je account, tabbladen, afbeeldingen, gekoppelde apparaten en gebruiksstatistieken definitief. Dit kan niet ongedaan worden gemaakt.',
    deleteButton: 'Mijn account verwijderen',
    close: 'Sluiten',
    emailUpdated: 'E-mail bijgewerkt',
    passwordUpdated: 'Wachtwoord bijgewerkt',
    accountDeleted: 'Account verwijderd',
    errWrongPassword: 'Onjuist wachtwoord',
    errInvalidEmail: 'Ongeldig e-mailadres',
    errEmailUsed: 'E-mailadres al in gebruik',
    errShortPassword: 'Nieuw wachtwoord te kort (minimaal 6 tekens)',
    errGeneric: 'Er is iets misgegaan'
  }
}
