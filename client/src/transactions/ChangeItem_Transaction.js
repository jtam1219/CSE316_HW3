import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
    
    @author McKilla Gorilla
 */
export default class ChangeItem_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initNewText, initOldText) {
        super();
        this.store = initStore;
        this.index = initIndex;
        this.newText = initNewText;
        this.oldText = initOldText;

    }

    doTransaction() {
        this.store.changeItem(this.index, this.newText);
    }
    
    undoTransaction() {
        this.store.changeItem(this.index, this.oldText);
    }
}