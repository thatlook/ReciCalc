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
      desc: '',

      ing: '',
      instr: '',
      ingAmount: 0,

      allIng: [['', '']],
      allInstr: [''],

      ingCount: 1,
      instrCount: 1,
      submit: false,

      chartData: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
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
    
    let key = event.target.name;
    let value = event.target.value;
    
    this.setState((state, props) => {
      state[key] = value;
    })
    
  }

  handleData(data){
    // show only top 5
    const d = [];
    const only = ['291', '205', '268', '203', '204']

    for (let obj of data) {
      if (only.includes(obj.nutrient_id)){
        let name = obj.nutrient;
        let num = isNaN(obj.gm) ? 0 : obj.gm; 
        d.push([name, num]);
      }
    }

    return d;
  }
  
  handleBlur(event){
    event.preventDefault();
    event.persist();
    
    // TODO: send search query to usda and receive data
    axios.post('/api/ingredients', {query: this.state.ing}).then((res) => {
      this.setState({chartData: this.handleData(res.data)})
    });
    // TODO: show real time in chart
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
            // // TODO: send recipe data to server to save in db
            // axios.post('/api/ingredients', this.state).then((res) => {
            //   console.log('>>> recieved from server', res.data);
            //   // TODO: redirect to recipe page
            // }).catch((err) => {
            //   console.log('>>> error posting api/ingredients to server', err.error)
            // })
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


  render(){
    // https://www.netrition.com/rdi_page.html
    let data = [
      {
        label: "gm",
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
        </div>
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
            <Input handleChange={this.handleChange} handleBlur={this.handleBlur} handleMore={this.handleMore} name="ing" placeholder="Add ingredient" ingredient={true}/>
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
                    handleBlur={this.handleBlur}
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