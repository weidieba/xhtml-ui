import Vue from 'vue';
import Message from './message.vue';
// 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
let MessageConstructor = Vue.extend(Message);
let instance;

let MESSAGE_TYPE = ['info', 'success', 'error', 'warning'];
let defaultDuration = 1000;

/**
 * Message处理函数
 * @param {string} message                    消息内容
 * @param {string} type                       消息类型：info、success、error、warning
 * @param {function} onClose                  消息窗关闭时的回调函数
 * @param {number} [duration=defaultDuration] 消息显示时长
 * @return {instance}                         返回当前消息的实例
 */
var message = function (message, type, onClose, duration = defaultDuration) {
    if (!onClose) {
        onClose = function () {};
    }

    instance = new MessageConstructor({
        data: {
            message: message,
            type: type,
            onClose: onClose,
            duration: duration
        }
    });

    instance.vm = instance.$mount();
    document.body.appendChild(instance.$el);
    instance.vm.messageVisible = true;
    return instance.vm;
};

// 在message上为每种消息类型注册各自的方法
MESSAGE_TYPE.forEach(kind => {
    message[kind] = (message, onClose, duration) => {
        if (!onClose) {
            onClose = function () {};
        }
        return message(message, kind, onClose, duration);
    };
});

export default message;
