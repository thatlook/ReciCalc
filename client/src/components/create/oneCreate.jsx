import React from 'react';
import { withRouter } from 'react-router-dom';
import Input from './createInput.jsx';
import axios from 'axios';
import { Chart, Axis, Series, Tooltip, Pie } from 'react-charts';


class Create extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      title: '',
      description: '',

      // handle change
      ing: '',  // current ing from onchange
      instr: '',  // curr instr from onchange

      // handle blur
      ingredients: [], // ingredient list ex: [{ndbno: '808', quantity: 2}]
      instructions: [],  // instruction list ex: ['mix', 'sautee']

      top_ingredients:'',  // string to go into db

      // dynamic rendering
      ingCount: 0,  // number 'more' buttons were added
      instrCount: 0,  // number 'more' buttons were added
      submit: false,  // whether total submit button was clicked

      // data from api
      nutrients: [],  
      totalCal: 0,  
      ndbno: [''],
      measure: [''],

      // chart data
      chartData: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]  // default data to show
    };
    
    // bind methods
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMore = this.handleMore.bind(this);
    this.handleBlur = this.handleBlur.bind(this)
  }


  handleChange(event){
    event.preventDefault();
    event.persist();
    
    // either ing or instr
    let key = event.target.name;
    let value = event.target.value;
    this.setState((state, props) => {
      state[key] = value;
    })
  }

  handleData(data){
    // can show only top 5
    // 0: "ndbno"
    // 1: "weight"
    // 2: "measure"
    // 3: "nutrients"
    // TODO: show weight OR measure on page

    // create data for chart
    const only = ['291', '205', '268', '203', '204'];  // use only major nutrients
    
    // for state
    let ndbno = [];
    let measure = [];

    const chartData = [];
    let totalCal = 0;

    const sum = {};
    for (let nut of data) {

      ndbno.push(nut.ndbno)
      measure.push(nut.weight)

      for (let obj of nut.nutrients) {
        if (only.includes(obj.nutrient_id)){
          let name = obj.nutrient;
          let num = isNaN(obj.value) ? 0 : parseFloat(obj.value); 

          if (sum[name]) {
            sum[name] += num;
          } else {
            sum[name] = num;
          }

          // total calories
        } else if (obj.nutrient_id === '208') {
          totalCal += parseFloat(obj.value)
        } 
      }
    }

    for (let key in sum) {
      chartData.push([key, sum[key]]);
    }
    
    this.setState({
      ndbno,
      measure,

      chartData,
      totalCal
    }, () => {
      this.setState({
        ingredients: [...this.state.ingredients, {
          quantity: this.state.measure[this.state.measure.length - 1],
          ndbno: this.state.ndbno[this.state.ndbno.length - 1]
        }]
      })

    })
  }
  
  handleBlur(event){
    event.preventDefault();
    event.persist();
    
    // send search query
    axios.post('/api/ingredients', {query: this.state.ing}).then((res) => {

      this.setState({
        nutrients: [...this.state.nutrients, res.data]
      }, () => {
        this.handleData(this.state.nutrients)
      })

    });
  }

  handleClick(event){
    event.preventDefault();
    event.persist();

    this.setState({
      submit: true,
      top_ingredients: this.state.ingredients.reduce((prev, curr, i) => {
        if (i === 0) {
          return prev + curr.ndbno;
        } else {
          return [prev, curr.ndbno].join(', ');
        }
      }, '')

    }, () => {
      alert(JSON.stringify(this.state))
      const recipe = Object.assign({}, this.state);
      axios.post('api/recipes', {recipe})
      .then((res) => {
        console.log('>>> api/recipes', res);
        this.props.history.push(`/recipes/${res.data.newRecipeId}`)
      })
      .catch((err) => {
        console.log('>>> error post api/recipes', err)
      })

    })
  }

  handleMore(event){
    event.preventDefault();
    event.persist();

    if (event.target.name === 'ing') {
      if (this.state.ingCount) {  // not 0
        this.setState({
          // ingredients: [...this.state.ingredients, {
          //   quantity: this.state.measure[this.state.measure.length - 1],
          //   ndbno: this.state.ndbno[this.state.ndbno.length - 1]
          // }],
          ingCount: this.state.ingCount + 1
        })
      } else {  // first item
        this.setState({
          // ingredients: [{
          //   quantity: this.state.measure[this.state.measure.length - 1],
          //   ndbno: this.state.ndbno[this.state.ndbno.length - 1],
          // }],
          ingCount: this.state.ingCount + 1
        })
      }


    } else if (event.target.name === 'instr') {
      this.setState({
        instructions: [...this.state.instructions, this.state.instr],
        instrCount: this.state.instrCount + 1
      })
    }
  }


  render(){
    // https://www.netrition.com/rdi_page.html
    let data = [
      {
        label: "g",
        data: this.state.chartData
      }

    ]

    return (
      <div id="create">
        <h2>What's cookin'?</h2>
        <div>
          <h3>Your Nutrients</h3>
          <Chart data={data}>
            <Axis type="pie" />
            <Series type={Pie} showPoints={false} />
            <Tooltip />
          </Chart>
          <h3>Total Calories</h3>
          <h5>{this.state.totalCal} kcal</h5>
        </div>
        <form>
          <label>
            <h3>Recipe title:</h3>
            <input type="text" name="title" placeholder="Add recipe title" onChange={this.handleChange}/>
          </label>

          <label>
            <h3>Recipe description:</h3>
            <textarea name="description" placeholder="Add recipe description" onChange={this.handleChange}/>
          </label>

          <label>
            <h3>Ingredients:</h3>
            <Input handleChange={this.handleChange} handleBlur={this.handleBlur} handleMore={this.handleMore} name="ing" placeholder="Add ingredient" ingredient={true}/>
            {this.state.ingredients.map((val, i, coll) => {
              console.log('>>> map', val)
              if (i > 0 ) {
                if (this.state.submit && i === coll.length) {
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
                    handleBlur={this.handleBlur}
                    value={val}
                    />
                    )

                }
              }


            })}


          </label>

          <label>
            <h3>Instructions:</h3>
            <Input handleChange={this.handleChange} handleMore={this.handleMore} name="instr" placeholder="Add instruction"/>
            {this.state.instructions.map((val, i, coll) => {
              
              if (i > 0 ) {
                if (this.state.submit && i === coll.length) {
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
              } else {
                console.log('>>> else')
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