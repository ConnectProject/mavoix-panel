/* eslint-disable max-lines */
export default {
  appTitle: 'Ma Voix',
  logoutLabel: 'Déconnexion',
  welcome: {
    title: 'Bienvenu à MaVoix',
    intro: 'Pour bien démarrer, voici quatre actions principales :',
    stepDevice: 'Liez un appareil avec le bouton Lier un appareil (icône QR) dans la barre du haut.',
    stepTabs: 'Créez ou ouvrez des onglets via Onglets, ou avec le + à côté des onglets.',
    stepSettings: 'Ajustez la taille des images, la synthèse vocale et plus encore dans Paramètres globaux (icône engrenage).',
    stepConnect: 'Vous pouvez aussi partager des données d\'usage (heures d\'utilisation et phrases construites) avec Connect, une plateforme ouverte de partage de données. Ce partage est facultatif : activez-le ou désactivez-le dans Paramètres globaux.',
    dontShowAgain: 'Ne plus montrer la prochaine fois',
    ok: 'Compris'
  },
  connectLinked: {
    title: 'Partage de données avec Connect',
    success: 'Le partage de données avec Connect est activé. Vous pouvez le modifier à tout moment dans Paramètres globaux.',
    failure: 'Le partage de données avec Connect n\'a pas pu être activé.'
  },
  stats: {
    title: 'Statistiques d\'utilisation',
    period: 'Période',
    lastDays: 'Les {n} derniers jours',
    sinceStart: 'Depuis le début',
    loadError: 'Impossible de charger les données.',
    empty: 'Aucune donnée d\'utilisation sur cette période. Les statistiques apparaissent dès que l\'application a été utilisée avec un appareil lié à ce compte.',
    weekdays: { 0: 'Lundi', 1: 'Mardi', 2: 'Mercredi', 3: 'Jeudi', 4: 'Vendredi', 5: 'Samedi', 6: 'Dimanche' },
    overview: {
      title: 'Vue d\'ensemble',
      sessions: 'Sessions',
      activeDays: 'Jours d\'utilisation',
      time: 'Temps d\'utilisation',
      phrases: 'Phrases',
      avgPhrase: 'Cartes par phrase',
      avgSession: 'Durée moyenne d\'une session',
      night: 'Sessions de nuit',
      nightHint: 'Avant 5 h 30',
      of: 'sur {n} jour | sur {n} jours'
    },
    when: {
      title: 'Quand',
      perDay: 'Phrases par jour (les week-ends sont en plus clair)',
      perWeek: 'Phrases par semaine',
      perMonth: 'Phrases par mois',
      heatmap: 'Phrases par jour de la semaine et par heure',
      day: '{label} : {phrases} phrases, {sessions} sessions',
      week: 'Semaine du {label} : {phrases} phrases, {sessions} sessions, {days} jours d\'utilisation',
      month: '{label} : {phrases} phrases, {sessions} sessions, {days} jours d\'utilisation'
    },
    tabs: {
      title: 'Onglets',
      hint: 'Nombre de cartes touchées dans chaque onglet. Les onglets jamais utilisés sont à 0.',
      taps: '{n} cartes, {phrases} phrases'
    },
    cards: {
      title: 'Cartes',
      mostUsed: 'Les plus utilisées',
      leastUsed: 'Les moins utilisées',
      leastUsedHint: 'Cartes utilisées au moins une fois, de la plus rare à la plus fréquente.',
      neverUsed: 'Jamais utilisées ({n})',
      neverUsedHint: 'Ces cartes sont dans les onglets mais n\'ont pas été utilisées sur la période.',
      detail: '{n} fois, sur {days} jours, dernière fois le {last} ; onglets : {tabs}'
    },
    phrases: {
      title: 'Phrases',
      frequent: 'Phrases les plus fréquentes',
      frequentHint: 'Phrases d\'au moins 2 cartes construites plusieurs fois.',
      pairs: 'Enchaînements de 2 cartes',
      triples: 'Enchaînements de 3 cartes',
      times: '{n} fois',
      none: 'Aucune phrase ne revient assez souvent.'
    },
    progress: {
      title: 'Progression',
      distinctCards: 'Cartes différentes utilisées par semaine',
      avgLength: 'Cartes par phrase, par semaine (moyenne)',
      week: 'Semaine du {day}'
    }
  },
  navDrawer: {
    home: 'Accueil',
    assetsManager: 'Images',
    tabs: 'Onglets',
    addTab: 'Ajouter un onglet',
    devices: 'Appareils',
    addDevice: 'Ajouter un appareil',
    noDeviceYet: 'Aucun appareil pour le moment',
    globalSettings: 'Paramètres globaux',
    help: 'Aide',
    deviceQr: 'Lier un appareil',
    stats: 'Statistiques'
  },
  globalSettings: {
    title: 'Paramètres globaux',
    imageSizeLabel: 'Taille d\'images',
    sizeSmall: 'Petit',
    sizeMedium: 'Moyenne',
    sizeLarge: 'Grande',
    ttsSpeedLabel: 'Vitesse de synthèse vocale',
    speedVerySlow: 'Très Lent',
    speedSlow: 'Lent',
    speedNormal: 'Normal',
    speedFast: 'Rapide',
    noVoice: 'Aucune voix installée pour la langue {lang} : la synthèse vocale utilise la voix par défaut.',
    ttsLanguageLabel: 'Langage de synthèse vocale',
    connectLabel: 'Partage de données avec Connect',
    connectOn: 'Partage activé',
    connectOff: 'Partage désactivé',
    connectDescription: 'Connect est une plateforme ouverte de partage de données entre applications d\'aide à la communication. Si vous activez le partage, l\'application MaVoix y envoie les heures de début et de fin d\'utilisation, ainsi que les phrases construites (adresse des images utilisées et mots prononcés). Ces données sont rendues publiques. Vous serez redirigé vers Connect pour vous identifier.',
    configLabel: 'Configuration de l\'application',
    exportConfig: 'Exporter',
    importConfig: 'Importer',
    exportError: 'Erreur lors de l\'export : ',
    importError: 'Erreur lors de l\'import : ',
    importDone: ' onglet(s) importé(s)'
  },
  dnd: {
    dropFiles: 'Déposez ici vos fichiers',
    filesSaved: ' images enregistrées',
    fileSaved: ' image enregistrée'
  },
  camera: {
    snapPic: 'prendre une photo',
    retake: 'reprendre',
    imageName: 'Nom de l\'image'
  },
  imageNameHint: {
    title: 'Conseil pour bien nommer l’image',
    body: 'Donner sens au nom de l’image, car cela sera utilisé par la synthèse vocale. Veuillez enlever le suffixe .png, .jpg, .bmp, .gif de votre image.'
  },
  takePhoto: {
    capture: 'Prendre la photo',
    retake: 'Reprendre la photo',
    nameLabel: 'Nom',
    categoryLabel: 'Thème',
    save: 'Enregistrer',
    noCamera: 'Caméra non disponible sur cet appareil.',
    waitCamera: 'Patientez, la caméra démarre…',
    defaultName: 'Photo',
    successTitle: 'Prise de photo réussie',
    successMessage: 'Veuillez trouver votre image sur l\'onglet et dans votre bibliothèque personnelle.',
    successOk: 'Compris'
  },
  uploadPhoto: {
    heading: 'Télécharger une photo',
    successTitle: 'Téléchargement réussi',
    successMessage: 'Veuillez trouver votre image sur l\'onglet et dans votre bibliothèque personnelle.',
    successOk: 'Compris'
  },
  uploadError: {
    title: 'Échec d’envoi de l’image',
    lead: 'L’image n’a pas réussi à s’envoyer.',
    bulletExtension: 'Vérifiez l’extension de votre image : seuls les formats .jpg, .jpeg et .png sont acceptés.',
    bulletRetry: 'Veuillez télécharger une nouvelle photo ou essayez de prendre une photo avec la caméra si possible.',
    ok: 'Compris'
  },
  addImagesModal: {
    title: 'Ajouter les images',
    libraryArasaac: 'Bibliothèque ARASAAC',
    libraryPersonal: 'Bibliothèque personnelle',
    switchToPersonal: 'Bibliothèque personnelle',
    switchToArasaac: 'Bibliothèque ARASAAC',
    takePhoto: 'Prendre une photo',
    uploadPhoto: 'Télécharger une photo',
    searchArasaac: 'Rechercher un pictogramme ARASAAC',
    searchPersonal: 'Rechercher un pictogramme',
    themes: {
      needs: 'Besoins',
      food: 'Nourriture',
      drinks: 'Boissons',
      games: 'Jeux et loisirs',
      people: 'Famille et personnes',
      routine: 'Routine du jour',
      emotions: 'Émotions',
      health: 'Corps et santé',
      clothes: 'Vêtements',
      animals: 'Animaux',
      places: 'Lieux',
      transport: 'Transports',
      school: 'École',
      verbs: 'Verbes'
    },
    pictogramCountOne: '{n} pictogramme',
    pictogramCountOther: '{n} pictogrammes',
    cancel: 'Annuler',
    addToTab: 'Ajouter',
    assignCategoryTitle: 'Choisir un thème',
    addTheme: 'Ajouter un thème',
    selectImage: 'Sélectionner l\'image',
    playImage: 'Écouter le nom de l\'image',
    themeLabel: 'Thème :'
  },
  assetsManager: {
    assetNameLabel: 'Nom de l\'image',
    nameSave: 'Nom enregistré : ',
    search: 'Rechercher',
    nameField: 'Nom',
    uploadError: 'Erreur lors de l\'envoi de l\'image : '
  },
  assets: {
    select: 'Sélectionnez les images à ajouter :',
    chooseImages: 'Choisissez les images à ajouter'
  },
  tabEditor: {
    tabNameLabel: 'Nom',
    tabColorLabel: 'Couleur',
    tabSpeed: 'Vitesse',
    tabLanguage: 'Langue',
    addItemLabel: 'Ajouter des images',
    editLanguage: 'Modifier Voix',
    itemDialog: {
      headingNew: 'Ajout d\'une image',
      headingEdit: 'Editer une image',
      nameLabel: 'Nom',
      selectAssetLabel: 'Sélectionner une image'
    }
  },
  deviceDialogs: {
    new: {
      heading: 'Choisissez un nom pour votre nouvelle appareil'
    },
    alreadyUsedHeading: 'Vous ne pouvez plus acceder au mot de passe, cliquez sur le boutton ci dessous afin de regenerer un code d\'invitation. (Les appareils déjà connecté a ce compte seront déconnectés)',
    resetPasswordLabel: 'Regénérer',
    qrcodeHeading: 'Pour connecter l\'appareil au compte, veuillez scanner ce qrcode depuis l\'application:',
    codeHeading: 'Ou bien, entrez manuellement ce code dans l\'application'
  },
  newTabDialog: {
    heading: 'Choisissez un nom pour votre nouvel onglet !'
  },
  tabSettings: {
    createTitle: 'Création d\'un nouvel onglet',
    editTitle: 'Paramètres de l\'onglet',
    tabName: 'Nom de l\'onglet',
    backgroundColor: 'Couleur de fond',
    selectedColor: 'Couleur choisie',
    currentColor: 'Couleur actuelle',
    icon: 'Icône',
    otherIcons: {
      soup_kitchen: 'Repas',
      check_circle: 'Validé',
      home: 'Maison',
      settings: 'Réglages',
      local_cafe: 'Café',
      build: 'Bricolage',
      sports_bar: 'Bar',
      wine_bar: 'Verre',
      calculate: 'Calcul',
      flag: 'Drapeau',
      category: 'Catégorie',
      star: 'Étoile'
    },
    nameRequired: 'Le nom est requis',
    backgroundColorRequired: 'La couleur de fond est requise',
    createButton: 'Créer l\'onglet',
    deleteConfirmMessage: 'Voulez-vous vraiment supprimer cet onglet ?',
    updateError: 'Erreur lors de la mise à jour de l\'onglet',
    defaultTabName: 'Activités',
    defaultItemName: 'Boire'
  },
  generic: {
    close: 'Fermer',
    validate: 'Valider',
    delete: 'Supprimer',
    cancel: 'Annuler',
    save: 'Sauvegarder',
    add: 'Ajouter',
    unavailable: 'Indisponible',
    invisible: 'Invisible',
    undo: 'Undo',
    redo: 'Redo',
    loading: 'Chargement'
  },
  assetEditor: {
    rename: 'Renommer l\'image',
    delete: 'Supprimer l\'image',
    deleteDialog: {
      title: 'Supprimer le picto',
      message: 'Vous etes sur vous voulez supprimer le picto sur cet l\'onglet ?',
      cancel: 'Non',
      confirm: 'Oui',
      dontAskAgain: 'Ne me demander pas la prochaine fois'
    }
  },
  auth: {
    login: 'Connexion',
    signup: 'Inscription',
    email: 'Email',
    password: 'Mot de passe'
  },
  account: {
    title: 'Mon compte',
    currentPassword: 'Mot de passe actuel (requis pour toute modification)',
    updateEmail: 'Modifier l\'email',
    newPassword: 'Nouveau mot de passe',
    changePassword: 'Changer le mot de passe',
    deleteHeading: 'Supprimer le compte',
    deleteWarning: 'Cela supprime définitivement votre compte, vos onglets, images, appareils liés et statistiques d\'usage. Action irréversible.',
    deleteButton: 'Supprimer mon compte',
    close: 'Fermer',
    emailUpdated: 'Email mis à jour',
    passwordUpdated: 'Mot de passe mis à jour',
    accountDeleted: 'Compte supprimé',
    errWrongPassword: 'Mot de passe incorrect',
    errInvalidEmail: 'Email invalide',
    errEmailUsed: 'Email déjà utilisé',
    errShortPassword: 'Nouveau mot de passe trop court (6 caractères minimum)',
    errGeneric: 'Une erreur est survenue'
  }
}
