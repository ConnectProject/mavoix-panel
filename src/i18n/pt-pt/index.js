/* eslint-disable max-lines */
export default {
  appTitle: 'Ma Voix',
  logoutLabel: 'Terminar sessão',
  welcome: {
    title: 'Bem-vindo ao MaVoix',
    intro: 'Para começar, eis as quatro ações principais:',
    stepDevice: 'Associe um dispositivo com o botão Associar um dispositivo (ícone QR) na barra superior.',
    stepTabs: 'Crie ou abra separadores em Separadores, ou com o + ao lado dos separadores.',
    stepSettings: 'Ajuste o tamanho das imagens, a síntese de voz e muito mais em Definições globais (ícone de engrenagem).',
    stepConnect: 'Também pode partilhar dados de utilização (horas de utilização e frases construídas) com o Connect, uma plataforma aberta de partilha de dados. A partilha é opcional: ative-a ou desative-a em Definições globais.',
    dontShowAgain: 'Não mostrar novamente',
    ok: 'Entendido'
  },
  connectLinked: {
    title: 'Partilha de dados com o Connect',
    success: 'A partilha de dados com o Connect está ativada. Pode alterá-la a qualquer momento em Definições globais.',
    failure: 'Não foi possível ativar a partilha de dados com o Connect.'
  },
  stats: {
    title: 'Estatísticas de utilização',
    period: 'Período',
    lastDays: 'Últimos {n} dias',
    sinceStart: 'Desde o início',
    loadError: 'Não foi possível carregar os dados.',
    empty: 'Sem dados de utilização neste período. As estatísticas aparecem assim que a aplicação for usada com um dispositivo associado a esta conta.',
    weekdays: { 0: 'Segunda-feira', 1: 'Terça-feira', 2: 'Quarta-feira', 3: 'Quinta-feira', 4: 'Sexta-feira', 5: 'Sábado', 6: 'Domingo' },
    overview: {
      title: 'Resumo',
      sessions: 'Sessões',
      activeDays: 'Dias de utilização',
      time: 'Tempo de utilização',
      phrases: 'Frases',
      avgPhrase: 'Cartões por frase',
      avgSession: 'Duração média de uma sessão',
      night: 'Sessões noturnas',
      nightHint: 'Antes das 5:30',
      of: 'de {n} dia | de {n} dias'
    },
    when: {
      title: 'Quando',
      perDay: 'Frases por dia (os fins de semana estão mais claros)',
      perWeek: 'Frases por semana',
      perMonth: 'Frases por mês',
      heatmap: 'Frases por dia da semana e por hora',
      day: '{label}: {phrases} frases, {sessions} sessões',
      week: 'Semana de {label}: {phrases} frases, {sessions} sessões, {days} dias de utilização',
      month: '{label}: {phrases} frases, {sessions} sessões, {days} dias de utilização'
    },
    tabs: {
      title: 'Separadores',
      hint: 'Número de cartões tocados em cada separador. Os separadores nunca utilizados estão a 0.',
      taps: '{n} cartões, {phrases} frases'
    },
    cards: {
      title: 'Cartões',
      mostUsed: 'Os mais utilizados',
      leastUsed: 'Os menos utilizados',
      leastUsedHint: 'Cartões utilizados pelo menos uma vez, do mais raro ao mais frequente.',
      neverUsed: 'Nunca utilizados ({n})',
      neverUsedHint: 'Estes cartões estão nos separadores mas não foram utilizados no período.',
      detail: '{n} vezes, em {days} dias, última vez em {last}; separadores: {tabs}'
    },
    phrases: {
      title: 'Frases',
      frequent: 'Frases mais frequentes',
      frequentHint: 'Frases de pelo menos 2 cartões construídas várias vezes.',
      pairs: 'Sequências de 2 cartões',
      triples: 'Sequências de 3 cartões',
      times: '{n} vezes',
      none: 'Nenhuma frase se repete o suficiente.'
    },
    progress: {
      title: 'Progresso',
      distinctCards: 'Cartões diferentes utilizados por semana',
      avgLength: 'Cartões por frase, por semana (média)',
      week: 'Semana de {day}'
    }
  },
  navDrawer: {
    home: 'Início',
    assetsManager: 'Imagens',
    tabs: 'Separadores',
    addTab: 'Adicionar um separador',
    devices: 'Dispositivos',
    addDevice: 'Adicionar um dispositivo',
    noDeviceYet: 'Ainda não há dispositivos',
    globalSettings: 'Definições globais',
    help: 'Ajuda',
    deviceQr: 'Associar um dispositivo',
    stats: 'Estatísticas'
  },
  globalSettings: {
    title: 'Definições globais',
    imageSizeLabel: 'Tamanho das imagens',
    sizeSmall: 'Pequeno',
    sizeMedium: 'Médio',
    sizeLarge: 'Grande',
    ttsSpeedLabel: 'Velocidade da síntese de voz',
    speedVerySlow: 'Muito lenta',
    speedSlow: 'Lenta',
    speedNormal: 'Normal',
    speedFast: 'Rápida',
    ttsLanguageLabel: 'Idioma (interface e voz)',
    connectLabel: 'Partilha de dados com o Connect',
    connectOn: 'Partilha ativada',
    connectOff: 'Partilha desativada',
    connectDescription: 'O Connect é uma plataforma aberta de partilha de dados entre aplicações de apoio à comunicação. Se ativar a partilha, a aplicação MaVoix envia as horas de início e fim de utilização, bem como as frases construídas (endereço das imagens utilizadas e palavras pronunciadas). Estes dados tornam-se públicos. Será redirecionado para o Connect para se identificar.',
    configLabel: 'Configuração da aplicação',
    exportConfig: 'Exportar',
    importConfig: 'Importar',
    exportError: 'Erro ao exportar: ',
    importError: 'Erro ao importar: ',
    importDone: ' separador(es) importado(s)'
  },
  dnd: {
    dropFiles: 'Largue aqui os seus ficheiros',
    filesSaved: ' imagens guardadas',
    fileSaved: ' imagem guardada'
  },
  camera: {
    snapPic: 'tirar uma foto',
    retake: 'repetir',
    imageName: 'Nome da imagem'
  },
  imageNameHint: {
    title: 'Dica para dar um bom nome à imagem',
    body: 'Dê um significado ao nome da imagem, pois será usado pela síntese de voz. Remova o sufixo .png, .jpg, .bmp ou .gif da sua imagem.'
  },
  takePhoto: {
    capture: 'Tirar a foto',
    retake: 'Repetir a foto',
    nameLabel: 'Nome',
    categoryLabel: 'Tema',
    save: 'Guardar',
    noCamera: 'Câmara não disponível neste dispositivo.',
    waitCamera: 'Aguarde, a câmara está a iniciar…',
    defaultName: 'Foto',
    successTitle: 'Foto tirada com sucesso',
    successMessage: 'Encontrará a sua imagem no separador e na sua biblioteca pessoal.',
    successOk: 'Entendido'
  },
  uploadPhoto: {
    heading: 'Carregar uma foto',
    successTitle: 'Carregamento concluído',
    successMessage: 'Encontrará a sua imagem no separador e na sua biblioteca pessoal.',
    successOk: 'Entendido'
  },
  uploadError: {
    title: 'Falha ao enviar a imagem',
    lead: 'Não foi possível enviar a imagem.',
    bulletExtension: 'Verifique a extensão da sua imagem: só são aceites os formatos .jpg, .jpeg e .png.',
    bulletRetry: 'Carregue uma nova foto ou, se possível, tire uma foto com a câmara.',
    ok: 'Entendido'
  },
  addImagesModal: {
    title: 'Adicionar imagens',
    libraryArasaac: 'Biblioteca ARASAAC',
    libraryPersonal: 'Biblioteca pessoal',
    switchToPersonal: 'Biblioteca pessoal',
    switchToArasaac: 'Biblioteca ARASAAC',
    takePhoto: 'Tirar uma foto',
    uploadPhoto: 'Carregar uma foto',
    searchArasaac: 'Pesquisar um pictograma ARASAAC',
    searchPersonal: 'Pesquisar um pictograma',
    themes: {
      needs: 'Necessidades',
      food: 'Comida',
      drinks: 'Bebidas',
      games: 'Jogos e lazer',
      people: 'Família e pessoas',
      routine: 'Rotina diária',
      emotions: 'Emoções',
      health: 'Corpo e saúde',
      clothes: 'Roupa',
      animals: 'Animais',
      places: 'Locais',
      transport: 'Transportes',
      school: 'Escola',
      verbs: 'Verbos'
    },
    pictogramCountOne: '{n} pictograma',
    pictogramCountOther: '{n} pictogramas',
    cancel: 'Cancelar',
    addToTab: 'Adicionar',
    assignCategoryTitle: 'Escolher um tema',
    addTheme: 'Adicionar um tema',
    selectImage: 'Selecionar a imagem',
    playImage: 'Ouvir o nome da imagem',
    themeLabel: 'Tema:'
  },
  assetsManager: {
    assetNameLabel: 'Nome da imagem',
    nameSave: 'Nome guardado: ',
    search: 'Pesquisar',
    nameField: 'Nome',
    uploadError: 'Erro ao enviar a imagem: '
  },
  assets: {
    select: 'Selecione as imagens a adicionar:',
    chooseImages: 'Escolha as imagens a adicionar'
  },
  tabEditor: {
    tabNameLabel: 'Nome',
    tabColorLabel: 'Cor',
    tabSpeed: 'Velocidade',
    tabLanguage: 'Idioma',
    addItemLabel: 'Adicionar imagens',
    editLanguage: 'Alterar voz',
    itemDialog: {
      headingNew: 'Adicionar uma imagem',
      headingEdit: 'Editar uma imagem',
      nameLabel: 'Nome',
      selectAssetLabel: 'Selecionar uma imagem'
    }
  },
  deviceDialogs: {
    new: {
      heading: 'Escolha um nome para o seu novo dispositivo'
    },
    alreadyUsedHeading: 'Já não pode aceder à palavra-passe. Clique no botão abaixo para gerar um novo código de convite. (Os dispositivos já ligados a esta conta serão desligados)',
    resetPasswordLabel: 'Gerar novamente',
    qrcodeHeading: 'Para ligar o dispositivo à conta, leia este código QR a partir da aplicação:',
    codeHeading: 'Ou então, introduza manualmente este código na aplicação'
  },
  newTabDialog: {
    heading: 'Escolha um nome para o seu novo separador!'
  },
  tabSettings: {
    createTitle: 'Criação de um novo separador',
    editTitle: 'Definições do separador',
    tabName: 'Nome do separador',
    backgroundColor: 'Cor de fundo',
    selectedColor: 'Cor escolhida',
    currentColor: 'Cor atual',
    icon: 'Ícone',
    otherIcons: {
      soup_kitchen: 'Refeição',
      check_circle: 'Validado',
      home: 'Casa',
      settings: 'Definições',
      local_cafe: 'Café',
      build: 'Bricolage',
      sports_bar: 'Bar',
      wine_bar: 'Copo',
      calculate: 'Cálculo',
      flag: 'Bandeira',
      category: 'Categoria',
      star: 'Estrela'
    },
    nameRequired: 'O nome é obrigatório',
    backgroundColorRequired: 'A cor de fundo é obrigatória',
    createButton: 'Criar o separador',
    deleteConfirmMessage: 'Tem a certeza de que quer eliminar este separador?',
    updateError: 'Erro ao atualizar o separador',
    defaultTabName: 'Atividades',
    defaultItemName: 'Beber'
  },
  generic: {
    close: 'Fechar',
    validate: 'Validar',
    delete: 'Eliminar',
    cancel: 'Cancelar',
    save: 'Guardar',
    add: 'Adicionar',
    unavailable: 'Indisponível',
    invisible: 'Invisível',
    undo: 'Anular',
    redo: 'Refazer',
    loading: 'A carregar'
  },
  assetEditor: {
    rename: 'Mudar o nome da imagem',
    delete: 'Eliminar a imagem',
    deleteDialog: {
      title: 'Eliminar o pictograma',
      message: 'Tem a certeza de que quer eliminar o pictograma deste separador?',
      cancel: 'Não',
      confirm: 'Sim',
      dontAskAgain: 'Não perguntar novamente'
    }
  },
  auth: {
    login: 'Iniciar sessão',
    signup: 'Registar',
    email: 'E-mail',
    password: 'Palavra-passe'
  },
  account: {
    title: 'A minha conta',
    currentPassword: 'Palavra-passe atual (necessária para qualquer alteração)',
    updateEmail: 'Atualizar e-mail',
    newPassword: 'Nova palavra-passe',
    changePassword: 'Alterar palavra-passe',
    deleteHeading: 'Eliminar conta',
    deleteWarning: 'Isto elimina permanentemente a sua conta, separadores, imagens, dispositivos associados e estatísticas de utilização. Não pode ser anulado.',
    deleteButton: 'Eliminar a minha conta',
    close: 'Fechar',
    emailUpdated: 'E-mail atualizado',
    passwordUpdated: 'Palavra-passe atualizada',
    accountDeleted: 'Conta eliminada',
    errWrongPassword: 'Palavra-passe incorreta',
    errInvalidEmail: 'E-mail inválido',
    errEmailUsed: 'E-mail já utilizado',
    errShortPassword: 'Nova palavra-passe demasiado curta (mínimo 6 caracteres)',
    errGeneric: 'Algo correu mal'
  }
}
