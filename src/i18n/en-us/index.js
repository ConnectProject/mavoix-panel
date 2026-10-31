export default {
  appTitle: 'Ma Voix',
  logoutLabel: 'Log out',
  welcome: {
    title: 'Welcome to MaVoix',
    intro: 'To get started, here are the four main actions:',
    stepDevice: 'Link a device with the Link a device button (QR icon) in the top bar.',
    stepTabs: 'Create or open tabs via Tabs, or with the + next to the tabs.',
    stepSettings: 'Adjust the image size, text to speech and more in Global settings (gear icon).',
    stepConnect: 'You can also share usage data (usage times and sentences built) with Connect, an open data sharing platform. Sharing is optional: turn it on or off in Global settings.',
    dontShowAgain: 'Do not show this again',
    ok: 'Got it'
  },
  connectLinked: {
    title: 'Data sharing with Connect',
    success: 'Data sharing with Connect is on. You can change it at any time in Global settings.',
    failure: 'Data sharing with Connect could not be turned on.'
  },
  stats: {
    title: 'Usage statistics',
    period: 'Period',
    lastDays: 'Last {n} days',
    sinceStart: 'Since the beginning',
    loadError: 'Unable to load the data.',
    empty: 'No usage data for this period. Statistics appear as soon as the app has been used with a device linked to this account.',
    weekdays: { 0: 'Monday', 1: 'Tuesday', 2: 'Wednesday', 3: 'Thursday', 4: 'Friday', 5: 'Saturday', 6: 'Sunday' },
    overview: {
      title: 'Overview',
      sessions: 'Sessions',
      activeDays: 'Days of use',
      time: 'Time of use',
      phrases: 'Sentences',
      avgPhrase: 'Cards per sentence',
      avgSession: 'Average session length',
      night: 'Night sessions',
      nightHint: 'Before 5:30 am',
      of: 'out of {n} day | out of {n} days'
    },
    when: {
      title: 'When',
      perDay: 'Sentences per day (weekends are lighter)',
      perWeek: 'Sentences per week',
      perMonth: 'Sentences per month',
      heatmap: 'Sentences by day of the week and hour',
      day: '{label}: {phrases} sentences, {sessions} sessions',
      week: 'Week of {label}: {phrases} sentences, {sessions} sessions, {days} days of use',
      month: '{label}: {phrases} sentences, {sessions} sessions, {days} days of use'
    },
    tabs: {
      title: 'Tabs',
      hint: 'Number of cards tapped in each tab. Tabs that were never used show 0.',
      taps: '{n} cards, {phrases} sentences'
    },
    cards: {
      title: 'Cards',
      mostUsed: 'Most used',
      leastUsed: 'Least used',
      leastUsedHint: 'Cards used at least once, from the rarest to the most frequent.',
      neverUsed: 'Never used ({n})',
      neverUsedHint: 'These cards are in the tabs but were not used during the period.',
      detail: '{n} times, over {days} days, last time on {last}; tabs: {tabs}'
    },
    phrases: {
      title: 'Sentences',
      frequent: 'Most frequent sentences',
      frequentHint: 'Sentences of at least 2 cards built several times.',
      pairs: 'Sequences of 2 cards',
      triples: 'Sequences of 3 cards',
      times: '{n} times',
      none: 'No sentence comes back often enough.'
    },
    progress: {
      title: 'Progress',
      distinctCards: 'Distinct cards used per week',
      avgLength: 'Cards per sentence, per week (average)',
      week: 'Week of {day}'
    }
  },
  navDrawer: {
    home: 'Home',
    assetsManager: 'Images',
    tabs: 'Tabs',
    addTab: 'Add a tab',
    devices: 'Devices',
    addDevice: 'Add a device',
    noDeviceYet: 'No device yet',
    globalSettings: 'Global settings',
    help: 'Help',
    deviceQr: 'Link a device',
    stats: 'Statistics'
  },
  globalSettings: {
    title: 'Global settings',
    imageSizeLabel: 'Image size',
    sizeSmall: 'Small',
    sizeMedium: 'Medium',
    sizeLarge: 'Large',
    ttsSpeedLabel: 'Speech speed',
    speedVerySlow: 'Very slow',
    speedSlow: 'Slow',
    speedNormal: 'Normal',
    speedFast: 'Fast',
    ttsLanguageLabel: 'Language (interface and speech)',
    connectLabel: 'Data sharing with Connect',
    connectOn: 'Sharing on',
    connectOff: 'Sharing off',
    connectDescription: 'Connect is an open platform for sharing data between communication aid applications. If you turn sharing on, the MaVoix app sends it the start and end times of use, as well as the sentences built (addresses of the images used and words spoken). This data is made public. You will be redirected to Connect to identify yourself.',
    configLabel: 'App configuration',
    exportConfig: 'Export',
    importConfig: 'Import',
    exportError: 'Export error: ',
    importError: 'Import error: ',
    importDone: ' tab(s) imported'
  },
  dnd: {
    dropFiles: 'Drop your files here',
    filesSaved: ' images saved',
    fileSaved: ' image saved'
  },
  camera: {
    snapPic: 'take a picture',
    retake: 'retake',
    imageName: 'Image name'
  },
  imageNameHint: {
    title: 'Tip for naming the image',
    body: 'Give the image a meaningful name, because it will be used by the text to speech. Please remove the .png, .jpg, .bmp, .gif suffix from your image name.'
  },
  takePhoto: {
    capture: 'Take the photo',
    retake: 'Retake the photo',
    nameLabel: 'Name',
    categoryLabel: 'Theme',
    save: 'Save',
    noCamera: 'Camera not available on this device.',
    waitCamera: 'Please wait, the camera is starting…',
    defaultName: 'Photo',
    successTitle: 'Photo taken',
    successMessage: 'You will find your image in the tab and in your personal library.',
    successOk: 'Got it'
  },
  uploadPhoto: {
    heading: 'Upload a photo',
    successTitle: 'Upload successful',
    successMessage: 'You will find your image in the tab and in your personal library.',
    successOk: 'Got it'
  },
  uploadError: {
    title: 'Image upload failed',
    lead: 'The image could not be uploaded.',
    bulletExtension: 'Check your image\'s extension: only .jpg, .jpeg and .png formats are accepted.',
    bulletRetry: 'Please upload a new photo, or try taking a photo with the camera if possible.',
    ok: 'Got it'
  },
  addImagesModal: {
    title: 'Add images',
    libraryArasaac: 'ARASAAC library',
    libraryPersonal: 'Personal library',
    switchToPersonal: 'Personal library',
    switchToArasaac: 'ARASAAC library',
    takePhoto: 'Take a photo',
    uploadPhoto: 'Upload a photo',
    searchArasaac: 'Search an ARASAAC pictogram',
    searchPersonal: 'Search a pictogram',
    themes: {
      needs: 'Needs',
      food: 'Food',
      drinks: 'Drinks',
      games: 'Games and leisure',
      people: 'Family and people',
      routine: 'Daily routine',
      emotions: 'Emotions',
      health: 'Body and health',
      clothes: 'Clothes',
      animals: 'Animals',
      places: 'Places',
      transport: 'Transport',
      school: 'School',
      verbs: 'Verbs'
    },
    pictogramCountOne: '{n} pictogram',
    pictogramCountOther: '{n} pictograms',
    cancel: 'Cancel',
    addToTab: 'Add',
    assignCategoryTitle: 'Choose a theme',
    addTheme: 'Add a theme',
    selectImage: 'Select the image',
    playImage: 'Listen to the image name',
    themeLabel: 'Theme:'
  },
  assetsManager: {
    assetNameLabel: 'Image name',
    nameSave: 'Name saved: ',
    search: 'Search',
    nameField: 'Name',
    uploadError: 'Error uploading image: '
  },
  assets: {
    select: 'Select the images to add:',
    chooseImages: 'Choose the images to add'
  },
  tabEditor: {
    tabNameLabel: 'Name',
    tabColorLabel: 'Color',
    tabSpeed: 'Speed',
    tabLanguage: 'Language',
    addItemLabel: 'Add images',
    editLanguage: 'Edit voice',
    itemDialog: {
      headingNew: 'Add an image',
      headingEdit: 'Edit an image',
      nameLabel: 'Name',
      selectAssetLabel: 'Select an image'
    }
  },
  deviceDialogs: {
    new: {
      heading: 'Choose a name for your new device'
    },
    alreadyUsedHeading: 'You can no longer access the password. Click the button below to generate a new invitation code. (Devices already connected to this account will be disconnected.)',
    resetPasswordLabel: 'Regenerate',
    qrcodeHeading: 'To connect the device to the account, please scan this QR code from the app:',
    codeHeading: 'Or enter this code manually in the app'
  },
  newTabDialog: {
    heading: 'Choose a name for your new tab!'
  },
  tabSettings: {
    createTitle: 'Create a new tab',
    editTitle: 'Tab settings',
    tabName: 'Tab name',
    backgroundColor: 'Background color',
    selectedColor: 'Selected color',
    currentColor: 'Current color',
    icon: 'Icon',
    otherIcons: {
      soup_kitchen: 'Meal',
      check_circle: 'Done',
      home: 'Home',
      settings: 'Settings',
      local_cafe: 'Coffee',
      build: 'DIY',
      sports_bar: 'Bar',
      wine_bar: 'Glass',
      calculate: 'Calculation',
      flag: 'Flag',
      category: 'Category',
      star: 'Star'
    },
    nameRequired: 'The name is required',
    backgroundColorRequired: 'The background color is required',
    createButton: 'Create the tab',
    deleteConfirmMessage: 'Do you really want to delete this tab?',
    updateError: 'Error updating tab',
    defaultTabName: 'Activities',
    defaultItemName: 'Drink'
  },
  generic: {
    close: 'Close',
    validate: 'Validate',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    add: 'Add',
    unavailable: 'Unavailable',
    invisible: 'Invisible',
    undo: 'Undo',
    redo: 'Redo',
    loading: 'Loading'
  },
  assetEditor: {
    rename: 'Rename the image',
    delete: 'Delete the image',
    deleteDialog: {
      title: 'Delete the picture',
      message: 'Are you sure you want to delete the picture from this tab?',
      cancel: 'No',
      confirm: 'Yes',
      dontAskAgain: 'Do not ask me again'
    }
  },
  auth: {
    login: 'Log in',
    signup: 'Sign up',
    email: 'Email',
    password: 'Password'
  }
}
