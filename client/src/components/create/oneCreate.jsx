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
      ingredients: [{ndbno:'', quantity:0, name:''}], // ingredient list ex: [{ndbno: '808', quantity: 2, name:'spam'}]
      instructions: [''],  // instruction list ex: ['mix', 'sautee']

      top_ingredients:'',  // string to go into db

      // dynamic rendering
      // ingCount: 0,  // number 'more' buttons were added
      // instrCount: 0,  // number 'more' buttons were added
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
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMore = this.handleMore.bind(this);
    // this.handleBlur = this.handleBlur.bind(this)
  }

  handleChangeInput(idx){
    return (event) => {
      event.preventDefault();
      event.persist();

      // either ing or instr
      let key = event.target.name;
      let value = event.target.value;
      this.setState((state, props) => {
        state[key] = value;
      })
    }
  }


  handleChange(event){
    event.preventDefault();
    event.persist();
    
    // either title or description
    let key = event.target.name;
    let value = event.target.value;
    this.setState((state, props) => {
      state[key] = value;
    })
  }

  handleData(data){
    // can show only top 5

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
          name: this.state.ing,
          quantity: this.state.measure[this.state.measure.length - 1],
          ndbno: this.state.ndbno[this.state.ndbno.length - 1]
        }]
      }, () => {
        console.log('>>> adding empty ing')
        // add empty obj
        let empty = {
          name: '',
          quantity: 0,
          ndbno: ''
        }
        this.setState({
          ingredients: [...this.state.ingredients, empty]
        })
        
      })

    })
  }
  
  // handleBlur(event){
  //   event.preventDefault();
  //   event.persist();
    
  //   // send search query
  //   if (this.state.ing) {  
      
  //     // rewrite code

  //     // state.ing = 'spam'

  //     // send axios post ('spam')

  //     // add to state nutrients

      

  //     if ([this.state.nutrients.length, this.state.ingredients.length].every((val) => (val >= this.state.ingCount))) {
  //       axios.post('/api/ingredients', {query: this.state.ing}).then((res) => {
  //         console.log('>>> res', res.data)
  //         this.setState({
  //           nutrients: [...this.state.nutrients, res.data],
  //           ingCount: this.state.ingCount + 1
  //         }, () => {
  //           this.handleData(this.state.nutrients)
  //         })
    
  //       }).catch((err) => {
  //         console.log('ERROR receiving ingredient data', rr)
  //       });
  //     } 
  //   } 
  // }

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
      const recipe = Object.assign({}, this.state);
      axios.post('api/recipes', {recipe})
      .then((res) => {
        this.props.history.push(`/recipes/${res.data.newRecipeId}`)
      })
      .catch((err) => {
        console.error('ERROR while post request for /api/recipes', err)
      })

    })
  }

  // add more inputs
  handleMore(event){
    event.preventDefault();
    event.persist();
    
    if (event.target.name === 'ing') {
      // call api
      axios.post('/api/ingredients', {query: this.state.ing})
      .then((res) => {
        this.setState({
          nutrients: [...this.state.nutrients, res.data]
        }, () => {
          this.handleData(this.state.nutrients)
        })
      })
      .catch((err) => {
        console.log('ERROR receiving ingredient data', err)
      })

      // // add empty obj
      // let empty = {
      //   name: '',
      //   quantity: 0,
      //   ndbno: ''
      // }
      // this.setState({
      //   ingredients: [...this.state.ingredients, empty]
      // })

    }

    else if (event.target.name === 'instr') {
      // save current instr to instructions
      this.setState({
        instructions: [...this.state.instructions, this.state.instr]
      }, () => {
        // add empty string
        this.setState({
          instructions: [...this.state.instructions, '']
        })

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
            {/* <Input handleChange={this.handleChange} handleMore={this.handleMore} name="ing" placeholder="Add ingredient" ingredient={true}/> */}
            {this.state.ingredients.map((val, i, coll) => {
 
              return (<Input 
              placeholder={"Add ingredient"}
              value={val.name}
              key={"item-" + i} 
              handleChange={this.handleChangeInput(i)}
              handleMore={this.handleMore}
              name={"ing"}
              ingredient={true}
              />)



            })}


          </label>

          <label>
            <h3>Instructions:</h3>
            {/* <Input handleChange={this.handleChange} handleMore={this.handleMore} name="instr" placeholder="Add instruction"/> */}
            {this.state.instructions.map((val, i, coll) => {
              
              return (
                <Input 
                key={"item-" + i} 
                handleChange={this.handleChangeInput(i)}
                value={val}
                handleMore={this.handleMore}
                name="instr"
                placeholder="Add instruction"
                />
                )

            })}
          </label>

          <input type="submit" value="Save Recipe" className="button" onClick={this.handleClick}/>
        
        </form>
      </div>
    );
  }

}

export default withRouter(Create);