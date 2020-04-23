export enum ToastrMessage {
  SUCESSO = 'success',
  ERROR = 'danger',
  INFO = 'info',
  WARNING = 'warning',

  // Auth
  ERROR_AUTH = 'Login e/ou senha inválidos.',
  SUCESS_AUTH = 'Logado com sucesso!',

  // Dashboard
  ERROR_DASHBOARD_INDICATORS = 'Erro no carregamento dos indicadores.',
  ERROR_DASHBOARD_TASKS = 'Erro no carregamento dos indicadores de tarefas..',

  // Colaboradores
  ERROR_COLABORATOR = 'Erro no carregamento dos colaboradores.',
  ERROR_OBJECTIVES = 'Erro no carregamento dos objetivos.',

  // Gestores
  ERROR_MANAGER = 'Erro no carregamento dos gestores.',

  // Anexos
  ERRO_UPLOAD = 'Não foi possível carregar os arquivos!',
  ERRO_UPLOAD_SUBMIT = 'Não foi possível enviar o arquivo!',
  SUCESS_UPLOAD_SUBMIT = 'Arquivo enviado com sucesso!',
  SUCESS_UPLOAD_REMOVE = 'Arquivo removido com sucesso!',

  // Formulário
  ERROR_FORM = 'Erro ao emitir o formulário!',
  ERROR_FORM_STAGE = 'Não foi possível salvar as informações do formulário.',
  SUCESSO_FORM_STAGE = 'Objetivo salvo com sucesso!',
  WARNING_EXPORT = 'Preencha todos os campos obrigatórios do formulário.',
  WARNING_CAMPOS_REQUIRED = 'Preencha todos os campos obrigatórios!',
  WARNING_CAMPOS_DATE = 'A Data Início não pode ser maior que a data Término',

  // Objectivs
  ERROR_OBJECTIVS_LIST = 'Não foi possível carregar a lista de objetivos.',
  OBJECTIVE_CANCEL_SUCESS = 'Objetivo cancelado com sucesso.',
  OBJECTIVE_CANCEL_ERROR = 'Não foi possível cancelar o objetivo!',
  OBJECTIVE_VALID_SUCESS = 'Objetivo validado com sucesso!',
  OBJECTIVE_VALID_PENDING = 'Este objetivo ainda não foi finalizado.',
  OBJECTIVE_VALID_ERROR = 'Não foi possível validar o objetivo!',

  // Anexos
  ANEXOS_ERROR = 'Erro ao carregar o anexo!.',
}
