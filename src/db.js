import { v4 as uuid } from 'uuid'


const users = [     {id: '1',name: 'Sandeep',email: 'sandeep@example.com'},
                  {id: '2',name: 'Arnav',email: 'arnav@example.com',age: 5},
                  {id: '3',name: 'Kiran',email: 'kiran@example.com',age: 33}]

const posts = [     {id: '1',title: 'Hello!',body: 'How are you doing',published: true, author: '3'},
                  {id: '2',title: 'Heya!',body: 'How was your day at school?',published: false, author: '2'},
                  {id: '3',title: 'Hi There!',body: 'Are we meeting tonight?',published: true, author: '1'}]

const comments = [  {id: uuid(),text: 'Hi this is my first comment to arnav', author: '1', post: '1'},
                  {id: uuid(),text: 'Hi this is my 2nd comment to arnav', author: '1', post: '1'},
                  {id: uuid(),text: 'Hi this is arnavS comment to kiran', author: '2', post: '2'},
                  {id: uuid(),text: 'Hi this is kiranS comment to deepu', author: '3', post: '3'}]



const db    =   {
    users,
    posts,
    comments
}

export {db as default}