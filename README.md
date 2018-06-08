# node

学习

# 模块笔记

    事件广播和接收
    const events = require('events');
    const EventsEmitter = new events.EventEmitter();

    广播事件
    EventsEmitter.emit('to_parent', data);

    接收事件
    EventsEmitter.on('to_parent', (data) => {

    }); 