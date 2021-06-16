const uuidV4 = require('uuid').v4;
const tarantool = require('../src/config/tarantool');


const body = `
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(http-equiv="X-UA-Compatible", content="IE=edge")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title Document
  body 
    div
      h2 Обращение в службу поддержки
      div Благодарим за обращение, ваш номер #{uniqueId}
      div Мы Вам обязательно ответим
`;

const uuid = uuidV4();
const name = 'appeal';
const language = 'ru';
const createdAt = Date.now();
const updatedAt = Date.now();
const subject = 'Обращение в службу поддержки';


async function addTemplate() {
  let bindParams = [
    name,
    language,
    subject,
    body,
    createdAt,
    updatedAt,
    uuid
  ];
  return await tarantool.sql(`insert into mail_templates (name,language,subject,body,created_at,updated_at,uuid) values(?,?,?,?,?,?,?)`, bindParams);
}




tarantool.on('connect', async () => {
  console.log(await addTemplate());
  return undefined;
});


tarantool.on('reconnecting', () => {
  console.log('Reconnect to tarantool');
  return undefined;
});
