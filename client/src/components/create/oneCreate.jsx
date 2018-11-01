import React from 'react';
import { withRouter } from 'react-router-dom';
// import { IngredientInput, InstructionInput } from './oneInput.jsx';
import Input from './createInput.jsx'


class Create extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      title: '',
      desc: '',

      ing: '',
      instr: '',
      ingAmount: 0,

      allIng: [['', '']],
      allInstr: [''],

      ingCount: 1,
      instrCount: 1,
      submit: false
    };
    
    // bind methods
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMore = this.handleMore.bind(this);
  }


  handleChange(event){
    event.preventDefault();
    event.persist();
    
    let key = event.target.name;
    let value = event.target.value;
    
    this.setState((state, props) => {
      state[key] = value;
    })

  }

  handleClick(event){
    event.preventDefault();
    event.persist();

    if (this.state.allIng.length - 1 !== this.state.ingCount) {
      this.setState({
        allIng: [...this.state.allIng, [this.state.ing, this.state.ingAmount]],
        submit: true
      }, () => {
        if (this.state.allInstr.length - 1 !== this.state.instrCount) {
          this.setState({
            allInstr: [...this.state.allInstr, this.state.instr]
          }, () => {
            alert(JSON.stringify(this.state))
          })
        }
      })
    } 

 


  }

  handleMore(event){
    event.preventDefault();
    event.persist();

    if (event.target.name === 'ing') {
      this.setState({
        allIng: [...this.state.allIng, [this.state.ing, this.state.ingAmount]],
        ingCount: this.state.ingCount + 1
      })
    } else if (event.target.name === 'instr') {
      this.setState({
        allInstr: [...this.state.allInstr, this.state.instr],
        instrCount: this.state.instrCount + 1

      })
    }
  }

  handleInput(){

  }


  render(){


    return (
      <div id="create">
        <h2>What's cookin'?</h2>
        <form>
          <label>
            <h3>Recipe title:</h3>
            <input type="text" name="title" placeholder="Add recipe title" onChange={this.handleChange}/>
          </label>

          <label>
            <h3>Recipe image:</h3>
            <input />
          </label>

          <label>
            <h3>Recipe description:</h3>
            <textarea name="desc" placeholder="Add recipe description" onChange={this.handleChange}/>
          </label>

          <label>
            <h3>Ingredients:</h3>
            <Input handleChange={this.handleChange} handleMore={this.handleMore} name="ing" placeholder="Add ingredient" ingredient={true}/>
            {this.state.allIng.map((val, i, coll) => {
              if (i > 0 ) {
                if (this.state.submit && i === coll.length - 1) {
                  return 
                } else {
                  return (
                    <Input 
                    key={"item-" + i} 
                    handleChange={this.handleChange}
                    handleMore={this.handleMore}
                    name={"ing"}
                    placeholder={"Add ingredient"}
                    ingredient={true}
                    />
                    )

                }
              }


            })}


          </label>

          <label>
            <h3>Instructions:</h3>
            <Input handleChange={this.handleChange} handleMore={this.handleMore} name="instr" placeholder="Add instruction"/>
            {this.state.allInstr.map((val, i, coll) => {
              if (i > 0 ) {
                if (this.state.submit && i === coll.length - 1) {
                  return 
                } else {
                  return (
                    <Input 
                    key={"item-" + i} 
                    handleChange={this.handleChange}
                    handleMore={this.handleMore}
                    name="instr"
                    placeholder="Add instruction"
                    />
                    )

                }
              }


            })}
          </label>

          <input type="submit" value="Save Recipe" className="button" onClick={this.handleClick}/>
        
        </form>
      </div>
    );
  }

}

export default withRouter(Create);