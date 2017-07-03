var appService = angular.module('starter.services');

//聊天记录信息
appService.factory('Chats', function () {
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    time: new Date(new Date().getTime() - 1000 * 60 * 60 * 2),
    face: 'img/avatar/ben.png',
    unreadMessageCount: 0,
    isTop: false
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    time: new Date(new Date().getTime() - 1000 * 60 * 60 * 4),
    face: 'img/avatar/max.png',
    unreadMessageCount: 2
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    time: new Date(new Date().getTime() - 1000 * 60 * 60 * 6),
    face: 'img/avatar/adam.jpg',
    unreadMessageCount: 1
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    time: new Date(new Date().getTime() - 1000 * 60 * 60 * 10),
    face: 'img/avatar/perry.png',
    unreadMessageCount: 1
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    time: new Date(new Date().getTime() - 1000 * 60 * 60 * 20),
    face: 'img/avatar/mike.png',
    unreadMessageCount: 2
  }];

  return {
    all: function () {
      return chats;
    },
    remove: function (chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function (chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
});

//系统通知信息
appService.factory('SysMessages', function () {
  var messages = [{
    id: 0,
    title: 'Ben Sparrow',
    lastText: 'You on your way?',
    time: new Date(new Date().getTime() - 1000 * 60 * 60 * 2),
    face: 'img/avatar/ben.png'
  }, {
    id: 1,
    title: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    time: new Date(new Date().getTime() - 1000 * 60 * 60 * 3),
    face: 'img/avatar/max.png'
  }, {
    id: 2,
    title: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    time: new Date(new Date().getTime() - 1000 * 60 * 60 * 4),
    face: 'img/avatar/adam.jpg'
  }, {
    id: 3,
    title: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    time: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3),
    face: 'img/avatar/perry.png'
  }, {
    id: 4,
    title: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    time: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
    face: 'img/avatar/mike.png'
  }];

  return {
    all: function () {
      return messages;
    },
    remove: function (message) {
      messages.splice(messages.indexOf(message), 1);
    },
    get: function (messageId) {
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].id === parseInt(message)) {
          return messages[i];
        }
      }
      return null;
    }
  }
});

//通讯录信息
appService.factory('Contacts', function () {
  var contacts = [{
    id: 0,
    name: 'Ben Sparrow',
    phone: '13702912021',
    face: 'img/avatar/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    phone: '13702912021',
    face: 'img/avatar/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    phone: '13702912021',
    face: 'img/avatar/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    phone: '13702912021',
    face: 'img/avatar/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    phone: '13702912021',
    face: 'img/avatar/mike.png'
  }, {
    id: 5,
    name: 'Qhut Harrington',
    phone: '13702912021',
    face: 'img/avatar/mike.png'
  }, {
    id: 6,
    name: 'Zuo Harrington',
    phone: '13702912021',
    face: 'img/avatar/mike.png'
  }, {
    id: 7,
    name: 'Yar Harrington',
    phone: '13702912021',
    face: 'img/avatar/mike.png'
  }, {
    id: 8,
    name: 'Fer Harrington',
    phone: '13702912021',
    face: 'img/avatar/mike.png'
  }, {
    id: 9,
    name: 'Kart Harrington',
    phone: '13702912021',
    face: 'img/avatar/mike.png'
  }, {
    id: 10,
    name: 'Crt Harrington',
    phone: '13702912021',
    face: 'img/avatar/mike.png'
  }, {
    id: 11,
    name: 'Yoh Harrington',
    phone: '13702912021',
    face: 'img/avatar/mike.png'
  }, {
    id: 12,
    name: 'Jim Harrington',
    phone: '13702912021',
    face: 'img/avatar/mike.png'
  }, {
    id: 13,
    name: 'May Harrington',
    phone: '13702912021',
    face: 'img/avatar/mike.png'
  }, {
    id: 14,
    name: 'Harrington',
    phone: '13702912021',
    face: 'img/avatar/mike.png'
  }];

  return {
    all: function () {
      return contacts;
    },
    remove: function (contact) {
      contacts.splice(contacts.indexOf(contact), 1);
    },
    get: function (contactId) {
      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id === parseInt(contactId)) {
          return contacts[i];
        }
      }
      return null;
    }
  }
});
