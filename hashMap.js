import { LinkedList } from './linkedList.js';

class HashMap {
    constructor(load = 0.75, capacity = 16) {
        this.loadFactor = load;
        this.capacity = capacity;
        this.buckets = Array(capacity).fill(null);
        this.contains = 0;
        this.items = [ ]
        this.recursion = false;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i))%this.capacity;
        }

        return hashCode-1;
    } 

    set(key, value) {
        let index = this.hash(key);
        if(!this.buckets[index]){
            this.buckets[index] = new LinkedList;
            this.buckets[index].append(key, value);
            this.contains++;
        }
        else if(this.buckets[index]) {
            let included = false;
            for(let item of this.items){
                if(item[0]===key && item[1]!=value){
                    // console.log('oldItem: '+item)
//                     console.log('newItem: '+key, value)
                    item[1]=value;
                    // console.log('newItem: '+item)
                    included=true;
                    this.recursion=true;
                    let index = this.hash(key);
                    let current = this.buckets[index].head;
                    while(current!=null){
                        if(key==current.key){
                            current.value=value;
                            break
                        }
                        else current = current.nextNode;
                    }
                    
                    break;
                }
            }
            if (included==false){
                this.buckets[index].append(key, value);
                this.contains++;
            }
            // console.log(this.items)
        }

        if(this.recursion==false){
            this.items.push([key,value]);
        }
        this.recursion=false;

        if(this.contains > (this.loadFactor*this.capacity)){
            // console.log("-----------------INCREASING CAPACITY-----------------");
            this.capacity = this.capacity*2;
            // console.log("new capacity= " + this.capacity);

            this.contains=0;
            this.buckets = Array(this.capacity).fill(null);
            
            for(let item of this.items){
                this.recursion = true;
                this.set(item[0], item[1]);
                // console.log(this.buckets)
            }

        }
    }

    get(key){
        let index = this.hash(key);
        let result=null;
        if(!this.buckets[index]) return result
        let current = this.buckets[index].head;
        while(current!=null){
            if(key==current.key) return current.value;
            else current = current.nextNode;
        }
        return result
    }

    has(key){
       return (this.get(key)==null) ? false : true
    }

    remove(key){
        if(this.has(key)==false) return false
        let index = this.hash(key);
        let current = this.buckets[index].head;
        // console.log(this.buckets[index])
        // console.log(current)
        if(current.key===key){
            this.buckets[index].head = current.nextNode
            this.removeItem(key);
            console.log(this.buckets[index])
            console.log(this.items)
            return true
        }
        do {
            let last = current;
            current = current.nextNode;
            if(current.key===key){
                last.nextNode = current.nextNode
                this.removeItem(key);
                break
            }
        } while (current!==null);

        console.log(this.buckets[index])
        console.log(this.items)
       
        return true
    }
    removeItem(key){
        for(let i=0; i<this.items.length; i++){
            if(this.items[i][0]==key){
                this.items.splice(i,1);
            }
        }
    }

    length(){
        let counter = 0;
        for(let bucket of this.buckets){
            if(bucket==null) continue
            if(bucket.head==null) continue

            let current = bucket.head;
            while(current!=null){
                counter++;
                current=current = current.nextNode;
            }
        }
        return counter

    }

    clear(){
        this.capacity=16;
        this.buckets = Array(this.capacity).fill(null);
        this.items = [];
        console.log(this.buckets);
        console.log(this.items);
    }
    
    values(){
        let array=[];
        for(let bucket of this.buckets){
            if(bucket==null) continue
            if(bucket.head==null) continue

            let current = bucket.head;
            while(current!=null){
                array.push(current.value);
                current=current = current.nextNode;
            }
        }
        return array
    }

    entries(){
        let array=[];
        for(let bucket of this.buckets){
            if(bucket==null) continue
            if(bucket.head==null) continue

            let current = bucket.head;
            while(current!=null){
                array.push([current.key, current.value]);
                current=current = current.nextNode;
            }
        }
        return array
    }
}

let test = new HashMap;

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
console.log('length: ' + test.length());
console.log('capacity: ' + test.capacity);

test.set('grape', 'light green')
test.set('ice cream', 'pink')
console.log('length: ' + test.length());
console.log('capacity: ' + test.capacity);

test.set('moon', 'silver')
console.log('length: ' + test.length());
console.log('capacity: ' + test.capacity);

// console.log(test.get('dog'));
// console.log(test.has('doge'));
// console.log(test.remove('dog'));
// console.log(test.length());
// test.clear()
// console.log(test.values());
// console.log(test.entries());