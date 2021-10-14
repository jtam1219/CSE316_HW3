import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
    
    @author McKilla Gorilla
 */
export default class ChangeItem_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldIndex, initNewIndex) {
        super();
        this.store = initStore;
        this.oldItemIndex = initOldIndex;
        this.newItemIndex = initNewIndex;
    }

    doTransaction() {
        this.store.changeItem(this.oldItemIndex, this.newItemIndex);
    }
    
    undoTransaction() {
        this.store.changeItem(this.newItemIndex, this.oldItemIndex);
    }
}