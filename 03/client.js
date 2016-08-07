/* eslint no-alert: 0 */
/* eslint no-undef: 0 */
import moment from 'moment';
import io from 'socket.io-client';
import config from './config';

const socket = io(config.serverUrl);

// listen websocket
socket.on('new message', ({ newMessage: message, user }) => {
  const createMessageElement = (mes, usr) => {
    const createElement = (elementName, className) => {
      const element = document.createElement(elementName);
      if (typeof className !== undefined) {
        element.className = className;
      }
      return element;
    };
    const card = createElement('div', 'ui card');

    const firstContent = createElement('div', 'content');
    const meta = createElement('div', 'meta');
    meta.innerHTML = `${moment(mes.createdAt).format('YYYY-MM-DD h:mm')} by ${usr.name}`;
    firstContent.appendChild(meta);

    const secondContent = createElement('div', 'content');
    const description = createElement('div', 'description');
    description.innerHTML = mes.body;
    secondContent.appendChild(description);

    const extraContent = createElement('div', 'extra content');
    const leftLike = createElement('span', 'left floated like');
    const likeIcon = createElement('i', 'like icon');
    leftLike.appendChild(likeIcon);
    leftLike.appendChild(document.createTextNode('Like'));
    const rightStar = createElement('span', 'right floated star');
    const starIcon = createElement('i', 'star icon');
    rightStar.appendChild(starIcon);
    rightStar.appendChild(document.createTextNode('Favorite'));
    extraContent.appendChild(leftLike);
    extraContent.appendChild(rightStar);

    card.appendChild(firstContent);
    card.appendChild(secondContent);
    card.appendChild(extraContent);

    return card;
  };

  const messageBoard = document.getElementById('message-board');
  const messageCard = createMessageElement(message, user);
  messageBoard.appendChild(messageCard);
});

socket.on('error', ({ error }) => {
  alert(error);
});

// init
const sendMessage = () => {
  const messenger = document.getElementById('messenger');
  const message = messenger.value;
  messenger.value = '';
  const user = config.userName;

  socket.emit('new message', { name: user, message });
};

const button = document.getElementById('send-button');
button.addEventListener('click', sendMessage);
