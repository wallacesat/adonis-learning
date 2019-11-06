'use strict';

const Mail = use('Mail');
const Helpers = use('Helpers');

class NewTaskMail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return 'NewTaskMail-job';
  }

  async handle({ email, username, title, file }) {
    console.log(`Job: ${NewTaskMail.key}`);

    await Mail.send(
      ['mails.new_task'],
      {
        username,
        title,
        hasAttachment: !!file
      },
      message => {
        message
          .to(email)
          .from('wallacesat@live.co.uk', 'Wallace | Rocketseat')
          .subject('Nova tarefa para você');

        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name
          });
        }
      }
    );

    console.log('NewTaskMail-job started');
  }
}

module.exports = NewTaskMail;
