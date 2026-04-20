export default {
  appTitle: 'Ma Voix',
  logoutLabel: 'Déconnexion',
  welcome: {
    title: 'Bienvenu à MaVoix',
    intro: 'Pour bien démarrer, voici trois actions principales :',
    stepDevice: 'Liez un appareil avec le bouton Lier un appareil (icône QR) dans la barre du haut.',
    stepTabs: 'Créez ou ouvrez des onglets via Onglets, ou avec le + à côté des onglets.',
    stepSettings: 'Ajustez la taille des images, la synthèse vocale et plus encore dans Paramètres globaux (icône engrenage).',
    dontShowAgain: 'Ne plus montrer la prochaine fois',
    ok: 'Compris'
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
    deviceQr: 'Lier un appareil'
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
    ttsLanguageLabel: 'Langage de synthèse vocale'
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
    categoryLabel: 'Catégorie',
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
    filter: 'Filtre :',
    addNewCategory: 'Ajouter une nouvelle catégorie',
    newCategoryPlaceholder: 'Nouvelle catégorie',
    addButton: 'Ajouter',
    pictogramCountOne: '{n} pictogramme',
    pictogramCountOther: '{n} pictogrammes',
    cancel: 'Annuler',
    addToTab: 'Ajouter',
    renameCategoryMenu: 'Renommer…',
    deleteCategoryMenu: 'Supprimer la catégorie',
    assignCategoryTitle: 'Ajouter une catégorie',
    search: 'Rechercher',
    noCategorySearchResults: 'Aucune catégorie ne correspond à la recherche.',
    renameCategoryTitle: 'Renommer la catégorie'
  },
  assetsManager: {
    assetNameLabel: 'Nom de l\'image',
    nameSave: 'Nom enregistré : '
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
    icon: 'Icône',
    nameRequired: 'Le nom est requis',
    backgroundColorRequired: 'La couleur de fond est requise',
    createButton: 'Créer l\'onglet',
    deleteConfirmMessage: 'Voulez-vous vraiment supprimer cet onglet ?'
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
  }
}
