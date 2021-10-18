import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const [ editActive, setEditActive ] = useState(false);
    const [ text, setText ] = useState("");
    store.history = useHistory();

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemNameEditActive();
        }
        setEditActive(newActive);
        console.log("editactive:" + newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.addChangeItemTransaction(index, text, store.currentList.items[index]);
            store.enableButton("close-button");
            toggleEdit();
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value );
    }
    
    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    let itemStatus = false;
    if (store.isItemEditActive) {
        itemStatus = true;
    }

    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }
    let itemElement = 
        <div
            id={'item-' + (index + 1)}
            className={itemClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable={!itemStatus}
        >
            <input
                disabled={itemStatus}
                type="button"
                id={"edit-item-" + index + 1}
                className="list-card-button"
                value={"\u270E"}
                onClick={handleToggleEdit}
            />
            {props.text}
        </div>;

    if (editActive) {
        itemElement =
            <input
                id={"item-" + (index + 1)}
                className={itemClass}
                type='text'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                draggable="false"
                defaultValue={index.name}
            />;
    }
    return (
        itemElement
    );
}

export default Top5Item;