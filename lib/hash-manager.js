'use strict'
class HashManager{
    constructor(onOpen,onClose){
        this.hashList={'default':{onOpen:onOpen,onClose:onClose}};
        this.currentHash=null;
        var that=this;
        window.addEventListener('hashchange',function(){
            if(that.currentHash){
                that.hashList[that.currentHash].onClose();
            }
            that.currentHash=location.hash.split('#')[1];
            if(that.currentHash) that.hashList[that.currentHash].onOpen();
        })
    }
    register(name,onOpen,onClose){
        this.hashList[name]={onOpen:onOpen,onClose:onClose};
    }
    changeState(hashName,isHash){//isHash为true时,添加hash记录（后退时按hash历史记录后退）；否则直接将当前路径替换为需要的hashname。
        if(isHash===undefined) isHash=true;
        if(hashName==this.currentHash) return;
        if(isHash) location.hash='#'+hashName;
        else location.replace('#'+hashName);
    }
    closeHash(isHash){
        if(isHash){
            location.hash='';
        }else {
            history.go(-1);
        }
    }
}
class PageManager {
    constructor(){
        this.hashManager=new HashManager();
    }
    register(name,pageId){
        this.hashList[name]=pageId;
    }

}
