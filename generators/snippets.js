const common = ['header', 'error', 'log', 'debug', 'usage', 'get_options', 'get_arguments'];

module.exports = {
  'single': common.concat(['init', 'body']),
  'multi': common.concat(['add_command', 'check_command','list_commands', 'init_multi', 'body']),
  'templates': ['header', 'error', 'log', 'debug','usage', 'get_options', 'get_arguments', 'init', 'init_multi'],
  'custom': ['body']
};
