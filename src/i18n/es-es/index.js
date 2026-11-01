/* eslint-disable max-lines */
export default {
  appTitle: 'Ma Voix',
  logoutLabel: 'Cerrar sesión',
  welcome: {
    title: 'Bienvenido a MaVoix',
    intro: 'Para empezar, estas son las cuatro acciones principales:',
    stepDevice: 'Vincule un dispositivo con el botón Vincular un dispositivo (icono QR) de la barra superior.',
    stepTabs: 'Cree o abra pestañas desde Pestañas, o con el + junto a las pestañas.',
    stepSettings: 'Ajuste el tamaño de las imágenes, la síntesis de voz y más en Ajustes globales (icono de engranaje).',
    stepConnect: 'También puede compartir datos de uso (horas de uso y frases construidas) con Connect, una plataforma abierta de intercambio de datos. Compartir es opcional: actívelo o desactívelo en Ajustes globales.',
    dontShowAgain: 'No volver a mostrar',
    ok: 'Entendido'
  },
  connectLinked: {
    title: 'Compartir datos con Connect',
    success: 'Se ha activado el intercambio de datos con Connect. Puede cambiarlo en cualquier momento en Ajustes globales.',
    failure: 'No se ha podido activar el intercambio de datos con Connect.'
  },
  stats: {
    title: 'Estadísticas de uso',
    period: 'Periodo',
    lastDays: 'Últimos {n} días',
    sinceStart: 'Desde el principio',
    loadError: 'No se han podido cargar los datos.',
    empty: 'No hay datos de uso en este periodo. Las estadísticas aparecen en cuanto se usa la aplicación con un dispositivo vinculado a esta cuenta.',
    weekdays: { 0: 'Lunes', 1: 'Martes', 2: 'Miércoles', 3: 'Jueves', 4: 'Viernes', 5: 'Sábado', 6: 'Domingo' },
    overview: {
      title: 'Resumen',
      sessions: 'Sesiones',
      activeDays: 'Días de uso',
      time: 'Tiempo de uso',
      phrases: 'Frases',
      avgPhrase: 'Tarjetas por frase',
      avgSession: 'Duración media de una sesión',
      night: 'Sesiones nocturnas',
      nightHint: 'Antes de las 5:30',
      of: 'de {n} día | de {n} días'
    },
    when: {
      title: 'Cuándo',
      perDay: 'Frases por día (los fines de semana, en un tono más claro)',
      perWeek: 'Frases por semana',
      perMonth: 'Frases por mes',
      heatmap: 'Frases por día de la semana y por hora',
      day: '{label}: {phrases} frases, {sessions} sesiones',
      week: 'Semana del {label}: {phrases} frases, {sessions} sesiones, {days} días de uso',
      month: '{label}: {phrases} frases, {sessions} sesiones, {days} días de uso'
    },
    tabs: {
      title: 'Pestañas',
      hint: 'Número de tarjetas tocadas en cada pestaña. Las pestañas nunca usadas están en 0.',
      taps: '{n} tarjetas, {phrases} frases'
    },
    cards: {
      title: 'Tarjetas',
      mostUsed: 'Las más usadas',
      leastUsed: 'Las menos usadas',
      leastUsedHint: 'Tarjetas usadas al menos una vez, de la más rara a la más frecuente.',
      neverUsed: 'Nunca usadas ({n})',
      neverUsedHint: 'Estas tarjetas están en las pestañas pero no se han usado en el periodo.',
      detail: '{n} veces, en {days} días, última vez el {last}; pestañas: {tabs}'
    },
    phrases: {
      title: 'Frases',
      frequent: 'Frases más frecuentes',
      frequentHint: 'Frases de al menos 2 tarjetas construidas varias veces.',
      pairs: 'Secuencias de 2 tarjetas',
      triples: 'Secuencias de 3 tarjetas',
      times: '{n} veces',
      none: 'Ninguna frase se repite lo suficiente.'
    },
    progress: {
      title: 'Progreso',
      distinctCards: 'Tarjetas distintas usadas por semana',
      avgLength: 'Tarjetas por frase, por semana (media)',
      week: 'Semana del {day}'
    }
  },
  navDrawer: {
    home: 'Inicio',
    assetsManager: 'Imágenes',
    tabs: 'Pestañas',
    addTab: 'Añadir una pestaña',
    devices: 'Dispositivos',
    addDevice: 'Añadir un dispositivo',
    noDeviceYet: 'Aún no hay ningún dispositivo',
    globalSettings: 'Ajustes globales',
    help: 'Ayuda',
    deviceQr: 'Vincular un dispositivo',
    stats: 'Estadísticas'
  },
  globalSettings: {
    title: 'Ajustes globales',
    imageSizeLabel: 'Tamaño de las imágenes',
    sizeSmall: 'Pequeño',
    sizeMedium: 'Mediano',
    sizeLarge: 'Grande',
    ttsSpeedLabel: 'Velocidad de la síntesis de voz',
    speedVerySlow: 'Muy lenta',
    speedSlow: 'Lenta',
    speedNormal: 'Normal',
    speedFast: 'Rápida',
    ttsLanguageLabel: 'Idioma de la síntesis de voz',
    connectLabel: 'Compartir datos con Connect',
    connectOn: 'Compartir activado',
    connectOff: 'Compartir desactivado',
    connectDescription: 'Connect es una plataforma abierta de intercambio de datos entre aplicaciones de ayuda a la comunicación. Si activa el intercambio, la aplicación MaVoix le envía las horas de inicio y fin de uso, así como las frases construidas (dirección de las imágenes usadas y palabras pronunciadas). Estos datos se hacen públicos. Se le redirigirá a Connect para identificarse.',
    configLabel: 'Configuración de la aplicación',
    exportConfig: 'Exportar',
    importConfig: 'Importar',
    exportError: 'Error al exportar: ',
    importError: 'Error al importar: ',
    importDone: ' pestaña(s) importada(s)'
  },
  dnd: {
    dropFiles: 'Suelte aquí sus archivos',
    filesSaved: ' imágenes guardadas',
    fileSaved: ' imagen guardada'
  },
  camera: {
    snapPic: 'hacer una foto',
    retake: 'repetir',
    imageName: 'Nombre de la imagen'
  },
  imageNameHint: {
    title: 'Consejo para nombrar bien la imagen',
    body: 'Dé un significado al nombre de la imagen, ya que lo usará la síntesis de voz. Elimine el sufijo .png, .jpg, .bmp o .gif de su imagen.'
  },
  takePhoto: {
    capture: 'Hacer la foto',
    retake: 'Repetir la foto',
    nameLabel: 'Nombre',
    categoryLabel: 'Tema',
    save: 'Guardar',
    noCamera: 'Cámara no disponible en este dispositivo.',
    waitCamera: 'Espere, la cámara se está iniciando…',
    defaultName: 'Foto',
    successTitle: 'Foto realizada con éxito',
    successMessage: 'Encontrará su imagen en la pestaña y en su biblioteca personal.',
    successOk: 'Entendido'
  },
  uploadPhoto: {
    heading: 'Subir una foto',
    successTitle: 'Subida correcta',
    successMessage: 'Encontrará su imagen en la pestaña y en su biblioteca personal.',
    successOk: 'Entendido'
  },
  uploadError: {
    title: 'Error al enviar la imagen',
    lead: 'No se ha podido enviar la imagen.',
    bulletExtension: 'Compruebe la extensión de su imagen: solo se aceptan los formatos .jpg, .jpeg y .png.',
    bulletRetry: 'Suba una nueva foto o, si es posible, haga una foto con la cámara.',
    ok: 'Entendido'
  },
  addImagesModal: {
    title: 'Añadir imágenes',
    libraryArasaac: 'Biblioteca ARASAAC',
    libraryPersonal: 'Biblioteca personal',
    switchToPersonal: 'Biblioteca personal',
    switchToArasaac: 'Biblioteca ARASAAC',
    takePhoto: 'Hacer una foto',
    uploadPhoto: 'Subir una foto',
    searchArasaac: 'Buscar un pictograma de ARASAAC',
    searchPersonal: 'Buscar un pictograma',
    themes: {
      needs: 'Necesidades',
      food: 'Comida',
      drinks: 'Bebidas',
      games: 'Juegos y ocio',
      people: 'Familia y personas',
      routine: 'Rutina diaria',
      emotions: 'Emociones',
      health: 'Cuerpo y salud',
      clothes: 'Ropa',
      animals: 'Animales',
      places: 'Lugares',
      transport: 'Transportes',
      school: 'Escuela',
      verbs: 'Verbos'
    },
    pictogramCountOne: '{n} pictograma',
    pictogramCountOther: '{n} pictogramas',
    cancel: 'Cancelar',
    addToTab: 'Añadir',
    assignCategoryTitle: 'Elegir un tema',
    addTheme: 'Añadir un tema',
    selectImage: 'Seleccionar la imagen',
    playImage: 'Escuchar el nombre de la imagen',
    themeLabel: 'Tema:'
  },
  assetsManager: {
    assetNameLabel: 'Nombre de la imagen',
    nameSave: 'Nombre guardado: ',
    search: 'Buscar',
    nameField: 'Nombre',
    uploadError: 'Error al enviar la imagen: '
  },
  assets: {
    select: 'Seleccione las imágenes que desea añadir:',
    chooseImages: 'Elija las imágenes que desea añadir'
  },
  tabEditor: {
    tabNameLabel: 'Nombre',
    tabColorLabel: 'Color',
    tabSpeed: 'Velocidad',
    tabLanguage: 'Idioma',
    addItemLabel: 'Añadir imágenes',
    editLanguage: 'Modificar voz',
    itemDialog: {
      headingNew: 'Añadir una imagen',
      headingEdit: 'Editar una imagen',
      nameLabel: 'Nombre',
      selectAssetLabel: 'Seleccionar una imagen'
    }
  },
  deviceDialogs: {
    new: {
      heading: 'Elija un nombre para su nuevo dispositivo'
    },
    alreadyUsedHeading: 'Ya no puede acceder a la contraseña. Pulse el botón de abajo para regenerar un código de invitación. (Los dispositivos ya conectados a esta cuenta se desconectarán)',
    resetPasswordLabel: 'Regenerar',
    qrcodeHeading: 'Para conectar el dispositivo a la cuenta, escanee este código QR desde la aplicación:',
    codeHeading: 'O bien, introduzca manualmente este código en la aplicación'
  },
  newTabDialog: {
    heading: '¡Elija un nombre para su nueva pestaña!'
  },
  tabSettings: {
    createTitle: 'Creación de una nueva pestaña',
    editTitle: 'Ajustes de la pestaña',
    tabName: 'Nombre de la pestaña',
    backgroundColor: 'Color de fondo',
    selectedColor: 'Color elegido',
    currentColor: 'Color actual',
    icon: 'Icono',
    otherIcons: {
      soup_kitchen: 'Comida',
      check_circle: 'Validado',
      home: 'Casa',
      settings: 'Ajustes',
      local_cafe: 'Café',
      build: 'Bricolaje',
      sports_bar: 'Bar',
      wine_bar: 'Copa',
      calculate: 'Cálculo',
      flag: 'Bandera',
      category: 'Categoría',
      star: 'Estrella'
    },
    nameRequired: 'El nombre es obligatorio',
    backgroundColorRequired: 'El color de fondo es obligatorio',
    createButton: 'Crear la pestaña',
    deleteConfirmMessage: '¿Seguro que desea eliminar esta pestaña?',
    updateError: 'Error al actualizar la pestaña',
    defaultTabName: 'Actividades',
    defaultItemName: 'Beber'
  },
  generic: {
    close: 'Cerrar',
    validate: 'Validar',
    delete: 'Eliminar',
    cancel: 'Cancelar',
    save: 'Guardar',
    add: 'Añadir',
    unavailable: 'No disponible',
    invisible: 'Invisible',
    undo: 'Deshacer',
    redo: 'Rehacer',
    loading: 'Cargando'
  },
  assetEditor: {
    rename: 'Renombrar la imagen',
    delete: 'Eliminar la imagen',
    deleteDialog: {
      title: 'Eliminar el pictograma',
      message: '¿Seguro que desea eliminar el pictograma de esta pestaña?',
      cancel: 'No',
      confirm: 'Sí',
      dontAskAgain: 'No volver a preguntar'
    }
  },
  auth: {
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    email: 'Correo electrónico',
    password: 'Contraseña'
  },
  account: {
    title: 'Mi cuenta',
    currentPassword: 'Contraseña actual (necesaria para cualquier cambio)',
    updateEmail: 'Actualizar correo',
    newPassword: 'Nueva contraseña',
    changePassword: 'Cambiar contraseña',
    deleteHeading: 'Eliminar cuenta',
    deleteWarning: 'Esto elimina de forma permanente tu cuenta, pestañas, imágenes, dispositivos vinculados y estadísticas de uso. No se puede deshacer.',
    deleteButton: 'Eliminar mi cuenta',
    close: 'Cerrar',
    emailUpdated: 'Correo actualizado',
    passwordUpdated: 'Contraseña actualizada',
    accountDeleted: 'Cuenta eliminada',
    errWrongPassword: 'Contraseña incorrecta',
    errInvalidEmail: 'Correo no válido',
    errEmailUsed: 'Correo ya utilizado',
    errShortPassword: 'Nueva contraseña demasiado corta (mínimo 6 caracteres)',
    errGeneric: 'Algo salió mal'
  }
}
