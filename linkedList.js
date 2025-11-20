class Node {
    constructor(key, value){
        this.key = key;
        this.value = value;
        this.nextNode = null;
    }
}

export class LinkedList {
    constructor (){
        this.head = null;
    }

    append(key, value){
        let newNode = new Node(key, value)
        if(!this.head){
            this.head = newNode;
            return
        }
        let current = this.head;
        while(current.nextNode){
            current = current.nextNode;
        }
        current.nextNode = newNode;
    }
    prepend(key, value){
        let newNode = new Node(key, value)
        if(!this.head){
            this.head = newNode;
            return
        }
        newNode.nextNode = this.head;
        this.head = newNode;
    }
}