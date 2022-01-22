import { Card, Grid } from "@mui/material";
import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddData from "./AddData";
import AddDocument from "./AddDocument";
import AddList from "./AddList";
import CustomTable from "./CustomTable";

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#eee" : "#fff",
  padding: grid,
  width: '100%'
});

class DraggableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onDragEnd(result) {
    console.log(result)
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    let newForm = this.props.form

    newForm.customData = this.reorder(
      this.props.form.customData,
      result.source.index,
      result.destination.index
    );
    console.log(newForm)

    this.props.setForm(newForm)
    // this.setState({
    //   items
    // });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (

      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.form.customData.map((item, index) => (
                <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {/* {item.label} */}
                      <RenderElement entryItem={item} updateFormCustomData={this.props.updateFormCustomData} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const RenderElement = ({ entryItem, updateFormCustomData }) => {
  if (entryItem.type === 'list') {
    return (
      <Grid item md={12}>
        <Card style={{ padding: 12, marginBottom: 12 }}>
          <AddList
            data={entryItem.data}
            title={entryItem.label}
            updateForm={(data) =>
              updateFormCustomData(data, index)
            }
          />
        </Card>
      </Grid>
    )
  } else if (entryItem.type === 'table') {
    return (<Grid item md={12}>
      <Card style={{ padding: 12, marginBottom: 12 }}>
        <AddData
          data={entryItem.data}
          title={entryItem.label}
          updateForm={(data) =>
            updateFormCustomData(data, index)
          }
        />
      </Card>
    </Grid>
    )
  } else if (entryItem.type === 'customtable') {
    return (<Grid item md={12}>
      <Card style={{ padding: 12, marginBottom: 12 }}>
        <CustomTable
          data={entryItem.data}
          title={entryItem.label}
          updateForm={(data) =>
            updateFormCustomData(data, index)
          }
        />
      </Card>
    </Grid>
    )
  } else if (entryItem.type === 'document') {
    return (<Grid item md={12}>
      <Card style={{ padding: 12, marginBottom: 12 }}>
        <AddDocument
          data={entryItem.data}
          title={entryItem.label}
          updateForm={(data) =>
            updateFormCustomData(data, index)
          }
        />
      </Card>
    </Grid>
    )
  } else return null
}





export default DraggableComponent