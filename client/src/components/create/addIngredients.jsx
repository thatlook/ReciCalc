import React from 'react';
import Input from './createInput.jsx';

const AddIngredients = props => (
  <label>
    <h3>Ingredients:</h3>
    {/* <Input handleChange={this.handleChange} handleMore={this.handleMore} name="ing" placeholder="Add ingredient" ingredient={true}/> */}
    {props.ingredients.map((val, i, coll) => {
      return (
        <Input
          placeholder={'Add ingredient'}
          value={val.name}
          key={'item-' + i}
          handleChange={props.handleChange}
          handleMore={props.handleMore}
          name={'ing'}
          ingredient={true}
        />
      );
    })}
  </label>
);

export default AddIngredients;
