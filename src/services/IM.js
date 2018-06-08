import AV from 'leancloud-storage';
import { Realtime, TextMessage } from 'leancloud-realtime';
import { TypedMessagesPlugin, ImageMessage } from 'leancloud-realtime-plugin-typed-messages';

const appId = 'WN32BYYUk43KSV9tV0VhaTk3-gzGzoHsz';
const appKey = 'JMNhNyVTeQ6RNWbYgdCmFsEv';

class IM {

    selfId = 'MudOnTire';
    client = null;

    //初始化存储SDK，IM SDK，client
    init = () => {
        AV.init({
            appId: appId,
            appKey: appKey
        });
        const realtime = new Realtime({
            appId: appId,
            appKey: appKey,
            plugins: [TypedMessagesPlugin]
        });
        return this.createClient(realtime);
    }

    /**
     * 创建client
     * 返回 Promise
     */
    createClient = (realtime) => {
        return new Promise((resolve, reject) => {
            realtime.createIMClient(this.selfId)
                .then((client) => {
                    this.client = client;
                    resolve(client);
                })
                .catch((error) => {
                    console.warn(error);
                    const timer = setInterval(() => {
                        this.createClient().then(() => {
                            clearInterval(timer);
                        });
                    }, 30000);
                    reject();
                });
        });
    }

    /**
     * 创建conversation
     * 返回 Promise
     */
    createConversation = (members) => {
        if (this.client) {
            return this.client.createConversation({
                members: members,
                name: members.join('&')
            });
        }
    }
}

export default new IM();